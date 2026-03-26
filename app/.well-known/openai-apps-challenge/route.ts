import { NextResponse } from 'next/server'

/**
 * OpenAI ChatGPT Apps — domain verification (Dashboard).
 * GET /.well-known/openai-apps-challenge must return the token as plain text only.
 */
export async function GET() {
  const token = 'a3trmgdg65ZJ61_6rfqQFKCWSeq0frXC3_HJA4guHOI'

  return new NextResponse(token, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}
