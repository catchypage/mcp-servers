import { NextRequest, NextResponse } from 'next/server'
import {
  searchTmdbWithFilters,
  getTmdbDetail,
  getTmdbGenresForScope,
  discoverRandomTitle,
  type MediaScope,
} from '@/utils/mcp/apps/moviepick/api-clients'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: cors })
}

function parseIntParam(v: string | null): number | undefined {
  if (!v) {
    return undefined
  }
  const n = parseInt(v, 10)
  return Number.isFinite(n) ? n : undefined
}

function parseYearListParam(v: string | null): number[] {
  if (!v?.trim()) {
    return []
  }
  return v
    .split(/[,;\s]+/)
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => n > 1900 && n < 2100)
}

function parseGenreParam(v: string | null): number[] {
  if (!v?.trim()) {
    return []
  }
  return v
    .split(',')
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => Number.isFinite(n) && n > 0)
}

function parseScope(v: string | null): MediaScope {
  const s = (v ?? 'movie').toLowerCase()
  if (s === 'tv') {
    return 'tv'
  }
  if (s === 'both') {
    return 'both'
  }
  return 'movie'
}

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams

  try {
    if (sp.get('genres') === '1') {
      const scope = parseScope(sp.get('scope'))
      const genres = await getTmdbGenresForScope(scope)
      return NextResponse.json({ ok: true, genres }, { headers: cors })
    }

    const id = sp.get('id')?.trim() ?? ''
    if (id) {
      const kind = sp.get('kind') === 'tv' ? 'tv' : 'movie'
      const detail = await getTmdbDetail(kind, id)
      if (detail) {
        return NextResponse.json({ ok: true, movie: detail }, { headers: cors })
      }
      return NextResponse.json(
        { ok: false, error: 'Not found' },
        { status: 404, headers: cors },
      )
    }

    if (sp.get('random') === '1') {
      const genreIds = parseGenreParam(sp.get('with_genres'))
      const years = parseYearListParam(sp.get('years'))
      const year = parseIntParam(sp.get('year'))
      const yearFrom = parseIntParam(sp.get('year_from'))
      const yearTo = parseIntParam(sp.get('year_to'))
      const media = parseScope(sp.get('media'))
      const detail = await discoverRandomTitle({
        media,
        genreIds,
        years: years.length > 0 ? years : undefined,
        year: years.length > 0 ? undefined : year,
        yearFrom:
          years.length > 0 || year != null ? undefined : yearFrom ?? undefined,
        yearTo:
          years.length > 0 || year != null ? undefined : yearTo ?? undefined,
      })
      if (detail) {
        return NextResponse.json({ ok: true, movie: detail }, { headers: cors })
      }
      return NextResponse.json(
        { ok: false, error: 'No title matched those filters' },
        { status: 404, headers: cors },
      )
    }

    const q = sp.get('q')?.trim() ?? ''
    if (!q) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Provide ?q=, ?id=, ?random=1, or ?genres=1',
        },
        { status: 400, headers: cors },
      )
    }

    const page = parseIntParam(sp.get('page')) ?? 1
    const legacyYear = parseIntParam(sp.get('year'))
    const yf = parseIntParam(sp.get('year_from'))
    const yt = parseIntParam(sp.get('year_to'))
    const genreIds = parseGenreParam(sp.get('with_genres'))
    const scope = parseScope(sp.get('scope'))

    const filters: {
      genreIds?: number[]
      year?: number
      yearGte?: number
      yearLte?: number
    } = {}
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
      scope,
      q,
      page,
      filters,
    )
    return NextResponse.json(
      { ok: true, results, page, total_pages: totalPages, scope },
      { headers: cors },
    )
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Request failed' },
      { status: 500, headers: cors },
    )
  }
}
