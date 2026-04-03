import { NextRequest, NextResponse } from 'next/server'

const DOMAIN_TOKENS: Record<string, string> = {
  'justmatch.us': 'a3trmgdg65ZJ61_6rfqQFKCWSeq0frXC3_HJA4guHOI',
  'mvp.mom': 'JCMzsJo41AsiT5UepUoZTCT5fq4zEy04iBOe4X3b2YU',
  'cuto.pro': 'yFMNh0nbCi10qpFEMioCCYY37ajddfpgrqarRlGOOgw',
}

const DEFAULT_TOKEN = DOMAIN_TOKENS['justmatch.us']

/**
 * OpenAI ChatGPT Apps — domain verification (Dashboard).
 * GET /.well-known/openai-apps-challenge must return the token as plain text only.
 * Each domain gets its own verification token.
 */
export async function GET(req: NextRequest) {
  const host = (
    req.headers.get('x-forwarded-host') ??
    req.headers.get('host') ??
    ''
  )
    .toLowerCase()
    .replace(/:\d+$/, '')

  const token = DOMAIN_TOKENS[host] ?? DEFAULT_TOKEN

  return new NextResponse(token, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}
