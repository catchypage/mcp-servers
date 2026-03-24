import { NextRequest, NextResponse } from 'next/server'
import { resolveApp } from '@/utils/mcp/core/registry'
import { getWidgetHtml } from '@/utils/mcp/core/handlers'
import { getBaseUrlFromRequest } from '@/utils/mcp/getBaseUrl'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Private-Network': 'true',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders })
}

/**
 * Direct HTTP URL for the Skybridge widget HTML (same document as MCP
 * resources/read). Matches openai/outputTemplate and connector "Output
 * template" links.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ appId: string }> },
) {
  const { appId } = await params
  const app = resolveApp(appId)

  if (!app) {
    return NextResponse.json(
      { error: 'App not found', appId },
      { status: 404, headers: corsHeaders },
    )
  }

  const baseUrl = getBaseUrlFromRequest(req)
  const html = getWidgetHtml(app, baseUrl)

  return new NextResponse(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      ...corsHeaders,
    },
  })
}
