import React, { useCallback, useEffect, useState } from 'react'
import type { GameSearchItem } from './types'
import { fetchTopRecommendations } from './api'
import { TOP_GENRE_OPTIONS } from './top-genre-options'

const RESULTS_PER_PAGE = 10

interface TopRecommendationsProps {
  onSelect: (id: string) => void
  genre: string
  onGenreChange: (slug: string) => void
  /** When true, spotlight walks `searchItems` (same order as the list below). */
  searchActive: boolean
  searchItems: GameSearchItem[]
  spotlightIndex: number
  onSpotlightIndexChange: (i: number) => void
  searchPage: number
  searchTotalPages: number
  searchTotalResults: number
  searchQuery: string
  searchLoading: boolean
  onSpotlightNextPage: () => void
  onSpotlightPrevPage: () => void
}

const MAX_API_OFFSET = 1000

function hasMoreCatalogPages(
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
  searchActive,
  searchItems,
  spotlightIndex,
  onSpotlightIndexChange,
  searchPage,
  searchTotalPages,
  searchTotalResults,
  searchQuery,
  searchLoading,
  onSpotlightNextPage,
  onSpotlightPrevPage,
}: TopRecommendationsProps) {
  const [offset, setOffset] = useState(0)
  const [index, setIndex] = useState(0)
  const [items, setItems] = useState<GameSearchItem[]>([])
  const [totalResults, setTotalResults] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const batchStep = items.length > 0 ? items.length : 10

  const loadCatalogAt = useCallback(async (g: string, o: number) => {
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
    if (searchActive) {
      return
    }
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
  }, [genre, searchActive])

  const currentSearch = searchActive ? searchItems[spotlightIndex] : undefined
  const currentCatalog = !searchActive ? items[index] : undefined
  const current = currentSearch ?? currentCatalog

  const searchRank =
    searchActive && searchItems.length > 0
      ? (searchPage - 1) * RESULTS_PER_PAGE + spotlightIndex + 1
      : 0
  const catalogRank = !searchActive && items.length > 0 ? offset + index + 1 : 0

  const genreLabel =
    TOP_GENRE_OPTIONS.find((x) => x.value === genre)?.label ?? 'All genres'

  const goNextSearch = useCallback(() => {
    if (searchItems.length === 0) {
      return
    }
    if (spotlightIndex < searchItems.length - 1) {
      onSpotlightIndexChange(spotlightIndex + 1)
      return
    }
    if (searchPage < searchTotalPages) {
      onSpotlightNextPage()
    }
  }, [
    onSpotlightIndexChange,
    onSpotlightNextPage,
    searchItems.length,
    searchPage,
    searchTotalPages,
    spotlightIndex,
  ])

  const goPrevSearch = useCallback(() => {
    if (searchItems.length === 0) {
      return
    }
    if (spotlightIndex > 0) {
      onSpotlightIndexChange(spotlightIndex - 1)
      return
    }
    if (searchPage > 1) {
      onSpotlightPrevPage()
    }
  }, [
    onSpotlightIndexChange,
    onSpotlightPrevPage,
    searchItems.length,
    searchPage,
    spotlightIndex,
  ])

  const goNextCatalog = useCallback(() => {
    if (items.length === 0) {
      return
    }
    const step = batchStep
    if (index < items.length - 1) {
      setIndex((i) => i + 1)
      return
    }
    if (hasMoreCatalogPages(offset, step, totalResults)) {
      void loadCatalogAt(genre, offset + step).then((nextItems) => {
        setIndex(0)
        if (nextItems.length === 0) {
          void loadCatalogAt(genre, 0).then(() => setIndex(0))
        }
      })
      return
    }
    void loadCatalogAt(genre, 0).then(() => setIndex(0))
  }, [
    batchStep,
    genre,
    index,
    items.length,
    loadCatalogAt,
    offset,
    totalResults,
  ])

  const goPrevCatalog = useCallback(() => {
    if (items.length === 0) {
      return
    }
    const step = batchStep
    if (index > 0) {
      setIndex((i) => i - 1)
      return
    }
    if (offset >= step) {
      void loadCatalogAt(genre, offset - step).then((prevItems) => {
        setIndex(Math.max(0, prevItems.length - 1))
      })
    }
  }, [batchStep, genre, index, items.length, loadCatalogAt, offset])

  const goNext = searchActive ? goNextSearch : goNextCatalog
  const goPrev = searchActive ? goPrevSearch : goPrevCatalog

  const prevDisabled = searchActive
    ? searchPage <= 1 && spotlightIndex <= 0
    : offset === 0 && index === 0

  const blockLoading =
    (!searchActive && loading) ||
    (searchActive && searchLoading && searchItems.length === 0)
  const blockError = searchActive ? null : error

  const heading = searchActive ? 'From your search' : 'Top picks'
  const subline = searchActive
    ? 'Same order as the list below — Next / Previous moves through results.'
    : 'Highly rated titles — optional genre. Run a search to spotlight your results here.'

  return (
    <section className="rounded-2xl border border-emerald-500/25 bg-zinc-900/60 p-4 space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h3 className="text-xs font-bold text-emerald-400/95 uppercase tracking-widest">
            {heading}
          </h3>
          <p className="text-sm text-zinc-400 mt-1">{subline}</p>
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

      {blockLoading && (
        <p className="text-sm text-zinc-500 py-4 text-center">
          {searchActive ? 'Updating…' : 'Loading picks…'}
        </p>
      )}

      {!blockLoading && blockError && (
        <p className="text-sm text-amber-500/90 py-2">{blockError}</p>
      )}

      {!blockLoading && !current && !blockError && (
        <p className="text-sm text-zinc-500 py-3 text-center">
          {searchActive
            ? 'No results to show.'
            : 'Nothing here yet — try another genre or search below.'}
        </p>
      )}

      {!blockLoading && current && (
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
                {searchActive ? (
                  <>
                    #{searchRank}
                    {searchTotalResults > 0
                      ? ` of ~${searchTotalResults}`
                      : ''}
                    {searchQuery ? (
                      <>
                        {' '}
                        · &quot;
                        {searchQuery.length > 28
                          ? `${searchQuery.slice(0, 28)}…`
                          : searchQuery}
                        &quot;
                      </>
                    ) : null}
                  </>
                ) : (
                  <>
                    #{catalogRank}
                    {totalResults > 0 ? ` of ~${totalResults}` : ''} ·{' '}
                    {genreLabel}
                  </>
                )}
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
                disabled={prevDisabled}
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
