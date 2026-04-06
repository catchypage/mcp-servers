import React from 'react'
import type { Screen } from './types'

interface HeaderProps {
  screen: Screen
  onNavigate: (s: Screen) => void
}

export default function Header({ screen, onNavigate }: HeaderProps) {
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
      <nav className="flex gap-1">
        <NavBtn
          active={screen === 'search' || screen === 'results'}
          onClick={() => onNavigate('search')}
        >
          Search
        </NavBtn>
        <NavBtn
          active={screen === 'random'}
          onClick={() => onNavigate('random')}
        >
          Random
        </NavBtn>
      </nav>
    </header>
  )
}

function NavBtn({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
        active
          ? 'bg-indigo-600 text-white'
          : 'text-slate-400 hover:text-white hover:bg-slate-700/60'
      }`}
    >
      {children}
    </button>
  )
}
