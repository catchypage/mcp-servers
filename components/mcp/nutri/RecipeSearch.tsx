import React, { useState } from 'react'
import type { RecipeData } from './types'
import { searchRecipes, fetchRandomRecipe, proxyImageUrl } from './api'

const PAGE_SIZE = 10

interface Props {
  onSelect: (d: RecipeData) => void
}

export default function RecipeSearch({ onSelect }: Props) {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<RecipeData[]>([])
  const [searched, setSearched] = useState(false)
  const [error, setError] = useState('')
  const [page, setPage] = useState(0)

  const totalPages = Math.ceil(results.length / PAGE_SIZE)
  const visible = results.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

  const doSearch = async (q: string) => {
    setLoading(true)
    setError('')
    setPage(0)
    const list = await searchRecipes(q)
    setResults(list)
    setSearched(true)
    setLoading(false)
    if (list.length === 0) {
      setError(`Nothing found for "${q}"`)
    }
  }

  const doRandom = async () => {
    setLoading(true)
    setError('')
    const r = await fetchRandomRecipe()
    setLoading(false)
    if (r) {
      onSelect(r)
    } else {
      setError('Could not load a random recipe')
    }
  }

  const handleSearch = () => {
    if (!query.trim()) {
      return
    }
    void doSearch(query.trim())
  }

  return (
    <div className="p-4 max-w-[480px] mx-auto">
      <h2 className="text-lg font-bold text-slate-100 mb-1">Find a Recipe</h2>
      <p className="text-[13px] text-slate-500 mb-4">
        Search by name or get a random dish
      </p>

      <div className="flex gap-2 mb-2.5">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Chicken, pasta, sushi…"
          disabled={loading}
          className="input-field flex-1"
        />
        <button
          onClick={handleSearch}
          disabled={loading || !query.trim()}
          className={`px-4 py-2.5 rounded-lg border-none text-sm font-semibold text-white whitespace-nowrap transition-opacity ${
            !query.trim() || loading
              ? 'bg-slate-700 cursor-not-allowed opacity-50'
              : 'bg-gradient-to-br from-blue-500 to-violet-500 cursor-pointer hover:opacity-90'
          }`}
        >
          Search
        </button>
      </div>

      <button
        onClick={() => void doRandom()}
        disabled={loading}
        className={`w-full py-2.5 rounded-lg border border-slate-700 bg-transparent text-sm font-semibold mb-4 transition-colors ${
          loading
            ? 'text-slate-600 cursor-not-allowed'
            : 'text-slate-400 cursor-pointer hover:border-slate-500 hover:text-slate-300'
        }`}
      >
        {loading ? 'Loading…' : '🎲 Random Recipe'}
      </button>

      {error && (
        <p className="text-[13px] text-red-400 text-center mb-3">{error}</p>
      )}

      {results.length > 0 && (
        <>
          <div className="flex flex-col gap-2">
            {visible.map((r) => (
              <button
                key={r.id}
                onClick={() => onSelect(r)}
                className="flex items-center gap-3 p-2 rounded-[10px] border border-slate-700 bg-slate-800 cursor-pointer text-left text-slate-200 transition-colors hover:border-blue-500"
              >
                <img
                  src={proxyImageUrl(r.image)}
                  alt={r.title}
                  className="w-14 h-14 rounded-lg object-cover shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-slate-100 truncate">
                    {r.title}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {[r.category, r.area].filter(Boolean).join(' · ')}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-3">
              <button
                onClick={() => setPage((p) => p - 1)}
                disabled={page === 0}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold border border-slate-700 transition-colors ${
                  page === 0
                    ? 'text-slate-600 cursor-not-allowed'
                    : 'text-slate-300 cursor-pointer hover:border-slate-500'
                }`}
              >
                ← Prev
              </button>
              <span className="text-xs text-slate-500">
                {page + 1} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page >= totalPages - 1}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold border border-slate-700 transition-colors ${
                  page >= totalPages - 1
                    ? 'text-slate-600 cursor-not-allowed'
                    : 'text-slate-300 cursor-pointer hover:border-slate-500'
                }`}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}

      {searched && results.length === 0 && !error && (
        <p className="text-[13px] text-slate-500 text-center">No results</p>
      )}
    </div>
  )
}
