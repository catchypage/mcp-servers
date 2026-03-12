/**
 * Domain → appId mapping for multi-domain MCP.
 * One backend serves many MCP apps on different domains.
 *
 * Format: MCP_DOMAIN_MAP=resume.example.com:resume,humanize.example.com:humanize
 * Or use DOMAIN_MAP env with JSON: {"resume.example.com":"resume",...}
 */

export const DOMAIN_TO_APP: Record<string, string> = (() => {
  const env = process.env.MCP_DOMAIN_MAP ?? process.env.DOMAIN_MAP
  if (!env) return {}

  if (env.startsWith('{')) {
    try {
      return JSON.parse(env) as Record<string, string>
    } catch {
      return {}
    }
  }

  const map: Record<string, string> = {}
  for (const pair of env.split(',')) {
    const [domain, appId] = pair.split(':').map((s) => s.trim())
    if (domain && appId) map[domain] = appId
  }
  return map
})()

/**
 * Resolve appId from request Host header.
 * Returns appId if domain is mapped, null otherwise.
 */
export function getAppIdFromHost(host: string | null): string | null {
  if (!host) return null
  const normalized = host.toLowerCase().replace(/:\d+$/, '')
  return DOMAIN_TO_APP[normalized] ?? null
}
