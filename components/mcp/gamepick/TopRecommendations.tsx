import React, { useCallback, useEffect, useState } from 'react'
import type { GameSearchItem } from './types'
import { fetchTopRecommendations } from './api'
import { TOP_GENRE_OPTIONS } from './top-genre-options'

interface TopRecommendationsProps {
  onSelect: (id: string) => void
  genre: string
  onGenreChange: (slug: string) => void
}

const MAX_API_OFFSET = 1000

function hasMorePages(
  offset: number,
  step: number,
  totalResults: number,
): boolean {
  const next = offset + step
  return next <= MAX_API_OFFSET && next < totalResults
}

export default function TopRecommendations({
  onSelect,
  genre,
  onGenreChange,
}: TopRecommendationsProps) {
  const [offset, setOffset] = useState(0)
  const [index, setIndex] = useState(0)
  const [items, setItems] = useState<GameSearchItem[]>([])
  const [totalResults, setTotalResults] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const batchStep = items.length > 0 ? items.length : 10

  const loadAt = useCallback(async (g: string, o: number) => {
    setLoading(true)
    setError(null)
    const r = await fetchTopRecommendations(g, o)
    setLoading(false)
    setOffset(r.offset)
    setItems(r.items)
    setTotalResults(r.totalResults)
    if (r.items.length === 0) {
      setError('No games for this filter.')
    } else {
      setError(null)
    }
    return r.items
  }, [])

  useEffect(() => {
    let cancelled = false
    void (async () => {
      setIndex(0)
      setLoading(true)
      setError(null)
      const r = await fetchTopRecommendations(genre, 0)
      if (cancelled) {
        return
      }
      setLoading(false)
      setOffset(r.offset)
      setItems(r.items)
      setTotalResults(r.totalResults)
      if (r.items.length === 0) {
        setError('No games for this filter.')
      }
    })()
    return () => {
      cancelled = true
    }
  }, [genre])

  const current = items[index]
  const rank = items.length > 0 ? offset + index + 1 : 0
  const genreLabel =
    TOP_GENRE_OPTIONS.find((x) => x.value === genre)?.label ?? 'All genres'

  const goNext = useCallback(() => {
    if (items.length === 0) {
      return
    }
    const step = batchStep
    if (index < items.length - 1) {
      setIndex((i) => i + 1)
      return
    }
    if (hasMorePages(offset, step, totalResults)) {
      void loadAt(genre, offset + step).then((nextItems) => {
        setIndex(0)
        if (nextItems.length === 0) {
          void loadAt(genre, 0).then(() => setIndex(0))
        }
      })
      return
    }
    void loadAt(genre, 0).then(() => setIndex(0))
  }, [batchStep, genre, index, items.length, loadAt, offset, totalResults])

  const goPrev = useCallback(() => {
    if (items.length === 0) {
      return
    }
    const step = batchStep
    if (index > 0) {
      setIndex((i) => i - 1)
      return
    }
    if (offset >= step) {
      void loadAt(genre, offset - step).then((prevItems) => {
        setIndex(Math.max(0, prevItems.length - 1))
      })
    }
  }, [batchStep, genre, index, items.length, loadAt, offset])

  return (
    <section className="rounded-2xl border border-emerald-500/25 bg-zinc-900/60 p-4 space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h3 className="text-xs font-bold text-emerald-400/95 uppercase tracking-widest">
            Top rated
          </h3>
          <p className="text-sm text-zinc-400 mt-1">
            Best games by Game Brain score — walk the list with Next / Previous.
          </p>
        </div>
        <label className="flex flex-col gap-1 min-w-[10rem]">
          <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wide">
            Genre
          </span>
          <select
            value={genre}
            onChange={(e) => onGenreChange(e.target.value)}
            className="px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-600 text-zinc-100 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 focus:outline-none"
          >
            {TOP_GENRE_OPTIONS.map((o) => (
              <option key={o.value || 'all'} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {loading && (
        <p className="text-sm text-zinc-500 py-4 text-center">Loading picks…</p>
      )}

      {!loading && error && (
        <p className="text-sm text-amber-500/90 py-2">{error}</p>
      )}

      {!loading && current && (
        <div className="flex gap-3 items-stretch">
          <div className="w-24 sm:w-28 shrink-0 rounded-xl overflow-hidden bg-zinc-800 ring-1 ring-emerald-500/20">
            {current.poster ? (
              <img
                src={current.poster}
                alt=""
                className="w-full h-full object-cover aspect-[3/4]"
              />
            ) : (
              <div className="w-full aspect-[3/4] flex items-center justify-center text-2xl text-zinc-600">
                🎮
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-between gap-2">
            <div>
              <p className="text-[11px] text-zinc-500">
                #{rank}
                {totalResults > 0 ? ` of ~${totalResults}` : ''} · {genreLabel}
              </p>
              <p className="font-semibold text-zinc-100 text-sm leading-snug">
                {current.title}
              </p>
              <p className="text-xs text-zinc-500 mt-0.5">
                {[current.year, current.genre].filter(Boolean).join(' · ')}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onSelect(current.id)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white"
              >
                Open
              </button>
              <button
                type="button"
                onClick={goPrev}
                disabled={offset === 0 && index === 0}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-600 disabled:opacity-35"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={goNext}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-600"
              >
                Next game
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
