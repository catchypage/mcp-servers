import React, { useState, useCallback, useEffect, useRef } from 'react'
import type { GameSearchItem, GameSearchMcpInit } from './types'
import { searchGames, suggestGames } from './api'
import TopRecommendations from './TopRecommendations'

interface GameSearchProps {
  mcpInit?: GameSearchMcpInit | null
  onSelect: (id: string) => void
}

const QUICK_SEARCHES = [
  'Cozy RPG',
  'Roguelike',
  'Strategy',
  'Open world',
  'Indie puzzle',
  'Metroidvania',
]

function stableMcpKey(init: GameSearchMcpInit): string {
  return JSON.stringify({
    q: init.query,
    ir: init.initialResults?.map((x) => x.id).join(',') ?? '',
    tp: init.initialTotalPages ?? 0,
    tr: init.initialTotalResults ?? 0,
    as: init.autoSearch,
  })
}

export default function GameSearch({
  mcpInit = null,
  onSelect,
}: GameSearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<GameSearchItem[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [suggestions, setSuggestions] = useState<GameSearchItem[]>([])
  const [suggestOpen, setSuggestOpen] = useState(false)
  const [pickGenre, setPickGenre] = useState('')
  const [totalResults, setTotalResults] = useState(0)
  const [spotlightIndex, setSpotlightIndex] = useState(0)
  /** Shown in spotlight header; only updated after a real search, not while typing. */
  const [committedSearchQuery, setCommittedSearchQuery] = useState('')
  const mcpApplyKeyRef = useRef<string | null>(null)
  const autoSearchGenRef = useRef(0)
  const suggestTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!mcpInit) {
      mcpApplyKeyRef.current = null
      return
    }
    const key = stableMcpKey(mcpInit)
    if (mcpApplyKeyRef.current === key) {
      return
    }
    mcpApplyKeyRef.current = key
    setQuery(mcpInit.query)
    if (mcpInit.initialResults?.length) {
      setResults(mcpInit.initialResults)
      setTotalPages(Math.max(1, mcpInit.initialTotalPages ?? 1))
      setPage(1)
      setSearched(true)
      setSpotlightIndex(0)
      setCommittedSearchQuery(mcpInit.query.trim())
      setTotalResults(
        typeof mcpInit.initialTotalResults === 'number'
          ? mcpInit.initialTotalResults
          : mcpInit.initialResults.length,
      )
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
    autoSearchGenRef.current += 1
    const gen = autoSearchGenRef.current
    void (async () => {
      setLoading(true)
      setSearched(true)
      const { items, totalPages: tp, totalResults: tr } = await searchGames(
        q,
        1,
      )
      if (autoSearchGenRef.current !== gen) {
        return
      }
      setResults(items)
      setTotalPages(Math.max(1, tp))
      setTotalResults(tr)
      setPage(1)
      setSpotlightIndex(0)
      setCommittedSearchQuery(q)
      setLoading(false)
    })()
  }, [mcpInit])

  const runSearch = useCallback(
    async (
      pageNum: number,
      q: string,
      genreOverride?: string,
      listFocus: 'first' | 'last' = 'first',
    ) => {
      const t = q.trim()
      if (!t) {
        return
      }
      const genreForRequest =
        genreOverride !== undefined ? genreOverride : pickGenre
      setLoading(true)
      setSearched(true)
      setSuggestOpen(false)
      const { items, totalPages: tp, totalResults: tr } = await searchGames(
        t,
        pageNum,
        {
          genreSlug: genreForRequest || undefined,
        },
      )
      setResults(items)
      setTotalPages(Math.max(1, tp))
      setTotalResults(tr)
      setPage(pageNum)
      setSpotlightIndex(
        listFocus === 'last' ? Math.max(0, items.length - 1) : 0,
      )
      setCommittedSearchQuery(t)
      setLoading(false)
    },
    [pickGenre],
  )

  const handlePickGenreChange = useCallback(
    (slug: string) => {
      setPickGenre(slug)
      const q = query.trim()
      if (searched && q) {
        void runSearch(1, q, slug, 'first')
      }
    },
    [query, runSearch, searched],
  )

  useEffect(() => {
    if (results.length === 0) {
      return
    }
    setSpotlightIndex((i) => Math.min(i, results.length - 1))
  }, [results])

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      void runSearch(1, query)
    },
    [query, runSearch],
  )

  const onQueryChange = useCallback((v: string) => {
    setQuery(v)
    if (suggestTimerRef.current) {
      clearTimeout(suggestTimerRef.current)
    }
    if (v.trim().length < 2) {
      setSuggestions([])
      setSuggestOpen(false)
      return
    }
    suggestTimerRef.current = setTimeout(() => {
      void (async () => {
        const s = await suggestGames(v)
        setSuggestions(s)
        setSuggestOpen(s.length > 0)
      })()
    }, 320)
  }, [])

  const showLanding = !searched && !loading

  return (
    <div className="p-4 space-y-5">
      {showLanding && (
        <div className="relative overflow-hidden rounded-2xl border border-teal-500/25 bg-gradient-to-br from-zinc-900 via-zinc-900 to-teal-950/50 px-4 py-5 sm:px-5 sm:py-6 shadow-lg shadow-teal-950/20">
          <div
            className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-teal-500/10 blur-2xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-10 left-1/4 h-24 w-40 rounded-full bg-emerald-500/10 blur-2xl"
            aria-hidden
          />
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-400/90 mb-1">
            GamePick
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-50 leading-tight mb-2">
            Find your next game
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-md mb-4">
            Search by vibe, genre, or name — live suggestions as you type. Open
            a title for details and similar picks.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-zinc-500 w-full sm:w-auto sm:mr-1">
              Try:
            </span>
            {QUICK_SEARCHES.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => {
                  setQuery(label)
                  void runSearch(1, label)
                }}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-zinc-800/90 text-teal-200 border border-teal-500/30 hover:bg-teal-950/60 hover:border-teal-400/45 transition-colors"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      <TopRecommendations
        genre={pickGenre}
        onGenreChange={handlePickGenreChange}
        onSelect={onSelect}
        searchActive={searched && results.length > 0}
        searchItems={results}
        spotlightIndex={spotlightIndex}
        onSpotlightIndexChange={setSpotlightIndex}
        searchPage={page}
        searchTotalPages={totalPages}
        searchTotalResults={totalResults}
        searchQuery={committedSearchQuery}
        searchLoading={loading}
        onSpotlightNextPage={() => {
          void runSearch(
            page + 1,
            committedSearchQuery || query,
            undefined,
            'first',
          )
        }}
        onSpotlightPrevPage={() => {
          void runSearch(
            page - 1,
            committedSearchQuery || query,
            undefined,
            'last',
          )
        }}
      />

      <form onSubmit={onSubmit} className="space-y-2 relative">
        <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide">
          Search
        </label>
        <div className="flex gap-2">
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onFocus={() => {
              if (suggestions.length > 0) {
                setSuggestOpen(true)
              }
            }}
            onBlur={() => {
              setTimeout(() => setSuggestOpen(false), 180)
            }}
            placeholder="Medieval strategy, space sim, cozy farm…"
            className="flex-1 min-w-0 px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-600 text-zinc-100 text-sm placeholder-zinc-600 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/40 focus:outline-none transition-shadow"
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-40 text-white text-sm font-bold shrink-0 shadow-md shadow-teal-950/30 transition-colors"
          >
            {loading ? '…' : 'Go'}
          </button>
        </div>
        {suggestOpen && suggestions.length > 0 && (
          <ul className="absolute z-20 left-0 right-[5.5rem] mt-1 max-h-52 overflow-y-auto rounded-xl border border-zinc-600 bg-zinc-900 shadow-xl shadow-black/40">
            {suggestions.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  className="w-full text-left px-3 py-2.5 text-sm text-zinc-200 hover:bg-zinc-800 flex gap-2 items-center"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setSuggestOpen(false)
                    onSelect(s.id)
                  }}
                >
                  {s.poster ? (
                    <img
                      src={s.poster}
                      alt=""
                      className="w-8 h-10 object-cover rounded-md ring-1 ring-zinc-700"
                    />
                  ) : (
                    <span className="w-8 h-10 bg-zinc-800 rounded-md flex items-center justify-center text-xs">
                      🎮
                    </span>
                  )}
                  <span className="truncate">
                    {s.title}
                    {s.year ? (
                      <span className="text-zinc-500"> · {s.year}</span>
                    ) : null}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </form>

      {loading && (
        <p className="text-center text-zinc-500 text-sm py-6">Searching…</p>
      )}

      {!loading && searched && results.length === 0 && (
        <p className="text-center text-zinc-500 text-sm py-6">
          No games found.
        </p>
      )}

      {!loading && results.length > 0 && (
        <>
          <p className="text-xs text-zinc-500">
            Page {page} of {totalPages}
            {mcpInit?.initialTotalResults != null
              ? ` · ~${mcpInit.initialTotalResults} total`
              : ''}
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {results.map((g) => (
              <li key={g.id}>
                <button
                  type="button"
                  onClick={() => onSelect(g.id)}
                  className="w-full text-left flex gap-3 p-3 rounded-xl border border-zinc-700/70 hover:border-teal-500/35 hover:bg-zinc-900/80 transition-all ring-1 ring-transparent hover:ring-teal-500/10"
                >
                  <div className="w-14 shrink-0 rounded-lg overflow-hidden bg-zinc-800 aspect-[3/4] ring-1 ring-zinc-700/80">
                    {g.poster ? (
                      <img
                        src={g.poster}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl text-zinc-600">
                        🎮
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1 py-0.5">
                    <div className="font-semibold text-zinc-100 text-sm leading-snug truncate">
                      {g.title}
                    </div>
                    <div className="text-xs text-zinc-500 mt-0.5 truncate">
                      {[g.year, g.genre].filter(Boolean).join(' · ')}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 pt-2">
              <button
                type="button"
                disabled={page <= 1 || loading}
                onClick={() =>
                  void runSearch(
                    page - 1,
                    committedSearchQuery || query,
                    undefined,
                    'first',
                  )
                }
                className="px-3 py-1.5 text-xs rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 text-zinc-200 border border-zinc-700"
              >
                Previous
              </button>
              <button
                type="button"
                disabled={page >= totalPages || loading}
                onClick={() =>
                  void runSearch(
                    page + 1,
                    committedSearchQuery || query,
                    undefined,
                    'first',
                  )
                }
                className="px-3 py-1.5 text-xs rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 text-zinc-200 border border-zinc-700"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
