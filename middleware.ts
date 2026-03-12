import { NextResponse, NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  const token = await getToken({ req })
  const originalPath = req.nextUrl.pathname

  const response = NextResponse.next()

  // Пропускаем публичные роуты
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

  // Проверяем истекшие токены для защищенных роутов
  if (
    originalPath.startsWith('/api/uploadTextFile') ||
    originalPath.startsWith('/api/add-user-domain') ||
    originalPath.startsWith('/api/removeFile') ||
    originalPath.startsWith('/api/uploadSvgFile')
  ) {
    if (!token) {
      return new Response(
        JSON.stringify({ success: false, error: 'access denied - no token' }),
        {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }

    // Проверяем, не истек ли токен
    const tokenAge = token.lastRefresh ? Date.now() - token.lastRefresh : 0
    if (tokenAge > 60 * 60 * 1000) {
      // больше 1 часа
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

  // Для защищенных страниц перенаправляем на главную если нет токена
  if (
    originalPath.startsWith('/dashboard') ||
    originalPath.startsWith('/account') ||
    originalPath.startsWith('/generate')
  ) {
    if (!token) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    '/api/:path*',
    '/account/:path*',
    '/generate/:path*',
    '/gallery/:path*',
    '/dashboard/:path*',
  ],
}
