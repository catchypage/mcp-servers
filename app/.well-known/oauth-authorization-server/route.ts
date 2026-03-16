import { NextRequest, NextResponse } from 'next/server'
import { getBaseUrlFromRequest } from '@/utils/mcp/getBaseUrl'

/**
 * OAuth 2.0 Authorization Server Metadata (RFC 8414)
 * Root-level endpoint for ChatGPT/OpenAI MCP OAuth discovery.
 *
 * ChatGPT looks for this at:
 * - /.well-known/oauth-authorization-server
 * - /.well-known/oauth-authorization-server/{resource_path}
 */
export async function GET(req: NextRequest) {
  const baseUrl = getBaseUrlFromRequest(req)

  const metadata = {
    issuer: baseUrl,
    authorization_endpoint: `${baseUrl}/api/mcp/oauth/authorize`,
    token_endpoint: `${baseUrl}/api/mcp/oauth/token`,
    registration_endpoint: `${baseUrl}/api/mcp/oauth/register`,
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
    code_challenge_methods_supported: ['S256'],
    token_endpoint_auth_methods_supported: ['none', 'client_secret_post'],
    service_documentation: `${baseUrl}/docs/api`,
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
