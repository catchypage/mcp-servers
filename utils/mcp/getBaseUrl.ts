import { SITE_DOMAIN, TUNNEL_URL } from '@/utils/constants'

/**
 * Strip port and normalize host header (supports IPv6 in brackets).
 */
function parseHostname(hostHeader: string): string {
  const raw = hostHeader.split(',')[0].trim()
  if (raw.startsWith('[')) {
    const close = raw.indexOf(']')
    if (close !== -1) {
      return raw.slice(0, close + 1).toLowerCase()
    }
  }
  return raw.replace(/:\d+$/, '').toLowerCase()
}

function isLocalHostname(hostname: string): boolean {
  return (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '[::1]' ||
    hostname === '::1' ||
    hostname === '0.0.0.0'
  )
}

function isLocalDevSite(): boolean {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? SITE_DOMAIN
  return siteUrl === 'http://localhost:3000' || siteUrl.includes('localhost')
}

/**
 * Resolve public origin for MCP OAuth (Pinggy, ngrok, production Host).
 */
function resolveBaseUrl(
  hostHeader: string | null | undefined,
  forwardedProto: string | null | undefined,
): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? SITE_DOMAIN

  if (hostHeader) {
    const hostname = parseHostname(hostHeader)
    if (!isLocalHostname(hostname)) {
      const proto =
        forwardedProto === 'http' || forwardedProto === 'https'
          ? forwardedProto
          : 'https'
      return `${proto}://${hostname}`
    }
  }

  if (isLocalDevSite()) {
    return TUNNEL_URL
  }

  if (hostHeader) {
    const hostname = parseHostname(hostHeader)
    const protocol = process.env.VERCEL ? 'https' : 'http'
    return `${protocol}://${hostname}`
  }

  return siteUrl
}

/**
 * Base URL for MCP OAuth and widget metadata.
 * Pinggy/ngrok: Host / X-Forwarded-Host → issuer + JWT aud match connector URL.
 * Direct localhost + local NEXT_PUBLIC_SITE_URL → TUNNEL_URL fallback.
 */
export function getBaseUrl(host?: string | null): string {
  return resolveBaseUrl(host ?? null, null)
}

/**
 * Prefer X-Forwarded-Host (proxy/tunnel), then Host; optional
 * X-Forwarded-Proto.
 */
export function getBaseUrlFromRequest(req: {
  headers: { get: (name: string) => string | null }
}): string {
  const forwardedHost = req.headers.get('x-forwarded-host')
  const fromForwarded = forwardedHost?.split(',')[0]?.trim()
  const hostHeader = fromForwarded
    ? fromForwarded
    : req.headers.get('host') ?? null
  const forwardedProto = req.headers
    .get('x-forwarded-proto')
    ?.split(',')[0]
    ?.trim()

  return resolveBaseUrl(hostHeader, forwardedProto)
}
