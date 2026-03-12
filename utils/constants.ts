// Site constants
export const SITE_NAME = 'Pyxl'

export const SITE_DOMAIN =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pyxl.pro'

// Tunnel URL for local dev (ChatGPT needs public URL for OAuth)
export const TUNNEL_URL = process.env.TUNNEL_URL ?? ''

/*
 * ORIGIN теперь всегда равен SITE_DOMAIN,
 * так как SITE_DOMAIN уже учитывает переменную окружения
 */
export const ORIGIN = SITE_DOMAIN

// Current year for horoscopes
export const CURRENT_YEAR = '2025'

// Horoscope periods
export type HoroscopePeriod =
  | 'daily'
  | 'tomorrow'
  | 'weekly'
  | 'monthly'
  | typeof CURRENT_YEAR

export const HOROSCOPE_PERIODS: HoroscopePeriod[] = [
  'daily',
  'tomorrow',
  'weekly',
  'monthly',
  CURRENT_YEAR,
]

// Valid periods for validation (same as HOROSCOPE_PERIODS)
export const VALID_PERIODS: HoroscopePeriod[] = HOROSCOPE_PERIODS
