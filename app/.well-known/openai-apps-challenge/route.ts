import { NextRequest, NextResponse } from 'next/server'

function buildDomainTokens(): Record<string, string> {
  const map: Record<string, string> = {
    'justmatch.us': 'a3trmgdg65ZJ61_6rfqQFKCWSeq0frXC3_HJA4guHOI',
    'mvp.mom': 'JCMzsJo41AsiT5UepUoZTCT5fq4zEy04iBOe4X3b2YU',
    'cuto.pro': 'yFMNh0nbCi10qpFEMioCCYY37ajddfpgrqarRlGOOgw',
    'nuova.pro': 'hTCQrAewQUaziujgOESJNF_5dmwgalvnObGg0AviO64',
    'www.nuova.pro': 'hTCQrAewQUaziujgOESJNF_5dmwgalvnObGg0AviO64',
  }
  const haos = process.env.HAOS_PRO_OPENAI_APPS_CHALLENGE_TOKEN?.trim()
  if (haos) {
    map['haos.pro'] = haos
    map['www.haos.pro'] = haos
  }
  return map
}

const DEFAULT_TOKEN =
  'a3trmgdg65ZJ61_6rfqQFKCWSeq0frXC3_HJA4guHOI'

/**
 * OpenAI ChatGPT Apps — domain verification (Dashboard).
 * GET /.well-known/openai-apps-challenge must return the token as plain text only.
 * Each domain gets its own verification token.
 *
 * GamePick (haos.pro): set HAOS_PRO_OPENAI_APPS_CHALLENGE_TOKEN in env (token from OpenAI Apps dashboard).
 */
export async function GET(req: NextRequest) {
  const host = (
    req.headers.get('x-forwarded-host') ??
    req.headers.get('host') ??
    ''
  )
    .toLowerCase()
    .replace(/:\d+$/, '')

  const domainTokens = buildDomainTokens()
  const token = domainTokens[host] ?? DEFAULT_TOKEN

  return new NextResponse(token, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}
