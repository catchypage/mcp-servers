import React from 'react'
import { type ResumeStyle } from '../styles'
import { type ResumeData } from '../types'
import ResumePreview from '../ResumePreview'

interface StylePreviewCardProps {
  style: ResumeStyle
  selected: boolean
  onSelect: () => void
  demoData: ResumeData
}

export function StylePreviewCard({
  style,
  selected,
  onSelect,
  demoData,
}: StylePreviewCardProps) {
  return (
    <button
      onClick={onSelect}
      className={`relative rounded-lg border-2 transition-all text-left overflow-hidden ${
        selected
          ? 'border-blue-500 ring-2 ring-blue-500/30'
          : 'border-white/10 hover:border-white/30'
      }`}
    >
      {/* Thumbnail: scaled resume */}
      <div
        className="relative overflow-hidden"
        style={{ height: 220, background: style.preview.bg }}
      >
        <div
          style={{
            transform: 'scale(0.25)',
            transformOrigin: 'top left',
            width: 800,
            height: 1050,
            overflow: 'hidden',
            pointerEvents: 'none',
          }}
        >
          <ResumePreview data={demoData} style={style} />
        </div>
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-12"
          style={{
            background:
              'linear-gradient(to top, rgba(3,7,18,1) 0%, transparent 100%)',
          }}
        />
      </div>

      {/* Label */}
      <div className="px-2.5 pb-2 pt-1 bg-gray-950">
        <h3 className="font-semibold text-white text-xs">{style.name}</h3>
      </div>

      {selected && (
        <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      )}
    </button>
  )
}
