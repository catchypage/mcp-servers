import { NextRequest, NextResponse } from 'next/server'
import { getBaseUrlFromRequest } from '@/utils/mcp/getBaseUrl'

/**
 * OAuth 2.0 Protected Resource Metadata (RFC 9728)
 * Catch-all for resource-specific paths like:
 * - /.well-known/oauth-protected-resource/api/mcp/chefplan
 * - /.well-known/oauth-protected-resource/api/mcp/resume
 *
 * Returns resource-specific metadata pointing to the auth server.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  const baseUrl = getBaseUrlFromRequest(req)

  // Build resource URL from path
  // e.g., ['api', 'mcp', 'chefplan'] -> https://domain.com/api/mcp/chefplan
  const resourcePath = path?.length ? `/${path.join('/')}` : ''
  const resource = `${baseUrl}${resourcePath}`

  // Determine app-specific scopes based on path
  let appScopes: string[] = ['user:read']
  if (path?.includes('chefplan')) {
    appScopes = ['user:read', 'chefplan:read', 'chefplan:write']
  } else if (path?.includes('resume')) {
    appScopes = ['user:read', 'resume:read', 'resume:write']
  }

  const metadata = {
    resource,
    authorization_servers: [baseUrl],
    scopes_supported: ['openid', 'profile', 'email', ...appScopes],
    bearer_methods_supported: ['header'],
    resource_documentation: `${baseUrl}/docs${resourcePath}`,
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
