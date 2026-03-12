import { type NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { supabaseAdmin } from '@/utils/supabase/supabase-admin'
import { v4 as uuidv4 } from 'uuid'
import { headers } from 'next/headers'
// import { extractIpAndGetCountry } from '@/utils/geoip'
import { sendEvent } from '@/utils/posthog/posthog'

// Функция для получения геоданных из заголовков Vercel
async function getGeoDataFromHeaders(
  requestHeaders: Headers,
): Promise<string | null> {
  try {
    // Проверяем, находимся ли мы в продакшн-окружении
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''
    const isProduction = !siteUrl.includes('localhost')

    // Получаем IP пользователя
    const userIp =
      requestHeaders.get('x-forwarded-for')?.split(',')[0] ??
      requestHeaders.get('x-real-ip') ??
      null

    if (isProduction) {
      // В продакшн используем заголовки Vercel
      const country = requestHeaders.get('x-vercel-ip-country') ?? 'Unknown'
      const region = requestHeaders.get('x-vercel-ip-country-region') ?? ''
      const city = requestHeaders.get('x-vercel-ip-city') ?? ''

      console.log('Vercel Geo Headers:', { country, region, city, userIp })

      return JSON.stringify({
        country,
        countryCode: country,
        region,
        city,
      })
    } else {
      // В локальной среде возвращаем упрощенные данные
      console.log('Local development - no geo data available')
      return JSON.stringify({
        country: 'Local',
        countryCode: 'LOCAL',
      })
    }
  } catch (error) {
    console.error('Error getting geo data from headers:', error)
    return null
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const email = credentials.email.trim().toLowerCase()

        const { data: user, error } = await supabaseAdmin
          .from('users')
          .select('id, email, full_name, avatar_url, password_hash, auth_id, created_at')
          .eq('email', email)
          .single()

        if (error || !user?.password_hash) {
          return null
        }

        const isValid = await (bcrypt.compare as (s: string, h: string) => Promise<boolean>)(
          credentials.password,
          user.password_hash,
        )

        if (!isValid) {
          return null
        }

        return {
          id: user.auth_id ?? user.id,
          email: user.email,
          name: user.full_name,
          image: user.avatar_url,
          supabaseUserId: user.id,
          created_at: user.created_at,
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === 'credentials') {
          return true
        }

        if (!user.email) {
          throw new Error('No email provided by authentication provider')
        }

        console.log('signIn callback:', { user })

        // Get user headers for IP and geolocation
        const requestHeaders = await headers()

        // Check for existing user in Supabase
        const { data: existingUser, error } = await supabaseAdmin
          .from('users')
          .select('*')
          .eq('email', user.email)
          .single()

        if (error && error.code !== 'PGRST116') {
          console.error('Error checking user:', error)

          // Track error with sendEvent utility
          sendEvent(
            'auth_error',
            { userId: user.id ?? 'unknown' },
            {
              error: error.message,
              errorCode: error.code,
              errorType: 'supabase_query_error',
              email: user.email,
            },
          )

          return false
        }

        if (existingUser) {
          // Update auth_id for existing user if needed
          if (!existingUser.auth_id) {
            try {
              // Get country info only when updating auth_id
              const geoData = await getGeoDataFromHeaders(requestHeaders)
              const userIp =
                requestHeaders.get('x-forwarded-for')?.split(',')[0] ??
                requestHeaders.get('x-real-ip') ??
                null

              const { error: updateError } = await supabaseAdmin
                .from('users')
                .update({
                  auth_id: user.id,
                  ip_address: userIp,
                  geo_location: geoData,
                })
                .eq('id', existingUser.id)

              if (updateError) {
                console.error('Error updating auth_id:', updateError)

                // Track error but don't fail authentication
                sendEvent(
                  'auth_warning',
                  { userId: user.id ?? existingUser.id },
                  {
                    error: updateError.message,
                    errorType: 'auth_id_update_failed',
                    email: user.email,
                  },
                )

                // Continue despite update error - don't throw exception
              }
            } catch (error) {
              const geoError =
                error instanceof Error ? error : new Error(String(error))
              console.error('Error updating user with geo data:', geoError)

              // Track this error but don't fail authentication
              sendEvent(
                'auth_warning',
                { userId: user.id ?? existingUser.id },
                {
                  error: geoError.message,
                  errorType: 'geo_data_update_failed',
                  email: user.email,
                },
              )
              // Continue auth process despite geo error
            }
          }

          // Add Supabase user data to the user object
          user.supabaseUserId = existingUser.id
          user.created_at = existingUser.created_at
        } else {
          /*
           * Повторная проверка, чтобы избежать гонки данных
           * Используем RLS-безопасный запрос с count
           */
          const { count, error: countError } = await supabaseAdmin
            .from('users')
            .select('*', { count: 'exact', head: true })
            .eq('email', user.email)

          if (countError) {
            console.error('Error double-checking user existence:', countError)
            sendEvent(
              'auth_warning',
              { userId: user.id ?? 'unknown' },
              {
                error: countError.message,
                errorCode: countError.code,
                errorType: 'user_existence_check_failed',
                email: user.email,
              },
            )
          }

          // Если пользователь был создан между первой и второй проверкой
          if (count && count > 0) {
            console.log('User was created between checks, fetching data')

            // Получаем данные пользователя, который уже существует
            const { data: justCreatedUser, error: fetchError } =
              await supabaseAdmin
                .from('users')
                .select('*')
                .eq('email', user.email)
                .single()

            if (fetchError) {
              console.error('Error fetching just-created user:', fetchError)
              return false
            }

            if (justCreatedUser) {
              user.supabaseUserId = justCreatedUser.id
              user.created_at = justCreatedUser.created_at
              return true
            }
          }

          // Create new user in Supabase - get country info for new users
          try {
            const geoData = await getGeoDataFromHeaders(requestHeaders)
            const userIp =
              requestHeaders.get('x-forwarded-for')?.split(',')[0] ??
              requestHeaders.get('x-real-ip') ??
              null

            const newUserId = uuidv4()

            /*
             * Проверяем еще раз перед вставкой, затем выполняем вставку
             * используя метод upsert для обеспечения уникальности
             */
            const { data: newUser, error: insertError } = await supabaseAdmin
              .from('users')
              .upsert(
                {
                  id: newUserId,
                  email: user.email,
                  full_name: user.name,
                  auth_id: user.id,
                  avatar_url: user.image,
                  consent_status: 'consented',
                  ip_address: userIp,
                  geo_location: geoData,
                },
                { onConflict: 'email', ignoreDuplicates: true },
              )
              .select()
              .single()

            if (insertError) {
              throw new Error(`Failed to create user: ${insertError.message}`)
            } else if (newUser) {
              console.log('New user created:', newUser)
              // Add created user data
              user.supabaseUserId = newUser.id
              user.created_at = newUser.created_at
            }
          } catch (error) {
            const createUserError =
              error instanceof Error ? error : new Error(String(error))
            console.error('Error creating new user:', createUserError)

            // Track error with sendEvent utility
            sendEvent(
              'auth_error',
              { userId: user.id ?? 'unknown' },
              {
                error: createUserError.message,
                errorType: 'user_creation_failed',
                email: user.email,
              },
            )

            return false
          }
        }

        return true
      } catch (error) {
        const generalError =
          error instanceof Error ? error : new Error(String(error))
        console.error('Authentication error:', generalError)

        // Track all other unhandled errors
        sendEvent(
          'auth_error',
          { userId: user?.id ?? 'unknown' },
          {
            error: generalError.message,
            errorType: 'general_auth_error',
            email: user?.email ?? 'unknown',
          },
        )

        return false
      }
    },
    async jwt({ token, user, account }) {
      // Add Supabase user data only on first authorization
      if (user && account) {
        token.supabaseUserId = user.supabaseUserId
        token.created_at = user.created_at
      }

      // Обновляем время последнего обновления токена
      if (!token.lastRefresh) {
        token.lastRefresh = Date.now()
      }

      // Проверяем, нужно ли обновить токен (каждые 50 минут)
      const shouldRefresh = Date.now() - token.lastRefresh > 50 * 60 * 1000

      if (shouldRefresh) {
        token.lastRefresh = Date.now()
        // Это заставит NextAuth обновить сессию
      }

      return token
    },
    async session({ session, token }) {
      if (session?.user && token.sub) {
        session.user.id = token.sub

        // Add additional data from token to session
        if (token.supabaseUserId) {
          session.user.supabaseUserId = token.supabaseUserId
        }
      }
      return session
    },
  },
  session: {
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // обновляем каждые 24 часа
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/', // Use root page for sign in
    error: '/', // Redirect on error
  },
}
