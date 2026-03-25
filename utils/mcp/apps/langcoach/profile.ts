import { supabaseAdmin } from '@/utils/supabase/supabase-admin'

export interface LangcoachProfile {
  user_id: string
  placement_level: string | null
  placement_score: number | null
  placement_pct: number | null
  placement_date: string | null
  ui_locale: string
  theme: 'dark' | 'light'
  created_at: string
  updated_at: string
}

export async function getOrCreateProfile(
  userId: string,
): Promise<LangcoachProfile> {
  const { data: existing } = await supabaseAdmin
    .from('langcoach_profiles')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (existing) {
    return existing as LangcoachProfile
  }

  const defaults: Omit<LangcoachProfile, 'created_at' | 'updated_at'> = {
    user_id: userId,
    placement_level: null,
    placement_score: null,
    placement_pct: null,
    placement_date: null,
    ui_locale: 'en',
    theme: 'dark',
  }

  const { data: created } = await supabaseAdmin
    .from('langcoach_profiles')
    .insert(defaults)
    .select('*')
    .single()

  return (
    (created as LangcoachProfile) ??
    ({
      ...defaults,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    } as LangcoachProfile)
  )
}

export async function updateProfile(
  userId: string,
  patch: Partial<
    Pick<
      LangcoachProfile,
      | 'placement_level'
      | 'placement_score'
      | 'placement_pct'
      | 'placement_date'
      | 'ui_locale'
      | 'theme'
    >
  >,
): Promise<void> {
  await supabaseAdmin
    .from('langcoach_profiles')
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq('user_id', userId)
}
