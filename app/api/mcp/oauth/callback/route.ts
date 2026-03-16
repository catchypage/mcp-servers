import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { supabaseAdmin } from '@/utils/supabase/supabase-admin'
import { nanoid } from 'nanoid'
import { getBaseUrl } from '@/utils/mcp/getBaseUrl'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * MCP OAuth Callback.
 * Called after user authenticates with NextAuth.
 * Completes the OAuth flow by generating authorization code and redirecting to
 * ChatGPT.
 */
export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const oauthStateId = url.searchParams.get('oauth_state')

  if (!oauthStateId) {
    return NextResponse.json(
      { error: 'Missing oauth_state parameter' },
      { status: 400 },
    )
  }

  const session = await auth()
  const baseUrl = getBaseUrl(req.headers.get('host') ?? undefined)

  if (!session?.user) {
    return NextResponse.redirect(
      `${baseUrl}/oauth/mcp?oauth_state=${oauthStateId}&error=no_session`,
    )
  }

  const { data: oauthState, error: stateError } = await supabaseAdmin
    .from('mcp_oauth_states')
    .select('*')
    .eq('id', oauthStateId)
    .single()

  if (stateError ?? !oauthState) {
    return NextResponse.json(
      { error: 'Invalid or expired OAuth state' },
      { status: 400 },
    )
  }

  if (new Date(oauthState.expires_at) < new Date()) {
    await supabaseAdmin.from('mcp_oauth_states').delete().eq('id', oauthStateId)
    return NextResponse.json({ error: 'OAuth state expired' }, { status: 400 })
  }

  let userData: { id: string } | null = null
  let userError = null

  if (session.user.id) {
    const result = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('auth_id', session.user.id)
      .single()
    userData = result.data
    userError = result.error
  }

  if ((userError ?? !userData) && session.user.email) {
    const result = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', session.user.email)
      .single()
    userData = result.data
    userError = result.error
  }

  if (userError ?? !userData) {
    return NextResponse.redirect(
      `${oauthState.redirect_uri}?error=access_denied&error_description=User not found&state=${oauthState.state}`,
    )
  }

  const authCode = `mcp_code_${nanoid(32)}`

  const { error: insertError } = await supabaseAdmin
    .from('mcp_oauth_codes')
    .insert({
      code: authCode,
      client_id: oauthState.client_id,
      user_id: userData.id,
      redirect_uri: oauthState.redirect_uri,
      scope: oauthState.scope,
      code_challenge: oauthState.code_challenge,
      code_challenge_method: oauthState.code_challenge_method,
      resource: oauthState.resource,
      state: oauthState.state,
      expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
      created_at: new Date().toISOString(),
    })

  if (insertError) {
    return NextResponse.redirect(
      `${oauthState.redirect_uri}?error=server_error&error_description=Failed to generate code&state=${oauthState.state}`,
    )
  }

  await supabaseAdmin.from('mcp_oauth_states').delete().eq('id', oauthStateId)

  return NextResponse.redirect(
    `${oauthState.redirect_uri}?code=${authCode}&state=${oauthState.state}`,
  )
}
