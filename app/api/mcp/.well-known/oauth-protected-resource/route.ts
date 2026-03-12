import { NextRequest, NextResponse } from 'next/server'
import { getBaseUrlFromRequest } from '@/utils/mcp/getBaseUrl'
import { getAppIdFromHost } from '@/utils/mcp/core/domain-map'
import { resolveApp } from '@/utils/mcp/core/registry'

/**
 * Protected Resource Metadata for domain-mapped MCP.
 * resume.example.com/api/mcp/.well-known/oauth-protected-resource
 */
export async function GET(req: NextRequest) {
  const host = req.headers.get('host') ?? req.headers.get('x-forwarded-host')
  const appId = getAppIdFromHost(host)

  if (!appId) {
    return NextResponse.json(
      { error: 'Domain not mapped', host },
      { status: 404 }
    )
  }

  const baseUrl = getBaseUrlFromRequest(req)
  const resource = `${baseUrl}/api/mcp`

  const app = resolveApp(appId)
  const scopes = app
    ? ['user:read', 'resume:read', 'resume:write']
    : ['user:read']

  const metadata = {
    resource,
    authorization_servers: [baseUrl],
    scopes_supported: scopes,
    resource_documentation: `${baseUrl}/docs/mcp/${appId}`,
  }

  return NextResponse.json(metadata, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
