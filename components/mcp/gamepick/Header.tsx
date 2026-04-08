import React from 'react'

interface HeaderProps {
  title?: string
  hasLastViewed: boolean
  lastTabActive: boolean
  onOpenLast: () => void
}

export default function Header({
  title = 'GamePick',
  hasLastViewed,
  lastTabActive,
  onOpenLast,
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-zinc-950/90 border-b border-teal-900/40 shrink-0 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <span className="text-lg" aria-hidden>
          🎮
        </span>
        <h1 className="text-base font-bold text-zinc-50 tracking-tight">
          {title}
        </h1>
      </div>
      <button
        type="button"
        disabled={!hasLastViewed}
        title={hasLastViewed ? 'Open last viewed game' : 'Open a game first'}
        onClick={() => {
          if (hasLastViewed) {
            onOpenLast()
          }
        }}
        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
          !hasLastViewed
            ? 'text-zinc-600 cursor-not-allowed opacity-60'
            : lastTabActive
              ? 'bg-teal-600 text-white shadow-md shadow-teal-950/40'
              : 'text-zinc-400 hover:text-teal-200 hover:bg-zinc-800/80 border border-zinc-700/60'
        }`}
      >
        Last
      </button>
    </header>
  )
}
