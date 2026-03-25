import React, { useState, useRef, useEffect } from 'react'
import { type Locale, ALL_LOCALES, LOCALE_LABELS } from './widget-i18n'

type Theme = 'dark' | 'light'

interface Props {
  tt: (key: string) => string
  locale: Locale
  theme: Theme
  level: string | null
  avatarUrl: string | null
  accountUrl: string
  onLocaleChange: (l: Locale) => void
  onThemeChange: (t: Theme) => void
  onPlacementTest: () => void
  onHome: () => void
}

const CEFR_COLORS: Record<string, string> = {
  A1: '#ef4444',
  A2: '#f97316',
  B1: '#eab308',
  B2: '#22c55e',
  C1: '#3b82f6',
}

export default function Header({
  tt,
  locale,
  theme,
  level,
  avatarUrl,
  accountUrl,
  onLocaleChange,
  onThemeChange,
  onPlacementTest,
  onHome,
}: Props) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const isDark = theme === 'dark'
  const bg = isDark ? 'bg-[#161b22]' : 'bg-white'
  const border = isDark ? 'border-[#2d333b]' : 'border-gray-200'
  const textPrimary = isDark ? 'text-gray-100' : 'text-gray-900'
  const textSecondary = isDark ? 'text-gray-400' : 'text-gray-500'
  const menuBg = isDark ? 'bg-[#1a1f25]' : 'bg-white'
  const menuHover = isDark ? 'hover:bg-[#22272e]' : 'hover:bg-gray-100'
  const menuBorder = isDark ? 'border-[#2d333b]' : 'border-gray-200'
  const selectBg = isDark ? 'bg-[#161b22]' : 'bg-gray-50'

  const lvlColor = level ? CEFR_COLORS[level] ?? '#6b7280' : undefined

  return (
    <div
      className={`flex items-center justify-between px-4 py-2.5 ${bg} border-b ${border}`}
    >
      <button
        className={`font-bold text-base ${textPrimary} bg-transparent border-none cursor-pointer`}
        onClick={onHome}
      >
        {tt('appTitle')}
      </button>

      <div className="flex items-center gap-2">
        <select
          value={locale}
          onChange={(e) => onLocaleChange(e.target.value as Locale)}
          className={`text-xs px-1.5 py-1 rounded border ${border} ${selectBg} ${textSecondary} cursor-pointer outline-none`}
        >
          {ALL_LOCALES.map((l) => (
            <option key={l} value={l}>
              {LOCALE_LABELS[l]}
            </option>
          ))}
        </select>

        {level ? (
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ color: lvlColor, border: `1px solid ${lvlColor}` }}
          >
            {level}
          </span>
        ) : (
          <button
            className="text-xs text-blue-400 bg-transparent border-none cursor-pointer hover:underline"
            onClick={onPlacementTest}
          >
            {tt('takeTest')}
          </button>
        )}

        <div className="relative" ref={menuRef}>
          <button
            className={`w-8 h-8 rounded-full border ${border} ${menuBg} cursor-pointer flex items-center justify-center overflow-hidden`}
            onClick={() => setOpen(!open)}
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <span className={`text-sm ${textSecondary}`}>☰</span>
            )}
          </button>

          {open && (
            <div
              className={`absolute right-0 top-10 w-52 rounded-xl ${menuBg} border ${menuBorder} shadow-lg z-50 py-1 overflow-hidden`}
            >
              {level && (
                <div
                  className={`px-4 py-2.5 ${textSecondary} text-xs border-b ${menuBorder}`}
                >
                  {tt('yourLevel')}:{' '}
                  <span className="font-bold" style={{ color: lvlColor }}>
                    {level}
                  </span>
                </div>
              )}

              <button
                className={`w-full text-left px-4 py-2.5 text-sm ${textPrimary} ${menuHover} border-none bg-transparent cursor-pointer`}
                onClick={() => {
                  onPlacementTest()
                  setOpen(false)
                }}
              >
                {level ? tt('retakeTest') : tt('placementTest')}
              </button>

              <div className={`border-t ${menuBorder}`} />

              <div className="px-4 py-2 flex items-center justify-between">
                <span className={`text-sm ${textSecondary}`}>
                  {tt('theme')}
                </span>
                <div className="flex gap-1">
                  <button
                    className={`text-xs px-2 py-1 rounded ${
                      isDark
                        ? 'bg-blue-500 text-white'
                        : `bg-transparent ${textSecondary} border ${menuBorder}`
                    } cursor-pointer`}
                    onClick={() => onThemeChange('dark')}
                  >
                    {tt('darkTheme')}
                  </button>
                  <button
                    className={`text-xs px-2 py-1 rounded ${
                      !isDark
                        ? 'bg-blue-500 text-white'
                        : `bg-transparent ${textSecondary} border ${menuBorder}`
                    } cursor-pointer`}
                    onClick={() => onThemeChange('light')}
                  >
                    {tt('lightTheme')}
                  </button>
                </div>
              </div>

              <div className={`border-t ${menuBorder}`} />

              <div
                className={`px-4 py-2 ${textSecondary} text-[11px] uppercase tracking-wide`}
              >
                {tt('comingSoon')}
              </div>
              {['dailyPractice', 'streaks', 'vocabBuilder'].map((key) => (
                <div
                  key={key}
                  className={`px-4 py-2 text-sm ${textSecondary} opacity-50 cursor-default`}
                >
                  {tt(key)}
                </div>
              ))}

              <div className={`border-t ${menuBorder}`} />

              <a
                href={accountUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`block px-4 py-2.5 text-sm ${textPrimary} ${menuHover} no-underline`}
              >
                {tt('account')}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
