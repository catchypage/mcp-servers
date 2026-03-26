'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { type Locale, ALL_LOCALES, useT } from './widget-i18n'
import '../openai-types'
import Header from './Header'
import HomeScreen from './HomeScreen'
import TestScreen from './TestScreen'
import ResultScreen from './ResultScreen'

type Theme = 'dark' | 'light'

interface Question {
  id: string
  stem: string
  options: string[]
}

interface PlacementResult {
  level: string
  label: string
  breakdown: Record<string, { correct: number; total: number; pct: number }>
  totalCorrect: number
  totalQuestions: number
  pct: number
}

interface Profile {
  placement_level: string | null
  placement_score: number | null
  placement_pct: number | null
  ui_locale: string
  theme: Theme
}

type Screen = 'home' | 'test' | 'result'

export default function LangCoachWidget() {
  const [locale, setLocale] = useState<Locale>(() => {
    try {
      const nav = typeof navigator !== 'undefined' ? navigator.language : 'en'
      const short = nav.slice(0, 2).toLowerCase() as Locale
      return ALL_LOCALES.includes(short) ? short : 'en'
    } catch {
      return 'en'
    }
  })
  const [theme, setTheme] = useState<Theme>('dark')
  const [screen, setScreen] = useState<Screen>('home')
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [selected, setSelected] = useState<number | null>(null)
  const [result, setResult] = useState<PlacementResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [level, setLevel] = useState<string | null>(null)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [accountUrl, setAccountUrl] = useState('')

  const tt = useT(locale)

  const callTool = useCallback(
    async (
      name: string,
      args: Record<string, unknown>,
    ): Promise<Record<string, unknown> | null> => {
      if (!window.openai?.callTool) {
        return null
      }
      try {
        const res = await window.openai.callTool(name, args)
        return res.structuredContent ?? res
      } catch (e) {
        console.error(`[LangCoach] callTool ${name} failed:`, e)
        return null
      }
    },
    [],
  )

  useEffect(() => {
    void callTool('get_user_info', {}).then((data) => {
      if (!data) {
        return
      }
      const u = data.user as Record<string, unknown> | undefined
      const p = data.profile as Profile | undefined
      if (u?.avatar_url) {
        setAvatarUrl(String(u.avatar_url))
      }
      if (data.accountUrl) {
        setAccountUrl(String(data.accountUrl))
      }
      if (p) {
        if (p.placement_level) {
          setLevel(p.placement_level)
        }
        if (p.ui_locale && ALL_LOCALES.includes(p.ui_locale as Locale)) {
          setLocale(p.ui_locale as Locale)
        }
        if (p.theme === 'dark' || p.theme === 'light') {
          setTheme(p.theme)
        }
      }
    })
  }, [callTool])

  const handleLocaleChange = useCallback(
    (l: Locale) => {
      setLocale(l)
      void callTool('update_langcoach_profile', { ui_locale: l })
    },
    [callTool],
  )

  const handleThemeChange = useCallback(
    (t: Theme) => {
      setTheme(t)
      void callTool('update_langcoach_profile', { theme: t })
    },
    [callTool],
  )

  const handleStartTest = useCallback(async () => {
    setLoading(true)
    setError(null)
    const data = await callTool('start_placement_test', { locale })
    if (data?.questions && Array.isArray(data.questions)) {
      setQuestions(data.questions as Question[])
      setScreen('test')
      setCurrentIdx(0)
      setAnswers({})
      setSelected(null)
      setResult(null)
    } else {
      setError(tt('errorLoad'))
    }
    setLoading(false)
  }, [callTool, locale, tt])

  const handleSelect = useCallback((idx: number) => setSelected(idx), [])

  const handleNext = useCallback(() => {
    if (selected === null) {
      return
    }
    const q = questions[currentIdx]
    const newAnswers = { ...answers, [q.id]: selected }
    setAnswers(newAnswers)
    setSelected(null)

    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1)
    } else {
      setLoading(true)
      void callTool('submit_placement_test', { answers: newAnswers }).then(
        (data) => {
          setLoading(false)
          if (data?.level) {
            setResult(data as unknown as PlacementResult)
            setLevel(String(data.level))
            setScreen('result')
          } else {
            setError('Failed to submit test')
          }
        },
      )
    }
  }, [selected, questions, currentIdx, answers, callTool])

  const handleGoHome = useCallback(() => {
    setScreen('home')
    setQuestions([])
    setResult(null)
    setAnswers({})
    setCurrentIdx(0)
    setSelected(null)
  }, [])

  const isDark = theme === 'dark'
  const rootBg = isDark ? 'bg-[#0f1419]' : 'bg-gray-100'
  const rootText = isDark ? 'text-[#e7e9ea]' : 'text-gray-900'

  return (
    <div
      className={`h-[600px] overflow-y-auto flex flex-col font-sans ${rootBg} ${rootText}`}
    >
      <Header
        tt={tt}
        locale={locale}
        theme={theme}
        level={level}
        avatarUrl={avatarUrl}
        accountUrl={accountUrl}
        onLocaleChange={handleLocaleChange}
        onThemeChange={handleThemeChange}
        onPlacementTest={() => void handleStartTest()}
        onHome={handleGoHome}
      />

      <div className="flex-1 overflow-y-auto">
        {screen === 'home' && (
          <HomeScreen
            tt={tt}
            theme={theme}
            level={level}
            onPlacementTest={() => void handleStartTest()}
          />
        )}

        {screen === 'test' && questions.length > 0 && (
          <div className="flex items-start justify-center p-6 px-4">
            <div
              className={`w-full max-w-[520px] ${
                isDark ? 'bg-[#1a1f25]' : 'bg-white'
              } rounded-2xl py-8 px-6 flex flex-col gap-4`}
            >
              <TestScreen
                question={questions[currentIdx]}
                currentIdx={currentIdx}
                totalQuestions={questions.length}
                selected={selected}
                loading={loading}
                isLast={currentIdx + 1 === questions.length}
                theme={theme}
                tt={tt}
                onSelect={handleSelect}
                onNext={handleNext}
              />
            </div>
          </div>
        )}

        {screen === 'result' && result && (
          <ResultScreen
            result={result}
            theme={theme}
            tt={tt}
            onRestart={handleGoHome}
          />
        )}

        {loading && screen === 'home' && (
          <div className="flex items-center justify-center py-8">
            <p
              className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              {tt('loading')}
            </p>
          </div>
        )}

        {error && screen === 'home' && (
          <div className="flex flex-col items-center gap-3 py-4 px-6">
            <p className="text-red-500 text-sm text-center">{error}</p>
            <button
              className="py-2 px-5 rounded-lg border-none bg-blue-500 text-white font-semibold text-sm cursor-pointer hover:opacity-90"
              onClick={() => void handleStartTest()}
            >
              {tt('retry')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
