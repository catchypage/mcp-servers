import { NextRequest, NextResponse } from 'next/server'
import { verifyMcpToken, getWwwAuthenticateHeader } from '@/utils/mcp/auth'
import { getBaseUrlFromRequest } from '@/utils/mcp/getBaseUrl'
import { getToolHandlers, getWidgetHtml } from './handlers'
import type { McpAppConfig } from './registry'

const PROTOCOL_VERSION = '2024-11-05'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Private-Network': 'true',
}

interface McpRequest {
  jsonrpc: string
  id: string | number | null
  method: string
  params?: Record<string, unknown>
}

/**
 * Handle MCP JSON-RPC request for a given app.
 */
export async function handleMcpRequest(
  app: McpAppConfig,
  req: NextRequest,
  resourceUrl: string,
): Promise<NextResponse> {
  let body: McpRequest

  try {
    body = (await req.json()) as McpRequest
  } catch {
    return NextResponse.json(
      { jsonrpc: '2.0', id: null, result: {} },
      { headers: corsHeaders },
    )
  }

  const { method, params } = body

  const response = {
    jsonrpc: '2.0' as const,
    id: body.id,
  }

  switch (method) {
    case 'initialize':
      return NextResponse.json(
        {
          ...response,
          result: {
            protocolVersion: PROTOCOL_VERSION,
            capabilities: { tools: {}, resources: {}, prompts: {} },
            serverInfo: {
              name: app.name,
              version: app.version ?? '1.0.0',
            },
          },
        },
        { headers: { 'Content-Type': 'application/json', ...corsHeaders } },
      )

    case 'tools/list': {
      const allTools = [...app.tools, ...(app.internalTools ?? [])]
      return NextResponse.json(
        { ...response, result: { tools: allTools } },
        { headers: { 'Content-Type': 'application/json', ...corsHeaders } },
      )
    }

    case 'tools/call': {
      const authResult = await verifyMcpToken(req, resourceUrl)

      if (!authResult.authenticated) {
        const baseUrl = getBaseUrlFromRequest(req)
        return NextResponse.json(
          {
            ...response,
            result: {
              content: [{ type: 'text', text: 'Please sign in to continue.' }],
              _meta: {
                'mcp/www_authenticate': [
                  `Bearer resource_metadata="${baseUrl}${resourceUrl}/.well-known/oauth-protected-resource"`,
                ],
              },
              isError: true,
            },
          },
          {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              'WWW-Authenticate': getWwwAuthenticateHeader(
                resourceUrl,
                'invalid_token',
                'Sign in required',
                req,
              ),
              ...corsHeaders,
            },
          },
        )
      }

      const { name, arguments: args } = (params ?? {}) as {
        name: string
        arguments?: Record<string, unknown>
      }

      const handlers = getToolHandlers(app.id)
      const handler = handlers?.[name]

      if (!handler) {
        return NextResponse.json(
          {
            ...response,
            error: { code: -32601, message: `Unknown tool: ${name}` },
          },
          { headers: { 'Content-Type': 'application/json', ...corsHeaders } },
        )
      }

      try {
        const result = await handler(app, args ?? {}, authResult.user!.id)
        const baseUrl = getBaseUrlFromRequest(req)
        const widgetHtml = getWidgetHtml(app, baseUrl)

        return NextResponse.json(
          {
            ...response,
            result: {
              content: [
                {
                  type: 'text',
                  text: (result.message as string) ?? 'OK',
                },
              ],
              structuredContent: result,
              _meta: {
                ui: {
                  widget: {
                    mimeType: 'text/html+skybridge',
                    content: widgetHtml,
                    _meta: {
                      'openai/widgetDomain': baseUrl,
                      'openai/widgetCSP': {
                        connect_domains: [baseUrl],
                        resource_domains: [baseUrl],
                      },
                    },
                  },
                },
              },
            },
          },
          { headers: { 'Content-Type': 'application/json', ...corsHeaders } },
        )
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error)
        return NextResponse.json(
          {
            ...response,
            result: {
              content: [{ type: 'text', text: msg }],
              structuredContent: { success: false, error: msg },
              isError: true,
            },
          },
          { headers: { 'Content-Type': 'application/json', ...corsHeaders } },
        )
      }
    }

    case 'resources/list': {
      const baseUrl = getBaseUrlFromRequest(req)
      const resourceUrl = `/api/mcp/${app.id}`
      const resources = (app.resources ?? []).map((r) => ({
        ...r,
        uri: r.uri.startsWith('http')
          ? r.uri
          : `${baseUrl}${resourceUrl}/widget`,
      }))
      if (resources.length === 0 && app.widget) {
        resources.push({
          uri: `${baseUrl}${resourceUrl}/widget`,
          name: `${app.name} Widget`,
          description: app.description ?? '',
          mimeType: 'text/html+skybridge',
        })
      }
      return NextResponse.json(
        { ...response, result: { resources } },
        { headers: { 'Content-Type': 'application/json', ...corsHeaders } },
      )
    }

    case 'resources/read': {
      const { uri } = (params ?? {}) as { uri: string }
      const baseUrl = getBaseUrlFromRequest(req)
      const expectedUri = `${baseUrl}/api/mcp/${app.id}/widget`
      const matches = uri?.includes(app.id) || uri === expectedUri

      if (!matches && !uri?.includes('/widget')) {
        return NextResponse.json(
          {
            ...response,
            error: { code: -32602, message: `Resource not found: ${uri}` },
          },
          { headers: { 'Content-Type': 'application/json', ...corsHeaders } },
        )
      }
      const widgetHtml = getWidgetHtml(app, baseUrl)
      return NextResponse.json(
        {
          ...response,
          result: {
            contents: [
              {
                uri: uri ?? expectedUri,
                mimeType: 'text/html+skybridge',
                text: widgetHtml,
                _meta: {
                  'openai/widgetDomain': baseUrl,
                  'openai/widgetCSP': {
                    connect_domains: [baseUrl],
                    resource_domains: [baseUrl],
                  },
                },
              },
            ],
          },
        },
        { headers: { 'Content-Type': 'application/json', ...corsHeaders } },
      )
    }

    case 'notifications/initialized':
    case 'notifications/list_changed':
      return NextResponse.json(
        { ...response, result: {} },
        { headers: corsHeaders },
      )

    default:
      return NextResponse.json(
        {
          ...response,
          error: { code: -32601, message: `Method not found: ${method}` },
        },
        { headers: { 'Content-Type': 'application/json', ...corsHeaders } },
      )
  }
}
