import type { GameDetail, GameSearchItem } from './types'
import { buildGenreFiltersParam } from './top-genre-options'

function getBaseUrl(): string {
  const scripts = document.querySelectorAll('script[src*="gamepick.bundle"]')
  if (scripts.length > 0) {
    return new URL((scripts[0] as HTMLScriptElement).src).origin
  }
  return ''
}

async function readJson(res: Response): Promise<unknown> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- Response.json()
  const body = await res.json()
  return body as unknown
}

function parseSearchData(data: unknown): {
  items: GameSearchItem[]
  totalResults: number
  limit: number
  offset: number
} {
  if (!data || typeof data !== 'object') {
    return { items: [], totalResults: 0, limit: 10, offset: 0 }
  }
  const d = data as Record<string, unknown>
  const total =
    typeof d.total_results === 'number' && d.total_results >= 0
      ? d.total_results
      : 0
  const limit = typeof d.limit === 'number' && d.limit >= 1 ? d.limit : 10
  const offset = typeof d.offset === 'number' && d.offset >= 0 ? d.offset : 0
  const arr = Array.isArray(d.results) ? d.results : []
  const items: GameSearchItem[] = []
  for (const el of arr) {
    if (!el || typeof el !== 'object') {
      continue
    }
    const r = el as Record<string, unknown>
    const id = r.id != null ? String(r.id) : ''
    const title = typeof r.name === 'string' ? r.name : ''
    if (!id || !title) {
      continue
    }
    items.push({
      id,
      title,
      year: typeof r.year === 'number' ? String(r.year) : '',
      genre: typeof r.genre === 'string' ? r.genre : '',
      poster: typeof r.image === 'string' ? r.image : '',
      link: typeof r.link === 'string' ? r.link : '',
    })
  }
  return { items, totalResults: total, limit, offset }
}

function parseGenre(x: unknown): { value: string; name: string } | null {
  if (!x || typeof x !== 'object') {
    return null
  }
  const o = x as Record<string, unknown>
  if (typeof o.name !== 'string') {
    return null
  }
  const value = typeof o.value === 'string' ? o.value : o.name
  return { value, name: o.name }
}

function parsePlatform(x: unknown): { value: string; name: string } | null {
  return parseGenre(x)
}

/** Parse `game` object from merged MCP init (same shape as API `game`). */
export function parseMergedGameDetail(raw: unknown): GameDetail | null {
  if (!raw || typeof raw !== 'object') {
    return null
  }
  return parseGameDetailPayload({ ok: true, game: raw })
}

export function parseGameDetailPayload(raw: unknown): GameDetail | null {
  if (!raw || typeof raw !== 'object') {
    return null
  }
  const o = raw as Record<string, unknown>
  if (o.ok !== true || !o.game || typeof o.game !== 'object') {
    return null
  }
  const g = o.game as Record<string, unknown>
  if (typeof g.id !== 'string' || typeof g.title !== 'string') {
    return null
  }
  const genres: GameDetail['genres'] = []
  if (Array.isArray(g.genres)) {
    for (const x of g.genres) {
      const p = parseGenre(x)
      if (p) {
        genres.push(p)
      }
    }
  }
  const platforms: GameDetail['platforms'] = []
  if (Array.isArray(g.platforms)) {
    for (const x of g.platforms) {
      const p = parsePlatform(x)
      if (p) {
        platforms.push(p)
      }
    }
  }
  const screenshots: string[] = []
  if (Array.isArray(g.screenshots)) {
    for (const x of g.screenshots) {
      if (typeof x === 'string') {
        screenshots.push(x)
      }
    }
  }
  return {
    id: g.id,
    title: g.title,
    year: typeof g.year === 'number' ? g.year : 0,
    image: typeof g.image === 'string' ? g.image : '',
    link: typeof g.link === 'string' ? g.link : '',
    short_description:
      typeof g.short_description === 'string' ? g.short_description : '',
    description: typeof g.description === 'string' ? g.description : '',
    release_date: typeof g.release_date === 'string' ? g.release_date : '',
    developer: typeof g.developer === 'string' ? g.developer : '',
    genre: typeof g.genre === 'string' ? g.genre : '',
    genres,
    platforms,
    rating_mean: typeof g.rating_mean === 'number' ? g.rating_mean : 0,
    rating_count: typeof g.rating_count === 'number' ? g.rating_count : 0,
    rating_mean_players:
      typeof g.rating_mean_players === 'number'
        ? g.rating_mean_players
        : undefined,
    rating_mean_critics:
      typeof g.rating_mean_critics === 'number'
        ? g.rating_mean_critics
        : undefined,
    screenshots,
    gameplay: typeof g.gameplay === 'string' ? g.gameplay : null,
    adult_only: Boolean(g.adult_only),
    store_url: typeof g.store_url === 'string' ? g.store_url : undefined,
  }
}

function parseSuggestItems(raw: unknown): GameSearchItem[] {
  if (!raw || typeof raw !== 'object') {
    return []
  }
  const o = raw as Record<string, unknown>
  if (o.ok !== true || !o.data || typeof o.data !== 'object') {
    return []
  }
  const d = o.data as Record<string, unknown>
  const arr = Array.isArray(d.results) ? d.results : []
  const items: GameSearchItem[] = []
  for (const el of arr) {
    if (!el || typeof el !== 'object') {
      continue
    }
    const r = el as Record<string, unknown>
    const id = r.id != null ? String(r.id) : ''
    const title = typeof r.name === 'string' ? r.name : ''
    if (!id || !title) {
      continue
    }
    items.push({
      id,
      title,
      year: typeof r.year === 'number' ? String(r.year) : '',
      genre: typeof r.genre === 'string' ? r.genre : '',
      poster: typeof r.image === 'string' ? r.image : '',
      link: typeof r.link === 'string' ? r.link : '',
    })
  }
  return items
}

function parseSimilarItems(raw: unknown): GameSearchItem[] {
  if (!raw || typeof raw !== 'object') {
    return []
  }
  const o = raw as Record<string, unknown>
  if (o.ok !== true || !Array.isArray(o.results)) {
    return []
  }
  const items: GameSearchItem[] = []
  for (const el of o.results) {
    if (!el || typeof el !== 'object') {
      continue
    }
    const r = el as Record<string, unknown>
    if (typeof r.id !== 'string' || typeof r.title !== 'string') {
      continue
    }
    items.push({
      id: r.id,
      title: r.title,
      year: typeof r.year === 'string' ? r.year : '',
      genre: typeof r.genre === 'string' ? r.genre : '',
      poster: typeof r.poster === 'string' ? r.poster : '',
      link: typeof r.link === 'string' ? r.link : '',
    })
  }
  return items
}

export function openExternal(url: string) {
  const oa = (
    window as { openai?: { openExternal?: (p: { href: string }) => void } }
  ).openai
  if (oa?.openExternal) {
    oa.openExternal({ href: url })
  } else {
    window.open(url, '_blank')
  }
}

export async function fetchTopRecommendations(
  genreSlug: string,
  offset: number,
): Promise<{
  items: GameSearchItem[]
  totalResults: number
  limit: number
  offset: number
}> {
  const base = getBaseUrl()
  const params = new URLSearchParams()
  const g = genreSlug.trim().toLowerCase()
  if (g) {
    params.set('genre', g)
  }
  params.set('offset', String(Math.max(0, Math.min(1000, Math.floor(offset)))))
  try {
    const res = await fetch(
      `${base}/api/mcp/gamepick/recommendations?${params}`,
    )
    const json = await readJson(res)
    if (!res.ok || !json || typeof json !== 'object') {
      return { items: [], totalResults: 0, limit: 10, offset: 0 }
    }
    const body = json as Record<string, unknown>
    if (body.ok !== true || !body.data) {
      return { items: [], totalResults: 0, limit: 10, offset: 0 }
    }
    const parsed = parseSearchData(body.data)
    return {
      items: parsed.items,
      totalResults: parsed.totalResults,
      limit: parsed.limit,
      offset: parsed.offset,
    }
  } catch {
    return { items: [], totalResults: 0, limit: 10, offset: 0 }
  }
}

export async function searchGames(
  query: string,
  page: number,
  opts?: { genreSlug?: string },
): Promise<{
  items: GameSearchItem[]
  totalPages: number
  totalResults: number
}> {
  const base = getBaseUrl()
  const offset = Math.max(0, (Math.max(1, page) - 1) * 10)
  const params = new URLSearchParams({
    q: query,
    offset: String(offset),
    limit: '10',
  })
  const filters = buildGenreFiltersParam(opts?.genreSlug ?? '')
  if (filters) {
    params.set('filters', filters)
  }
  try {
    const res = await fetch(`${base}/api/mcp/gamepick/search?${params}`)
    const json = await readJson(res)
    if (!res.ok || !json || typeof json !== 'object') {
      return { items: [], totalPages: 0, totalResults: 0 }
    }
    const body = json as Record<string, unknown>
    if (body.ok !== true || !body.data) {
      return { items: [], totalPages: 0, totalResults: 0 }
    }
    const { items, totalResults, limit } = parseSearchData(body.data)
    const perPage = Math.max(1, limit)
    const totalPages = Math.max(1, Math.ceil(totalResults / perPage))
    return { items, totalPages, totalResults }
  } catch {
    return { items: [], totalPages: 0, totalResults: 0 }
  }
}

export async function suggestGames(query: string): Promise<GameSearchItem[]> {
  const base = getBaseUrl()
  const q = query.trim()
  if (q.length < 2) {
    return []
  }
  try {
    const res = await fetch(
      `${base}/api/mcp/gamepick/suggest?q=${encodeURIComponent(q)}&limit=8`,
    )
    return parseSuggestItems(await readJson(res))
  } catch {
    return []
  }
}

export async function fetchGameDetail(id: string): Promise<GameDetail | null> {
  const base = getBaseUrl()
  try {
    const res = await fetch(
      `${base}/api/mcp/gamepick/games/${encodeURIComponent(id)}`,
    )
    return parseGameDetailPayload(await readJson(res))
  } catch {
    return null
  }
}

export async function fetchSimilarGames(id: string): Promise<GameSearchItem[]> {
  const base = getBaseUrl()
  try {
    const res = await fetch(
      `${base}/api/mcp/gamepick/games/${encodeURIComponent(
        id,
      )}/similar?limit=10`,
    )
    return parseSimilarItems(await readJson(res))
  } catch {
    return []
  }
}
