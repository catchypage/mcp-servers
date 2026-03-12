import { supabaseAdmin } from '@/utils/supabase/supabase-admin'
import type { Database } from '@/types_db'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { SignJWT } from 'jose'
import { nanoid } from 'nanoid'
import { authOptions } from '@/utils/auth/auth-options'

const JWT_SECRET = new TextEncoder().encode(process.env.NEXTAUTH_SECRET)

export async function GET(req: NextRequest) {
  const url = new URL(req.url)

  console.log('start oauth callback', {
    url: req.url,
    referrer: req.headers.get('referer') ?? 'none',
  })

  const redirect_uri = url.searchParams.get('redirect_uri')
  const scope = url.searchParams.get('scope') as 'email profile'
  const state = url.searchParams.get('state')

  console.log('OAuth callback parameters:', {
    redirect_uri,
    scope,
    state,
  })

  // Get server session via NextAuth
  const session = await getServerSession(authOptions)
  console.log(
    'session in oauth callback:',
    session?.user?.email ?? 'no session',
  )

  if (!session?.user) {
    const response = NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/oauth?error=no_session`,
    )
    return response
  }

  if (!redirect_uri) {
    const response = NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/oauth?error=invalid_params`,
    )
    return response
  }

  // Get user data from Supabase
  const { data: userDataRaw, error: userError } = await supabaseAdmin
    .from('users')
    .select('id, email, gpt_id')
    .eq('auth_id', session.user.id)
    .single()

  const userData = userDataRaw as
    | Database['public']['Tables']['users']['Row']
    | null

  console.log('userData:', userData)

  if (userError) {
    const response = NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/oauth?error=user_not_found`,
    )
    return response
  }

  // Generate authorization code
  const code = `auth_${Date.now()}_${nanoid()}`

  // Create JWT with user data
  const access_token = await new SignJWT({
    sub: session.user.id,
    scope: 'gpt_api',
    authType: 'oauth',
    userId: userData!.id,
    email: userData!.email,
  })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime('10d')
    .setJti(nanoid())
    .setIssuer(process.env.NEXTAUTH_URL ?? req.nextUrl.origin)
    .setAudience('gpt-plugin')
    .sign(JWT_SECRET)

  // Generate refresh token
  const refresh_token = await new SignJWT({
    sub: session.user.id,
    scope: 'gpt_api',
    authType: 'oauth',
    userId: userData!.id,
  })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .setJti(nanoid())
    .setIssuer(process.env.NEXTAUTH_URL ?? req.nextUrl.origin)
    .setAudience('gpt-plugin')
    .sign(JWT_SECRET)

  // Store tokens in database
  const { error: tokenError } = await supabaseAdmin
    .from('one_time_token_gpt')
    .insert({
      code,
      token_type: 'bearer',
      access_token,
      refresh_token,
      expires_in: 60 * 60 * 24 * 10, // 10 days
    })
    .select()

  if (tokenError) {
    console.error('Error storing tokens:', tokenError)
    const response = NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/oauth?error=token_storage_failed`,
    )
    return response
  }

  try {
    if (redirect_uri && userData && !userData.gpt_id) {
      await supabaseAdmin
        .from('users')
        .update({ gpt_id: redirect_uri })
        .eq('id', userData.id)
        .single()
    }
  } catch (error) {
    console.error('Error updating gpt_id:', error)
  }

  // Create query parameters for redirect
  const queryParams = new URLSearchParams({
    state: state ?? '',
    code,
  })

  console.log('redirect_uri:', `${redirect_uri}?${queryParams.toString()}`)
  // Redirect back to GPT with authorization code
  return NextResponse.redirect(`${redirect_uri}?${queryParams.toString()}`)
}
