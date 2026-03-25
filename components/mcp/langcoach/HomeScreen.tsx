import React from 'react'

type Theme = 'dark' | 'light'

const CEFR_COLORS: Record<string, string> = {
  A1: '#ef4444',
  A2: '#f97316',
  B1: '#eab308',
  B2: '#22c55e',
  C1: '#3b82f6',
}

const COMING_SOON_ITEMS = [
  { key: 'dailyPractice', icon: '📝' },
  { key: 'streaks', icon: '🔥' },
  { key: 'vocabBuilder', icon: '📚' },
]

interface Props {
  tt: (key: string) => string
  theme: Theme
  level: string | null
  onPlacementTest: () => void
}

export default function HomeScreen({
  tt,
  theme,
  level,
  onPlacementTest,
}: Props) {
  const isDark = theme === 'dark'
  const cardBg = isDark ? 'bg-[#1a1f25]' : 'bg-gray-50'
  const textPrimary = isDark ? 'text-gray-100' : 'text-gray-900'
  const textSecondary = isDark ? 'text-gray-400' : 'text-gray-500'
  const border = isDark ? 'border-[#2d333b]' : 'border-gray-200'
  const lvlColor = level ? CEFR_COLORS[level] ?? '#6b7280' : undefined

  return (
    <div className="flex flex-col gap-4 p-5">
      <div
        className={`${cardBg} rounded-2xl p-6 flex flex-col items-center gap-3 border ${border}`}
      >
        {level ? (
          <>
            <p className={`text-sm ${textSecondary}`}>{tt('homeLevelSet')}</p>
            <div
              className="w-20 h-20 rounded-full border-[3px] flex items-center justify-center text-2xl font-extrabold"
              style={{ borderColor: lvlColor, color: lvlColor }}
            >
              {level}
            </div>
            <p className="text-base font-semibold" style={{ color: lvlColor }}>
              {tt(level)}
            </p>
            <button
              className={`mt-2 py-2 px-5 rounded-lg border ${border} bg-transparent ${textSecondary} text-sm cursor-pointer hover:opacity-80 transition-opacity`}
              onClick={onPlacementTest}
            >
              {tt('retakeTest')}
            </button>
          </>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center">
              <span className="text-4xl">🎓</span>
            </div>
            <h2 className={`text-lg font-bold text-center ${textPrimary}`}>
              {tt('homeWelcome')}
            </h2>
            <p className={`text-sm text-center ${textSecondary} max-w-xs`}>
              {tt('homeSubtitle')}
            </p>
            <button
              className="mt-1 py-2.5 px-6 rounded-[10px] border-none bg-blue-500 text-white font-semibold text-sm cursor-pointer hover:opacity-90 transition-opacity"
              onClick={onPlacementTest}
            >
              {tt('takeTest')}
            </button>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {COMING_SOON_ITEMS.map(({ key, icon }) => (
          <div
            key={key}
            className={`${cardBg} rounded-xl p-4 flex items-center gap-3 border ${border} opacity-60`}
          >
            <span className="text-2xl">{icon}</span>
            <div className="flex-1">
              <p className={`text-sm font-medium ${textPrimary}`}>{tt(key)}</p>
              <p className={`text-xs ${textSecondary}`}>{tt('comingSoon')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
