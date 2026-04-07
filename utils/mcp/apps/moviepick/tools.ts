import type { McpAppConfig, McpToolDefinition } from '@/utils/mcp/core/registry'
import {
  searchTmdbWithFilters,
  getTmdbDetail,
  discoverRandomTitle,
  parseGenreIds,
  parseYearsList,
  parseMediaScope,
  type SearchTmdbFilterOptions,
  type MediaScope,
} from './api-clients'

const SLIDER_YEAR_MIN = 1950
const SLIDER_YEAR_MAX = 2032

function isRandomTrue(v: unknown): boolean {
  if (v === true || v === 1) {
    return true
  }
  if (typeof v === 'string') {
    const s = v.toLowerCase().trim()
    return s === 'true' || s === '1' || s === 'yes'
  }
  return false
}

function widgetYearRangeFromArgs(args: Record<string, unknown>): {
  yearFrom: number
  yearTo: number
} {
  let yearFrom = SLIDER_YEAR_MIN
  let yearTo = SLIDER_YEAR_MAX
  const single =
    typeof args.year === 'number' && Number.isFinite(args.year)
      ? Math.floor(args.year)
      : undefined
  const yf =
    typeof args.year_from === 'number' && Number.isFinite(args.year_from)
      ? Math.floor(args.year_from)
      : undefined
  const yt =
    typeof args.year_to === 'number' && Number.isFinite(args.year_to)
      ? Math.floor(args.year_to)
      : undefined
  if (single != null && single > 1900 && single < 2100) {
    yearFrom = Math.min(SLIDER_YEAR_MAX, Math.max(SLIDER_YEAR_MIN, single))
    yearTo = yearFrom
  } else {
    if (yf != null && yt != null) {
      yearFrom = Math.min(yf, yt)
      yearTo = Math.max(yf, yt)
      yearFrom = Math.min(SLIDER_YEAR_MAX, Math.max(SLIDER_YEAR_MIN, yearFrom))
      yearTo = Math.min(SLIDER_YEAR_MAX, Math.max(SLIDER_YEAR_MIN, yearTo))
    } else if (yf != null) {
      yearFrom = Math.min(SLIDER_YEAR_MAX, Math.max(SLIDER_YEAR_MIN, yf))
    } else if (yt != null) {
      yearTo = Math.min(SLIDER_YEAR_MAX, Math.max(SLIDER_YEAR_MIN, yt))
    }
  }
  return { yearFrom, yearTo }
}

function widgetPrefillFromArgs(args: Record<string, unknown>): {
  media: MediaScope
  genreIds: number[]
  yearFrom: number
  yearTo: number
} {
  const media = parseMediaScope(args.media)
  const genreIds = parseGenreIds(args.genre_ids)
  const { yearFrom, yearTo } = widgetYearRangeFromArgs(args)
  return { media, genreIds, yearFrom, yearTo }
}

const findMovieTool: McpToolDefinition = {
  name: 'find_movie',
  title: 'Find Movie',
  description:
    'MoviePick: search by title with optional genre_ids, year, or year_from/year_to range. media: movie (default), tv, or both. random=true: random title with optional genre_ids, year, years (comma-separated pool), or year_from/year_to (random year in range each request).',
  inputSchema: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'Title search. Ignored when random=true.',
      },
      year: {
        type: 'number',
        description:
          'Exact release or first-air year. Ignored if year_from/year_to are set.',
      },
      year_from: {
        type: 'number',
        description:
          'Search or random: start of year range (inclusive). Use with year_to.',
      },
      year_to: {
        type: 'number',
        description:
          'Search or random: end of year range (inclusive). Use with year_from.',
      },
      media: {
        type: 'string',
        enum: ['movie', 'tv', 'both'],
        description:
          'movie = films only, tv = TV only, both = movies and series (multi search).',
      },
      random: {
        type: 'boolean',
        description:
          'If true, returns one random title from discover with optional filters.',
      },
      genre_ids: {
        type: 'string',
        description:
          'Comma-separated genre ids (AND). Applies to search results and random discover.',
      },
      years: {
        type: 'string',
        description:
          'Random: comma-separated years; one chosen at random per request.',
      },
    },
    required: [],
  },
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    openWorldHint: true,
    idempotentHint: false,
  },
}

export const moviepickTools: McpToolDefinition[] = [findMovieTool]

export type ToolHandler = (
  app: McpAppConfig,
  args: Record<string, unknown>,
  userId: string,
) => Promise<Record<string, unknown>>

function detailPayload(
  d: Awaited<ReturnType<typeof getTmdbDetail>>,
): Record<string, unknown> | null {
  if (!d) {
    return null
  }
  return {
    success: true,
    mode: 'detail' as const,
    movie: {
      id: d.id,
      kind: d.kind,
      title: d.title,
      release_year: d.release_year,
      runtime_minutes: d.runtime_minutes,
      rating: d.rating,
      vote_count: d.vote_count,
      genres: d.genres,
      plot: d.plot,
      poster_url: d.poster_url,
      imdb_id: d.imdb_id,
      credits: (d.credits ?? []).slice(0, 10),
    },
    message: `${d.title} (${d.release_year}) — ${d.rating.toFixed(1)}/10`,
  }
}

async function handleFindMovie(
  _app: McpAppConfig,
  args: Record<string, unknown>,
): Promise<Record<string, unknown>> {
  const media = parseMediaScope(args.media)
  const prefill = widgetPrefillFromArgs(args)

  if (isRandomTrue(args.random)) {
    const genreIds = parseGenreIds(args.genre_ids)
    const years = parseYearsList(args.years)
    const singleYear =
      typeof args.year === 'number' && Number.isFinite(args.year)
        ? Math.floor(args.year)
        : undefined
    const yf =
      typeof args.year_from === 'number' && Number.isFinite(args.year_from)
        ? Math.floor(args.year_from)
        : undefined
    const yt =
      typeof args.year_to === 'number' && Number.isFinite(args.year_to)
        ? Math.floor(args.year_to)
        : undefined
    const detail = await discoverRandomTitle({
      media,
      genreIds,
      years: years.length > 0 ? years : undefined,
      year: years.length > 0 ? undefined : singleYear,
      yearFrom:
        years.length > 0 || singleYear != null ? undefined : yf ?? undefined,
      yearTo:
        years.length > 0 || singleYear != null ? undefined : yt ?? undefined,
    })
    const payload = detailPayload(detail)
    if (payload) {
      const summary = String(payload.message ?? '')
      return {
        ...payload,
        message: summary ? `Random pick: ${summary}` : summary,
        fromRandom: true,
        random: true,
        randomSnapshot: {
          media: prefill.media,
          genreIds: prefill.genreIds,
          yearFrom: prefill.yearFrom,
          yearTo: prefill.yearTo,
        },
      }
    }
    return {
      success: false,
      mode: 'random',
      random: true,
      autoPick: true,
      message:
        'No title matched random discover with those filters. Try fewer filters or different genres/years.',
      ...prefill,
    }
  }

  const query = String(args.query ?? '').trim()
  const hasFilters =
    prefill.genreIds.length > 0 ||
    prefill.yearFrom > SLIDER_YEAR_MIN ||
    prefill.yearTo < SLIDER_YEAR_MAX

  if (!query) {
    if (hasFilters) {
      return {
        success: true,
        mode: 'search',
        message:
          'MoviePick opened with your filters — enter a title to search.',
        query: '',
        media: prefill.media,
        genreIds: prefill.genreIds,
        yearFrom: prefill.yearFrom,
        yearTo: prefill.yearTo,
      }
    }
    return {
      success: true,
      mode: 'search',
      message:
        'Open MoviePick to search or use random with optional media, genres, and years.',
    }
  }

  const genreIds = parseGenreIds(args.genre_ids)
  const legacyYear =
    typeof args.year === 'number' && Number.isFinite(args.year)
      ? Math.floor(args.year)
      : undefined
  const yf =
    typeof args.year_from === 'number' && Number.isFinite(args.year_from)
      ? Math.floor(args.year_from)
      : undefined
  const yt =
    typeof args.year_to === 'number' && Number.isFinite(args.year_to)
      ? Math.floor(args.year_to)
      : undefined

  const filters: SearchTmdbFilterOptions = {}
  if (genreIds.length > 0) {
    filters.genreIds = genreIds
  }
  if (legacyYear != null && legacyYear > 1900 && legacyYear < 2100) {
    filters.year = legacyYear
  } else {
    if (yf != null && yt != null) {
      filters.yearGte = Math.min(yf, yt)
      filters.yearLte = Math.max(yf, yt)
    } else if (yf != null) {
      filters.yearGte = yf
    } else if (yt != null) {
      filters.yearLte = yt
    }
  }

  const { results, totalPages } = await searchTmdbWithFilters(
    media,
    query,
    1,
    filters,
  )
  if (results.length === 0) {
    return {
      success: false,
      mode: 'search',
      message: `No results for "${query}".`,
      query,
      media,
      genreIds: prefill.genreIds,
      yearFrom: prefill.yearFrom,
      yearTo: prefill.yearTo,
    }
  }

  if (results.length === 1) {
    const hit = results[0]
    const detail = await getTmdbDetail(hit.kind, hit.id)
    const payload = detailPayload(detail)
    if (payload) {
      return {
        ...payload,
        query,
        media,
      }
    }
  }

  const top = results[0]
  const topLine = top
    ? ` Top match: "${top.title}" (${top.year}, ${top.kind}).`
    : ''
  return {
    success: true,
    mode: 'results',
    query,
    media,
    genreIds: prefill.genreIds,
    yearFrom: prefill.yearFrom,
    yearTo: prefill.yearTo,
    results: results.map((r) => ({
      id: r.id,
      kind: r.kind,
      title: r.title,
      year: r.year,
      poster: r.poster,
    })),
    total_pages: totalPages,
    message: `Found ${results.length} result(s) on page 1 for "${query}".${topLine} Open the widget to browse or pick another title.`,
  }
}

export function getMoviepickToolHandlers(): Record<string, ToolHandler> {
  return {
    find_movie: handleFindMovie as ToolHandler,
  }
}
