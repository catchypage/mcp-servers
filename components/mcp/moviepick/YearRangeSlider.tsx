import React, { useCallback, useId } from 'react'
import {
  YEAR_SLIDER_MAX,
  YEAR_SLIDER_MIN,
} from './types'

type YearRangeSliderProps = {
  fromYear: number
  toYear: number
  onChange: (fromYear: number, toYear: number) => void
  disabled?: boolean
}

export default function YearRangeSlider({
  fromYear,
  toYear,
  onChange,
  disabled,
}: YearRangeSliderProps) {
  const lo = Math.min(fromYear, toYear)
  const hi = Math.max(fromYear, toYear)
  const baseId = useId()

  const setLo = useCallback(
    (v: number) => {
      const n = Math.max(YEAR_SLIDER_MIN, Math.min(v, hi))
      onChange(n, hi)
    },
    [onChange, hi],
  )

  const setHi = useCallback(
    (v: number) => {
      const n = Math.min(YEAR_SLIDER_MAX, Math.max(v, lo))
      onChange(lo, n)
    },
    [onChange, lo],
  )

  const onLoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLo(Number(e.target.value))
  }

  const onHiInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHi(Number(e.target.value))
  }

  const onLoNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4)
    if (raw.length === 0) {
      return
    }
    const y = parseInt(raw, 10)
    if (Number.isFinite(y)) {
      setLo(Math.min(Math.max(y, YEAR_SLIDER_MIN), YEAR_SLIDER_MAX))
    }
  }

  const onHiNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4)
    if (raw.length === 0) {
      return
    }
    const y = parseInt(raw, 10)
    if (Number.isFinite(y)) {
      setHi(Math.min(Math.max(y, YEAR_SLIDER_MIN), YEAR_SLIDER_MAX))
    }
  }

  const zLo = lo >= hi - 1 ? 20 : 10
  const zHi = lo >= hi - 1 ? 10 : 20

  return (
    <div
      className={`space-y-2 ${disabled ? 'opacity-40 pointer-events-none' : ''}`}
    >
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex flex-col gap-0.5 min-w-[4.5rem]">
          <label
            htmlFor={`${baseId}-from`}
            className="text-[10px] text-slate-500 uppercase tracking-wide"
          >
            From
          </label>
          <input
            id={`${baseId}-from`}
            type="text"
            inputMode="numeric"
            value={String(lo)}
            onChange={onLoNumber}
            className="w-full px-2 py-1.5 rounded-md bg-slate-800 border border-slate-600 text-xs text-white tabular-nums focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="flex flex-col gap-0.5 min-w-[4.5rem]">
          <label
            htmlFor={`${baseId}-to`}
            className="text-[10px] text-slate-500 uppercase tracking-wide"
          >
            To
          </label>
          <input
            id={`${baseId}-to`}
            type="text"
            inputMode="numeric"
            value={String(hi)}
            onChange={onHiNumber}
            className="w-full px-2 py-1.5 rounded-md bg-slate-800 border border-slate-600 text-xs text-white tabular-nums focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="relative h-9 pt-1">
        <div
          className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-slate-700"
          aria-hidden
        />
        <input
          type="range"
          min={YEAR_SLIDER_MIN}
          max={hi}
          value={lo}
          disabled={disabled}
          onChange={onLoInput}
          className="absolute w-full h-9 bg-transparent appearance-none cursor-pointer accent-indigo-500 pointer-events-auto"
          style={{ zIndex: zLo }}
        />
        <input
          type="range"
          min={lo}
          max={YEAR_SLIDER_MAX}
          value={hi}
          disabled={disabled}
          onChange={onHiInput}
          className="absolute w-full h-9 bg-transparent appearance-none cursor-pointer accent-violet-500 pointer-events-auto"
          style={{ zIndex: zHi }}
        />
      </div>
      <p className="text-[10px] text-slate-500 leading-snug">
        Full bar ({YEAR_SLIDER_MIN}–{YEAR_SLIDER_MAX}) means no year filter.
        Narrow the range to limit release or first-air years.
      </p>
    </div>
  )
}
