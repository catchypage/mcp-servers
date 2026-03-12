import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/utils/auth/auth-options'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        {
          valid: false,
          error: 'No session found',
        },
        { status: 401 },
      )
    }

    return NextResponse.json({
      valid: true,
      session: {
        user: session.user,
        expires: session.expires,
      },
    })
  } catch (error) {
    console.error('Session check error:', error)
    return NextResponse.json(
      {
        valid: false,
        error: 'Internal server error',
      },
      { status: 500 },
    )
  }
}

export async function POST() {
  try {
    // Этот endpoint может использоваться для принудительного обновления сессии
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        {
          refreshed: false,
          error: 'No session to refresh',
        },
        { status: 401 },
      )
    }

    return NextResponse.json({
      refreshed: true,
      session: {
        user: session.user,
        expires: session.expires,
      },
    })
  } catch (error) {
    console.error('Session refresh error:', error)
    return NextResponse.json(
      {
        refreshed: false,
        error: 'Internal server error',
      },
      { status: 500 },
    )
  }
}
