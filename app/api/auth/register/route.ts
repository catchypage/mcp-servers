import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/utils/supabase/supabase-admin'
import { v4 as uuidv4 } from 'uuid'

import bcrypt from 'bcryptjs'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_PASSWORD_LENGTH = 6

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string
      password?: string
      name?: string
    }

    const email = body.email?.trim().toLowerCase()
    const password = body.password
    const name = body.name?.trim() ?? null

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 },
      )
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 },
      )
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      return NextResponse.json(
        {
          error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
        },
        { status: 400 },
      )
    }

    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', email)
      .single()

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 },
      )
    }

    const passwordHash = await bcrypt.hash(password, 12)
    const newUserId = uuidv4()
    const authId = `credentials_${uuidv4()}`

    const { error } = await supabaseAdmin.from('users').insert({
      id: newUserId,
      email,
      full_name: name,
      auth_id: authId,
      password_hash: passwordHash,
      consent_status: 'consented',
    })

    if (error) {
      console.error('Registration error:', error)
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 },
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Registration error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
