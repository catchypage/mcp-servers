import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders })
}

export async function POST(req: NextRequest) {
  const LLM_ROUTER_BASE_URL = process.env.LLM_ROUTER_BASE_URL
  const LLM_ROUTER_BEARER_TOKEN = process.env.LLM_ROUTER_BEARER_TOKEN

  if (!LLM_ROUTER_BASE_URL || !LLM_ROUTER_BEARER_TOKEN) {
    return NextResponse.json(
      { error: 'LLM Router not configured' },
      { status: 500, headers: corsHeaders },
    )
  }

  try {
    const body = await req.json()
    const { system, user, temperature, max_output_tokens, model } = body

    const endpoint = model ? 'v1/smart' : 'v1/generatev2'
    const payload: Record<string, unknown> = {
      system,
      user,
      temperature: temperature ?? 0.3,
      max_output_tokens: max_output_tokens ?? 25000,
    }
    if (model) {
      payload.model = model
    }

    const response = await fetch(`${LLM_ROUTER_BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LLM_ROUTER_BEARER_TOKEN}`,
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('[llm-router] Upstream error:', response.status, errorText.slice(0, 500))
      return NextResponse.json(
        { error: `Upstream error: ${response.status}` },
        { status: response.status, headers: corsHeaders },
      )
    }

    const result = await response.json()
    return NextResponse.json(result, { headers: corsHeaders })
  } catch (error) {
    console.error('[llm-router] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: corsHeaders },
    )
  }
}
