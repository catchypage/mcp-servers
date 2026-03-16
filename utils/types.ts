import type { Database } from '@/types_db'

/**
 * Supabase users table row type.
 * Used for user data from the public.users table.
 */
export type SupabaseUser = Database['public']['Tables']['users']['Row']
