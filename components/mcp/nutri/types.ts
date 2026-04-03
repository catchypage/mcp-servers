export interface MetabolismData {
  mode: 'metabolism'
  bmr: number
  tdee: number
  goal: string
  goalCalories: number
  protein: number
  carbs: number
  fat: number
  weight_kg: number
  height_cm: number
  age: number
  gender: string
  activity_level: string
}

export interface RecipeData {
  mode: 'recipe'
  id: string
  title: string
  category: string
  area: string
  image: string
  instructions: string[]
  ingredients: { name: string; amount: string }[]
  tags: string[]
  youtube: string
}

export type ToolData = MetabolismData | RecipeData

export type Screen =
  | 'loading'
  | 'form'
  | 'metabolism'
  | 'recipe-search'
  | 'recipe'
