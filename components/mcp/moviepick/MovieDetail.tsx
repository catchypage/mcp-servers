import React from 'react'
import type { MovieDetail as MovieDetailType } from './types'
import { proxyImageUrl, openExternal } from './api'

interface MovieDetailProps {
  movie: MovieDetailType
  onBack: () => void
  randomActions?: {
    onRandomAgain: () => void
    onChangeFilters: () => void
    againLoading: boolean
  }
}

export default function MovieDetail({
  movie,
  onBack,
  randomActions,
}: MovieDetailProps) {
  const isTv = movie.kind === 'tv'
  const catalogPageUrl = isTv
    ? `https://www.themoviedb.org/tv/${movie.id}`
    : `https://www.themoviedb.org/movie/${movie.id}`
  const imdbId = movie.imdb_id?.trim()
  const imdbUrl =
    imdbId && imdbId.startsWith('tt')
      ? `https://www.imdb.com/title/${imdbId}/`
      : null

  return (
    <div className="p-4 space-y-4">
      <button
        type="button"
        onClick={onBack}
        className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
      >
        ← Back
      </button>

      {randomActions && (
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            disabled={randomActions.againLoading}
            onClick={() => randomActions.onRandomAgain()}
            className="flex-1 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-sm font-semibold transition-colors"
          >
            {randomActions.againLoading ? 'Picking…' : 'Random again'}
          </button>
          <button
            type="button"
            onClick={() => randomActions.onChangeFilters()}
            className="flex-1 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-100 text-sm font-medium transition-colors border border-slate-600"
          >
            Change filters
          </button>
        </div>
      )}

      <div className="flex gap-4">
        <div className="w-32 shrink-0 rounded-lg overflow-hidden bg-slate-800">
          {movie.poster_url ? (
            <img
              src={proxyImageUrl(movie.poster_url)}
              alt={movie.title}
              className="w-full object-cover"
            />
          ) : (
            <div className="w-full aspect-[2/3] flex items-center justify-center text-3xl text-slate-600">
              🎞️
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-bold text-white leading-tight">
              {movie.title}
            </h2>
            {isTv && (
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-violet-600/80 text-white rounded">
                TV
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
            {movie.release_year > 0 && <span>{movie.release_year}</span>}
            {movie.runtime_minutes > 0 && (
              <span>
                · {movie.runtime_minutes} min
                {isTv ? ' (avg ep.)' : ''}
              </span>
            )}
            {movie.rating > 0 && (
              <span className="text-yellow-400 font-medium">
                ★ {movie.rating.toFixed(1)}
              </span>
            )}
            {movie.vote_count > 0 && (
              <span className="text-slate-500">
                ({movie.vote_count.toLocaleString()} votes)
              </span>
            )}
          </div>

          {movie.genres?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {movie.genres.map((g) => (
                <span
                  key={g}
                  className="px-2 py-0.5 text-[10px] bg-indigo-900/50 text-indigo-300 rounded-full border border-indigo-700/30"
                >
                  {g}
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => openExternal(catalogPageUrl)}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-sky-600/20 text-sky-300 hover:bg-sky-600/30 rounded-md transition-colors border border-sky-600/25"
            >
              Catalog ↗
            </button>
            {imdbUrl && (
              <button
                type="button"
                onClick={() => openExternal(imdbUrl)}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-yellow-600/20 text-yellow-400 hover:bg-yellow-600/30 rounded-md transition-colors border border-yellow-600/20"
              >
                IMDb ↗
              </button>
            )}
          </div>
        </div>
      </div>

      {movie.plot && (
        <div className="space-y-1">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Overview
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">{movie.plot}</p>
        </div>
      )}

      {movie.credits && movie.credits.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Cast
          </h3>
          <div className="grid grid-cols-2 gap-1.5">
            {movie.credits.slice(0, 10).map((c, i) => (
              <div key={i} className="text-xs">
                <span className="text-white">{c.name}</span>
                <span className="text-slate-500 ml-1">— {c.role}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
