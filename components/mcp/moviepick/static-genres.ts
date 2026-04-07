/**
 * TMDB genre lists (language=en-US). Matches GET /genre/movie/list and
 * /genre/tv/list — avoids per-scope network calls in the widget bundle.
 * Update if TMDB adds genres: https://developer.themoviedb.org/reference/genre-movie-list
 */
import type { GenreOption, MediaScope } from './types'

/** TMDB /genre/movie/list */
export const STATIC_MOVIE_GENRES: GenreOption[] = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
]

/** TMDB /genre/tv/list */
export const STATIC_TV_GENRES: GenreOption[] = [
  { id: 10759, name: 'Action & Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 10762, name: 'Kids' },
  { id: 9648, name: 'Mystery' },
  { id: 10763, name: 'News' },
  { id: 10764, name: 'Reality' },
  { id: 10765, name: 'Sci-Fi & Fantasy' },
  { id: 10766, name: 'Soap' },
  { id: 10767, name: 'Talk' },
  { id: 10768, name: 'War & Politics' },
  { id: 37, name: 'Western' },
]

function mergeMovieAndTvGenres(
  movie: GenreOption[],
  tv: GenreOption[],
): GenreOption[] {
  const map = new Map<number, string>()
  for (const g of movie) {
    map.set(g.id, g.name)
  }
  for (const g of tv) {
    if (!map.has(g.id)) {
      map.set(g.id, g.name)
    }
  }
  return Array.from(map.entries())
    .map(([id, name]) => ({ id, name }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

/** Same merge as server getTmdbGenresForScope('both') */
export const STATIC_BOTH_GENRES: GenreOption[] = mergeMovieAndTvGenres(
  STATIC_MOVIE_GENRES,
  STATIC_TV_GENRES,
)

export function getStaticGenresForScope(scope: MediaScope): GenreOption[] {
  if (scope === 'tv') {
    return STATIC_TV_GENRES
  }
  if (scope === 'both') {
    return STATIC_BOTH_GENRES
  }
  return STATIC_MOVIE_GENRES
}
