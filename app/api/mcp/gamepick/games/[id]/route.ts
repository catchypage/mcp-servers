import { NextRequest, NextResponse } from 'next/server'
import { pickCatalogGameDetail } from '@/utils/mcp/apps/gamepick/catalog-api'
import { getGamePickCatalogApiKey } from '@/utils/mcp/apps/gamepick/catalog-client'
import { normalizeGameDetail } from '@/utils/mcp/apps/gamepick/normalize'

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
  _req: NextRequest,
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

  const result = await pickCatalogGameDetail(id)
  if (!result.ok) {
    return NextResponse.json(
      {
        ok: false,
        status: result.status,
        error: 'GamePick detail request failed',
        body: result.data,
      },
      {
        status:
          result.status === 404
            ? 404
            : result.status >= 400
            ? result.status
            : 502,
        headers: cors,
      },
    )
  }

  if (!result.data || typeof result.data !== 'object') {
    return NextResponse.json(
      { ok: false, error: 'Empty response' },
      { status: 502, headers: cors },
    )
  }

  const game = normalizeGameDetail(result.data as Record<string, unknown>)
  return NextResponse.json({ ok: true, game }, { headers: cors })
}
