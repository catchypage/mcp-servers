/**
 * Normalize catalog API JSON into GamePick widget / MCP structured content
 * shapes.
 */

export function yearFromReleaseDate(releaseDate: unknown): number {
  if (typeof releaseDate !== 'string' || releaseDate.length < 4) {
    return 0
  }
  const y = parseInt(releaseDate.slice(0, 4), 10)
  return Number.isFinite(y) ? y : 0
}

export function normalizeSearchHit(
  raw: Record<string, unknown>,
): Record<string, unknown> {
  const id = raw.id
  return {
    id: id != null ? String(id) : '',
    title: typeof raw.name === 'string' ? raw.name : '',
    year:
      typeof raw.year === 'number'
        ? String(raw.year)
        : String(yearFromReleaseDate(raw.release_date)),
    genre: typeof raw.genre === 'string' ? raw.genre : '',
    poster: typeof raw.image === 'string' ? raw.image : '',
    link: typeof raw.link === 'string' ? raw.link : '',
  }
}

export function normalizeGameDetail(
  raw: Record<string, unknown>,
): Record<string, unknown> {
  const rating =
    raw.rating && typeof raw.rating === 'object' ? raw.rating : null
  const r = rating as Record<string, unknown> | null
  const mean = typeof r?.mean === 'number' ? r.mean : 0
  const count = typeof r?.count === 'number' ? r.count : 0
  const meanPlayers =
    typeof r?.mean_players === 'number' ? r.mean_players : undefined
  const meanCritics =
    typeof r?.mean_critics === 'number' ? r.mean_critics : undefined

  const year =
    typeof raw.year === 'number'
      ? raw.year
      : yearFromReleaseDate(raw.release_date)

  const screenshots = Array.isArray(raw.screenshots)
    ? (raw.screenshots as unknown[]).filter(
        (x): x is string => typeof x === 'string',
      )
    : []

  const genres: unknown[] = Array.isArray(raw.genres)
    ? (raw.genres as unknown[])
    : []
  const platforms: unknown[] = Array.isArray(raw.platforms)
    ? (raw.platforms as unknown[])
    : []

  const offers: unknown[] = Array.isArray(raw.offers)
    ? (raw.offers as unknown[])
    : []
  let storeUrl: string | undefined
  const firstOffer = offers[0]
  if (firstOffer && typeof firstOffer === 'object') {
    const o = firstOffer as Record<string, unknown>
    if (typeof o.url === 'string') {
      storeUrl = o.url
    }
  }

  return {
    id: raw.id != null ? String(raw.id) : '',
    title: typeof raw.name === 'string' ? raw.name : '',
    year,
    image: typeof raw.image === 'string' ? raw.image : '',
    link: typeof raw.link === 'string' ? raw.link : '',
    short_description:
      typeof raw.short_description === 'string' ? raw.short_description : '',
    description: typeof raw.description === 'string' ? raw.description : '',
    release_date: typeof raw.release_date === 'string' ? raw.release_date : '',
    developer: typeof raw.developer === 'string' ? raw.developer : '',
    genre: typeof raw.genre === 'string' ? raw.genre : '',
    genres,
    platforms,
    rating_mean: mean,
    rating_count: count,
    rating_mean_players: meanPlayers,
    rating_mean_critics: meanCritics,
    screenshots: screenshots.slice(0, 16),
    gameplay: typeof raw.gameplay === 'string' ? raw.gameplay : null,
    adult_only: Boolean(raw.adult_only),
    store_url: storeUrl,
  }
}
