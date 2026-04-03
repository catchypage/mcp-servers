import React, { useState } from 'react'
import type { RecipeData } from './types'
import { proxyImageUrl, openExternal } from './api'

interface Props {
  data: RecipeData
  onSearchNew: () => void
  onRandom: () => void
  randomLoading?: boolean
}

export default function RecipeCard({
  data: d,
  onSearchNew,
  onRandom,
  randomLoading,
}: Props) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const imgSrc = proxyImageUrl(d.image)

  return (
    <div className="max-w-[520px] mx-auto">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-b-2xl">
        {!imgLoaded && (
          <div className="h-[200px] bg-slate-800 flex items-center justify-center text-slate-500 text-sm">
            Loading image…
          </div>
        )}
        <img
          src={imgSrc}
          alt={d.title}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-[200px] object-cover ${
            imgLoaded ? 'block' : 'hidden'
          }`}
        />
        <div className="absolute bottom-0 inset-x-0 pt-9 pb-2.5 px-4 bg-gradient-to-t from-black/85 to-transparent">
          <h2 className="text-xl font-bold text-white mb-1.5">{d.title}</h2>
          <div className="flex gap-1.5 flex-wrap">
            {d.category && (
              <span className="text-[11px] bg-blue-500 text-white px-2 py-0.5 rounded-full">
                {d.category}
              </span>
            )}
            {d.area && (
              <span className="text-[11px] bg-violet-500 text-white px-2 py-0.5 rounded-full">
                {d.area}
              </span>
            )}
            {d.tags.map((t) => (
              <span
                key={t}
                className="text-[11px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Ingredients */}
        <h3 className="text-sm font-semibold text-slate-200 mb-2">
          Ingredients ({d.ingredients.length})
        </h3>
        <div className="grid grid-cols-2 gap-1.5 mb-4">
          {d.ingredients.map((ing, i) => (
            <div
              key={i}
              className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs"
            >
              <span className="text-slate-100">{ing.name}</span>
              {ing.amount && (
                <span className="text-slate-500 ml-1">{ing.amount}</span>
              )}
            </div>
          ))}
        </div>

        {/* Instructions */}
        <h3 className="text-sm font-semibold text-slate-200 mb-2">
          Instructions
        </h3>
        <ol className="pl-4 text-[13px] leading-relaxed text-slate-300 mb-4">
          {d.instructions.map((step, i) => (
            <li key={i} className="mb-1.5">
              {step}
            </li>
          ))}
        </ol>

        {d.youtube && (
          <button
            onClick={() => openExternal(d.youtube)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-red-600 text-white rounded-lg border-none text-xs font-semibold cursor-pointer hover:bg-red-700 transition-colors"
          >
            ▶ Watch on YouTube
          </button>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-5">
          <button
            onClick={onSearchNew}
            className="flex-1 py-2.5 rounded-lg border-none bg-gradient-to-br from-blue-500 to-violet-500 text-white text-[13px] font-semibold cursor-pointer hover:opacity-90 transition-opacity"
          >
            Search New
          </button>
          <button
            onClick={onRandom}
            disabled={randomLoading}
            className={`flex-1 py-2.5 rounded-lg border border-slate-700 bg-transparent text-[13px] font-semibold transition-colors ${
              randomLoading
                ? 'text-slate-600 cursor-not-allowed'
                : 'text-slate-400 cursor-pointer hover:border-slate-500 hover:text-slate-300'
            }`}
          >
            {randomLoading ? 'Loading…' : '🎲 Random'}
          </button>
        </div>
      </div>
    </div>
  )
}
