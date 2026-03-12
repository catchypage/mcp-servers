import { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { supabaseAdmin } from '@/utils/supabase/admin'
import { SupabaseUser } from '@/utils/types'

type VerifyUserResult =
  | { error: { message: string; status: number } }
  | { user: SupabaseUser }

export async function verifyUser(req: NextRequest): Promise<VerifyUserResult> {
  const token = await getToken({ req })

  if (!token?.sub) {
    return { error: { message: 'Unauthorized', status: 401 } }
  }
  console.log('🔍 Verifying user with token:', token.sub)

  const { data: user, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('auth_id', token.sub)
    .single()

  //console.log('🔍 User data:', user)

  if (error ?? !user) {
    return { error: { message: 'User not found', status: 404 } }
  }

  return { user }
}
