import React from 'react'

interface Question {
  id: string
  stem: string
  options: string[]
}

interface Props {
  question: Question
  currentIdx: number
  totalQuestions: number
  selected: number | null
  loading: boolean
  isLast: boolean
  tt: (key: string, vars?: Record<string, string | number>) => string
  onSelect: (idx: number) => void
  onNext: () => void
}

export default function TestScreen({
  question,
  currentIdx,
  totalQuestions,
  selected,
  loading,
  isLast,
  tt,
  onSelect,
  onNext,
}: Props) {
  const progress = ((currentIdx + 1) / totalQuestions) * 100

  return (
    <>
      <div className="w-full h-1.5 rounded-full bg-[#2d333b] overflow-hidden">
        <div
          className="h-full rounded-full bg-blue-500 transition-[width] duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-center text-gray-500 text-[0.85rem]">
        {tt('questionOf', { n: currentIdx + 1, total: totalQuestions })}
      </p>

      <p className="text-lg leading-relaxed text-gray-200 my-2">
        {question.stem}
      </p>

      <div className="flex flex-col gap-2">
        {question.options.map((opt, i) => (
          <button
            key={i}
            className={`flex items-center gap-2.5 py-3 px-3.5 rounded-[10px] border cursor-pointer text-[0.95rem] text-left transition-colors ${
              selected === i
                ? 'border-blue-500 bg-blue-500/10 text-gray-100'
                : 'border-[#2d333b] bg-[#161b22] text-gray-300 hover:border-[#444]'
            }`}
            onClick={() => onSelect(i)}
          >
            <span className="w-7 h-7 rounded-full bg-[#2d333b] flex items-center justify-center text-xs font-semibold shrink-0 text-gray-400">
              {String.fromCharCode(65 + i)}
            </span>
            {opt}
          </button>
        ))}
      </div>

      <button
        className={`py-3 px-6 rounded-[10px] border-none bg-blue-500 text-white font-semibold text-base cursor-pointer text-center transition-opacity ${
          selected === null ? 'opacity-40 cursor-default' : 'hover:opacity-90'
        }`}
        onClick={onNext}
        disabled={selected === null || loading}
      >
        {loading ? '…' : isLast ? tt('finish') : tt('next')}
      </button>
    </>
  )
}
