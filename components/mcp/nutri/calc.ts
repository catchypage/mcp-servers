import type { MetabolismData } from './types'

const ACTIVITY_MULTIPLIERS: Record<string, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
}

export function calculateMetabolism(
  weight: number,
  height: number,
  age: number,
  gender: string,
  activity: string,
  goal: string,
): MetabolismData {
  const bmr =
    gender === 'female'
      ? 10 * weight + 6.25 * height - 5 * age - 161
      : 10 * weight + 6.25 * height - 5 * age + 5

  const tdee = bmr * (ACTIVITY_MULTIPLIERS[activity] ?? 1.55)

  let goalCal = tdee
  if (goal === 'lose') {
    goalCal = tdee - 500
  } else if (goal === 'gain') {
    goalCal = tdee + 400
  }
  goalCal = Math.max(goalCal, 1200)

  return {
    mode: 'metabolism',
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    goal,
    goalCalories: Math.round(goalCal),
    protein: Math.round((goalCal * 0.3) / 4),
    carbs: Math.round((goalCal * 0.4) / 4),
    fat: Math.round((goalCal * 0.3) / 9),
    weight_kg: weight,
    height_cm: height,
    age,
    gender,
    activity_level: activity,
  }
}
