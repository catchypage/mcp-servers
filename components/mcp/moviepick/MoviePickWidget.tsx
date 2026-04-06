'use client'

import React, { useState, useEffect, useCallback } from 'react'
import type {
  Screen,
  MovieDetail as MovieDetailType,
  RandomSnapshot,
} from './types'
import { useToolData } from './useToolData'
import { fetchMovieDetail, fetchRandomMovie } from './api'
import Header from './Header'
import MovieSearch from './MovieSearch'
import MovieDetailView from './MovieDetail'
import RandomPicker from './RandomPicker'

export default function MoviePickWidget() {
  const { data: toolData, ready } = useToolData()
  const [screen, setScreen] = useState<Screen>('loading')
  const [movie, setMovie] = useState<MovieDetailType | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [prevScreen, setPrevScreen] = useState<Screen>('search')
  const [lastRandomSnapshot, setLastRandomSnapshot] =
    useState<RandomSnapshot | null>(null)
  const [detailFromRandom, setDetailFromRandom] = useState(false)
  const [randomAgainLoading, setRandomAgainLoading] = useState(false)

  useEffect(() => {
    if (!ready) {
      return
    }
    if (toolData?.mode === 'detail' && toolData.movie) {
      setMovie(toolData.movie as unknown as MovieDetailType)
      setDetailFromRandom(false)
      setLastRandomSnapshot(null)
      setScreen('detail')
    } else {
      setScreen('search')
    }
  }, [ready, toolData])

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

  if (screen === 'loading') {
    return (
      <div className="h-[700px] flex items-center justify-center text-slate-500 text-sm font-sans bg-slate-900">
        Loading MoviePick…
      </div>
    )
  }

  return (
    <div className="h-[700px] flex flex-col bg-slate-900 text-slate-200 font-sans overflow-hidden">
      <Header screen={screen} onNavigate={handleNavigate} />
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {detailLoading && (
          <div className="flex items-center justify-center py-20">
            <span className="text-slate-500 text-sm">Loading details…</span>
          </div>
        )}

        {!detailLoading && (screen === 'search' || screen === 'results') && (
          <MovieSearch
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
