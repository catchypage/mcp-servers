import { SITE_DOMAIN } from '@/utils/constants'

/**
 * Get base URL for MCP OAuth and widget URLs.
 * Uses TUNNEL_URL when localhost (for ChatGPT local dev).
 * For multi-domain: pass host to get domain-specific URL.
 */
export function getBaseUrl(host?: string | null): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? SITE_DOMAIN
  const tunnelUrl = process.env.TUNNEL_URL

  if (
    (siteUrl === 'http://localhost:3000' || siteUrl.includes('localhost')) &&
    tunnelUrl
  ) {
    return tunnelUrl
  }

  if (host) {
    const protocol = process.env.VERCEL ? 'https' : 'http'
    return `${protocol}://${host.replace(/:\d+$/, '')}`
  }

  return siteUrl
}

/**
 * Get base URL from request (for multi-domain).
 * Uses Host header when domain is mapped.
 */
export function getBaseUrlFromRequest(req: {
  headers: { get: (name: string) => string | null }
}): string {
  const host = req.headers.get('host') ?? req.headers.get('x-forwarded-host')
  return getBaseUrl(host)
}
