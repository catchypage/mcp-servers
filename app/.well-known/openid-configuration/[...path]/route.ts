import { NextRequest, NextResponse } from 'next/server'
import { getBaseUrlFromRequest } from '@/utils/mcp/getBaseUrl'

/**
 * OpenID Connect Discovery - Catch-all
 * Handles resource-specific paths like:
 * - /.well-known/openid-configuration/api/mcp/chefplan
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  const baseUrl = getBaseUrlFromRequest(req)

  const resource = path?.length ? `${baseUrl}/${path.join('/')}` : baseUrl

  const metadata = {
    issuer: baseUrl,
    authorization_endpoint: `${baseUrl}/api/mcp/oauth/authorize`,
    token_endpoint: `${baseUrl}/api/mcp/oauth/token`,
    registration_endpoint: `${baseUrl}/api/mcp/oauth/register`,
    userinfo_endpoint: `${baseUrl}/api/mcp/oauth/userinfo`,
    jwks_uri: `${baseUrl}/.well-known/jwks.json`,
    scopes_supported: [
      'openid',
      'profile',
      'email',
      'user:read',
      'user:write',
      'chefplan:read',
      'chefplan:write',
      'resume:read',
      'resume:write',
    ],
    response_types_supported: ['code'],
    response_modes_supported: ['query'],
    grant_types_supported: ['authorization_code', 'refresh_token'],
    subject_types_supported: ['public'],
    id_token_signing_alg_values_supported: ['HS256', 'RS256'],
    token_endpoint_auth_methods_supported: ['none', 'client_secret_post'],
    code_challenge_methods_supported: ['S256'],
    claims_supported: ['sub', 'iss', 'aud', 'exp', 'iat', 'email', 'name'],
    service_documentation: `${baseUrl}/docs/api`,
    resource,
  }

  return NextResponse.json(metadata, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
