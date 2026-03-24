import { NextRequest, NextResponse } from 'next/server'
import { getBaseUrlFromRequest } from '@/utils/mcp/getBaseUrl'

/**
 * OAuth Authorization Server Metadata.
 * Shared across all MCP apps - same OAuth endpoints.
 */
export async function GET(req: NextRequest) {
  const baseUrl = getBaseUrlFromRequest(req)

  const metadata = {
    issuer: baseUrl,
    authorization_endpoint: `${baseUrl}/api/mcp/oauth/authorize`,
    token_endpoint: `${baseUrl}/api/mcp/oauth/token`,
    registration_endpoint: `${baseUrl}/api/mcp/oauth/register`,
    jwks_uri: `${baseUrl}/.well-known/jwks.json`,
    code_challenge_methods_supported: ['S256'],
    response_types_supported: ['code'],
    response_modes_supported: ['query'],
    grant_types_supported: ['authorization_code', 'refresh_token'],
    token_endpoint_auth_methods_supported: ['none', 'client_secret_post'],
    scopes_supported: ['openid', 'profile', 'email', 'user:read', 'chefplan:read', 'chefplan:write', 'resume:read', 'resume:write'],
    service_documentation: `${baseUrl}/docs/api`,
  }

  return NextResponse.json(metadata, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
