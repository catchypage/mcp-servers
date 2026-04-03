import { NextRequest, NextResponse } from 'next/server'
import type { ResumeData } from '@/components/mcp/resume/types'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

interface StoredEntry {
  data: ResumeData
  styleId: string
  createdAt: number
}

const TOKEN_TTL_MS = 15 * 60 * 1000 // 15 min
const store = new Map<string, StoredEntry>()

function generateToken(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'
  let token = ''
  for (let i = 0; i < 12; i++) {
    token += chars[Math.floor(Math.random() * chars.length)]
  }
  return token
}

function evictExpired() {
  const now = Date.now()
  for (const [key, entry] of store) {
    if (now - entry.createdAt > TOKEN_TTL_MS) {
      store.delete(key)
    }
  }
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders })
}

/**
 * POST — store resume data, return short-lived token.
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      data?: ResumeData
      styleId?: string
    }

    if (!body.data) {
      return NextResponse.json(
        { error: 'Missing resume data' },
        { status: 400, headers: corsHeaders },
      )
    }

    evictExpired()

    const token = generateToken()
    store.set(token, {
      data: body.data,
      styleId: body.styleId ?? 'modern',
      createdAt: Date.now(),
    })

    return NextResponse.json({ id: token }, { headers: corsHeaders })
  } catch {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400, headers: corsHeaders },
    )
  }
}

/**
 * GET — retrieve resume data by token (single use).
 */
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')

  if (!id) {
    return NextResponse.json(
      { error: 'Missing id' },
      { status: 400, headers: corsHeaders },
    )
  }

  evictExpired()

  const entry = store.get(id)
  if (!entry) {
    return NextResponse.json(
      { error: 'Token expired or not found' },
      { status: 404, headers: corsHeaders },
    )
  }

  store.delete(id)

  return NextResponse.json(
    { data: entry.data, styleId: entry.styleId },
    { headers: corsHeaders },
  )
}
