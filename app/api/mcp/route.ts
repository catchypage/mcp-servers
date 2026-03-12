import { NextRequest, NextResponse } from 'next/server'
import { getAppIdFromHost } from '@/utils/mcp/core/domain-map'
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

/**
 * MCP route without appId - uses domain mapping.
 * resume.example.com/api/mcp → appId=resume
 * Requires MCP_DOMAIN_MAP env: resume.example.com:resume,humanize.example.com:humanize
 */
function getAppId(req: NextRequest): string | null {
  const host = req.headers.get('host') ?? req.headers.get('x-forwarded-host')
  return getAppIdFromHost(host)
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders })
}

export async function GET(req: NextRequest) {
  const appId = getAppId(req)

  if (!appId) {
    return NextResponse.json(
      {
        error: 'Domain not mapped',
        hint: 'Add MCP_DOMAIN_MAP env: yourdomain.com:appId',
        host: req.headers.get('host'),
      },
      { status: 404, headers: corsHeaders }
    )
  }

  const app = resolveApp(appId)
  if (!app) {
    return NextResponse.json(
      { error: 'App not found', appId },
      { status: 404, headers: corsHeaders }
    )
  }

  return NextResponse.json(
    {
      status: 'ok',
      server: app.name,
      version: app.version ?? '1.0.0',
      description: app.description,
      appId,
      endpoints: {
        mcp: `/api/mcp`,
        widget: `/api/mcp/${appId}/widget`,
      },
    },
    { headers: corsHeaders }
  )
}

export async function POST(req: NextRequest) {
  const appId = getAppId(req)

  if (!appId) {
    return NextResponse.json(
      {
        jsonrpc: '2.0',
        id: null,
        error: { code: -32600, message: 'Domain not mapped for MCP' },
      },
      { status: 404, headers: corsHeaders }
    )
  }

  const app = resolveApp(appId)
  if (!app) {
    return NextResponse.json(
      {
        jsonrpc: '2.0',
        id: null,
        error: { code: -32600, message: 'App not found' },
      },
      { status: 404, headers: corsHeaders }
    )
  }

  const resourceUrl = `/api/mcp`
  return handleMcpRequest(app, req, resourceUrl)
}
