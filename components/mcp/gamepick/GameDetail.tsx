import React, { useEffect, useState, useCallback } from 'react'
import type { GameDetail as GameDetailType, GameSearchItem } from './types'
import { fetchSimilarGames, openExternal } from './api'

interface GameDetailProps {
  game: GameDetailType
  onBack: () => void
  onSelectSimilar: (id: string) => void
}

function ratingLine(game: GameDetailType): string {
  const m = game.rating_mean
  const c = game.rating_count
  if (m <= 0 || c <= 0) {
    return ''
  }
  if (m > 0 && m <= 1) {
    return `${Math.round(m * 100)}% · ${c.toLocaleString()} ratings`
  }
  return `${m.toFixed(1)} · ${c.toLocaleString()} ratings`
}

export default function GameDetail({
  game,
  onBack,
  onSelectSimilar,
}: GameDetailProps) {
  const [similar, setSimilar] = useState<GameSearchItem[]>([])
  const [similarLoading, setSimilarLoading] = useState(true)
  const [lightbox, setLightbox] = useState<string | null>(null)

  const closeLightbox = useCallback(() => setLightbox(null), [])

  useEffect(() => {
    let cancelled = false
    setSimilarLoading(true)
    void (async () => {
      const s = await fetchSimilarGames(game.id)
      if (!cancelled) {
        setSimilar(s)
        setSimilarLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [game.id])

  useEffect(() => {
    if (!lightbox) {
      return
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, closeLightbox])

  const rl = ratingLine(game)
  const shots = game.screenshots.slice(0, 12)

  return (
    <div className="p-4 space-y-5 pb-10">
      <button
        type="button"
        onClick={onBack}
        className="text-xs text-teal-400 hover:text-teal-300 transition-colors font-medium"
      >
        ← Back
      </button>

      <div className="flex gap-4">
        <div className="w-28 sm:w-36 shrink-0 rounded-2xl overflow-hidden bg-zinc-800 ring-1 ring-teal-500/20 shadow-lg shadow-teal-950/20">
          {game.image ? (
            <img
              src={game.image}
              alt=""
              className="w-full object-cover aspect-[3/4]"
            />
          ) : (
            <div className="w-full aspect-[3/4] flex items-center justify-center text-3xl text-zinc-600">
              🎮
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0 space-y-1.5">
          <h2 className="text-lg font-bold text-zinc-50 leading-tight">
            {game.title}
          </h2>
          {game.adult_only && (
            <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase bg-rose-600/85 text-white rounded-md">
              Mature
            </span>
          )}
          <div className="text-xs text-zinc-500 flex flex-wrap gap-x-2 gap-y-0.5">
            {game.year > 0 && <span>{game.year}</span>}
            {game.genre && <span>· {game.genre}</span>}
            {game.developer && <span>· {game.developer}</span>}
          </div>
          {rl && (
            <p className="text-xs text-emerald-400/95 font-medium pt-0.5">{rl}</p>
          )}
          {(game.rating_mean_players ?? game.rating_mean_critics) != null && (
            <p className="text-[11px] text-zinc-500">
              {game.rating_mean_players != null &&
                game.rating_mean_players > 0 &&
                game.rating_mean_players <= 1 && (
                  <span>
                    Players {Math.round(game.rating_mean_players * 100)}%
                    {game.rating_mean_critics != null &&
                    game.rating_mean_critics > 0 &&
                    game.rating_mean_critics <= 1
                      ? ` · Critics ${Math.round(
                          game.rating_mean_critics * 100,
                        )}%`
                      : ''}
                  </span>
                )}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {game.link && (
          <button
            type="button"
            onClick={() => openExternal(game.link)}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-teal-600 hover:bg-teal-500 text-white shadow-md shadow-teal-950/40 transition-colors"
          >
            More info
          </button>
        )}
        {game.store_url && (
          <button
            type="button"
            onClick={() => openExternal(game.store_url!)}
            className="px-4 py-2 text-xs font-medium rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-600/80 transition-colors"
          >
            Store
          </button>
        )}
      </div>

      {(game.short_description || game.description) && (
        <p className="text-sm text-zinc-300 leading-relaxed border-l-2 border-teal-500/40 pl-3">
          {game.short_description || game.description}
        </p>
      )}

      {shots.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-teal-400/90 uppercase tracking-widest">
            Gallery
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            {shots.map((url, i) => (
              <button
                key={`${url}-${i}`}
                type="button"
                onClick={() => setLightbox(url)}
                className="group relative aspect-video rounded-xl overflow-hidden bg-zinc-900 ring-1 ring-zinc-700/80 hover:ring-teal-400/50 focus-visible:outline focus-visible:ring-2 focus-visible:ring-teal-400 transition-all shadow-md"
              >
                <img
                  src={url}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 group-active:scale-100"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-xs font-bold text-teal-400/90 uppercase tracking-widest mb-2">
          Similar games
        </h3>
        {similarLoading && (
          <p className="text-sm text-zinc-500">Loading…</p>
        )}
        {!similarLoading && similar.length === 0 && (
          <p className="text-sm text-zinc-500">No suggestions yet.</p>
        )}
        {!similarLoading && similar.length > 0 && (
          <div className="flex gap-2.5 overflow-x-auto pb-2 -mx-1 px-1">
            {similar.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => onSelectSimilar(s.id)}
                className="shrink-0 w-[7.25rem] text-left rounded-xl border border-zinc-700/80 hover:border-teal-500/45 overflow-hidden bg-zinc-900/80 ring-1 ring-transparent hover:ring-teal-500/20 transition-all"
              >
                <div className="aspect-[3/4] bg-zinc-800">
                  {s.poster ? (
                    <img
                      src={s.poster}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xl">
                      🎮
                    </div>
                  )}
                </div>
                <div className="p-2">
                  <div className="text-[11px] font-medium text-zinc-100 line-clamp-2 leading-snug">
                    {s.title}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/92 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Screenshot preview"
          onClick={closeLightbox}
        >
          <button
            type="button"
            className="absolute top-3 right-3 z-[101] px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-200 text-sm font-medium hover:bg-zinc-700 border border-zinc-600"
            onClick={(e) => {
              e.stopPropagation()
              closeLightbox()
            }}
          >
            Close
          </button>
          <div
            className="flex flex-col items-center max-w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox}
              alt=""
              className="max-h-[min(85vh,100%)] max-w-full object-contain rounded-lg shadow-2xl ring-1 ring-teal-500/30"
            />
            <p className="mt-3 text-xs text-zinc-500">
              Tap outside to close
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
