import { NextRequest, NextResponse } from 'next/server'
import { getBaseUrlFromRequest } from '@/utils/mcp/getBaseUrl'

/**
 * OAuth 2.0 Authorization Server Metadata (RFC 8414)
 * Catch-all for resource-specific paths like:
 * - /.well-known/oauth-authorization-server/api/mcp/chefplan
 * - /.well-known/oauth-authorization-server/api/mcp/resume
 *
 * Returns the same server metadata - all apps use the same OAuth server.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  const baseUrl = getBaseUrlFromRequest(req)

  // Extract resource from path if present
  // e.g., ['api', 'mcp', 'chefplan'] -> /api/mcp/chefplan
  const resource = path?.length ? `${baseUrl}/${path.join('/')}` : baseUrl

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
    // Include resource info for context
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
