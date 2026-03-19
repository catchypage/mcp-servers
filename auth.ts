import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { supabaseAdmin } from '@/utils/supabase/supabase-admin'
import { v4 as uuidv4 } from 'uuid'
import { headers } from 'next/headers'
import { sendEvent } from '@/utils/posthog/posthog'
import authConfig from '@/auth.config'

async function getGeoDataFromHeaders(
  requestHeaders: Headers,
): Promise<string | null> {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''
    const isProduction = !siteUrl.includes('localhost')

    if (isProduction) {
      const country = requestHeaders.get('x-vercel-ip-country') ?? 'Unknown'
      const region = requestHeaders.get('x-vercel-ip-country-region') ?? ''
      const city = requestHeaders.get('x-vercel-ip-city') ?? ''

      return JSON.stringify({
        country,
        countryCode: country,
        region,
        city,
      })
    } else {
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

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    ...authConfig.providers,
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const rawEmail = credentials?.email as string | undefined
        const email = rawEmail?.trim?.()?.toLowerCase()
        const password = credentials?.password as string | undefined

        if (!email || !password) {
          return null
        }

        const { data: user, error } = await supabaseAdmin
          .from('users')
          .select(
            'id, email, full_name, avatar_url, password_hash, auth_id, created_at',
          )
          .eq('email', email)
          .single()

        const passwordHash = user?.password_hash
        if (error ?? (!passwordHash || typeof passwordHash !== 'string')) {
          return null
        }

        const isValid = await (
          bcrypt.compare as (s: string, h: string) => Promise<boolean>
        )(password, passwordHash)

        if (!isValid) {
          return null
        }

        // Backfill auth_id for legacy users (one-time UPDATE on first login)
        let authId = user.auth_id
        if (!authId) {
          authId = `credentials_${user.id}`
          await supabaseAdmin
            .from('users')
            .update({ auth_id: authId })
            .eq('id', user.id)
        }

        return {
          id: authId,
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
    ...authConfig.callbacks,
    async signIn({ user, account }) {
      try {
        if (account?.provider === 'credentials') {
          return true
        }

        if (!user.email) {
          throw new Error('No email provided by authentication provider')
        }

        const requestHeaders = await headers()

        const { data: existingUser, error } = await supabaseAdmin
          .from('users')
          .select('*')
          .eq('email', user.email)
          .single()

        if (error && error.code !== 'PGRST116') {
          console.error('Error checking user:', error)
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
          if (!existingUser.auth_id) {
            try {
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
                sendEvent(
                  'auth_warning',
                  { userId: user.id ?? existingUser.id },
                  {
                    error: updateError.message,
                    errorType: 'auth_id_update_failed',
                    email: user.email,
                  },
                )
              }
            } catch (error) {
              const geoError =
                error instanceof Error ? error : new Error(String(error))
              sendEvent(
                'auth_warning',
                { userId: user.id ?? existingUser.id },
                {
                  error: geoError.message,
                  errorType: 'geo_data_update_failed',
                  email: user.email,
                },
              )
            }
          }

          user.supabaseUserId = existingUser.id
          user.created_at = existingUser.created_at
        } else {
          const { count, error: countError } = await supabaseAdmin
            .from('users')
            .select('*', { count: 'exact', head: true })
            .eq('email', user.email)

          if (countError) {
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

          if (count && count > 0) {
            const { data: justCreatedUser, error: fetchError } =
              await supabaseAdmin
                .from('users')
                .select('*')
                .eq('email', user.email)
                .single()

            if (fetchError ?? !justCreatedUser) {
              return false
            }

            user.supabaseUserId = justCreatedUser.id
            user.created_at = justCreatedUser.created_at
            return true
          }

          try {
            const geoData = await getGeoDataFromHeaders(requestHeaders)
            const userIp =
              requestHeaders.get('x-forwarded-for')?.split(',')[0] ??
              requestHeaders.get('x-real-ip') ??
              null

            const newUserId = uuidv4()

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
            }
            if (newUser) {
              user.supabaseUserId = newUser.id
              user.created_at = newUser.created_at
            }
          } catch (error) {
            const createUserError =
              error instanceof Error ? error : new Error(String(error))
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
      if (user && account) {
        token.supabaseUserId = user.supabaseUserId
        token.created_at = user.created_at
      }

      if (!token.lastRefresh) {
        token.lastRefresh = Date.now()
      }

      const shouldRefresh =
        Date.now() - (token.lastRefresh as number) > 50 * 60 * 1000
      if (shouldRefresh) {
        token.lastRefresh = Date.now()
      }

      return token
    },
    async session({ session, token }) {
      if (session?.user && token.sub) {
        session.user.id = token.sub

        if (token.supabaseUserId) {
          session.user.supabaseUserId = token.supabaseUserId as string
        }

        // Expose lastRefresh for middleware token age check
        if (token.lastRefresh) {
          ;(session as { lastRefresh?: number }).lastRefresh =
            token.lastRefresh as number
        }
      }
      return session
    },
  },
})
