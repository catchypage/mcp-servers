/**
 * GamePick catalog operations (server routes + MCP tools).
 */

import {
  gamePickCatalogFetch,
  getGamePickCatalogApiKey,
} from './catalog-client'

export type PickCatalogJsonResult<T = unknown> =
  | { ok: true; data: T }
  | { ok: false; status: number; data: unknown }

async function readJsonSafe(res: Response): Promise<unknown> {
  const text = await res.text()
  if (!text) {
    return null
  }
  try {
    return JSON.parse(text) as unknown
  } catch {
    return { raw: text }
  }
}

export function pickCatalogConfigured(): boolean {
  return Boolean(getGamePickCatalogApiKey())
}

export async function pickCatalogSearchGames(params: {
  query: string
  offset?: number
  limit?: number
  sort?: string
  sortOrder?: string
  filters?: string
  generateFilterOptions?: boolean
}): Promise<PickCatalogJsonResult> {
  if (!pickCatalogConfigured()) {
    return {
      ok: false,
      status: 503,
      data: { error: 'GamePick catalog API key is not configured' },
    }
  }
  const q = new URLSearchParams()
  q.set('query', params.query)
  q.set('offset', String(params.offset ?? 0))
  q.set('limit', String(params.limit ?? 10))
  if (params.sort?.trim()) {
    q.set('sort', params.sort.trim())
  }
  if (params.sortOrder?.trim()) {
    q.set('sort-order', params.sortOrder.trim())
  }
  if (params.filters?.trim()) {
    q.set('filters', params.filters.trim())
  }
  if (params.generateFilterOptions) {
    q.set('generate-filter-options', 'true')
  }

  const res = await gamePickCatalogFetch(`/v1/games?${q.toString()}`)
  const data = await readJsonSafe(res)
  if (!res.ok) {
    return { ok: false, status: res.status, data }
  }
  return { ok: true, data }
}

export async function pickCatalogSuggestGames(
  query: string,
  limit = 10,
): Promise<PickCatalogJsonResult> {
  if (!pickCatalogConfigured()) {
    return {
      ok: false,
      status: 503,
      data: { error: 'GamePick catalog API key is not configured' },
    }
  }
  const q = new URLSearchParams()
  q.set('query', query)
  q.set('limit', String(Math.min(10, Math.max(1, limit))))
  const res = await gamePickCatalogFetch(
    `/v1/games/suggestions?${q.toString()}`,
  )
  const data = await readJsonSafe(res)
  if (!res.ok) {
    return { ok: false, status: res.status, data }
  }
  return { ok: true, data }
}

export async function pickCatalogGameDetail(
  gameId: number,
): Promise<PickCatalogJsonResult> {
  if (!pickCatalogConfigured()) {
    return {
      ok: false,
      status: 503,
      data: { error: 'GamePick catalog API key is not configured' },
    }
  }
  if (!Number.isFinite(gameId) || gameId <= 0) {
    return { ok: false, status: 400, data: { error: 'Invalid game id' } }
  }
  const res = await gamePickCatalogFetch(`/v1/games/${gameId}`)
  const data = await readJsonSafe(res)
  if (!res.ok) {
    return { ok: false, status: res.status, data }
  }
  return { ok: true, data }
}

export async function pickCatalogSimilarGames(
  gameId: number,
  limit = 10,
): Promise<PickCatalogJsonResult> {
  if (!pickCatalogConfigured()) {
    return {
      ok: false,
      status: 503,
      data: { error: 'GamePick catalog API key is not configured' },
    }
  }
  if (!Number.isFinite(gameId) || gameId <= 0) {
    return { ok: false, status: 400, data: { error: 'Invalid game id' } }
  }
  const q = new URLSearchParams()
  q.set('limit', String(Math.min(10, Math.max(1, limit))))
  const res = await gamePickCatalogFetch(
    `/v1/games/${gameId}/similar?${q.toString()}`,
  )
  const data = await readJsonSafe(res)
  if (!res.ok) {
    return { ok: false, status: res.status, data }
  }
  return { ok: true, data }
}
