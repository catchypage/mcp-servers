export interface GameSearchItem {
  id: string
  title: string
  year: string
  genre: string
  poster: string
  link: string
}

export interface GameGenreTag {
  value: string
  name: string
}

export interface GamePlatform {
  value: string
  name: string
}

export interface GameDetail {
  id: string
  title: string
  year: number
  image: string
  link: string
  short_description: string
  description: string
  release_date: string
  developer: string
  genre: string
  genres: GameGenreTag[]
  platforms: GamePlatform[]
  rating_mean: number
  rating_count: number
  rating_mean_players?: number
  rating_mean_critics?: number
  screenshots: string[]
  gameplay: string | null
  adult_only: boolean
  store_url?: string
}

export type Screen = 'loading' | 'search' | 'results' | 'detail'

export interface GameSearchMcpInit {
  query: string
  initialResults?: GameSearchItem[]
  initialTotalPages?: number
  initialTotalResults?: number
  autoSearch: boolean
}

export interface LastViewedGameState {
  game: GameDetail
  prevScreen: Extract<Screen, 'search' | 'results'>
}
