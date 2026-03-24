import type { DayPlan, Meal, ShoppingSection } from './types'
import { nanoid } from 'nanoid'
import {
  searchMealDB,
  getRandomMealDB,
  getMealDBByCategory,
  searchUSDAFoods,
  extractUSDANutrients,
  type MealDBRecipe,
} from './api-clients'

export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export function randomPick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

/*
 * Map meal type to search queries for APIs
 * MealDB categories: Beef, Chicken, Dessert, Lamb, Miscellaneous, Pasta, Pork,
 * Seafood, Side, Starter, Vegan, Vegetarian, Breakfast, Goat
 */
export const MEAL_TYPE_QUERIES: Record<string, string[]> = {
  breakfast: ['Breakfast', 'Egg', 'Pancake', 'Omelette', 'Toast'],
  lunch: ['Chicken', 'Salad', 'Soup', 'Sandwich', 'Starter'],
  dinner: ['Beef', 'Pasta', 'Seafood', 'Lamb', 'Pork', 'Chicken'],
  snack: ['Dessert', 'Side', 'Starter'],
}

// Convert MealDB recipe to our Meal format
export function mealDBToMeal(
  recipe: MealDBRecipe,
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack',
  servings: number,
): Meal {
  const categoryNutrition: Record<
    string,
    { cal: number; protein: number; carbs: number; fat: number }
  > = {
    Beef: { cal: 550, protein: 35, carbs: 20, fat: 30 },
    Chicken: { cal: 450, protein: 40, carbs: 25, fat: 15 },
    Seafood: { cal: 400, protein: 35, carbs: 15, fat: 18 },
    Vegetarian: { cal: 350, protein: 15, carbs: 45, fat: 12 },
    Pasta: { cal: 500, protein: 18, carbs: 65, fat: 15 },
    Dessert: { cal: 400, protein: 6, carbs: 55, fat: 18 },
    default: { cal: 450, protein: 25, carbs: 40, fat: 18 },
  }

  const nutrition =
    categoryNutrition[recipe.strCategory] ?? categoryNutrition.default

  const tagList = recipe.strTags
    ?.split(',')
    .map((t) => t.trim())
    .filter(Boolean)

  return {
    meal_id: nanoid(8),
    type,
    title: recipe.strMeal,
    servings,
    prep_minutes: 30,
    estimated_cost: Math.round(servings * 5 * 100) / 100,
    calories: nutrition.cal,
    macros: {
      protein_g: nutrition.protein,
      carbs_g: nutrition.carbs,
      fat_g: nutrition.fat,
    },
    tags: tagList && tagList.length > 0 ? tagList : [recipe.strCategory],
    source_id: recipe.idMeal,
    source: 'mealdb',
    image_url: recipe.strMealThumb,
  }
}

// Cache for pre-fetched recipes to minimize API calls
export const recipeCache = new Map<string, MealDBRecipe[]>()

/*
 * Pre-fetch recipes for all meal types in batch (1 request per type instead of
 * 28)
 */
export async function prefetchMealDBRecipes(): Promise<void> {
  const allQueries = new Set<string>()
  for (const queries of Object.values(MEAL_TYPE_QUERIES)) {
    queries.forEach((q) => allQueries.add(q))
  }

  const fetchPromises = Array.from(allQueries).map(async (query) => {
    if (recipeCache.has(query)) {
      return
    }
    try {
      const recipes = await searchMealDB(query)
      if (recipes.length > 0) {
        recipeCache.set(query, recipes)
      }
    } catch (e) {
      console.log(`[ChefPlan] Failed to prefetch ${query}:`, e)
    }
  })

  await Promise.all(fetchPromises)
  console.log(`[ChefPlan] Prefetched ${recipeCache.size} recipe categories`)
}

/*
 * Generate meal using real APIs with fallback
 * Priority: Cached MealDB -> MealDB API -> fallback
 */
async function generateMealFromAPI(
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack',
  servings: number,
  _diet?: string,
  _maxPrepTime?: number,
): Promise<Meal> {
  void _diet
  void _maxPrepTime
  const queries = MEAL_TYPE_QUERIES[type]
  const query = randomPick(queries)

  const cachedRecipes = recipeCache.get(query)
  if (cachedRecipes && cachedRecipes.length > 0) {
    const recipe = randomPick(cachedRecipes)
    console.log(`[ChefPlan] Got recipe from cache: ${recipe.strMeal}`)
    return mealDBToMeal(recipe, type, servings)
  }

  try {
    let mealDBRecipes = await searchMealDB(query)

    if (mealDBRecipes.length === 0) {
      mealDBRecipes = await getMealDBByCategory(query)
    }

    if (mealDBRecipes.length > 0) {
      recipeCache.set(query, mealDBRecipes)
      const recipe = randomPick(mealDBRecipes)
      console.log(`[ChefPlan] Got recipe from MealDB: ${recipe.strMeal}`)
      return mealDBToMeal(recipe, type, servings)
    }

    const randomMeal = await getRandomMealDB()
    if (randomMeal) {
      console.log(
        `[ChefPlan] Got random recipe from MealDB: ${randomMeal.strMeal}`,
      )
      return mealDBToMeal(randomMeal, type, servings)
    }
  } catch (e) {
    console.log('[ChefPlan] MealDB error:', e)
  }

  console.log('[ChefPlan] Using fallback data')
  return generateMealFallback(type, servings)
}

function generateMealFallback(
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack',
  servings: number,
): Meal {
  const defaults = {
    breakfast: { prep: 15, cost: 4, cal: 350, protein: 15, carbs: 40, fat: 12 },
    lunch: { prep: 20, cost: 7, cal: 500, protein: 30, carbs: 45, fat: 18 },
    dinner: { prep: 30, cost: 10, cal: 600, protein: 35, carbs: 50, fat: 22 },
    snack: { prep: 5, cost: 2, cal: 180, protein: 8, carbs: 20, fat: 8 },
  }
  const d = defaults[type]

  return {
    meal_id: nanoid(8),
    type,
    title: `${type.charAt(0).toUpperCase() + type.slice(1)} Meal`,
    servings,
    prep_minutes: d.prep,
    estimated_cost: Math.round(d.cost * servings * 100) / 100,
    calories: d.cal,
    macros: {
      protein_g: d.protein,
      carbs_g: d.carbs,
      fat_g: d.fat,
    },
    tags: [type],
    source: 'fallback',
  }
}

export async function generateDayPlanFromAPI(
  day: string,
  servings: number,
  diet?: string,
  maxPrepTime?: number,
): Promise<DayPlan> {
  const [breakfast, lunch, dinner, snack] = await Promise.all([
    generateMealFromAPI('breakfast', servings, diet, maxPrepTime),
    generateMealFromAPI('lunch', servings, diet, maxPrepTime),
    generateMealFromAPI('dinner', servings, diet, maxPrepTime),
    generateMealFromAPI('snack', servings, diet, maxPrepTime),
  ])

  const meals = [breakfast, lunch, dinner, snack]

  const totals = meals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.calories,
      protein_g: acc.protein_g + meal.macros.protein_g,
      carbs_g: acc.carbs_g + meal.macros.carbs_g,
      fat_g: acc.fat_g + meal.macros.fat_g,
    }),
    { calories: 0, protein_g: 0, carbs_g: 0, fat_g: 0 },
  )

  return { day, totals, meals }
}

export function generateDayPlanFallback(
  day: string,
  servings: number,
): DayPlan {
  const meals = [
    generateMealFallback('breakfast', servings),
    generateMealFallback('lunch', servings),
    generateMealFallback('dinner', servings),
    generateMealFallback('snack', servings),
  ]

  const totals = meals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.calories,
      protein_g: acc.protein_g + meal.macros.protein_g,
      carbs_g: acc.carbs_g + meal.macros.carbs_g,
      fat_g: acc.fat_g + meal.macros.fat_g,
    }),
    { calories: 0, protein_g: 0, carbs_g: 0, fat_g: 0 },
  )

  return { day, totals, meals }
}

export async function generateShoppingListFromAPI(
  days: DayPlan[],
): Promise<ShoppingSection[]> {
  const sections: Record<string, ShoppingSection> = {
    Produce: { section: 'Produce', items: [] },
    Proteins: { section: 'Proteins', items: [] },
    Dairy: { section: 'Dairy', items: [] },
    Pantry: { section: 'Pantry', items: [] },
    Frozen: { section: 'Frozen', items: [] },
  }

  const categoryKeywords: Record<string, string[]> = {
    Produce: [
      'tomato',
      'onion',
      'garlic',
      'spinach',
      'lettuce',
      'broccoli',
      'pepper',
      'avocado',
      'lemon',
      'carrot',
      'cucumber',
    ],
    Proteins: [
      'chicken',
      'beef',
      'salmon',
      'tuna',
      'turkey',
      'egg',
      'pork',
      'shrimp',
      'fish',
    ],
    Dairy: ['yogurt', 'cheese', 'milk', 'butter', 'cream'],
    Pantry: [
      'rice',
      'pasta',
      'lentil',
      'bean',
      'oil',
      'flour',
      'sugar',
      'spice',
      'sauce',
    ],
    Frozen: ['frozen', 'ice', 'berries'],
  }

  const commonIngredients = [
    'chicken breast',
    'eggs',
    'milk',
    'rice',
    'olive oil',
    'onion',
    'garlic',
    'tomatoes',
  ]

  for (const ingredient of commonIngredients) {
    try {
      const foods = await searchUSDAFoods({ query: ingredient, pageSize: 1 })
      if (foods.length > 0) {
        const food = foods[0]
        const nutrients = extractUSDANutrients(food)

        let category = 'Pantry'
        for (const [cat, keywords] of Object.entries(categoryKeywords)) {
          if (keywords.some((kw) => ingredient.toLowerCase().includes(kw))) {
            category = cat
            break
          }
        }

        sections[category].items.push({
          name: food.description.split(',')[0],
          quantity: Math.ceil(days.length / 2),
          unit: 'units',
          estimated_cost: Math.round(Math.random() * 5 + 2),
          nutrition_per_unit: nutrients,
        })
      }
    } catch {
      // Skip if USDA fails
    }
  }

  if (Object.values(sections).every((s) => s.items.length === 0)) {
    return generateShoppingListFallback()
  }

  return Object.values(sections).filter((s) => s.items.length > 0)
}

export function generateShoppingListFallback(): ShoppingSection[] {
  return [
    {
      section: 'Produce',
      items: [
        { name: 'Broccoli', quantity: 2, unit: 'heads', estimated_cost: 4.0 },
        { name: 'Onions', quantity: 4, unit: 'medium', estimated_cost: 2.0 },
        { name: 'Garlic', quantity: 2, unit: 'heads', estimated_cost: 1.5 },
        { name: 'Spinach', quantity: 1, unit: 'bag', estimated_cost: 3.5 },
        { name: 'Avocados', quantity: 4, unit: 'pieces', estimated_cost: 6.0 },
        { name: 'Tomatoes', quantity: 6, unit: 'pieces', estimated_cost: 4.5 },
        {
          name: 'Bell Peppers',
          quantity: 3,
          unit: 'pieces',
          estimated_cost: 4.5,
        },
        { name: 'Lemons', quantity: 3, unit: 'pieces', estimated_cost: 2.0 },
      ],
    },
    {
      section: 'Proteins',
      items: [
        {
          name: 'Chicken Breast',
          quantity: 2,
          unit: 'lbs',
          estimated_cost: 12.0,
        },
        {
          name: 'Salmon Fillet',
          quantity: 1,
          unit: 'lb',
          estimated_cost: 14.0,
        },
        { name: 'Ground Turkey', quantity: 1, unit: 'lb', estimated_cost: 8.0 },
        { name: 'Eggs', quantity: 12, unit: 'pieces', estimated_cost: 5.0 },
      ],
    },
    {
      section: 'Dairy',
      items: [
        { name: 'Greek Yogurt', quantity: 32, unit: 'oz', estimated_cost: 6.0 },
        { name: 'Feta Cheese', quantity: 8, unit: 'oz', estimated_cost: 5.0 },
        { name: 'Milk', quantity: 1, unit: 'gallon', estimated_cost: 4.5 },
      ],
    },
    {
      section: 'Pantry',
      items: [
        { name: 'Brown Rice', quantity: 2, unit: 'lbs', estimated_cost: 4.0 },
        { name: 'Lentils', quantity: 1, unit: 'lb', estimated_cost: 3.0 },
        { name: 'Olive Oil', quantity: 1, unit: 'bottle', estimated_cost: 8.0 },
        { name: 'Pasta', quantity: 1, unit: 'lb', estimated_cost: 2.5 },
        {
          name: 'Canned Tomatoes',
          quantity: 2,
          unit: 'cans',
          estimated_cost: 4.0,
        },
      ],
    },
    {
      section: 'Frozen',
      items: [
        {
          name: 'Mixed Berries',
          quantity: 1,
          unit: 'bag',
          estimated_cost: 5.0,
        },
        {
          name: 'Frozen Vegetables',
          quantity: 2,
          unit: 'bags',
          estimated_cost: 6.0,
        },
      ],
    },
  ]
}
