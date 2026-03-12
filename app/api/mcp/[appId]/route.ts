import { NextRequest, NextResponse } from 'next/server'
import { resolveApp } from '@/utils/mcp/core/registry'
import { handleMcpRequest } from '@/utils/mcp/core/router'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Private-Network': 'true',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders })
}

export async function GET(
  _req: NextRequest,
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

  return NextResponse.json(
    {
      status: 'ok',
      server: app.name,
      version: app.version ?? '1.0.0',
      description: app.description,
      endpoints: {
        mcp: `/api/mcp/${appId}`,
        widget: `/api/mcp/${appId}/widget`,
      },
    },
    { headers: corsHeaders },
  )
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ appId: string }> },
) {
  const { appId } = await params
  const app = resolveApp(appId)

  if (!app) {
    return NextResponse.json(
      {
        jsonrpc: '2.0',
        id: null,
        error: { code: -32600, message: 'App not found' },
      },
      { status: 404, headers: corsHeaders },
    )
  }

  const resourceUrl = `/api/mcp/${appId}`
  return handleMcpRequest(app, req, resourceUrl)
}
