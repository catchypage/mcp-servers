export interface Macros {
  protein_g: number
  carbs_g: number
  fat_g: number
}

export interface Meal {
  meal_id: string
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  title: string
  servings: number
  prep_minutes: number
  estimated_cost: number
  calories: number
  macros: Macros
  tags: string[]
  image_url?: string
}

export interface DayPlan {
  day: string
  date?: string
  totals: {
    calories: number
    protein_g: number
    carbs_g: number
    fat_g: number
  }
  meals: Meal[]
}

export interface ShoppingItem {
  name: string
  quantity: number
  unit: string
  estimated_cost?: number
}

export interface ShoppingSection {
  section: string
  items: ShoppingItem[]
}

export interface NutritionSummary {
  avg_calories_per_day: number
  avg_protein_g: number
  avg_carbs_g: number
  avg_fat_g: number
}

export interface BudgetSummary {
  estimated_total: number
  per_day_avg: number
}

export interface Household {
  size: number
}

export interface PlanConstraints {
  budget_target: number
  diet: string[]
  allergies: string[]
  max_prep_minutes: number
}

export interface OrderOption {
  provider: string
  available: boolean
  cta: string
  deeplink?: string
}

export interface MealPlan {
  plan_id: string
  title: string
  household: Household
  constraints: PlanConstraints
  budget_summary: BudgetSummary
  nutrition_summary: NutritionSummary
  days: DayPlan[]
  shopping_list: ShoppingSection[]
  order_options: OrderOption[]
}

export interface RecipeDetails {
  meal_id: string
  title: string
  prep_minutes: number
  cook_minutes: number
  servings: number
  estimated_cost: number
  calories: number
  macros: Macros
  tags: string[]
  image_url?: string
  ingredients: {
    name: string
    amount: string
    notes?: string
  }[]
  instructions: string[]
  substitutions: {
    original: string
    alternative: string
    notes?: string
  }[]
}

export interface SwapCandidate {
  meal_id: string
  title: string
  prep_minutes: number
  calories: number
  estimated_cost: number
  macros: Macros
  tags: string[]
  image_url?: string
  match_score: number
}

export type WidgetMode = 'inline' | 'fullscreen' | 'swap'
