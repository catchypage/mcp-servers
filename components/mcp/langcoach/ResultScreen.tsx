import React from 'react'

type Theme = 'dark' | 'light'

interface BreakdownEntry {
  correct: number
  total: number
  pct: number
}

interface PlacementResult {
  level: string
  label: string
  breakdown: Record<string, BreakdownEntry>
  totalCorrect: number
  totalQuestions: number
  pct: number
}

const CEFR_COLORS: Record<string, string> = {
  A1: '#ef4444',
  A2: '#f97316',
  B1: '#eab308',
  B2: '#22c55e',
  C1: '#3b82f6',
}

const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1'] as const

interface Props {
  result: PlacementResult
  theme: Theme
  tt: (key: string) => string
  onRestart: () => void
}

export default function ResultScreen({ result, theme, tt, onRestart }: Props) {
  const color = CEFR_COLORS[result.level] ?? '#6b7280'
  const isDark = theme === 'dark'

  const cardBg = isDark ? 'bg-[#1a1f25]' : 'bg-white'
  const titleText = isDark ? 'text-gray-100' : 'text-gray-900'
  const subtitleText = isDark ? 'text-gray-400' : 'text-gray-500'
  const breakdownTitle = isDark ? 'text-gray-300' : 'text-gray-700'
  const trackBg = isDark ? 'bg-[#2d333b]' : 'bg-gray-200'
  const barLabel = isDark ? 'text-gray-400' : 'text-gray-500'

  return (
    <div className="flex items-start justify-center p-6 px-4">
      <div
        className={`w-full max-w-[520px] ${cardBg} rounded-2xl py-8 px-6 flex flex-col gap-4`}
      >
        <h1 className={`text-xl font-bold text-center ${titleText}`}>
          {tt('resultTitle')}
        </h1>
        <p
          className={`text-[0.95rem] leading-relaxed text-center ${subtitleText}`}
        >
          {tt('resultDescription')}
        </p>

        <div
          className="w-[100px] h-[100px] rounded-full border-4 flex items-center justify-center text-3xl font-extrabold mx-auto my-2"
          style={{ borderColor: color, color }}
        >
          {result.level}
        </div>
        <p className="text-center text-lg font-semibold" style={{ color }}>
          {tt(result.level)}
        </p>
        <p className={`text-center text-sm ${subtitleText}`}>
          {result.totalCorrect}/{result.totalQuestions} {tt('correct')} (
          {result.pct}%)
        </p>

        <h2 className={`text-base font-semibold mt-2 ${breakdownTitle}`}>
          {tt('breakdown')}
        </h2>
        <div className="flex flex-col gap-1.5">
          {CEFR_LEVELS.map((lvl) => {
            const d = result.breakdown[lvl]
            if (!d || d.total === 0) {
              return null
            }
            const barColor = CEFR_COLORS[lvl]
            return (
              <div key={lvl} className="flex items-center gap-2">
                <span
                  className="w-7 font-bold text-sm shrink-0"
                  style={{ color: barColor }}
                >
                  {lvl}
                </span>
                <div
                  className={`flex-1 h-2 rounded ${trackBg} overflow-hidden`}
                >
                  <div
                    className="h-full rounded transition-[width] duration-[400ms] ease-in-out"
                    style={{ width: `${d.pct}%`, background: barColor }}
                  />
                </div>
                <span
                  className={`w-10 text-right text-xs shrink-0 ${barLabel}`}
                >
                  {d.correct}/{d.total}
                </span>
              </div>
            )
          })}
        </div>

        <button
          className="py-2.5 px-5 rounded-[10px] border border-blue-500 bg-transparent text-blue-400 font-semibold text-sm cursor-pointer text-center hover:bg-blue-500/10 transition-colors"
          onClick={onRestart}
        >
          {tt('home')}
        </button>
      </div>
    </div>
  )
}
