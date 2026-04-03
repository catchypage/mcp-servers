import React, { useState } from 'react'
import type { MetabolismData } from './types'
import { calculateMetabolism } from './calc'

interface Props {
  onResult: (d: MetabolismData) => void
  initial?: MetabolismData | null
}

export default function CalcForm({ onResult, initial }: Props) {
  const [weight, setWeight] = useState(initial ? String(initial.weight_kg) : '')
  const [height, setHeight] = useState(initial ? String(initial.height_cm) : '')
  const [age, setAge] = useState(initial ? String(initial.age) : '')
  const [gender, setGender] = useState(initial?.gender ?? 'male')
  const [activity, setActivity] = useState(
    initial?.activity_level ?? 'moderate',
  )
  const [goal, setGoal] = useState(initial?.goal ?? 'maintain')

  const valid = Number(weight) > 0 && Number(height) > 0 && Number(age) > 0

  const submit = () => {
    if (!valid) {
      return
    }
    onResult(
      calculateMetabolism(
        Number(weight),
        Number(height),
        Number(age),
        gender,
        activity,
        goal,
      ),
    )
  }

  return (
    <div className="p-5 max-w-[420px] mx-auto">
      <h2 className="text-lg font-bold text-slate-100 mb-1">
        Calorie Calculator
      </h2>
      <p className="text-[13px] text-slate-500 mb-5">
        Calculate your daily energy needs using the Mifflin-St Jeor equation
      </p>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <label>
          <span className="text-xs text-slate-400 block mb-1">Weight (kg)</span>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="70"
            className="input-field"
          />
        </label>
        <label>
          <span className="text-xs text-slate-400 block mb-1">Height (cm)</span>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="175"
            className="input-field"
          />
        </label>
        <label>
          <span className="text-xs text-slate-400 block mb-1">Age</span>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="28"
            className="input-field"
          />
        </label>
        <label>
          <span className="text-xs text-slate-400 block mb-1">Gender</span>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="input-field appearance-auto"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
      </div>

      <label className="block mb-3">
        <span className="text-xs text-slate-400 block mb-1">
          Activity Level
        </span>
        <select
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          className="input-field appearance-auto"
        >
          <option value="sedentary">Sedentary (desk job)</option>
          <option value="light">Light (1-3 days/week)</option>
          <option value="moderate">Moderate (3-5 days/week)</option>
          <option value="active">Active (6-7 days/week)</option>
          <option value="very_active">Very active (athlete)</option>
        </select>
      </label>

      <label className="block mb-5">
        <span className="text-xs text-slate-400 block mb-1">Goal</span>
        <select
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="input-field appearance-auto"
        >
          <option value="lose">Lose weight</option>
          <option value="maintain">Maintain</option>
          <option value="gain">Gain weight</option>
        </select>
      </label>

      <button
        onClick={submit}
        disabled={!valid}
        className={`w-full py-3 rounded-[10px] border-none text-white text-[15px] font-semibold transition-all ${
          valid
            ? 'bg-gradient-to-br from-blue-500 to-violet-500 cursor-pointer hover:opacity-90'
            : 'bg-slate-700 cursor-not-allowed'
        }`}
      >
        Calculate
      </button>
    </div>
  )
}
