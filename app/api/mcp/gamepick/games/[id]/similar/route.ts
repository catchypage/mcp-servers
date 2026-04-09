import { NextRequest, NextResponse } from 'next/server'
import { pickCatalogSimilarGames } from '@/utils/mcp/apps/gamepick/catalog-api'
import { getGamePickCatalogApiKey } from '@/utils/mcp/apps/gamepick/catalog-client'
import { normalizeSearchHit } from '@/utils/mcp/apps/gamepick/normalize'

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

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!getGamePickCatalogApiKey()) {
    return NextResponse.json(
      {
        ok: false,
        error: 'GamePick is not configured: set GAMEPICK_API_KEY on the server',
      },
      { status: 503, headers: cors },
    )
  }

  const { id: idParam } = await params
  const id = parseInt(idParam, 10)
  if (!Number.isFinite(id) || id <= 0) {
    return NextResponse.json(
      { ok: false, error: 'Invalid id' },
      { status: 400, headers: cors },
    )
  }

  const limitRaw = req.nextUrl.searchParams.get('limit')
  const limit = limitRaw
    ? Math.min(10, Math.max(1, parseInt(limitRaw, 10) || 10))
    : 10

  const result = await pickCatalogSimilarGames(id, limit)
  if (!result.ok) {
    return NextResponse.json(
      {
        ok: false,
        status: result.status,
        error: 'GamePick similar games request failed',
        body: result.data,
      },
      { status: result.status >= 400 ? result.status : 502, headers: cors },
    )
  }

  const data = result.data as Record<string, unknown>
  const rawResults = Array.isArray(data.results) ? data.results : []
  const results: Record<string, unknown>[] = []
  for (const el of rawResults) {
    if (el && typeof el === 'object') {
      results.push(normalizeSearchHit(el as Record<string, unknown>))
    }
  }

  return NextResponse.json({ ok: true, results }, { headers: cors })
}
