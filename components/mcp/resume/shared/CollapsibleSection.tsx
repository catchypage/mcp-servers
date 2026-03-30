import React, { useState } from 'react'

interface CollapsibleSectionProps {
  title: string
  filled: boolean
  defaultOpen?: boolean
  children: React.ReactNode
  headerRight?: React.ReactNode
}

export function CollapsibleSection({
  title,
  filled,
  defaultOpen = false,
  children,
  headerRight,
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <section className="mb-4 rounded-xl bg-white/5 border border-white/10 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          {/* Chevron */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`text-gray-400 transition-transform ${open ? 'rotate-90' : ''}`}
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          {/* Fill indicator */}
          {filled ? (
            <span className="inline-flex items-center gap-1 text-xs text-green-400 bg-green-500/15 px-2 py-0.5 rounded-full">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Filled
            </span>
          ) : (
            <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">
              Empty
            </span>
          )}
        </div>
        {headerRight && (
          <div onClick={(e) => e.stopPropagation()}>
            {headerRight}
          </div>
        )}
      </button>
      {open && (
        <div className="px-6 pb-6 pt-2">
          {children}
        </div>
      )}
    </section>
  )
}
