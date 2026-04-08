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
  GameDetail as GameDetailType,
  LastViewedGameState,
} from './types'
import {
  useToolInput,
  useToolOutput,
  useOpenAiMaxHeight,
  useOpenAiDisplayMode,
} from '../hooks/useOpenAiGlobals'
import { notifyOpenAiIntrinsicHeight } from '../notify-openai-intrinsic-height'
import { fetchGameDetail, parseMergedGameDetail } from './api'
import Header from './Header'
import GameSearch from './GameSearch'
import GameDetailView from './GameDetail'
import {
  mergeGamepickToolOutputAndInput,
  unwrapGamepickPayload,
  parseGamesFromInit,
} from './resolve-gamepick-init'
import type { GameSearchMcpInit } from './types'

const GAMEPICK_INLINE_HEIGHT_PX = 700

function containerHeightPx(
  isExpanded: boolean,
  hostMax: number | undefined,
): number {
  if (!isExpanded) {
    return GAMEPICK_INLINE_HEIGHT_PX
  }
  if (hostMax && hostMax > 0) {
    return hostMax
  }
  if (typeof window !== 'undefined') {
    return Math.max(window.innerHeight ?? 800, GAMEPICK_INLINE_HEIGHT_PX)
  }
  return GAMEPICK_INLINE_HEIGHT_PX
}

export default function GamePickWidget() {
  const toolOutput = useToolOutput()
  const toolInput = useToolInput()
  const hostMaxHeight = useOpenAiMaxHeight()
  const displayMode = useOpenAiDisplayMode()
  const initAppliedRef = useRef(false)

  const mode = displayMode?.toLowerCase() ?? 'inline'
  const isExpandedLayout = mode === 'fullscreen' || mode === 'pip'
  const containerHeight = containerHeightPx(isExpandedLayout, hostMaxHeight)

  const [screen, setScreen] = useState<Screen>('loading')
  const [game, setGame] = useState<GameDetailType | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [prevScreen, setPrevScreen] = useState<Screen>('search')
  const [searchMcpInit, setSearchMcpInit] = useState<GameSearchMcpInit | null>(
    null,
  )
  const [lastViewed, setLastViewed] = useState<LastViewedGameState | null>(null)
  const [lastTabActive, setLastTabActive] = useState(false)

  const applyMergedContext = useCallback((ctx: Record<string, unknown>) => {
    setLastTabActive(false)
    setSearchMcpInit(null)

    const m = String(ctx.mode ?? 'search')

    if (m === 'detail' && ctx.game && typeof ctx.game === 'object') {
      const g = parseMergedGameDetail(ctx.game)
      if (g) {
        setGame(g)
        setPrevScreen('search')
        setScreen('detail')
      } else {
        setSearchMcpInit({ query: '', autoSearch: false })
        setScreen('search')
      }
      return
    }

    if (m === 'results' && Array.isArray(ctx.results)) {
      const results = parseGamesFromInit(ctx.results) ?? []
      const q = String(ctx.query ?? '')
      setSearchMcpInit({
        query: q,
        initialResults: results,
        initialTotalPages:
          typeof ctx.total_pages === 'number' && ctx.total_pages >= 1
            ? ctx.total_pages
            : 1,
        initialTotalResults:
          typeof ctx.total_results === 'number' ? ctx.total_results : undefined,
        autoSearch: false,
      })
      setPrevScreen('search')
      setScreen('results')
      return
    }

    const q = String(ctx.query ?? '')
    const hasQuery = q.trim().length > 0
    const initial = parseGamesFromInit(ctx.results)
    setSearchMcpInit({
      query: q,
      initialResults: initial ?? undefined,
      initialTotalPages:
        typeof ctx.total_pages === 'number' && ctx.total_pages >= 1
          ? ctx.total_pages
          : 1,
      initialTotalResults:
        typeof ctx.total_results === 'number' ? ctx.total_results : undefined,
      autoSearch: Boolean(ctx.autoSearch) && hasQuery && !initial?.length,
    })
    setPrevScreen('search')
    setScreen('search')
  }, [])

  useEffect(() => {
    const merged = mergeGamepickToolOutputAndInput(toolOutput, toolInput)
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
          const merged = mergeGamepickToolOutputAndInput(w.toolResult, toolIn)
          if (merged?.mode) {
            initAppliedRef.current = true
            applyMergedContext(merged)
            return
          }
        }
        if (attempt < 10 && w?.getToolResult) {
          try {
            const gr = await w.getToolResult()
            const merged = mergeGamepickToolOutputAndInput(gr, toolIn)
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
        const merged = mergeGamepickToolOutputAndInput(w?.toolResult, toolIn)
        if (merged?.mode) {
          initAppliedRef.current = true
          applyMergedContext(merged)
        } else {
          const u = unwrapGamepickPayload(w?.toolResult)
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

  useEffect(() => {
    if (screen !== 'detail' || !game) {
      return
    }
    const back: LastViewedGameState['prevScreen'] =
      prevScreen === 'results' ? 'results' : 'search'
    setLastViewed({ game, prevScreen: back })
  }, [screen, game, prevScreen])

  const handleOpenLast = useCallback(() => {
    if (!lastViewed) {
      return
    }
    setLastTabActive(true)
    setGame(lastViewed.game)
    setPrevScreen(lastViewed.prevScreen)
    setScreen('detail')
  }, [lastViewed])

  useLayoutEffect(() => {
    const html = document.documentElement
    const body = document.body
    const root = document.getElementById('gamepick-root')
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

  const handleSelectGame = useCallback(
    async (id: string) => {
      setLastTabActive(false)
      setDetailLoading(true)
      setPrevScreen(screen === 'loading' ? 'search' : screen)
      const detail = await fetchGameDetail(id)
      setDetailLoading(false)
      if (detail) {
        setGame(detail)
        setScreen('detail')
      }
    },
    [screen],
  )

  const handleBack = useCallback(() => {
    setScreen(prevScreen)
  }, [prevScreen])

  const shellStyle: React.CSSProperties = {
    height: isExpandedLayout ? '100%' : GAMEPICK_INLINE_HEIGHT_PX,
  }

  if (screen === 'loading') {
    return (
      <div
        className="w-full flex items-center justify-center text-teal-500/80 text-sm font-sans bg-zinc-950"
        style={{ height: containerHeight }}
      >
        Loading GamePick…
      </div>
    )
  }

  return (
    <div
      className="w-full min-h-0 flex flex-col bg-zinc-950 text-zinc-200 font-sans overflow-hidden"
      style={shellStyle}
    >
      <Header
        hasLastViewed={Boolean(lastViewed)}
        lastTabActive={lastTabActive}
        onOpenLast={handleOpenLast}
      />
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {detailLoading && (
          <div className="flex items-center justify-center py-20">
            <span className="text-teal-500/70 text-sm">Loading…</span>
          </div>
        )}

        {!detailLoading && (screen === 'search' || screen === 'results') && (
          <GameSearch
            mcpInit={searchMcpInit}
            onSelect={(id) => void handleSelectGame(id)}
          />
        )}

        {!detailLoading && screen === 'detail' && game && (
          <GameDetailView
            game={game}
            onBack={handleBack}
            onSelectSimilar={(id) => void handleSelectGame(id)}
          />
        )}
      </div>
    </div>
  )
}
