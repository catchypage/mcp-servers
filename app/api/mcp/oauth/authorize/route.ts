import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { supabaseAdmin } from '@/utils/supabase/supabase-admin'
import { nanoid } from 'nanoid'
import { getBaseUrlFromRequest } from '@/utils/mcp/getBaseUrl'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * OAuth 2.0 Authorization Endpoint with PKCE.
 * ChatGPT redirects here to start MCP auth flow.
 */
export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const clientId = url.searchParams.get('client_id')
  const redirectUri = url.searchParams.get('redirect_uri')
  const responseType = url.searchParams.get('response_type')
  const state = url.searchParams.get('state')
  const scope = url.searchParams.get('scope')
  const codeChallenge = url.searchParams.get('code_challenge')
  const codeChallengeMethod = url.searchParams.get('code_challenge_method')
  const resource = url.searchParams.get('resource')

  if (!clientId || !redirectUri || !state) {
    return NextResponse.json(
      {
        error: 'invalid_request',
        error_description: 'Missing required parameters',
      },
      { status: 400 },
    )
  }

  if (responseType !== 'code') {
    return NextResponse.json(
      {
        error: 'unsupported_response_type',
        error_description: 'Only code is supported',
      },
      { status: 400 },
    )
  }

  if (!codeChallenge || codeChallengeMethod !== 'S256') {
    return NextResponse.json(
      {
        error: 'invalid_request',
        error_description: 'PKCE with S256 is required',
      },
      { status: 400 },
    )
  }

  const allowedRedirects = [
    'https://chatgpt.com/connector/oauth/',
    'https://chatgpt.com/connector_platform_oauth_redirect',
    'https://platform.openai.com/apps-manage/oauth',
  ]
  if (!allowedRedirects.some((allowed) => redirectUri.startsWith(allowed))) {
    return NextResponse.json(
      { error: 'invalid_request', error_description: 'Invalid redirect_uri' },
      { status: 400 },
    )
  }

  const session = await auth()
  const baseUrl = getBaseUrlFromRequest(req)

  if (session?.user) {
    let userData: { id: string; email: string | null } | null = null
    let userError = null

    if (session.user.id) {
      const result = await supabaseAdmin
        .from('users')
        .select('id, email')
        .eq('auth_id', session.user.id)
        .single()
      userData = result.data
      userError = result.error
    }

    if ((userError ?? !userData) && session.user.email) {
      const result = await supabaseAdmin
        .from('users')
        .select('id, email')
        .eq('email', session.user.email)
        .single()
      userData = result.data
      userError = result.error
    }

    if (userError ?? !userData) {
      return NextResponse.redirect(
        `${redirectUri}?error=access_denied&error_description=User not found&state=${state}`,
      )
    }

    const authCode = `mcp_code_${nanoid(32)}`

    const { error: insertError } = await supabaseAdmin
      .from('mcp_oauth_codes')
      .insert({
        code: authCode,
        client_id: clientId,
        user_id: userData.id,
        redirect_uri: redirectUri,
        scope: scope ?? 'user:read',
        code_challenge: codeChallenge,
        code_challenge_method: codeChallengeMethod,
        resource: resource ?? null,
        state,
        expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
        created_at: new Date().toISOString(),
      })

    if (insertError) {
      return NextResponse.redirect(
        `${redirectUri}?error=server_error&error_description=Failed to generate code&state=${state}`,
      )
    }

    return NextResponse.redirect(
      `${redirectUri}?code=${authCode}&state=${state}`,
    )
  }

  const oauthStateId = `oauth_state_${nanoid(16)}`

  const { error: stateError } = await supabaseAdmin
    .from('mcp_oauth_states')
    .insert({
      id: oauthStateId,
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: scope ?? 'user:read',
      state,
      code_challenge: codeChallenge,
      code_challenge_method: codeChallengeMethod,
      resource: resource ?? null,
      expires_at: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
      created_at: new Date().toISOString(),
    })

  if (stateError) {
    return NextResponse.json(
      {
        error: 'server_error',
        error_description: 'Failed to initialize authorization',
      },
      { status: 500 },
    )
  }

  const loginUrl = new URL(`${baseUrl}/oauth/mcp`)
  loginUrl.searchParams.set('oauth_state', oauthStateId)
  return NextResponse.redirect(loginUrl.toString())
}
