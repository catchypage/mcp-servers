import { supabaseAdmin } from '@/utils/supabase/supabase-admin'
import type { Database } from '@/types_db'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { SignJWT } from 'jose'
import { nanoid } from 'nanoid'
import { getBaseUrlFromRequest } from '@/utils/mcp/getBaseUrl'

const JWT_SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
)

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

  const session = await auth()
  const baseUrl = getBaseUrlFromRequest(req)

  console.log(
    'session in oauth callback:',
    session?.user?.email ?? 'no session',
  )

  if (!session?.user) {
    return NextResponse.redirect(`${baseUrl}/oauth?error=no_session`)
  }

  if (!redirect_uri) {
    return NextResponse.redirect(`${baseUrl}/oauth?error=invalid_params`)
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
    return NextResponse.redirect(`${baseUrl}/oauth?error=user_not_found`)
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
    .setIssuer(baseUrl)
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
    .setIssuer(baseUrl)
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
    return NextResponse.redirect(`${baseUrl}/oauth?error=token_storage_failed`)
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
