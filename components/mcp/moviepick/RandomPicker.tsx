import React, { useEffect, useState, useMemo, useRef } from 'react'
import type {
  GenreOption,
  MovieDetail,
  MediaScope,
  RandomSnapshot,
  RandomMcpInit,
} from './types'
import { YEAR_SLIDER_MAX, YEAR_SLIDER_MIN, isDefaultYearRange } from './types'
import { fetchMovieGenres, fetchRandomMovie } from './api'
import YearRangeSlider from './YearRangeSlider'

interface RandomPickerProps {
  mcpInit?: RandomMcpInit | null
  onPicked: (movie: MovieDetail, snapshot: RandomSnapshot) => void
  /** After autoPick fails (no title); parent should set autoPick false */
  onAutoPickConsumed?: () => void
}

function stableRandomMcpKey(init: RandomMcpInit): string {
  const s = init.snapshot
  return JSON.stringify({
    m: s.media,
    g: [...s.genreIds].sort((a, b) => a - b),
    yf: s.yearFrom,
    yt: s.yearTo,
    ap: init.autoPick,
  })
}

const MEDIA_OPTIONS: { value: MediaScope; label: string }[] = [
  { value: 'movie', label: 'Movies' },
  { value: 'tv', label: 'TV' },
  { value: 'both', label: 'Both' },
]

export default function RandomPicker({
  mcpInit = null,
  onPicked,
  onAutoPickConsumed,
}: RandomPickerProps) {
  const [media, setMedia] = useState<MediaScope>('movie')
  const [genres, setGenres] = useState<GenreOption[]>([])
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const [yearFrom, setYearFrom] = useState(YEAR_SLIDER_MIN)
  const [yearTo, setYearTo] = useState(YEAR_SLIDER_MAX)
  const [loadingGenres, setLoadingGenres] = useState(true)
  const [picking, setPicking] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const mcpApplyKeyRef = useRef<string | null>(null)
  const autoPickGenerationRef = useRef(0)
  /** One autoPick per mcpInit key (no re-roll when loadingGenres flips) */
  const autoPickRunForKeyRef = useRef<string | null>(null)
  const onPickedRef = useRef(onPicked)
  onPickedRef.current = onPicked
  const onAutoPickConsumedRef = useRef(onAutoPickConsumed)
  onAutoPickConsumedRef.current = onAutoPickConsumed

  useEffect(() => {
    if (!mcpInit) {
      mcpApplyKeyRef.current = null
      return
    }
    const key = stableRandomMcpKey(mcpInit)
    if (mcpApplyKeyRef.current === key) {
      return
    }
    mcpApplyKeyRef.current = key

    const s = mcpInit.snapshot
    setMedia(s.media)
    setYearFrom(s.yearFrom)
    setYearTo(s.yearTo)
    setSelected(new Set(s.genreIds))
    setError(null)
    return () => {
      mcpApplyKeyRef.current = null
    }
  }, [mcpInit])

  useEffect(() => {
    let cancelled = false
    setLoadingGenres(true)
    const load = async () => {
      const list = await fetchMovieGenres(media)
      if (!cancelled) {
        setGenres(list)
        setLoadingGenres(false)
      }
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [media])

  useEffect(() => {
    if (!mcpInit?.autoPick) {
      return
    }
    if (loadingGenres) {
      return
    }
    const key = stableRandomMcpKey(mcpInit)
    if (autoPickRunForKeyRef.current === key) {
      return
    }
    autoPickRunForKeyRef.current = key

    const snap = mcpInit.snapshot
    autoPickGenerationRef.current += 1
    const myGen = autoPickGenerationRef.current
    void (async () => {
      setPicking(true)
      setError(null)
      const movie = await fetchRandomMovie({
        media: snap.media,
        genreIds: snap.genreIds,
        yearFrom: snap.yearFrom,
        yearTo: snap.yearTo,
      })
      if (autoPickGenerationRef.current !== myGen) {
        return
      }
      setPicking(false)
      if (movie) {
        onPickedRef.current(movie, snap)
      } else {
        setError('No match — loosen genres or years, or clear filters.')
        onAutoPickConsumedRef.current?.()
      }
    })()
    return () => {
      autoPickGenerationRef.current += 1
    }
  }, [mcpInit, loadingGenres])

  const hasActiveFilters = useMemo(
    () =>
      media !== 'movie' ||
      selected.size > 0 ||
      !isDefaultYearRange(yearFrom, yearTo),
    [media, selected, yearFrom, yearTo],
  )

  const resetAllFilters = () => {
    setError(null)
    setMedia('movie')
    setSelected(new Set())
    setYearFrom(YEAR_SLIDER_MIN)
    setYearTo(YEAR_SLIDER_MAX)
  }

  const toggleGenre = (id: number) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const buildSnapshot = (): RandomSnapshot => ({
    media,
    genreIds: Array.from(selected),
    yearFrom,
    yearTo,
  })

  const handlePick = async () => {
    setError(null)
    setPicking(true)
    const snap = buildSnapshot()
    const movie = await fetchRandomMovie({
      media: snap.media,
      genreIds: snap.genreIds,
      yearFrom: snap.yearFrom,
      yearTo: snap.yearTo,
    })
    setPicking(false)
    if (movie) {
      onPicked(movie, snap)
    } else {
      setError('No match — loosen genres or years, or clear filters.')
    }
  }

  if (loadingGenres) {
    return (
      <div className="flex items-center justify-center py-20">
        <span className="text-slate-500 text-sm">Loading genres…</span>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-4">
      <p className="text-xs text-slate-400 leading-relaxed">
        MoviePick random: choose Movies, TV, or Both (mixed picks alternate
        between film and series). Genres apply to the selected type. Optionally
        narrow years: each roll picks a random year in your range (full bar =
        any year).
      </p>

      <div className="space-y-2">
        <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Type
        </h2>
        <div className="flex flex-wrap gap-1">
          {MEDIA_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                setMedia(opt.value)
                setSelected(new Set())
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                media === opt.value
                  ? 'bg-indigo-600 border-indigo-500 text-white'
                  : 'bg-slate-800/60 border-slate-600 text-slate-300 hover:border-slate-500'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Genres
        </h2>
        <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto pr-1">
          {genres.map((g: GenreOption) => {
            const on = selected.has(g.id)
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => toggleGenre(g.id)}
                className={`px-2 py-1 text-[11px] rounded-md border transition-colors ${
                  on
                    ? 'bg-indigo-600 border-indigo-500 text-white'
                    : 'bg-slate-800/60 border-slate-600 text-slate-300 hover:border-slate-500'
                }`}
              >
                {g.name}
              </button>
            )
          })}
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Years
        </h2>
        <YearRangeSlider
          fromYear={yearFrom}
          toYear={yearTo}
          onChange={(a, b) => {
            setYearFrom(a)
            setYearTo(b)
          }}
        />
      </div>

      {error && <p className="text-xs text-amber-400/90">{error}</p>}

      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={resetAllFilters}
          disabled={!hasActiveFilters}
          className="w-full py-2 rounded-lg border-2 border-dashed border-amber-500/55 bg-amber-500/5 text-amber-200/95 text-xs font-semibold uppercase tracking-wide hover:bg-amber-500/15 hover:border-amber-400/70 disabled:opacity-35 disabled:hover:bg-amber-500/5 disabled:hover:border-amber-500/55 disabled:cursor-not-allowed transition-colors"
        >
          Reset all filters
        </button>
        <button
          type="button"
          onClick={() => void handlePick()}
          disabled={picking}
          className="w-full py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-sm font-semibold transition-colors"
        >
          {picking ? 'Picking…' : 'Random'}
        </button>
      </div>
    </div>
  )
}
