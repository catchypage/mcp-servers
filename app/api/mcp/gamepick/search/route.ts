import { NextRequest, NextResponse } from 'next/server'
import { pickCatalogSearchGames } from '@/utils/mcp/apps/gamepick/catalog-api'
import { getGamePickCatalogApiKey } from '@/utils/mcp/apps/gamepick/catalog-client'

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

/**
 * GamePick search proxy (games catalog).
 * Example: GET /api/mcp/gamepick/search?q=medieval+strategy&offset=0&limit=10
 */
export async function GET(req: NextRequest) {
  if (!getGamePickCatalogApiKey()) {
    return NextResponse.json(
      {
        ok: false,
        error: 'GamePick is not configured: set GAMEPICK_API_KEY on the server',
      },
      { status: 503, headers: cors },
    )
  }

  const sp = req.nextUrl.searchParams
  const q = sp.get('q')?.trim() ?? ''
  if (!q) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Missing query: use ?q=your+search+terms',
      },
      { status: 400, headers: cors },
    )
  }

  const offset = clampInt(sp.get('offset'), 0, 1000, 0)
  const limit = clampInt(sp.get('limit'), 1, 10, 10)
  const sort = sp.get('sort')?.trim()
  const sortOrder = sp.get('sort-order')?.trim() ?? sp.get('sort_order')?.trim()
  const filters = sp.get('filters')?.trim()
  const generateFilterOptions =
    sp.get('generate-filter-options') === '1' || sp.get('filters_meta') === '1'

  const result = await pickCatalogSearchGames({
    query: q,
    offset,
    limit,
    sort: sort && sort.length > 0 ? sort : undefined,
    sortOrder: sortOrder && sortOrder.length > 0 ? sortOrder : undefined,
    filters: filters && filters.length > 0 ? filters : undefined,
    generateFilterOptions,
  })

  if (!result.ok) {
    return NextResponse.json(
      {
        ok: false,
        status: result.status,
        error: 'GamePick catalog request failed',
        body: result.data,
      },
      {
        status: result.status >= 400 ? result.status : 502,
        headers: cors,
      },
    )
  }

  return NextResponse.json({ ok: true, data: result.data }, { headers: cors })
}

function clampInt(
  raw: string | null,
  min: number,
  max: number,
  fallback: number,
): number {
  if (raw == null || raw === '') {
    return fallback
  }
  const n = parseInt(raw, 10)
  if (!Number.isFinite(n)) {
    return fallback
  }
  return Math.min(max, Math.max(min, n))
}
