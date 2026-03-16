import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { supabaseAdmin } from '@/utils/supabase/supabase-admin'
import { getBaseUrlFromRequest } from '@/utils/mcp/getBaseUrl'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

/**
 * OpenID Connect UserInfo Endpoint
 * Returns user claims based on access token.
 */
export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders })
}

export async function GET(req: NextRequest) {
  return handleUserInfo(req)
}

export async function POST(req: NextRequest) {
  return handleUserInfo(req)
}

async function handleUserInfo(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        {
          error: 'invalid_token',
          error_description: 'Missing or invalid authorization header',
        },
        {
          status: 401,
          headers: { ...corsHeaders, 'WWW-Authenticate': 'Bearer' },
        },
      )
    }

    const token = authHeader.substring(7)
    const baseUrl = getBaseUrlFromRequest(req)
    const JWT_SECRET = new TextEncoder().encode(process.env.NEXTAUTH_SECRET)

    const { payload } = await jwtVerify(token, JWT_SECRET, {
      issuer: baseUrl,
    })

    const userId = payload.userId as string
    if (!userId) {
      return NextResponse.json(
        { error: 'invalid_token', error_description: 'Token missing user ID' },
        { status: 401, headers: corsHeaders },
      )
    }

    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('id, email, full_name, avatar_url')
      .eq('id', userId)
      .single()

    if (userError || !user) {
      return NextResponse.json(
        { error: 'invalid_token', error_description: 'User not found' },
        { status: 401, headers: corsHeaders },
      )
    }

    // Standard OIDC claims
    const userInfo = {
      sub: user.id,
      email: user.email,
      email_verified: true,
      name: user.full_name,
      picture: user.avatar_url,
      updated_at: Math.floor(Date.now() / 1000),
    }

    return NextResponse.json(userInfo, {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    })
  } catch (error) {
    console.error('UserInfo error:', error)
    return NextResponse.json(
      {
        error: 'invalid_token',
        error_description: 'Token verification failed',
      },
      { status: 401, headers: corsHeaders },
    )
  }
}
