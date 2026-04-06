const TMDB_BASE = 'https://api.themoviedb.org/3'
const TMDB_IMAGE = 'https://image.tmdb.org/t/p/w500'

export type MediaScope = 'movie' | 'tv' | 'both'

function getApiKey(): string {
  return process.env.TMDB_KEY ?? ''
}

function posterUrl(path: string | null): string {
  if (!path) {
    return ''
  }
  return `${TMDB_IMAGE}${path}`
}

async function tmdbGet<T>(
  path: string,
  params: Record<string, string> = {},
): Promise<T | null> {
  const key = getApiKey()
  if (!key) {
    return null
  }
  const q = new URLSearchParams({ api_key: key, ...params })
  try {
    const res = await fetch(`${TMDB_BASE}${path}?${q.toString()}`)
    if (!res.ok) {
      return null
    }
    return (await res.json()) as T
  } catch {
    return null
  }
}

export interface MoviePickSearchHit {
  id: string
  kind: 'movie' | 'tv'
  title: string
  year: string
  poster: string
  /** TMDB ids; server-side filtering only, stripped in API responses */
  genreIds?: number[]
}

export interface SearchTmdbFilterOptions {
  genreIds?: number[]
  /** Exact release / first-air year */
  year?: number
  yearGte?: number
  yearLte?: number
}

export interface MoviePickDetail {
  id: string
  kind: 'movie' | 'tv'
  title: string
  release_year: number
  runtime_minutes: number
  rating: number
  vote_count: number
  genres: string[]
  plot: string
  poster_url: string
  imdb_id: string
  credits?: { name: string; role: string }[]
}

interface TmdbMovieList {
  page?: number
  total_pages?: number
  total_results?: number
  results?: {
    id: number
    title?: string
    name?: string
    release_date?: string
    first_air_date?: string
    poster_path?: string | null
    vote_average?: number
    genre_ids?: number[]
    /** Present on /search/multi results */
    media_type?: string
  }[]
}

interface TmdbMovieDetail {
  id: number
  title: string
  overview: string
  poster_path: string | null
  release_date: string
  runtime: number
  vote_average: number
  vote_count: number
  genres?: { id: number; name: string }[]
  imdb_id?: string | null
  external_ids?: { imdb_id?: string | null }
  credits?: {
    cast?: { name: string; character: string }[]
    crew?: { name: string; job: string }[]
  }
}

interface TmdbTvDetail {
  id: number
  name: string
  overview: string
  poster_path: string | null
  first_air_date: string
  episode_run_time?: number[]
  vote_average: number
  vote_count: number
  genres?: { id: number; name: string }[]
  external_ids?: { imdb_id?: string | null }
  credits?: {
    cast?: { name: string; character: string }[]
  }
}

function yearFromDate(d: string | undefined): string {
  if (!d || d.length < 4) {
    return ''
  }
  return d.slice(0, 4)
}

function releaseYear(d: string | undefined): number {
  const y = parseInt(yearFromDate(d) || '0', 10)
  return Number.isFinite(y) ? y : 0
}

function hitMovie(r: {
  id: number
  title?: string
  release_date?: string
  poster_path?: string | null
  genre_ids?: number[]
}): MoviePickSearchHit {
  return {
    id: String(r.id),
    kind: 'movie',
    title: r.title ?? '',
    year: yearFromDate(r.release_date),
    poster: posterUrl(r.poster_path ?? null),
    genreIds: Array.isArray(r.genre_ids) ? r.genre_ids : [],
  }
}

function hitTv(r: {
  id: number
  name?: string
  first_air_date?: string
  poster_path?: string | null
  genre_ids?: number[]
}): MoviePickSearchHit {
  return {
    id: String(r.id),
    kind: 'tv',
    title: r.name ?? '',
    year: yearFromDate(r.first_air_date),
    poster: posterUrl(r.poster_path ?? null),
    genreIds: Array.isArray(r.genre_ids) ? r.genre_ids : [],
  }
}

const TMDB_SEARCH_PAGE_SIZE = 20
const TMDB_SEARCH_MAX_SCAN_PAGES = 40

function stripSearchHitForClient(h: MoviePickSearchHit): MoviePickSearchHit {
  return {
    id: h.id,
    kind: h.kind,
    title: h.title,
    year: h.year,
    poster: h.poster,
  }
}

function searchNeedsPostFilter(filters: SearchTmdbFilterOptions): boolean {
  if (filters.genreIds && filters.genreIds.length > 0) {
    return true
  }
  if (filters.year != null && filters.year > 1900 && filters.year < 2100) {
    return false
  }
  const gte = filters.yearGte
  const lte = filters.yearLte
  if (gte != null && lte != null && gte !== lte) {
    return true
  }
  if (gte != null && lte == null) {
    return true
  }
  if (gte == null && lte != null) {
    return true
  }
  return false
}

function tmdbSingleYearParam(
  filters: SearchTmdbFilterOptions,
): number | undefined {
  if (filters.year != null && filters.year > 1900 && filters.year < 2100) {
    return filters.year
  }
  if (
    filters.yearGte != null &&
    filters.yearLte != null &&
    filters.yearGte === filters.yearLte &&
    filters.yearGte > 1900 &&
    filters.yearGte < 2100
  ) {
    return filters.yearGte
  }
  return undefined
}

function hitMatchesSearchFilters(
  h: MoviePickSearchHit,
  filters: SearchTmdbFilterOptions,
): boolean {
  if (filters.genreIds && filters.genreIds.length > 0) {
    const ids = h.genreIds ?? []
    if (!filters.genreIds.every((id) => ids.includes(id))) {
      return false
    }
  }
  const y = parseInt(h.year, 10)
  if (filters.year != null && filters.year > 1900 && filters.year < 2100) {
    return Number.isFinite(y) && y === filters.year
  }
  if (filters.yearGte != null && filters.yearGte > 1900 && filters.yearGte < 2100) {
    if (!Number.isFinite(y) || y < filters.yearGte) {
      return false
    }
  }
  if (filters.yearLte != null && filters.yearLte > 1900 && filters.yearLte < 2100) {
    if (!Number.isFinite(y) || y > filters.yearLte) {
      return false
    }
  }
  return true
}

async function fetchSearchPageInternal(
  scope: MediaScope,
  query: string,
  apiPage: number,
  tmdbYear?: number,
): Promise<{ results: MoviePickSearchHit[]; totalPages: number }> {
  if (scope === 'movie') {
    return searchTmdbMovies(query, apiPage, tmdbYear)
  }
  if (scope === 'tv') {
    return searchTmdbTvShows(query, apiPage, tmdbYear)
  }
  return searchTmdbMulti(query, apiPage, tmdbYear)
}

export async function searchTmdbMovies(
  query: string,
  page = 1,
  primaryReleaseYear?: number,
): Promise<{ results: MoviePickSearchHit[]; totalPages: number }> {
  const params: Record<string, string> = {
    query,
    page: String(page),
    include_adult: 'false',
  }
  if (primaryReleaseYear && primaryReleaseYear > 0) {
    params.primary_release_year = String(primaryReleaseYear)
  }
  const json = await tmdbGet<TmdbMovieList>('/search/movie', params)
  if (!json?.results) {
    return { results: [], totalPages: 0 }
  }
  const totalPages = Math.min(json.total_pages ?? 1, 500)
  return {
    totalPages,
    results: json.results.map((r) => hitMovie(r)),
  }
}

export async function searchTmdbTvShows(
  query: string,
  page = 1,
  firstAirYear?: number,
): Promise<{ results: MoviePickSearchHit[]; totalPages: number }> {
  const params: Record<string, string> = {
    query,
    page: String(page),
    include_adult: 'false',
  }
  if (firstAirYear && firstAirYear > 0) {
    params.first_air_date_year = String(firstAirYear)
  }
  const json = await tmdbGet<TmdbMovieList>('/search/tv', params)
  if (!json?.results) {
    return { results: [], totalPages: 0 }
  }
  const totalPages = Math.min(json.total_pages ?? 1, 500)
  return {
    totalPages,
    results: json.results.map((r) => hitTv(r)),
  }
}

export async function searchTmdbMulti(
  query: string,
  page = 1,
  yearFilter?: number,
): Promise<{ results: MoviePickSearchHit[]; totalPages: number }> {
  const json = await tmdbGet<TmdbMovieList>('/search/multi', {
    query,
    page: String(page),
    include_adult: 'false',
  })
  if (!json?.results) {
    return { results: [], totalPages: 0 }
  }
  const totalPages = Math.min(json.total_pages ?? 1, 500)
  const hits: MoviePickSearchHit[] = []
  for (const r of json.results) {
    const mt = r.media_type
    if (mt === 'movie' && r.title !== undefined) {
      const h = hitMovie({
        id: r.id,
        title: r.title,
        release_date: r.release_date,
        poster_path: r.poster_path ?? null,
        genre_ids: r.genre_ids,
      })
      if (!yearFilter || !h.year || parseInt(h.year, 10) === yearFilter) {
        hits.push(h)
      }
    } else if (mt === 'tv' && r.name !== undefined) {
      const h = hitTv({
        id: r.id,
        name: r.name,
        first_air_date: r.first_air_date,
        poster_path: r.poster_path ?? null,
        genre_ids: r.genre_ids,
      })
      if (!yearFilter || !h.year || parseInt(h.year, 10) === yearFilter) {
        hits.push(h)
      }
    }
  }
  return { results: hits, totalPages }
}

export async function searchTmdbWithFilters(
  scope: MediaScope,
  query: string,
  clientPage: number,
  filters: SearchTmdbFilterOptions,
): Promise<{ results: MoviePickSearchHit[]; totalPages: number }> {
  const post = searchNeedsPostFilter(filters)
  const ty = tmdbSingleYearParam(filters)

  if (!post) {
    const batch = await fetchSearchPageInternal(scope, query, clientPage, ty)
    return {
      results: batch.results.map(stripSearchHitForClient),
      totalPages: batch.totalPages,
    }
  }

  const acc: MoviePickSearchHit[] = []
  let apiPage = 1
  const targetEnd = clientPage * TMDB_SEARCH_PAGE_SIZE

  while (apiPage <= TMDB_SEARCH_MAX_SCAN_PAGES && acc.length < targetEnd) {
    const batch = await fetchSearchPageInternal(scope, query, apiPage, ty)
    for (const h of batch.results) {
      if (hitMatchesSearchFilters(h, filters)) {
        acc.push(h)
      }
    }
    if (apiPage >= batch.totalPages) {
      break
    }
    apiPage += 1
  }

  const targetStart = (clientPage - 1) * TMDB_SEARCH_PAGE_SIZE
  const pageSlice = acc.slice(targetStart, targetEnd)

  let totalPagesOut: number
  if (pageSlice.length === 0) {
    totalPagesOut = clientPage <= 1 ? 1 : clientPage - 1
  } else if (pageSlice.length < TMDB_SEARCH_PAGE_SIZE) {
    totalPagesOut = clientPage
  } else {
    totalPagesOut = Math.min(500, clientPage + 1)
  }

  return {
    results: pageSlice.map(stripSearchHitForClient),
    totalPages: Math.max(1, totalPagesOut),
  }
}

export async function searchTmdb(
  scope: MediaScope,
  query: string,
  page: number,
  year?: number,
): Promise<{ results: MoviePickSearchHit[]; totalPages: number }> {
  return searchTmdbWithFilters(scope, query, page, {
    year: year && year > 1900 && year < 2100 ? year : undefined,
  })
}

export async function getTmdbMovieDetail(
  movieId: string,
): Promise<MoviePickDetail | null> {
  const json = await tmdbGet<TmdbMovieDetail>(
    `/movie/${encodeURIComponent(movieId)}`,
    {
      append_to_response: 'credits,external_ids',
    },
  )
  if (!json?.id) {
    return null
  }
  const extImdb = json.external_ids?.imdb_id
  const imdb = extImdb && extImdb.length > 0 ? extImdb : json.imdb_id ?? ''

  const cast = (json.credits?.cast ?? []).slice(0, 10).map((c) => ({
    name: c.name,
    role: c.character || 'Actor',
  }))

  return {
    id: String(json.id),
    kind: 'movie',
    title: json.title,
    release_year: releaseYear(json.release_date),
    runtime_minutes: json.runtime ?? 0,
    rating: json.vote_average ?? 0,
    vote_count: json.vote_count ?? 0,
    genres: (json.genres ?? []).map((g) => g.name),
    plot: json.overview ?? '',
    poster_url: posterUrl(json.poster_path),
    imdb_id: imdb ?? '',
    credits: cast,
  }
}

export async function getTmdbTvDetail(
  tvId: string,
): Promise<MoviePickDetail | null> {
  const json = await tmdbGet<TmdbTvDetail>(`/tv/${encodeURIComponent(tvId)}`, {
    append_to_response: 'credits,external_ids',
  })
  if (!json?.id) {
    return null
  }
  const extImdb = json.external_ids?.imdb_id
  const imdb = extImdb && extImdb.length > 0 ? extImdb : ''

  const cast = (json.credits?.cast ?? []).slice(0, 10).map((c) => ({
    name: c.name,
    role: c.character || 'Actor',
  }))

  const ep = json.episode_run_time ?? []
  const runtime =
    ep.length > 0 ? Math.round(ep.reduce((a, b) => a + b, 0) / ep.length) : 0

  return {
    id: String(json.id),
    kind: 'tv',
    title: json.name,
    release_year: releaseYear(json.first_air_date),
    runtime_minutes: runtime,
    rating: json.vote_average ?? 0,
    vote_count: json.vote_count ?? 0,
    genres: (json.genres ?? []).map((g) => g.name),
    plot: json.overview ?? '',
    poster_url: posterUrl(json.poster_path),
    imdb_id: imdb ?? '',
    credits: cast,
  }
}

export async function getTmdbDetail(
  kind: 'movie' | 'tv',
  id: string,
): Promise<MoviePickDetail | null> {
  if (kind === 'tv') {
    return getTmdbTvDetail(id)
  }
  return getTmdbMovieDetail(id)
}

export interface TmdbGenre {
  id: number
  name: string
}

export async function getTmdbMovieGenres(): Promise<TmdbGenre[]> {
  const json = await tmdbGet<{ genres?: TmdbGenre[] }>('/genre/movie/list', {
    language: 'en-US',
  })
  return json?.genres ?? []
}

export async function getTmdbTvGenres(): Promise<TmdbGenre[]> {
  const json = await tmdbGet<{ genres?: TmdbGenre[] }>('/genre/tv/list', {
    language: 'en-US',
  })
  return json?.genres ?? []
}

export async function getTmdbGenresForScope(
  scope: MediaScope,
): Promise<TmdbGenre[]> {
  if (scope === 'movie') {
    return getTmdbMovieGenres()
  }
  if (scope === 'tv') {
    return getTmdbTvGenres()
  }
  const [m, t] = await Promise.all([getTmdbMovieGenres(), getTmdbTvGenres()])
  const map = new Map<number, string>()
  for (const g of m) {
    map.set(g.id, g.name)
  }
  for (const g of t) {
    if (!map.has(g.id)) {
      map.set(g.id, g.name)
    }
  }
  const combined: TmdbGenre[] = Array.from(map.entries()).map(([id, name]) => ({
    id,
    name,
  }))
  combined.sort((a, b) => a.name.localeCompare(b.name))
  return combined
}

function pickRandom<T>(arr: T[]): T | undefined {
  if (arr.length === 0) {
    return undefined
  }
  return arr[Math.floor(Math.random() * arr.length)]
}

function pickDiscoverYear(opts: {
  year?: number
  years?: number[]
  yearFrom?: number
  yearTo?: number
}): number | undefined {
  if (opts.years && opts.years.length > 0) {
    const picked = pickRandom(opts.years.filter((n) => n > 1900 && n < 2100))
    if (picked !== undefined) {
      return picked
    }
  }
  if (opts.year != null && opts.year > 1900 && opts.year < 2100) {
    return opts.year
  }
  if (
    opts.yearFrom != null &&
    opts.yearTo != null &&
    opts.yearFrom > 1900 &&
    opts.yearTo < 2100
  ) {
    const lo = Math.min(opts.yearFrom, opts.yearTo)
    const hi = Math.max(opts.yearFrom, opts.yearTo)
    if (lo <= hi) {
      return lo + Math.floor(Math.random() * (hi - lo + 1))
    }
  }
  return undefined
}

async function discoverRandomFromList(
  path: '/discover/movie' | '/discover/tv',
  baseParams: Record<string, string>,
): Promise<{ id: number } | null> {
  const first = await tmdbGet<TmdbMovieList>(path, {
    ...baseParams,
    page: '1',
  })
  if (!first?.results?.length) {
    return null
  }
  const totalPages = Math.min(first.total_pages ?? 1, 500)
  const randomPage =
    totalPages > 0 ? Math.floor(Math.random() * totalPages) + 1 : 1

  let pageResults = first.results
  if (randomPage !== 1) {
    const pageJson = await tmdbGet<TmdbMovieList>(path, {
      ...baseParams,
      page: String(randomPage),
    })
    if (pageJson?.results?.length) {
      pageResults = pageJson.results
    }
  }
  const pick = pickRandom(pageResults)
  return pick?.id ? { id: pick.id } : null
}

export async function discoverRandomTitle(opts: {
  media: MediaScope
  genreIds?: number[]
  year?: number
  years?: number[]
  yearFrom?: number
  yearTo?: number
}): Promise<MoviePickDetail | null> {
  const y = pickDiscoverYear({
    year: opts.year,
    years: opts.years,
    yearFrom: opts.yearFrom,
    yearTo: opts.yearTo,
  })
  const baseParams: Record<string, string> = {
    sort_by: 'popularity.desc',
    include_adult: 'false',
  }
  if (opts.genreIds && opts.genreIds.length > 0) {
    baseParams.with_genres = opts.genreIds.join(',')
  }

  const pickMovie = async (): Promise<MoviePickDetail | null> => {
    const p: Record<string, string> = { ...baseParams }
    if (y && y > 1900 && y < 2100) {
      p.primary_release_year = String(y)
    }
    const hit = await discoverRandomFromList('/discover/movie', p)
    if (!hit) {
      return null
    }
    return getTmdbMovieDetail(String(hit.id))
  }

  const pickTv = async (): Promise<MoviePickDetail | null> => {
    const p: Record<string, string> = { ...baseParams }
    if (y && y > 1900 && y < 2100) {
      p.first_air_date_year = String(y)
    }
    const hit = await discoverRandomFromList('/discover/tv', p)
    if (!hit) {
      return null
    }
    return getTmdbTvDetail(String(hit.id))
  }

  if (opts.media === 'movie') {
    return pickMovie()
  }
  if (opts.media === 'tv') {
    return pickTv()
  }

  const tryMovie = Math.random() < 0.5
  const first = tryMovie ? await pickMovie() : await pickTv()
  if (first) {
    return first
  }
  return tryMovie ? pickTv() : pickMovie()
}

/** @deprecated use discoverRandomTitle */
export async function discoverRandomMovie(opts: {
  genreIds?: number[]
  year?: number
  years?: number[]
}): Promise<MoviePickDetail | null> {
  return discoverRandomTitle({ media: 'movie', ...opts })
}

export function parseGenreIds(raw: unknown): number[] {
  if (typeof raw === 'number' && Number.isFinite(raw) && raw > 0) {
    return [Math.floor(raw)]
  }
  if (Array.isArray(raw)) {
    return raw.map((x) => Number(x)).filter((n) => Number.isFinite(n) && n > 0)
  }
  if (typeof raw === 'string') {
    return raw
      .split(/[,|]/)
      .map((s) => Number(s.trim()))
      .filter((n) => Number.isFinite(n) && n > 0)
  }
  return []
}

export function parseYearsList(raw: unknown): number[] {
  if (Array.isArray(raw)) {
    return raw
      .map((x) => Number(x))
      .filter((n) => Number.isFinite(n) && n > 1900 && n < 2100)
  }
  if (typeof raw === 'string') {
    return raw
      .split(/[,;\s]+/)
      .map((s) => Number(s.trim()))
      .filter((n) => Number.isFinite(n) && n > 1900 && n < 2100)
  }
  return []
}

export function parseMediaScope(raw: unknown): MediaScope {
  const s = String(raw ?? 'movie').toLowerCase()
  if (s === 'tv' || s === 'series' || s === 'show') {
    return 'tv'
  }
  if (s === 'both' || s === 'all' || s === 'mixed') {
    return 'both'
  }
  return 'movie'
}
