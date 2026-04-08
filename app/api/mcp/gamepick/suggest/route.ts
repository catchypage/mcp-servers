import { NextRequest, NextResponse } from 'next/server'
import { pickCatalogSuggestGames } from '@/utils/mcp/apps/gamepick/catalog-api'
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

  const q = req.nextUrl.searchParams.get('q')?.trim() ?? ''
  if (!q) {
    return NextResponse.json(
      { ok: false, error: 'Missing ?q=' },
      { status: 400, headers: cors },
    )
  }

  const limitRaw = req.nextUrl.searchParams.get('limit')
  const limit = limitRaw
    ? Math.min(10, Math.max(1, parseInt(limitRaw, 10) || 10))
    : 10

  const result = await pickCatalogSuggestGames(q, limit)
  if (!result.ok) {
    return NextResponse.json(
      {
        ok: false,
        status: result.status,
        error: 'GamePick suggest request failed',
        body: result.data,
      },
      { status: result.status >= 400 ? result.status : 502, headers: cors },
    )
  }

  return NextResponse.json({ ok: true, data: result.data }, { headers: cors })
}
