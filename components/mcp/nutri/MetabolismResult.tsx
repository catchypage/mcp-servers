import React from 'react'
import type { MetabolismData } from './types'

const ACTIVITY_LABELS: Record<string, string> = {
  sedentary: 'Sedentary',
  light: 'Light (1-3 days/week)',
  moderate: 'Moderate (3-5 days/week)',
  active: 'Active (6-7 days/week)',
  very_active: 'Very active (athlete)',
}

const GOAL_LABELS: Record<string, string> = {
  lose: 'Weight Loss',
  maintain: 'Maintenance',
  gain: 'Weight Gain',
}

const GOAL_BG: Record<string, string> = {
  lose: 'bg-gradient-to-br from-violet-900/20 to-cyan-900/20',
  gain: 'bg-gradient-to-br from-amber-900/20 to-red-900/20',
  maintain: 'bg-gradient-to-br from-emerald-900/20 to-blue-900/20',
}

interface Props {
  data: MetabolismData
  onRecalculate: () => void
}

export default function MetabolismResult({ data: d, onRecalculate }: Props) {
  const proteinKcal = d.protein * 4
  const carbsKcal = d.carbs * 4
  const fatKcal = d.fat * 9

  return (
    <div className="p-4 max-w-[480px] mx-auto">
      <h2 className="text-lg font-bold text-slate-100 mb-1">Your Metabolism</h2>
      <p className="text-[13px] text-slate-400 mb-4">
        {d.gender === 'female' ? 'Female' : 'Male'}, {d.age}y, {d.weight_kg}kg,{' '}
        {d.height_cm}cm ·{' '}
        {ACTIVITY_LABELS[d.activity_level] ?? d.activity_level}
      </p>

      <div className="grid grid-cols-2 gap-2.5 mb-4">
        <StatCard
          label="BMR"
          value={d.bmr}
          unit="kcal/day"
          color="text-sky-400"
        />
        <StatCard
          label="TDEE"
          value={d.tdee}
          unit="kcal/day"
          color="text-violet-400"
        />
      </div>

      <div
        className={`${
          GOAL_BG[d.goal] ?? GOAL_BG.maintain
        } border border-slate-700 rounded-xl p-3.5 text-center mb-5`}
      >
        <div className="text-[11px] text-slate-400 mb-0.5">
          Goal: {GOAL_LABELS[d.goal] ?? 'Maintenance'}
        </div>
        <div className="text-[32px] font-extrabold text-slate-100">
          {d.goalCalories}
        </div>
        <div className="text-xs text-slate-400">kcal / day</div>
      </div>

      <h3 className="text-sm font-semibold text-slate-200 mb-2.5">
        Recommended Macros
      </h3>
      <MacroBar
        label="Protein"
        grams={d.protein}
        kcal={proteinKcal}
        color="bg-sky-400"
        total={d.goalCalories}
      />
      <MacroBar
        label="Carbs"
        grams={d.carbs}
        kcal={carbsKcal}
        color="bg-violet-400"
        total={d.goalCalories}
      />
      <MacroBar
        label="Fat"
        grams={d.fat}
        kcal={fatKcal}
        color="bg-orange-400"
        total={d.goalCalories}
      />

      <button
        onClick={onRecalculate}
        className="w-full mt-4 py-3 rounded-[10px] border-none bg-gradient-to-br from-blue-500 to-violet-500 text-white text-[15px] font-semibold cursor-pointer hover:opacity-90 transition-opacity"
      >
        Recalculate
      </button>
    </div>
  )
}

function MacroBar({
  label,
  grams,
  kcal,
  color,
  total,
}: {
  label: string
  grams: number
  kcal: number
  color: string
  total: number
}) {
  const pct = total > 0 ? Math.round((kcal / total) * 100) : 0
  return (
    <div className="mb-3">
      <div className="flex justify-between text-[13px] text-slate-300 mb-1">
        <span>
          {label} <strong className="text-slate-100">{grams}g</strong>
        </span>
        <span>
          {kcal} kcal · {pct}%
        </span>
      </div>
      <div className="h-2 rounded bg-slate-700 overflow-hidden">
        <div
          className={`h-full rounded ${color} transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

function StatCard({
  label,
  value,
  unit,
  color,
}: {
  label: string
  value: number
  unit: string
  color: string
}) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-3.5 text-center">
      <div className="text-[11px] text-slate-400">{label}</div>
      <div className={`text-[26px] font-bold ${color}`}>{value}</div>
      <div className="text-[11px] text-slate-500">{unit}</div>
    </div>
  )
}
