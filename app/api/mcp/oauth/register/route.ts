import { NextRequest, NextResponse } from 'next/server'
import { getBaseUrlFromRequest } from '@/utils/mcp/getBaseUrl'
import { nanoid } from 'nanoid'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

/**
 * OAuth 2.0 Dynamic Client Registration (RFC 7591)
 *
 * ChatGPT uses this to register itself as an OAuth client.
 * We accept any registration and return a client_id.
 * No client_secret required (public client with PKCE).
 */
export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders })
}

interface RegisterRequestBody {
  redirect_uris?: string[]
  client_name?: string
  client_uri?: string
  logo_uri?: string
  scope?: string
  grant_types?: string[]
  response_types?: string[]
  token_endpoint_auth_method?: string
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RegisterRequestBody
    const baseUrl = getBaseUrlFromRequest(req)

    // Extract registration request fields
    const {
      redirect_uris = [],
      client_name = 'ChatGPT MCP Client',
      client_uri,
      logo_uri,
      scope,
      grant_types = ['authorization_code', 'refresh_token'],
      response_types = ['code'],
      token_endpoint_auth_method = 'none',
    } = body

    /*
     * Generate client credentials
     * For public clients (PKCE), we don't need a secret
     */
    const clientId = `mcp_${nanoid(24)}`
    const registrationAccessToken = nanoid(32)

    // Build response per RFC 7591
    const clientMetadata = {
      client_id: clientId,
      client_id_issued_at: Math.floor(Date.now() / 1000),
      registration_access_token: registrationAccessToken,
      registration_client_uri: `${baseUrl}/api/mcp/oauth/register/${clientId}`,

      // Echo back provided values
      redirect_uris,
      client_name,
      client_uri,
      logo_uri,
      scope: scope ?? 'openid profile email user:read',
      grant_types,
      response_types,
      token_endpoint_auth_method,

      // Our supported features
      code_challenge_methods_supported: ['S256'],
    }

    /*
     * In production, you'd store this in DB
     * For now, we accept all registrations (stateless)
     * The client_id format allows us to validate it later
     */

    return NextResponse.json(clientMetadata, {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    })
  } catch (error) {
    console.error('Dynamic client registration error:', error)

    return NextResponse.json(
      {
        error: 'invalid_client_metadata',
        error_description: 'Failed to process registration request',
      },
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      },
    )
  }
}
