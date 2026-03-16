import { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'
import { supabaseAdmin } from '@/utils/supabase/supabase-admin'
import { getBaseUrl, getBaseUrlFromRequest } from '@/utils/mcp/getBaseUrl'
import type { Database } from '@/types_db'

type UserRow = Database['public']['Tables']['users']['Row']

export interface McpAuthResult {
  authenticated: boolean
  user?: UserRow
  error?: string
  errorDescription?: string
}

/**
 * Generate WWW-Authenticate header for 401 responses.
 * Triggers OAuth flow in ChatGPT.
 */
export function getWwwAuthenticateHeader(
  resourceUrl: string,
  error?: string,
  errorDescription?: string,
  req?: NextRequest,
): string {
  const baseUrl = req ? getBaseUrlFromRequest(req) : getBaseUrl()
  const resourcePath = `${resourceUrl}/.well-known/oauth-protected-resource`
  const parts = ['Bearer', `resource_metadata="${baseUrl}${resourcePath}"`]

  if (error) {
    parts.push(`error="${error}"`)
  }
  if (errorDescription) {
    parts.push(`error_description="${errorDescription}"`)
  }

  return parts.join(', ')
}

/**
 * Verify MCP OAuth token from Authorization header.
 * Token audience must match resourceUrl (e.g. /api/mcp/resume).
 */
export async function verifyMcpToken(
  req: NextRequest,
  resourceUrl: string,
): Promise<McpAuthResult> {
  const authHeader = req.headers.get('Authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      authenticated: false,
      error: 'invalid_token',
      errorDescription: authHeader
        ? 'Invalid authorization format'
        : 'No authorization header',
    }
  }

  const token = authHeader.substring(7)
  const baseUrl = getBaseUrlFromRequest(req)
  const expectedAudience = `${baseUrl}${resourceUrl}`

  try {
    const JWT_SECRET = new TextEncoder().encode(process.env.NEXTAUTH_SECRET)
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      issuer: baseUrl,
      audience: expectedAudience,
    })

    if (payload.authType !== 'mcp_oauth') {
      return {
        authenticated: false,
        error: 'invalid_token',
        errorDescription: 'Invalid token type',
      }
    }

    const userId = payload.userId as string
    if (!userId) {
      return {
        authenticated: false,
        error: 'invalid_token',
        errorDescription: 'Token missing user ID',
      }
    }

    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    if (userError ?? !user) {
      return {
        authenticated: false,
        error: 'invalid_token',
        errorDescription: 'User not found',
      }
    }

    return {
      authenticated: true,
      user: user as UserRow,
    }
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    if (msg.includes('exp')) {
      return {
        authenticated: false,
        error: 'invalid_token',
        errorDescription: 'Token expired',
      }
    }
    return {
      authenticated: false,
      error: 'invalid_token',
      errorDescription: 'Token verification failed',
    }
  }
}
