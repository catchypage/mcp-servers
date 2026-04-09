/**
 * Server-only HTTP client for the external games catalog (GamePick).
 * Primary: GAMEPICK_API_KEY. A fallback env name is accepted for existing
 * deployments.
 */

const CATALOG_API_BASE = 'https://api.gamebrain.co'

export function getGamePickCatalogApiKey(): string | undefined {
  const primary = process.env.GAMEPICK_API_KEY?.trim()
  const legacy = process.env.GAMEBRAIN_API_KEY?.trim()
  const k = primary && primary.length > 0 ? primary : legacy
  return k && k.length > 0 ? k : undefined
}

export async function gamePickCatalogFetch(
  pathAndQuery: string,
  init?: RequestInit,
): Promise<Response> {
  const key = getGamePickCatalogApiKey()
  if (!key) {
    throw new Error('GAMEPICK_API_KEY is not set')
  }
  const path = pathAndQuery.startsWith('/') ? pathAndQuery : `/${pathAndQuery}`
  const url = `${CATALOG_API_BASE}${path}`

  return fetch(url, {
    ...init,
    headers: {
      Accept: 'application/json',
      ...init?.headers,
      'x-api-key': key,
    },
    cache: 'no-store',
  })
}
