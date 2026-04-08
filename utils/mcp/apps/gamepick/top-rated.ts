/**
 * GameBrain "best games" discovery: sort by computed_rating desc + optional genre filter.
 * @see https://gamebrain.co/api/docs/search-games
 */

import {
  pickCatalogSearchGames,
  type PickCatalogJsonResult,
} from '@/utils/mcp/apps/gamepick/catalog-api'

/** Broad NL query so the catalog returns a large pool before sort/filter. */
export const TOP_RATED_BROAD_QUERY = 'video games'

export const TOP_GENRE_SLUGS = [
  'action',
  'adventure',
  'rpg',
  'strategy',
  'simulation',
  'puzzle',
  'shooter',
  'sports',
  'racing',
  'horror',
  'platformer',
  'fighting',
  'indie',
] as const

export type TopGenreSlug = (typeof TOP_GENRE_SLUGS)[number]

const SLUG_SET = new Set<string>(TOP_GENRE_SLUGS)

export function isAllowedTopGenreSlug(raw: string): boolean {
  return SLUG_SET.has(raw.trim().toLowerCase())
}

export function filtersJsonForTopGenre(raw: string): string | undefined {
  const slug = raw.trim().toLowerCase()
  if (!slug || slug === 'all') {
    return undefined
  }
  if (!SLUG_SET.has(slug)) {
    return undefined
  }
  return JSON.stringify([{ key: 'genre', values: [{ value: slug }] }])
}

export function clampTopRatedOffset(n: unknown): number {
  const x = typeof n === 'number' ? n : parseInt(String(n ?? '0'), 10)
  if (!Number.isFinite(x)) {
    return 0
  }
  return Math.min(1000, Math.max(0, Math.floor(x)))
}

export async function pickTopRatedGames(params: {
  genreSlug?: string
  offset?: number
}): Promise<PickCatalogJsonResult> {
  const offset = clampTopRatedOffset(params.offset ?? 0)
  const filters = params.genreSlug
    ? filtersJsonForTopGenre(params.genreSlug)
    : undefined
  return pickCatalogSearchGames({
    query: TOP_RATED_BROAD_QUERY,
    offset,
    limit: 10,
    sort: 'computed_rating',
    sortOrder: 'desc',
    filters,
  })
}
