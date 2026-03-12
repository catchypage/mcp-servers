import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/utils/supabase/supabase-admin'
import { jwtVerify } from 'jose'
import { SignJWT } from 'jose'
import { nanoid } from 'nanoid'

type GrantType = 'authorization_code' | 'refresh_token'

// JWT secret should be configured in .env
const JWT_SECRET = new TextEncoder().encode(process.env.NEXTAUTH_SECRET)

// Row typings for Supabase queries
interface OneTimeTokenRow {
  code: string
  access_token: string
  refresh_token: string
  token_type: string
  expires_in: number
}

interface UserRow {
  id: string
  auth_id: string | null
  email: string | null
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const rawBody = await req.text()
    const params = new URLSearchParams(rawBody)

    const grantType = params.get('grant_type') as GrantType | null
    const clientId = params.get('client_id')
    const clientSecret = params.get('client_secret')
    const code = params.get('code')
    const refresh_token = params.get('refresh_token')

    if (
      !(
        clientId &&
        clientSecret &&
        clientId === process.env.CLIENT_ID &&
        clientSecret === process.env.CLIENT_SECRET
      )
    ) {
      return NextResponse.json(
        {
          error: 'Environment variables client_id or client_secret are missing',
        },
        { status: 400 },
      )
    }

    if (grantType) {
      switch (grantType) {
        case 'authorization_code': {
          if (!code) {
            return NextResponse.json(
              { error: 'Authorization code is required' },
              { status: 400 },
            )
          }

          // Get stored tokens from database
          const { data: tokenDataRaw, error: tokenError } = await supabaseAdmin
            .from('one_time_token_gpt')
            .select('code, access_token, refresh_token, token_type, expires_in')
            .eq('code', code)
            .single()

          const tokenData = tokenDataRaw as OneTimeTokenRow | null

          if (tokenError ?? !tokenData) {
            return NextResponse.json(
              { error: 'Invalid authorization code' },
              { status: 400 },
            )
          }

          try {
            // Verify the access token
            await jwtVerify(tokenData.access_token, JWT_SECRET, {
              audience: 'gpt-plugin',
            })

            // Delete the used code
            await supabaseAdmin
              .from('one_time_token_gpt')
              .delete()
              .eq('code', code)

            return NextResponse.json({
              access_token: tokenData.access_token,
              refresh_token: tokenData.refresh_token,
              token_type: tokenData.token_type,
              expires_in: tokenData.expires_in,
            })
          } catch (error) {
            console.error('Error verifying token:', error)
            return NextResponse.json(
              { error: 'Invalid access token' },
              { status: 401 },
            )
          }
        }
        case 'refresh_token': {
          if (!refresh_token) {
            return NextResponse.json(
              { error: 'Refresh token is required' },
              { status: 400 },
            )
          }

          try {
            // Verify the refresh token
            const { payload } = await jwtVerify(refresh_token, JWT_SECRET, {
              audience: 'gpt-plugin',
            })

            const { userId } = payload as {
              userId: string
            }

            if (!userId || typeof userId !== 'string') {
              return NextResponse.json(
                { error: 'Invalid refresh token' },
                { status: 400 },
              )
            }

            // Get user data from Supabase
            const { data: userDataRaw, error: userError } = await supabaseAdmin
              .from('users')
              .select('id, auth_id, email')
              .eq('id', userId)
              .single()

            const userData = userDataRaw as UserRow | null

            if (userError ?? !userData) {
              return NextResponse.json(
                { error: 'User not found' },
                { status: 404 },
              )
            }

            // Generate new access token
            const access_token = await new SignJWT({
              sub: userData.auth_id ?? '',
              scope: 'gpt_api',
              authType: 'oauth',
              userId: userData.id,
              email: userData.email,
            })
              .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
              .setIssuedAt()
              .setExpirationTime('10d')
              .setJti(nanoid())
              .setIssuer(process.env.NEXTAUTH_URL ?? req.nextUrl.origin)
              .setAudience('gpt-plugin')
              .sign(JWT_SECRET)

            return NextResponse.json({
              access_token,
              refresh_token,
              token_type: 'bearer',
              expires_in: 60 * 60 * 24 * 10, // 10 days
            })
          } catch (error) {
            console.error('Error processing refresh token:', error)
            return NextResponse.json(
              { error: 'Invalid refresh token' },
              { status: 401 },
            )
          }
        }
        default:
          return NextResponse.json(
            { error: 'Invalid grant type' },
            { status: 400 },
          )
      }
    } else {
      return NextResponse.json(
        { error: 'Grant type is missing' },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error('Unexpected error in token route:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
