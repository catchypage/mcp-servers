import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/utils/supabase/supabase-admin'
import { SignJWT } from 'jose'
import { jwtVerify } from 'jose'
import { nanoid } from 'nanoid'
import { createHash } from 'crypto'
import { getBaseUrlFromRequest } from '@/utils/mcp/getBaseUrl'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const JWT_SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
)

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

function verifyPkce(codeVerifier: string, codeChallenge: string): boolean {
  const hash = createHash('sha256').update(codeVerifier).digest()
  const computed = hash
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
  return computed === codeChallenge
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders })
}

/**
 * OAuth 2.0 Token Endpoint.
 * Exchanges authorization code for JWT (PKCE) or refresh_token for new
 * access_token.
 */
export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text()
    const params = new URLSearchParams(rawBody)

    const grantType = params.get('grant_type')
    const code = params.get('code')
    const clientId = params.get('client_id')
    const codeVerifier = params.get('code_verifier')
    const refreshToken = params.get('refresh_token')

    const baseUrl = getBaseUrlFromRequest(req)

    if (grantType === 'authorization_code') {
      if (!code || !codeVerifier || !clientId) {
        return NextResponse.json(
          {
            error: 'invalid_request',
            error_description: 'Missing required parameters',
          },
          { status: 400, headers: corsHeaders },
        )
      }

      const { data: codeData, error: codeError } = await supabaseAdmin
        .from('mcp_oauth_codes')
        .select('*')
        .eq('code', code)
        .single()

      if (codeError ?? !codeData) {
        return NextResponse.json(
          {
            error: 'invalid_grant',
            error_description: 'Invalid authorization code',
          },
          { status: 400, headers: corsHeaders },
        )
      }

      if (new Date(codeData.expires_at) < new Date()) {
        await supabaseAdmin.from('mcp_oauth_codes').delete().eq('code', code)
        return NextResponse.json(
          {
            error: 'invalid_grant',
            error_description: 'Authorization code expired',
          },
          { status: 400, headers: corsHeaders },
        )
      }

      if (codeData.client_id !== clientId) {
        return NextResponse.json(
          { error: 'invalid_grant', error_description: 'Client ID mismatch' },
          { status: 400, headers: corsHeaders },
        )
      }

      if (!verifyPkce(codeVerifier, codeData.code_challenge)) {
        return NextResponse.json(
          {
            error: 'invalid_grant',
            error_description: 'PKCE verification failed',
          },
          { status: 400, headers: corsHeaders },
        )
      }

      const { data: userData, error: userError } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('id', codeData.user_id)
        .single()

      if (userError ?? !userData) {
        return NextResponse.json(
          { error: 'invalid_grant', error_description: 'User not found' },
          { status: 400, headers: corsHeaders },
        )
      }

      await supabaseAdmin.from('mcp_oauth_codes').delete().eq('code', code)

      const resource = codeData.resource ?? `${baseUrl}/api/mcp`
      const scope = codeData.scope ?? 'user:read'

      const accessToken = await new SignJWT({
        sub: userData.auth_id ?? userData.id,
        scope,
        authType: 'mcp_oauth',
        userId: userData.id,
        email: userData.email,
        resource,
      })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setIssuedAt()
        .setExpirationTime('1h')
        .setJti(nanoid())
        .setIssuer(baseUrl)
        .setAudience(resource)
        .sign(JWT_SECRET)

      const newRefreshToken = await new SignJWT({
        sub: userData.auth_id ?? userData.id,
        scope,
        authType: 'mcp_oauth_refresh',
        userId: userData.id,
        resource,
      })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setIssuedAt()
        .setExpirationTime('30d')
        .setJti(nanoid())
        .setIssuer(baseUrl)
        .setAudience(resource)
        .sign(JWT_SECRET)

      return NextResponse.json(
        {
          access_token: accessToken,
          token_type: 'Bearer',
          expires_in: 3600,
          refresh_token: newRefreshToken,
          scope,
        },
        { status: 200, headers: corsHeaders },
      )
    }

    if (grantType === 'refresh_token') {
      if (!refreshToken) {
        return NextResponse.json(
          {
            error: 'invalid_request',
            error_description: 'Refresh token required',
          },
          { status: 400, headers: corsHeaders },
        )
      }

      try {
        const { payload } = await jwtVerify(refreshToken, JWT_SECRET)

        if (payload.authType !== 'mcp_oauth_refresh') {
          throw new Error('Invalid token type')
        }

        const userId = payload.userId as string
        const { data: userData, error: userError } = await supabaseAdmin
          .from('users')
          .select('*')
          .eq('id', userId)
          .single()

        if (userError ?? !userData) {
          throw new Error('User not found')
        }

        const resource = (payload.resource as string) ?? `${baseUrl}/api/mcp`
        const scope = (payload.scope as string) ?? 'user:read'

        const accessToken = await new SignJWT({
          sub: userData.auth_id ?? userData.id,
          scope,
          authType: 'mcp_oauth',
          userId: userData.id,
          email: userData.email,
          resource,
        })
          .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
          .setIssuedAt()
          .setExpirationTime('1h')
          .setJti(nanoid())
          .setIssuer(baseUrl)
          .setAudience(resource)
          .sign(JWT_SECRET)

        return NextResponse.json(
          {
            access_token: accessToken,
            token_type: 'Bearer',
            expires_in: 3600,
            refresh_token: refreshToken,
            scope,
          },
          { status: 200, headers: corsHeaders },
        )
      } catch {
        return NextResponse.json(
          {
            error: 'invalid_grant',
            error_description: 'Invalid refresh token',
          },
          { status: 400, headers: corsHeaders },
        )
      }
    }

    return NextResponse.json(
      {
        error: 'unsupported_grant_type',
        error_description:
          'Only authorization_code and refresh_token are supported',
      },
      { status: 400, headers: corsHeaders },
    )
  } catch (error) {
    console.error('MCP token endpoint error:', error)
    return NextResponse.json(
      { error: 'server_error', error_description: 'Internal server error' },
      { status: 500, headers: corsHeaders },
    )
  }
}
