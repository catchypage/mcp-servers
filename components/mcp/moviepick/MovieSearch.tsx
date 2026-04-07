import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react'
import type {
  MovieSearchItem,
  MediaScope,
  GenreOption,
  MovieSearchMcpInit,
} from './types'
import { YEAR_SLIDER_MAX, YEAR_SLIDER_MIN, isDefaultYearRange } from './types'
import { searchMovies, proxyImageUrl, fetchMovieGenres } from './api'
import YearRangeSlider from './YearRangeSlider'

interface MovieSearchProps {
  mcpInit?: MovieSearchMcpInit | null
  onSelect: (id: string, kind: 'movie' | 'tv') => void
}

function stableMovieSearchMcpKey(init: MovieSearchMcpInit): string {
  return JSON.stringify({
    q: init.query,
    s: init.scope,
    g: [...init.genreIds].sort((a, b) => a - b),
    yf: init.yearFrom,
    yt: init.yearTo,
    ir: init.initialResults?.map((x) => `${x.kind}:${x.id}`).join(',') ?? '',
    tp: init.initialTotalPages ?? 0,
    as: init.autoSearch,
  })
}

function filterParamsFromMcpInit(init: MovieSearchMcpInit) {
  const genreIds = init.genreIds.length > 0 ? init.genreIds : undefined
  const yActive = !isDefaultYearRange(init.yearFrom, init.yearTo)
  return {
    genreIds,
    yearFrom: yActive ? init.yearFrom : undefined,
    yearTo: yActive ? init.yearTo : undefined,
  }
}

const SCOPE_OPTIONS: { value: MediaScope; label: string }[] = [
  { value: 'movie', label: 'Movies' },
  { value: 'tv', label: 'TV' },
  { value: 'both', label: 'Both' },
]

export default function MovieSearch({
  mcpInit = null,
  onSelect,
}: MovieSearchProps) {
  const [scope, setScope] = useState<MediaScope>('movie')
  const [query, setQuery] = useState('')
  const [yearFrom, setYearFrom] = useState(YEAR_SLIDER_MIN)
  const [yearTo, setYearTo] = useState(YEAR_SLIDER_MAX)
  const [genres, setGenres] = useState<GenreOption[]>([])
  const [genreLoading, setGenreLoading] = useState(true)
  const [selectedGenres, setSelectedGenres] = useState<Set<number>>(new Set())
  const [results, setResults] = useState<MovieSearchItem[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const mcpApplyKeyRef = useRef<string | null>(null)
  const autoSearchGenerationRef = useRef(0)

  useEffect(() => {
    if (!mcpInit) {
      mcpApplyKeyRef.current = null
      return
    }
    const key = stableMovieSearchMcpKey(mcpInit)
    if (mcpApplyKeyRef.current === key) {
      return
    }
    mcpApplyKeyRef.current = key

    setScope(mcpInit.scope)
    setQuery(mcpInit.query)
    setYearFrom(mcpInit.yearFrom)
    setYearTo(mcpInit.yearTo)
    setSelectedGenres(new Set(mcpInit.genreIds))
    if (mcpInit.initialResults?.length) {
      setResults(mcpInit.initialResults)
      setTotalPages(Math.max(1, mcpInit.initialTotalPages ?? 1))
      setPage(1)
      setSearched(true)
    }
    return () => {
      mcpApplyKeyRef.current = null
    }
  }, [mcpInit])

  useEffect(() => {
    if (!mcpInit?.autoSearch) {
      return
    }
    const q = mcpInit.query.trim()
    if (!q) {
      return
    }
    const fp = filterParamsFromMcpInit(mcpInit)
    autoSearchGenerationRef.current += 1
    const myGen = autoSearchGenerationRef.current
    void (async () => {
      setLoading(true)
      setSearched(true)
      const { results: items, total_pages: tp } = await searchMovies(
        q,
        1,
        mcpInit.scope,
        fp,
      )
      if (autoSearchGenerationRef.current !== myGen) {
        return
      }
      setResults(items)
      setTotalPages(Math.max(1, tp))
      setPage(1)
      setLoading(false)
    })()
    return () => {
      autoSearchGenerationRef.current += 1
    }
  }, [mcpInit])

  useEffect(() => {
    let cancelled = false
    setGenreLoading(true)
    const load = async () => {
      const list = await fetchMovieGenres(scope)
      if (!cancelled) {
        setGenres(list)
        setGenreLoading(false)
      }
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [scope])

  const toggleGenre = (id: number) => {
    setSelectedGenres((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const filterParams = useMemo(() => {
    const genreIds =
      selectedGenres.size > 0 ? Array.from(selectedGenres) : undefined
    const yActive = !isDefaultYearRange(yearFrom, yearTo)
    return {
      genreIds,
      yearFrom: yActive ? yearFrom : undefined,
      yearTo: yActive ? yearTo : undefined,
    }
  }, [selectedGenres, yearFrom, yearTo])

  const runSearch = useCallback(
    async (nextPage: number) => {
      const q = query.trim()
      if (!q) {
        return
      }
      setLoading(true)
      setSearched(true)
      const { results: items, total_pages: tp } = await searchMovies(
        q,
        nextPage,
        scope,
        filterParams,
      )
      setResults(items)
      setTotalPages(Math.max(1, tp))
      setPage(nextPage)
      setLoading(false)
    },
    [query, scope, filterParams],
  )

  const handleSearch = useCallback(() => {
    void runSearch(1)
  }, [runSearch])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      void runSearch(1)
    }
  }

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <p className="text-[11px] text-slate-500 uppercase tracking-wider">
          Type
        </p>
        <div className="flex flex-wrap gap-1">
          {SCOPE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                setScope(opt.value)
                setSelectedGenres(new Set())
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                scope === opt.value
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
        <p className="text-[11px] text-slate-500 uppercase tracking-wider">
          Genres
        </p>
        {genreLoading ? (
          <p className="text-xs text-slate-500 py-2">Loading genres…</p>
        ) : (
          <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
            {genres.map((g) => {
              const on = selectedGenres.has(g.id)
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
        )}
      </div>

      <div className="space-y-2">
        <p className="text-[11px] text-slate-500 uppercase tracking-wider">
          Years
        </p>
        <YearRangeSlider
          fromYear={yearFrom}
          toYear={yearTo}
          onChange={(a, b) => {
            setYearFrom(a)
            setYearTo(b)
          }}
        />
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search title…"
          className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-slate-800 border border-slate-600 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
        />
        <button
          type="button"
          onClick={() => void handleSearch()}
          disabled={loading || !query.trim()}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-sm font-medium rounded-lg transition-colors shrink-0"
        >
          {loading ? '…' : 'Search'}
        </button>
      </div>

      {!searched && results.length === 0 && (
        <div className="text-center py-12 space-y-3">
          <div className="text-4xl">🎬</div>
          <p className="text-slate-400 text-sm px-2">
            Pick type, optional genres, and an optional year range, then search
            in MoviePick. With &quot;Both&quot;, movies and series are mixed;
            filters still apply.
          </p>
        </div>
      )}

      {searched && !loading && results.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500 text-sm">
            No results. Try another title, loosen genres, or widen the year
            range.
          </p>
        </div>
      )}

      {results.length > 0 && (
        <>
          <div className="grid grid-cols-3 gap-3">
            {results.map((m) => (
              <button
                key={`${m.kind}-${m.id}`}
                type="button"
                onClick={() => onSelect(m.id, m.kind)}
                className="group flex flex-col rounded-lg overflow-hidden bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/40 hover:border-indigo-500/40 transition-all text-left"
              >
                <div className="relative w-full aspect-[2/3] bg-slate-900">
                  {m.poster ? (
                    <img
                      src={proxyImageUrl(m.poster)}
                      alt={m.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600 text-2xl">
                      🎞️
                    </div>
                  )}
                  {m.kind === 'tv' && (
                    <span className="absolute top-1 left-1 px-1.5 py-0.5 text-[9px] font-bold uppercase bg-violet-600/90 text-white rounded">
                      TV
                    </span>
                  )}
                </div>
                <div className="p-2">
                  <p className="text-xs font-medium text-white truncate group-hover:text-indigo-300 transition-colors">
                    {m.title}
                  </p>
                  {m.year ? (
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      {m.year}
                    </p>
                  ) : null}
                </div>
              </button>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => void runSearch(Math.max(1, page - 1))}
                disabled={loading || page <= 1}
                className="px-3 py-1 text-xs bg-slate-800 text-slate-300 rounded disabled:opacity-30 hover:bg-slate-700 transition-colors"
              >
                ← Prev
              </button>
              <span className="text-xs text-slate-500">
                Page {page} / {totalPages}
              </span>
              <button
                type="button"
                onClick={() => void runSearch(Math.min(totalPages, page + 1))}
                disabled={loading || page >= totalPages}
                className="px-3 py-1 text-xs bg-slate-800 text-slate-300 rounded disabled:opacity-30 hover:bg-slate-700 transition-colors"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
