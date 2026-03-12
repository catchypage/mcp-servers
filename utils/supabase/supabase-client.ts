import { Database } from '@/types_db'
import { SupabaseClient, createClient } from '@supabase/supabase-js'
import { SupabaseUser } from '../types'

// Initialize supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

// Retrieves the current authenticated user from the Supabase session.
export async function getUser(supabase: SupabaseClient<Database>) {
  const user = (await supabase.auth.getSession()).data.session?.user
  return user
}

// Performs a request to fetch a file by its URL.
export async function fetchFile(url: string) {
  try {
    const response = await fetch(`${url}?t=${String(Date.now())}`)

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    const text = await response.text()
    return text
  } catch (error) {
    console.error('Error while fetching file:', error)
    return null
  }
}

export async function getUserDetails(
  supabase: SupabaseClient<Database>,
  userId: string,
) {
  try {
    const { data: userDetails, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
    if (error) {
      console.error('Error:', error)
      return null
    }
    return userDetails[0]
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}

export async function getCallback(
  supabase: SupabaseClient<Database>,
  gpt_id: string,
) {
  try {
    const { data, error } = await supabase
      .from('v_gpt_callback')
      .select('*')
      .eq('gpt_id', gpt_id)
    if (error) {
      console.error('Error:', error)
      return null
    }
    return data[0]
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}

export async function getUserInfo(
  supabase: SupabaseClient<Database>,
  userId: string,
) {
  const { data, error } = await supabase
    .from('users')
    .select<string, SupabaseUser>('*')
    .eq('id', userId)

  if (error) {
    console.error(error)
    return null
  }

  return data[0]
}

export async function getUserActiveSubscription(
  supabase: SupabaseClient<Database>,
  userId: string,
) {
  const { data, error } = await supabase
    .from('subscriptions')
    .select(
      `
      *,
      prices (
        *,
        products(*)
      )
    `,
    )
    .eq('user_id', userId)
    .in('status', ['active', 'trialing'])
    .single()

  if (error) {
    console.error('Error fetching subscription:', error)
    return null
  }

  return data
}

// Add interface for Song type
export interface Song {
  id: string
  user_id: string
  title: string
  url: string
  created_at: string
  duration?: number
  genre?: string
  mood?: string
}

// Add getUserSongs function
export async function getUserSongs(userId: string): Promise<Song[] | null> {
  try {
    const { data: songs, error } = await supabase
      .from('songs')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error ?? !songs) {
      console.error('Error fetching songs:', error)
      return null
    }

    return songs as Song[]
  } catch (err) {
    console.error('Error in getUserSongs:', err)
    return null
  }
}
