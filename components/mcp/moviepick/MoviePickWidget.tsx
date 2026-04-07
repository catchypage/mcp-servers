'use client'

import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useRef,
} from 'react'
import type {
  Screen,
  MovieDetail as MovieDetailType,
  RandomSnapshot,
} from './types'
import { YEAR_SLIDER_MAX, YEAR_SLIDER_MIN } from './types'
import {
  useToolInput,
  useToolOutput,
  useOpenAiMaxHeight,
  useOpenAiDisplayMode,
} from '../hooks/useOpenAiGlobals'
import { notifyOpenAiIntrinsicHeight } from '../notify-openai-intrinsic-height'
import { fetchMovieDetail, fetchRandomMovie } from './api'
import Header from './Header'
import MovieSearch from './MovieSearch'
import MovieDetailView from './MovieDetail'
import RandomPicker from './RandomPicker'
import {
  mergeMoviepickToolOutputAndInput,
  unwrapMoviepickPayload,
  parseSearchResultsFromInit,
  randomSnapshotFromMerged,
  parseMediaFromInit,
} from './resolve-moviepick-init'
import type { MovieSearchMcpInit, RandomMcpInit } from './types'

/** Inline height; expanded: host maxHeight + CSS height 100% (drafty-style). */
const MOVIEPICK_INLINE_HEIGHT_PX = 700

function moviepickContainerHeightPx(
  isExpanded: boolean,
  hostMax: number | undefined,
): number {
  if (!isExpanded) {
    return MOVIEPICK_INLINE_HEIGHT_PX
  }
  if (hostMax && hostMax > 0) {
    return hostMax
  }
  if (typeof window !== 'undefined') {
    return Math.max(window.innerHeight ?? 800, MOVIEPICK_INLINE_HEIGHT_PX)
  }
  return MOVIEPICK_INLINE_HEIGHT_PX
}

export default function MoviePickWidget() {
  const toolOutput = useToolOutput()
  const toolInput = useToolInput()
  const hostMaxHeight = useOpenAiMaxHeight()
  const displayMode = useOpenAiDisplayMode()
  const initAppliedRef = useRef(false)

  const mode = displayMode?.toLowerCase() ?? 'inline'
  // Expanded panel is often pip, not only fullscreen
  const isExpandedLayout = mode === 'fullscreen' || mode === 'pip'
  const containerHeight = moviepickContainerHeightPx(
    isExpandedLayout,
    hostMaxHeight,
  )

  const [screen, setScreen] = useState<Screen>('loading')
  const [movie, setMovie] = useState<MovieDetailType | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [prevScreen, setPrevScreen] = useState<Screen>('search')
  const [lastRandomSnapshot, setLastRandomSnapshot] =
    useState<RandomSnapshot | null>(null)
  const [detailFromRandom, setDetailFromRandom] = useState(false)
  const [randomAgainLoading, setRandomAgainLoading] = useState(false)
  const [searchMcpInit, setSearchMcpInit] = useState<MovieSearchMcpInit | null>(
    null,
  )
  const [randomMcpInit, setRandomMcpInit] = useState<RandomMcpInit | null>(null)

  const applyMergedContext = useCallback((ctx: Record<string, unknown>) => {
    setRandomMcpInit(null)
    setSearchMcpInit(null)

    const mode = String(ctx.mode ?? 'search')

    if (mode === 'detail' && ctx.movie && typeof ctx.movie === 'object') {
      setMovie(ctx.movie as unknown as MovieDetailType)
      setDetailFromRandom(Boolean(ctx.fromRandom))
      if (ctx.fromRandom) {
        setLastRandomSnapshot(randomSnapshotFromMerged(ctx))
      } else {
        setLastRandomSnapshot(null)
      }
      setPrevScreen(ctx.fromRandom ? 'random' : 'search')
      setScreen('detail')
      return
    }

    if (mode === 'results' && Array.isArray(ctx.results)) {
      const results = parseSearchResultsFromInit(ctx.results) ?? []
      const q = String(ctx.query ?? '')
      setSearchMcpInit({
        query: q,
        scope: parseMediaFromInit(ctx.media),
        genreIds: Array.isArray(ctx.genreIds)
          ? (ctx.genreIds as unknown[])
              .map((x) => Number(x))
              .filter((n) => n > 0)
          : [],
        yearFrom:
          typeof ctx.yearFrom === 'number' ? ctx.yearFrom : YEAR_SLIDER_MIN,
        yearTo: typeof ctx.yearTo === 'number' ? ctx.yearTo : YEAR_SLIDER_MAX,
        initialResults: results,
        initialTotalPages:
          typeof ctx.total_pages === 'number' && ctx.total_pages >= 1
            ? ctx.total_pages
            : 1,
        autoSearch: false,
      })
      setPrevScreen('search')
      setScreen('results')
      return
    }

    if (mode === 'random') {
      setRandomMcpInit({
        snapshot: randomSnapshotFromMerged(ctx),
        autoPick: ctx.autoPick !== false,
      })
      setPrevScreen('random')
      setScreen('random')
      return
    }

    const q = String(ctx.query ?? '')
    const hasQuery = q.trim().length > 0
    const initial = parseSearchResultsFromInit(ctx.results)
    setSearchMcpInit({
      query: q,
      scope: parseMediaFromInit(ctx.media),
      genreIds: Array.isArray(ctx.genreIds)
        ? (ctx.genreIds as unknown[]).map((x) => Number(x)).filter((n) => n > 0)
        : [],
      yearFrom:
        typeof ctx.yearFrom === 'number' ? ctx.yearFrom : YEAR_SLIDER_MIN,
      yearTo: typeof ctx.yearTo === 'number' ? ctx.yearTo : YEAR_SLIDER_MAX,
      initialResults: initial ?? undefined,
      initialTotalPages:
        typeof ctx.total_pages === 'number' && ctx.total_pages >= 1
          ? ctx.total_pages
          : 1,
      autoSearch: Boolean(ctx.autoSearch) && hasQuery && !initial?.length,
    })
    setPrevScreen('search')
    setScreen('search')
  }, [])

  useEffect(() => {
    const merged = mergeMoviepickToolOutputAndInput(toolOutput, toolInput)
    if (merged && !initAppliedRef.current) {
      initAppliedRef.current = true
      applyMergedContext(merged)
    }
  }, [toolOutput, toolInput, applyMergedContext])

  useEffect(() => {
    let cancelled = false
    const toolIn = toolInput

    void (async () => {
      for (let attempt = 0; attempt < 30; attempt++) {
        if (cancelled || initAppliedRef.current) {
          return
        }
        const w = window.openai
        if (w?.toolResult) {
          const merged = mergeMoviepickToolOutputAndInput(w.toolResult, toolIn)
          if (merged?.mode) {
            initAppliedRef.current = true
            applyMergedContext(merged)
            return
          }
        }
        if (attempt < 10 && w?.getToolResult) {
          try {
            const gr = await w.getToolResult()
            const merged = mergeMoviepickToolOutputAndInput(gr, toolIn)
            if (merged?.mode) {
              initAppliedRef.current = true
              applyMergedContext(merged)
              return
            }
          } catch {
            /* host may not support */
          }
        }
        await new Promise((r) => setTimeout(r, 100))
      }
      if (!cancelled && !initAppliedRef.current) {
        const w = window.openai
        const merged = mergeMoviepickToolOutputAndInput(w?.toolResult, toolIn)
        if (merged?.mode) {
          initAppliedRef.current = true
          applyMergedContext(merged)
        } else {
          const u = unwrapMoviepickPayload(w?.toolResult)
          if (u?.mode) {
            initAppliedRef.current = true
            applyMergedContext(u)
          } else {
            setScreen((prev) => (prev === 'loading' ? 'search' : prev))
          }
        }
      }
    })()

    return () => {
      cancelled = true
    }
  }, [applyMergedContext, toolInput])

  useEffect(() => {
    notifyOpenAiIntrinsicHeight(containerHeight)
  }, [containerHeight])

  useLayoutEffect(() => {
    const html = document.documentElement
    const body = document.body
    const root = document.getElementById('moviepick-root')
    if (isExpandedLayout) {
      html.style.height = '100%'
      html.style.minHeight = '100%'
      html.style.maxHeight = 'none'
      body.style.height = '100%'
      body.style.minHeight = '100%'
      body.style.maxHeight = 'none'
    } else {
      const h = `${containerHeight}px`
      html.style.height = h
      html.style.minHeight = h
      html.style.maxHeight = h
      body.style.height = h
      body.style.minHeight = h
      body.style.maxHeight = h
    }
    if (root) {
      root.style.height = '100%'
      root.style.minHeight = isExpandedLayout ? '100%' : `${containerHeight}px`
    }
    return () => {
      html.style.height = ''
      html.style.minHeight = ''
      html.style.maxHeight = ''
      body.style.height = ''
      body.style.minHeight = ''
      body.style.maxHeight = ''
      if (root) {
        root.style.height = ''
        root.style.minHeight = ''
      }
    }
  }, [containerHeight, isExpandedLayout])

  const handleSelectMovie = useCallback(
    async (id: string, kind: 'movie' | 'tv') => {
      setDetailLoading(true)
      setPrevScreen(screen === 'loading' ? 'search' : screen)
      setDetailFromRandom(false)
      setLastRandomSnapshot(null)
      const detail = await fetchMovieDetail(id, kind)
      setDetailLoading(false)
      if (detail) {
        setMovie(detail)
        setScreen('detail')
      }
    },
    [screen],
  )

  const handleBack = useCallback(() => {
    if (detailFromRandom) {
      setLastRandomSnapshot(null)
      setDetailFromRandom(false)
    }
    setScreen(prevScreen)
  }, [prevScreen, detailFromRandom])

  const handleNavigate = useCallback((s: Screen) => {
    setPrevScreen((prev) => (prev === 'loading' ? 'search' : prev))
    setScreen(s)
  }, [])

  const handleRandomAgain = useCallback(async () => {
    if (!lastRandomSnapshot) {
      return
    }
    setRandomAgainLoading(true)
    const m = await fetchRandomMovie({
      media: lastRandomSnapshot.media,
      genreIds: lastRandomSnapshot.genreIds,
      yearFrom: lastRandomSnapshot.yearFrom,
      yearTo: lastRandomSnapshot.yearTo,
    })
    setRandomAgainLoading(false)
    if (m) {
      setMovie(m)
    }
  }, [lastRandomSnapshot])

  const handleChangeRandomFilters = useCallback(() => {
    setLastRandomSnapshot(null)
    setDetailFromRandom(false)
    setMovie(null)
    setScreen('random')
    setPrevScreen('random')
  }, [])

  const shellStyle: React.CSSProperties = {
    height: isExpandedLayout ? '100%' : MOVIEPICK_INLINE_HEIGHT_PX,
  }

  if (screen === 'loading') {
    return (
      <div
        className="w-full flex items-center justify-center text-slate-500 text-sm font-sans bg-slate-900"
        style={{ height: containerHeight }}
      >
        Loading MoviePick…
      </div>
    )
  }

  return (
    <div
      className="w-full min-h-0 flex flex-col bg-slate-900 text-slate-200 font-sans overflow-hidden"
      style={shellStyle}
    >
      <Header screen={screen} onNavigate={handleNavigate} />
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {detailLoading && (
          <div className="flex items-center justify-center py-20">
            <span className="text-slate-500 text-sm">Loading details…</span>
          </div>
        )}

        {!detailLoading && (screen === 'search' || screen === 'results') && (
          <MovieSearch
            mcpInit={searchMcpInit}
            onSelect={(id, kind) => void handleSelectMovie(id, kind)}
          />
        )}

        {!detailLoading && screen === 'detail' && movie && (
          <MovieDetailView
            movie={movie}
            onBack={handleBack}
            randomActions={
              detailFromRandom && lastRandomSnapshot
                ? {
                    onRandomAgain: () => void handleRandomAgain(),
                    onChangeFilters: handleChangeRandomFilters,
                    againLoading: randomAgainLoading,
                  }
                : undefined
            }
          />
        )}

        {!detailLoading && screen === 'random' && (
          <RandomPicker
            mcpInit={randomMcpInit}
            onPicked={(m, snap) => {
              setPrevScreen('random')
              setLastRandomSnapshot(snap)
              setDetailFromRandom(true)
              setMovie(m)
              setScreen('detail')
            }}
          />
        )}
      </div>
    </div>
  )
}
