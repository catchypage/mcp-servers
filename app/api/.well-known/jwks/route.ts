import { NextResponse } from 'next/server'

/**
 * JSON Web Key Set (JWKS) Endpoint
 *
 * For HS256 (symmetric), we don't expose the key.
 * This endpoint exists for OIDC compliance.
 * If using RS256, you'd expose public keys here.
 */
export async function GET() {
  // Empty JWKS - we use HS256 symmetric signing
  // The actual secret is never exposed
  const jwks = {
    keys: [],
  }

  return NextResponse.json(jwks, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
