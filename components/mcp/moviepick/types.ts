export type MediaScope = 'movie' | 'tv' | 'both'

/** Default full span = no year filter (movies / TV search & random) */
export const YEAR_SLIDER_MIN = 1950
export const YEAR_SLIDER_MAX = 2032

export function isDefaultYearRange(fromYear: number, toYear: number): boolean {
  return fromYear <= YEAR_SLIDER_MIN && toYear >= YEAR_SLIDER_MAX
}

export interface MovieSearchItem {
  id: string
  kind: 'movie' | 'tv'
  title: string
  year: string
  poster: string
}

export interface MovieDetail {
  id: string
  kind: 'movie' | 'tv'
  title: string
  release_year: number
  runtime_minutes: number
  rating: number
  vote_count: number
  genres: string[]
  plot: string
  poster_url: string
  imdb_id?: string
  credits?: { name: string; role: string }[]
}

export interface GenreOption {
  id: number
  name: string
}

export interface RandomSnapshot {
  media: MediaScope
  genreIds: number[]
  yearFrom: number
  yearTo: number
}

export type Screen = 'loading' | 'search' | 'results' | 'detail' | 'random'

/** Bootstrap search UI from MCP toolOutput + toolInput */
export interface MovieSearchMcpInit {
  query: string
  scope: MediaScope
  genreIds: number[]
  yearFrom: number
  yearTo: number
  initialResults?: MovieSearchItem[]
  initialTotalPages?: number
  autoSearch: boolean
}

/** Bootstrap random tab + optional auto-pick from MCP */
export interface RandomMcpInit {
  snapshot: RandomSnapshot
  autoPick: boolean
}
