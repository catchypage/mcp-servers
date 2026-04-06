import {
  type GenreOption,
  type MediaScope,
  type MovieDetail,
  type MovieSearchItem,
  isDefaultYearRange,
} from './types'

function getBaseUrl(): string {
  const scripts = document.querySelectorAll('script[src*="moviepick.bundle"]')
  if (scripts.length > 0) {
    return new URL((scripts[0] as HTMLScriptElement).src).origin
  }
  return ''
}

async function readJson(res: Response): Promise<unknown> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- Response.json() is typed as any
  const body = await res.json()
  return body as unknown
}

function parseGenresPayload(raw: unknown): GenreOption[] {
  if (!raw || typeof raw !== 'object') {
    return [] as GenreOption[]
  }
  const o = raw as Record<string, unknown>
  if (o.ok !== true || !Array.isArray(o.genres)) {
    return [] as GenreOption[]
  }
  const out: GenreOption[] = []
  for (const el of o.genres) {
    if (el && typeof el === 'object') {
      const g = el as Record<string, unknown>
      if (typeof g.id === 'number' && typeof g.name === 'string') {
        out.push({ id: g.id, name: g.name })
      }
    }
  }
  return out
}

function parseKind(v: unknown): 'movie' | 'tv' {
  return v === 'tv' ? 'tv' : 'movie'
}

function parseSearchPayload(raw: unknown): {
  results: MovieSearchItem[]
  total_pages: number
} {
  if (!raw || typeof raw !== 'object') {
    return { results: [] as MovieSearchItem[], total_pages: 0 }
  }
  const o = raw as Record<string, unknown>
  if (o.ok !== true || !Array.isArray(o.results)) {
    return { results: [] as MovieSearchItem[], total_pages: 0 }
  }
  const results: MovieSearchItem[] = []
  for (const el of o.results) {
    if (el && typeof el === 'object') {
      const r = el as Record<string, unknown>
      if (
        typeof r.id === 'string' &&
        typeof r.title === 'string' &&
        (r.kind === 'movie' || r.kind === 'tv')
      ) {
        results.push({
          id: r.id,
          kind: r.kind,
          title: r.title,
          year: typeof r.year === 'string' ? r.year : '',
          poster: typeof r.poster === 'string' ? r.poster : '',
        })
      }
    }
  }
  const tp =
    typeof o.total_pages === 'number' && o.total_pages >= 1 ? o.total_pages : 1
  return { results, total_pages: tp }
}

function parseCredit(x: unknown): { name: string; role: string } | null {
  if (!x || typeof x !== 'object') {
    return null
  }
  const c = x as Record<string, unknown>
  if (typeof c.name !== 'string') {
    return null
  }
  const role = typeof c.role === 'string' ? c.role : ''
  return { name: c.name, role }
}

function parseMoviePayload(raw: unknown): MovieDetail | null {
  if (!raw || typeof raw !== 'object') {
    return null
  }
  const o = raw as Record<string, unknown>
  if (o.ok !== true) {
    return null
  }
  const m = o.movie
  if (!m || typeof m !== 'object') {
    return null
  }
  const r = m as Record<string, unknown>
  if (typeof r.id !== 'string' || typeof r.title !== 'string') {
    return null
  }
  let credits: { name: string; role: string }[] | undefined
  if (Array.isArray(r.credits)) {
    const list = r.credits
      .map(parseCredit)
      .filter((x): x is NonNullable<typeof x> => x !== null)
    credits = list.length > 0 ? list : undefined
  }
  return {
    id: r.id,
    kind: parseKind(r.kind),
    title: r.title,
    release_year: typeof r.release_year === 'number' ? r.release_year : 0,
    runtime_minutes:
      typeof r.runtime_minutes === 'number' ? r.runtime_minutes : 0,
    rating: typeof r.rating === 'number' ? r.rating : 0,
    vote_count: typeof r.vote_count === 'number' ? r.vote_count : 0,
    genres: (() => {
      const names: string[] = []
      if (!Array.isArray(r.genres)) {
        return names
      }
      for (const g of r.genres) {
        if (typeof g === 'string') {
          names.push(g)
        }
      }
      return names
    })(),
    plot: typeof r.plot === 'string' ? r.plot : '',
    poster_url: typeof r.poster_url === 'string' ? r.poster_url : '',
    imdb_id: typeof r.imdb_id === 'string' ? r.imdb_id : undefined,
    credits,
  }
}

export function proxyImageUrl(originalUrl: string): string {
  if (!originalUrl) {
    return ''
  }
  const base = getBaseUrl()
  return `${base}/api/mcp/moviepick/img?url=${encodeURIComponent(originalUrl)}`
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

export async function fetchMovieGenres(
  scope: MediaScope,
): Promise<GenreOption[]> {
  const base = getBaseUrl()
  try {
    const res = await fetch(
      `${base}/api/mcp/moviepick/search?genres=1&scope=${encodeURIComponent(scope)}`,
    )
    if (!res.ok) {
      return [] as GenreOption[]
    }
    const parsed = parseGenresPayload(await readJson(res))
    return parsed
  } catch {
    return [] as GenreOption[]
  }
}

export async function searchMovies(
  query: string,
  page: number,
  scope: MediaScope,
  opts?: {
    genreIds?: number[]
    yearFrom?: number
    yearTo?: number
  },
): Promise<{ results: MovieSearchItem[]; total_pages: number }> {
  const base = getBaseUrl()
  const params = new URLSearchParams({
    q: query,
    page: String(page),
    scope,
  })
  if (opts?.genreIds && opts.genreIds.length > 0) {
    params.set('with_genres', opts.genreIds.join(','))
  }
  if (
    opts?.yearFrom != null &&
    opts?.yearTo != null &&
    !isDefaultYearRange(opts.yearFrom, opts.yearTo)
  ) {
    const lo = Math.min(opts.yearFrom, opts.yearTo)
    const hi = Math.max(opts.yearFrom, opts.yearTo)
    params.set('year_from', String(lo))
    params.set('year_to', String(hi))
  }
  try {
    const res = await fetch(`${base}/api/mcp/moviepick/search?${params}`)
    if (!res.ok) {
      return { results: [] as MovieSearchItem[], total_pages: 0 }
    }
    return parseSearchPayload(await readJson(res))
  } catch {
    return { results: [] as MovieSearchItem[], total_pages: 0 }
  }
}

export async function fetchMovieDetail(
  id: string,
  kind: 'movie' | 'tv',
): Promise<MovieDetail | null> {
  const base = getBaseUrl()
  try {
    const res = await fetch(
      `${base}/api/mcp/moviepick/search?id=${encodeURIComponent(id)}&kind=${kind}`,
    )
    if (!res.ok) {
      return null
    }
    return parseMoviePayload(await readJson(res))
  } catch {
    return null
  }
}

export async function fetchRandomMovie(opts: {
  media: MediaScope
  genreIds: number[]
  yearFrom: number
  yearTo: number
}): Promise<MovieDetail | null> {
  const base = getBaseUrl()
  const params = new URLSearchParams({
    random: '1',
    media: opts.media,
  })
  if (opts.genreIds.length > 0) {
    params.set('with_genres', opts.genreIds.join(','))
  }
  if (!isDefaultYearRange(opts.yearFrom, opts.yearTo)) {
    const lo = Math.min(opts.yearFrom, opts.yearTo)
    const hi = Math.max(opts.yearFrom, opts.yearTo)
    params.set('year_from', String(lo))
    params.set('year_to', String(hi))
  }
  try {
    const res = await fetch(`${base}/api/mcp/moviepick/search?${params}`)
    if (!res.ok) {
      return null
    }
    return parseMoviePayload(await readJson(res))
  } catch {
    return null
  }
}
