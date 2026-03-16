import { NextRequest } from 'next/server'
import { auth } from '@/auth'
import { supabaseAdmin } from '@/utils/supabase/admin'
import { SupabaseUser } from '@/utils/types'

type VerifyUserResult =
  | { error: { message: string; status: number } }
  | { user: SupabaseUser }

export async function verifyUser(req: NextRequest): Promise<VerifyUserResult> {
  const session = await auth()

  if (!session?.user?.id) {
    return { error: { message: 'Unauthorized', status: 401 } }
  }

  const { data: user, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('auth_id', session.user.id)
    .single()

  if (error ?? !user) {
    return { error: { message: 'User not found', status: 404 } }
  }

  return { user }
}
