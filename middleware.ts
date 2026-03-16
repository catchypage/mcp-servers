import { NextResponse } from 'next/server'
import NextAuth from 'next-auth'
import authConfig from '@/auth.config'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const session = req.auth
  const originalPath = req.nextUrl.pathname

  const response = NextResponse.next()

  // Skip public routes
  if (
    originalPath.startsWith('/api/auth') ||
    originalPath === '/' ||
    originalPath.startsWith('/api/gpt') ||
    originalPath.startsWith('/api/webhooks') ||
    originalPath.startsWith('/api/oauth') ||
    originalPath.startsWith('/api/mcp') ||
    originalPath.startsWith('/api/mailgun-webhook') ||
    originalPath.startsWith('/api/cron')
  ) {
    return response
  }

  // Check token expiry for protected API routes
  if (
    originalPath.startsWith('/api/uploadTextFile') ||
    originalPath.startsWith('/api/add-user-domain') ||
    originalPath.startsWith('/api/removeFile') ||
    originalPath.startsWith('/api/uploadSvgFile')
  ) {
    if (!session?.user) {
      return new Response(
        JSON.stringify({ success: false, error: 'access denied - no token' }),
        {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }

    const sessionWithRefresh = session as { lastRefresh?: number }
    const tokenAge = sessionWithRefresh.lastRefresh
      ? Date.now() - sessionWithRefresh.lastRefresh
      : 0
    if (tokenAge > 60 * 60 * 1000) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'session expired',
          code: 'SESSION_EXPIRED',
        }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }
  }

  // Redirect to home for protected pages if no session
  if (
    originalPath.startsWith('/dashboard') ||
    originalPath.startsWith('/account') ||
    originalPath.startsWith('/generate')
  ) {
    if (!session?.user) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  return response
})

export const config = {
  matcher: [
    '/api/:path*',
    '/account/:path*',
    '/generate/:path*',
    '/gallery/:path*',
    '/dashboard/:path*',
  ],
}
