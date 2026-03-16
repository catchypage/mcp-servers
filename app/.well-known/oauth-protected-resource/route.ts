import { NextRequest, NextResponse } from 'next/server'
import { getBaseUrlFromRequest } from '@/utils/mcp/getBaseUrl'

/**
 * OAuth 2.0 Protected Resource Metadata (RFC 9728)
 * Root-level endpoint - returns default resource info.
 */
export async function GET(req: NextRequest) {
  const baseUrl = getBaseUrlFromRequest(req)

  const metadata = {
    resource: baseUrl,
    authorization_servers: [baseUrl],
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
    bearer_methods_supported: ['header'],
    resource_documentation: `${baseUrl}/docs/api`,
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
