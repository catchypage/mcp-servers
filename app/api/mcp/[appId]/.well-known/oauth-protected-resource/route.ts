import { NextResponse } from 'next/server'
import { getBaseUrl } from '@/utils/mcp/getBaseUrl'
import { resolveApp } from '@/utils/mcp/core/registry'

/**
 * Protected Resource Metadata (RFC 9728).
 * Tells ChatGPT where to find the authorization server for this MCP app.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ appId: string }> }
) {
  const { appId } = await params
  const baseUrl = getBaseUrl()
  const resource = `${baseUrl}/api/mcp/${appId}`

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
