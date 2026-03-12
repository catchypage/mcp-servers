import { NextResponse } from 'next/server'
import { getBaseUrl } from '@/utils/mcp/getBaseUrl'

/**
 * OAuth Authorization Server Metadata.
 * Shared across all MCP apps - same OAuth endpoints.
 */
export async function GET() {
  const baseUrl = getBaseUrl()

  const metadata = {
    issuer: baseUrl,
    authorization_endpoint: `${baseUrl}/api/mcp/oauth/authorize`,
    token_endpoint: `${baseUrl}/api/mcp/oauth/token`,
    code_challenge_methods_supported: ['S256'],
    response_types_supported: ['code'],
    grant_types_supported: ['authorization_code', 'refresh_token'],
    token_endpoint_auth_methods_supported: ['none'],
    scopes_supported: ['user:read', 'resume:read', 'resume:write'],
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
