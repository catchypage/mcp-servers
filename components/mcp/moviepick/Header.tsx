import React from 'react'
import type { Screen } from './types'

interface HeaderProps {
  screen: Screen
  /** Detail opened from Random flow — keep Random tab highlighted */
  detailFromRandom?: boolean
  onNavigate: (s: Screen) => void
  /** Last viewed title (tooltip when reopen is available) */
  lastViewedTitle?: string | null
  /** True after user has opened any title detail in this session */
  hasLastViewed: boolean
  onOpenLast: () => void
  /** User opened current detail via Last tab */
  lastTabActive?: boolean
}

export default function Header({
  screen,
  detailFromRandom = false,
  onNavigate,
  lastViewedTitle,
  hasLastViewed,
  onOpenLast,
  lastTabActive = false,
}: HeaderProps) {
  const searchActive =
    !lastTabActive &&
    (screen === 'search' ||
      screen === 'results' ||
      (screen === 'detail' && !detailFromRandom))
  const randomActive =
    !lastTabActive &&
    (screen === 'random' || (screen === 'detail' && detailFromRandom))
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-slate-800/80 border-b border-slate-700/50 shrink-0">
      <button
        type="button"
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        onClick={() => onNavigate('search')}
      >
        <span className="text-lg">🎬</span>
        <h1 className="text-base font-bold text-white tracking-tight">
          MoviePick
        </h1>
      </button>
      <nav className="flex flex-wrap gap-1 justify-end shrink-0 min-w-0 max-w-[65%] sm:max-w-none">
        <NavBtn active={searchActive} onClick={() => onNavigate('search')}>
          Search
        </NavBtn>
        <NavBtn active={randomActive} onClick={() => onNavigate('random')}>
          Random
        </NavBtn>
        <NavBtn
          active={lastTabActive}
          disabled={!hasLastViewed}
          onClick={() => {
            if (hasLastViewed) {
              onOpenLast()
            }
          }}
          title={
            hasLastViewed
              ? lastViewedTitle ?? 'Open last viewed title'
              : 'Open a movie or show first'
          }
        >
          Last
        </NavBtn>
      </nav>
    </header>
  )
}

function NavBtn({
  active,
  disabled,
  onClick,
  title,
  children,
}: {
  active: boolean
  disabled?: boolean
  onClick: () => void
  title?: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      title={title}
      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
        disabled
          ? 'text-slate-600 cursor-not-allowed opacity-70'
          : active
          ? 'bg-indigo-600 text-white'
          : 'text-slate-400 hover:text-white hover:bg-slate-700/60'
      }`}
    >
      {children}
    </button>
  )
}
