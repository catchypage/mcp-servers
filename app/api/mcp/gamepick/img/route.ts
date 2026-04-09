import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** Upstream hosts allowed for the image proxy (catalog CDN + common Steam image hosts). */
const ALLOWED_HOSTS = [
  'img.gamebrain.co',
  'cdn.akamai.steamstatic.com',
  'shared.akamai.steamstatic.com',
  'steamcdn-a.akamaihd.net',
]

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url')

  if (!url) {
    return new NextResponse('Missing url param', { status: 400 })
  }

  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    return new NextResponse('Invalid url', { status: 400 })
  }

  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
    return new NextResponse('Invalid scheme', { status: 400 })
  }

  if (!ALLOWED_HOSTS.includes(parsed.hostname)) {
    return new NextResponse('Host not allowed', { status: 403 })
  }

  try {
    const upstream = await fetch(url, {
      headers: { Accept: 'image/*' },
    })

    if (!upstream.ok) {
      return new NextResponse('Upstream error', { status: upstream.status })
    }

    const contentType = upstream.headers.get('content-type') ?? 'image/jpeg'
    const buffer = await upstream.arrayBuffer()

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch {
    return new NextResponse('Fetch failed', { status: 502 })
  }
}
