import { NextRequest, NextResponse } from 'next/server'
import {
  clampTopRatedOffset,
  isAllowedTopGenreSlug,
  pickTopRatedGames,
} from '@/utils/mcp/apps/gamepick/top-rated'
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
 * Top-rated games (Game Brain computed_rating, desc). Optional genre filter.
 * GET /api/mcp/gamepick/recommendations?genre=action&offset=0
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
  const genreRaw = sp.get('genre')?.trim() ?? ''
  const genreSlug =
    genreRaw && isAllowedTopGenreSlug(genreRaw) ? genreRaw.toLowerCase() : ''
  const offset = clampTopRatedOffset(sp.get('offset'))

  const result = await pickTopRatedGames({
    genreSlug: genreSlug || undefined,
    offset,
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
