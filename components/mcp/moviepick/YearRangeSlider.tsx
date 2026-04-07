import React, { useEffect, useId, useRef, useState } from 'react'
import { Direction, getTrackBackground, Range } from 'react-range'
import { YEAR_SLIDER_MAX, YEAR_SLIDER_MIN } from './types'

interface YearRangeSliderProps {
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
  const values = [lo, hi]
  const baseId = useId()
  const labelId = `${baseId}-yr-label`

  const [draftFrom, setDraftFrom] = useState(() => String(lo))
  const [draftTo, setDraftTo] = useState(() => String(hi))
  const fromFocusedRef = useRef(false)
  const toFocusedRef = useRef(false)

  useEffect(() => {
    if (!fromFocusedRef.current) {
      setDraftFrom(String(lo))
    }
  }, [lo])

  useEffect(() => {
    if (!toFocusedRef.current) {
      setDraftTo(String(hi))
    }
  }, [hi])

  function parseDraft(s: string): number | null {
    const raw = s.replace(/\D/g, '').slice(0, 4)
    if (raw.length === 0) {
      return null
    }
    const y = parseInt(raw, 10)
    return Number.isFinite(y) ? y : null
  }

  const commitFrom = () => {
    fromFocusedRef.current = false
    const n = parseDraft(draftFrom)
    if (n == null) {
      setDraftFrom(String(lo))
      return
    }
    const clamped = Math.max(YEAR_SLIDER_MIN, Math.min(n, hi))
    setDraftFrom(String(clamped))
    if (clamped !== lo) {
      onChange(clamped, hi)
    }
  }

  const commitTo = () => {
    toFocusedRef.current = false
    const n = parseDraft(draftTo)
    if (n == null) {
      setDraftTo(String(hi))
      return
    }
    const clamped = Math.min(YEAR_SLIDER_MAX, Math.max(n, lo))
    setDraftTo(String(clamped))
    if (clamped !== hi) {
      onChange(lo, clamped)
    }
  }

  const onDraftFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraftFrom(e.target.value.replace(/\D/g, '').slice(0, 4))
  }

  const onDraftToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraftTo(e.target.value.replace(/\D/g, '').slice(0, 4))
  }

  return (
    <div
      className={`space-y-2 ${
        disabled ? 'opacity-40 pointer-events-none' : ''
      }`}
    >
      <span id={labelId} className="sr-only">
        Year range from {YEAR_SLIDER_MIN} to {YEAR_SLIDER_MAX}
      </span>

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
            value={draftFrom}
            onChange={onDraftFromChange}
            onFocus={() => {
              fromFocusedRef.current = true
            }}
            onBlur={commitFrom}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                ;(e.target as HTMLInputElement).blur()
              }
            }}
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
            value={draftTo}
            onChange={onDraftToChange}
            onFocus={() => {
              toFocusedRef.current = true
            }}
            onBlur={commitTo}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                ;(e.target as HTMLInputElement).blur()
              }
            }}
            className="w-full px-2 py-1.5 rounded-md bg-slate-800 border border-slate-600 text-xs text-white tabular-nums focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="relative h-10 flex items-center w-full min-w-0">
        <Range
          label="Year range"
          labelledBy={labelId}
          values={values}
          step={1}
          min={YEAR_SLIDER_MIN}
          max={YEAR_SLIDER_MAX}
          direction={Direction.Right}
          disabled={Boolean(disabled)}
          allowOverlap={false}
          draggableTrack={false}
          rtl={false}
          onChange={(vals) => {
            const [a, b] = vals
            onChange(a, b)
          }}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              className="w-full h-10 flex items-center"
              style={props.style}
            >
              <div
                ref={props.ref}
                className="h-2 w-full rounded-full relative"
                style={{
                  background: getTrackBackground({
                    values,
                    colors: [
                      'rgb(51 65 85)',
                      'rgb(79 70 229)',
                      'rgb(51 65 85)',
                    ],
                    min: YEAR_SLIDER_MIN,
                    max: YEAR_SLIDER_MAX,
                    direction: Direction.Right,
                  }),
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ index, props, isDragged }) => (
            <div
              {...props}
              className={`h-4 w-4 rounded-full border-2 border-solid bg-slate-900 shadow-md outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                index === 0 ? 'border-indigo-500' : 'border-violet-500'
              } ${isDragged ? 'ring-2 ring-white/25' : ''}`}
              style={{
                ...props.style,
              }}
            />
          )}
        />
      </div>

      <p className="text-[10px] text-slate-500 leading-snug">
        Full bar ({YEAR_SLIDER_MIN}–{YEAR_SLIDER_MAX}) means no year filter.
        Narrow the range to limit release or first-air years.
      </p>
    </div>
  )
}
