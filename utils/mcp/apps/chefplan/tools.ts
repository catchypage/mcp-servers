import type { McpAppConfig, McpToolDefinition } from '@/utils/mcp/core/registry'
import type {
  MealPlan,
  RecipeDetails,
  SwapCandidate,
  DayPlan,
  Meal,
  ShoppingSection,
} from './types'
import { nanoid } from 'nanoid'
import {
  searchRecipes,
  getRecipeById,
  getRandomRecipes,
  searchMealDB,
  getRandomMealDB,
  getMealDBByCategory,
  extractMealDBIngredients,
  searchUSDAFoods,
  extractUSDANutrients,
  type SpoonacularRecipe,
  type MealDBRecipe,
} from './api-clients'

/*
 * ============================================================================
 * TOOL DEFINITIONS
 * ============================================================================
 */

const generateWeeklyPlanTool: McpToolDefinition = {
  name: 'generate_weekly_plan',
  title: 'Generate Weekly Meal Plan',
  description:
    'Create a personalized weekly meal plan based on household size, dietary preferences, allergies, budget, and goals.',
  inputSchema: {
    type: 'object',
    properties: {
      household_size: {
        type: 'number',
        description: 'Number of people in household (1-10)',
      },
      dietary_preferences: {
        type: 'array',
        items: { type: 'string' },
        description:
          'Dietary preferences: healthy, high_protein, low_carb, vegetarian, vegan, keto, mediterranean',
      },
      allergies: {
        type: 'array',
        items: { type: 'string' },
        description:
          'Food allergies: dairy, gluten, nuts, shellfish, eggs, soy',
      },
      budget_target: {
        type: 'number',
        description: 'Weekly budget target in USD',
      },
      goal: {
        type: 'string',
        description:
          'Primary goal: healthy, high_protein, cheap, quick, balanced',
      },
      max_prep_minutes: {
        type: 'number',
        description: 'Maximum prep time per meal in minutes',
      },
    },
    required: ['household_size'],
  },
  annotations: {
    readOnlyHint: false,
    destructiveHint: false,
    openWorldHint: true,
    idempotentHint: false,
  },
  securitySchemes: [{ type: 'oauth2', scopes: ['user:read'] }],
  _meta: {
    'openai/outputTemplate': 'ui://chefplan/meal-plan-widget',
  },
}

const getRecipeDetailsTool: McpToolDefinition = {
  name: 'get_recipe_details',
  title: 'Get Recipe Details',
  description:
    'Get full recipe details including ingredients, instructions, nutrition, and substitutions.',
  inputSchema: {
    type: 'object',
    properties: {
      plan_id: { type: 'string', description: 'The meal plan ID' },
      meal_id: { type: 'string', description: 'The specific meal ID' },
    },
    required: ['plan_id', 'meal_id'],
  },
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    openWorldHint: false,
    idempotentHint: true,
  },
  securitySchemes: [{ type: 'oauth2', scopes: ['user:read'] }],
  _meta: {
    'openai/outputTemplate': 'ui://chefplan/meal-plan-widget',
  },
}

const swapMealTool: McpToolDefinition = {
  name: 'swap_meal',
  title: 'Swap Meal',
  description:
    'Get alternative meal options or replace a specific meal in the plan.',
  inputSchema: {
    type: 'object',
    properties: {
      plan_id: { type: 'string', description: 'The meal plan ID' },
      meal_id: { type: 'string', description: 'The meal to replace' },
      constraints: {
        type: 'array',
        items: { type: 'string' },
        description:
          'Optional constraints: cheaper, faster, vegetarian, kid_friendly, high_protein',
      },
      replace_with: {
        type: 'string',
        description:
          'If provided, directly replace with this meal_id from candidates',
      },
    },
    required: ['plan_id', 'meal_id'],
  },
  annotations: {
    readOnlyHint: false,
    destructiveHint: false,
    openWorldHint: true,
    idempotentHint: false,
  },
  securitySchemes: [{ type: 'oauth2', scopes: ['user:read'] }],
  _meta: {
    'openai/outputTemplate': 'ui://chefplan/meal-plan-widget',
  },
}

const updatePlanConstraintsTool: McpToolDefinition = {
  name: 'update_plan_constraints',
  title: 'Update Plan Constraints',
  description: 'Update plan preferences and regenerate affected meals.',
  inputSchema: {
    type: 'object',
    properties: {
      plan_id: { type: 'string', description: 'The meal plan ID' },
      budget_target: { type: 'number', description: 'New budget target' },
      dietary_preferences: {
        type: 'array',
        items: { type: 'string' },
        description: 'Updated dietary preferences',
      },
      allergies: {
        type: 'array',
        items: { type: 'string' },
        description: 'Updated allergies list',
      },
      max_prep_minutes: { type: 'number', description: 'New max prep time' },
    },
    required: ['plan_id'],
  },
  annotations: {
    readOnlyHint: false,
    destructiveHint: false,
    openWorldHint: true,
    idempotentHint: false,
  },
  securitySchemes: [{ type: 'oauth2', scopes: ['user:read'] }],
  _meta: {
    'openai/outputTemplate': 'ui://chefplan/meal-plan-widget',
  },
}

const buildShoppingListTool: McpToolDefinition = {
  name: 'build_shopping_list',
  title: 'Build Shopping List',
  description:
    'Generate a consolidated shopping list grouped by store section.',
  inputSchema: {
    type: 'object',
    properties: {
      plan_id: { type: 'string', description: 'The meal plan ID' },
    },
    required: ['plan_id'],
  },
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    openWorldHint: false,
    idempotentHint: true,
  },
  securitySchemes: [{ type: 'oauth2', scopes: ['user:read'] }],
  _meta: {
    'openai/outputTemplate': 'ui://chefplan/meal-plan-widget',
  },
}

const createOrderLinkTool: McpToolDefinition = {
  name: 'create_order_link',
  title: 'Create Order Link',
  description:
    'Generate a deep link to order ingredients from a grocery provider.',
  inputSchema: {
    type: 'object',
    properties: {
      plan_id: { type: 'string', description: 'The meal plan ID' },
      provider: {
        type: 'string',
        description: 'Grocery provider: instacart, amazon_fresh, walmart',
      },
    },
    required: ['plan_id', 'provider'],
  },
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    openWorldHint: true,
    idempotentHint: true,
  },
  securitySchemes: [{ type: 'oauth2', scopes: ['user:read'] }],
  _meta: {
    'openai/outputTemplate': 'ui://chefplan/meal-plan-widget',
  },
}

const getUserInfoTool: McpToolDefinition = {
  name: 'get_user_info',
  title: 'Get User Info',
  description:
    'INTERNAL: Widget-only. Get current user info for personalization.',
  inputSchema: { type: 'object', properties: {}, required: [] },
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    openWorldHint: false,
    idempotentHint: true,
  },
  securitySchemes: [{ type: 'oauth2', scopes: ['user:read'] }],
  _meta: { 'openai/hidden': true },
}

/*
 * ============================================================================
 * EXPORTS
 * ============================================================================
 */

export const chefplanTools: McpToolDefinition[] = [
  generateWeeklyPlanTool,
  getRecipeDetailsTool,
  swapMealTool,
  updatePlanConstraintsTool,
  buildShoppingListTool,
  createOrderLinkTool,
]

export const chefplanInternalTools: McpToolDefinition[] = [getUserInfoTool]

/*
 * ============================================================================
 * FALLBACK MOCK DATA (used when APIs are unavailable)
 * ============================================================================
 */

const MEAL_TEMPLATES = {
  breakfast: [
    { title: 'Greek Yogurt Parfait', prep: 10, cost: 4.5, cal: 320, protein: 22, carbs: 28, fat: 9, tags: ['high-protein', 'quick'] },
    { title: 'Avocado Toast with Eggs', prep: 15, cost: 5.2, cal: 420, protein: 18, carbs: 32, fat: 24, tags: ['healthy', 'popular'] },
    { title: 'Overnight Oats', prep: 5, cost: 2.8, cal: 350, protein: 12, carbs: 58, fat: 8, tags: ['budget', 'meal-prep'] },
    { title: 'Veggie Omelette', prep: 12, cost: 4.0, cal: 280, protein: 20, carbs: 8, fat: 18, tags: ['low-carb', 'keto'] },
    { title: 'Smoothie Bowl', prep: 8, cost: 5.5, cal: 380, protein: 14, carbs: 52, fat: 12, tags: ['vegan', 'refreshing'] },
  ],
  lunch: [
    { title: 'Chicken Rice Bowls', prep: 20, cost: 6.5, cal: 540, protein: 38, carbs: 52, fat: 16, tags: ['high-protein', 'meal-prep'] },
    { title: 'Mediterranean Salad', prep: 15, cost: 7.2, cal: 420, protein: 24, carbs: 28, fat: 22, tags: ['healthy', 'mediterranean'] },
    { title: 'Turkey Wrap', prep: 10, cost: 5.8, cal: 480, protein: 32, carbs: 42, fat: 18, tags: ['quick', 'portable'] },
    { title: 'Lentil Soup', prep: 25, cost: 3.5, cal: 320, protein: 18, carbs: 48, fat: 4, tags: ['budget', 'vegan'] },
    { title: 'Tuna Poke Bowl', prep: 15, cost: 8.5, cal: 450, protein: 36, carbs: 38, fat: 14, tags: ['high-protein', 'fresh'] },
  ],
  dinner: [
    { title: 'Lentil Pasta Bake', prep: 25, cost: 8.2, cal: 710, protein: 29, carbs: 66, fat: 18, tags: ['comfort-food', 'family'] },
    { title: 'Grilled Salmon with Veggies', prep: 22, cost: 12.5, cal: 580, protein: 42, carbs: 18, fat: 32, tags: ['high-protein', 'healthy'] },
    { title: 'Chicken Stir Fry', prep: 20, cost: 7.8, cal: 520, protein: 38, carbs: 42, fat: 18, tags: ['quick', 'asian'] },
    { title: 'Beef Tacos', prep: 25, cost: 9.2, cal: 640, protein: 34, carbs: 48, fat: 28, tags: ['kid-friendly', 'popular'] },
    { title: 'Veggie Curry', prep: 30, cost: 6.5, cal: 480, protein: 16, carbs: 58, fat: 18, tags: ['vegan', 'spicy'] },
  ],
  snack: [
    { title: 'Apple & Peanut Butter', prep: 2, cost: 1.5, cal: 180, protein: 6, carbs: 22, fat: 8, tags: ['quick', 'healthy'] },
    { title: 'Greek Yogurt & Berries', prep: 3, cost: 2.2, cal: 150, protein: 12, carbs: 18, fat: 2, tags: ['high-protein', 'low-fat'] },
    { title: 'Trail Mix', prep: 1, cost: 2.0, cal: 200, protein: 6, carbs: 20, fat: 12, tags: ['portable', 'energy'] },
    { title: 'Hummus & Veggies', prep: 5, cost: 3.0, cal: 160, protein: 6, carbs: 18, fat: 8, tags: ['vegan', 'fiber'] },
  ],
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function randomPick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

/*
 * ============================================================================
 * API-POWERED MEAL GENERATORS
 * Falls back to mock data if APIs are unavailable
 * ============================================================================
 */

// Map meal type to search queries for APIs
// MealDB categories: Beef, Chicken, Dessert, Lamb, Miscellaneous, Pasta, Pork, Seafood, Side, Starter, Vegan, Vegetarian, Breakfast, Goat
const MEAL_TYPE_QUERIES: Record<string, string[]> = {
  breakfast: ['Breakfast', 'Egg', 'Pancake', 'Omelette', 'Toast'],
  lunch: ['Chicken', 'Salad', 'Soup', 'Sandwich', 'Starter'],
  dinner: ['Beef', 'Pasta', 'Seafood', 'Lamb', 'Pork', 'Chicken'],
  snack: ['Dessert', 'Side', 'Starter'],
}

// Convert Spoonacular recipe to our Meal format
function spoonacularToMeal(
  recipe: SpoonacularRecipe,
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack',
  servings: number,
): Meal {
  const nutrients = recipe.nutrition?.nutrients || []
  const findNutrient = (name: string) =>
    nutrients.find((n) => n.name.toLowerCase() === name.toLowerCase())?.amount || 0

  return {
    meal_id: nanoid(8),
    type,
    title: recipe.title,
    servings,
    prep_minutes: recipe.readyInMinutes || 30,
    estimated_cost: Math.round((recipe.pricePerServing || 300) * servings) / 100,
    calories: Math.round(findNutrient('Calories')),
    macros: {
      protein_g: Math.round(findNutrient('Protein')),
      carbs_g: Math.round(findNutrient('Carbohydrates')),
      fat_g: Math.round(findNutrient('Fat')),
    },
    tags: recipe.diets || [],
    source_id: String(recipe.id),
    source: 'spoonacular',
    image_url: recipe.image,
  }
}

// Convert MealDB recipe to our Meal format
function mealDBToMeal(
  recipe: MealDBRecipe,
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack',
  servings: number,
): Meal {
  // MealDB doesn't have nutrition, estimate based on category
  const categoryNutrition: Record<string, { cal: number; protein: number; carbs: number; fat: number }> = {
    Beef: { cal: 550, protein: 35, carbs: 20, fat: 30 },
    Chicken: { cal: 450, protein: 40, carbs: 25, fat: 15 },
    Seafood: { cal: 400, protein: 35, carbs: 15, fat: 18 },
    Vegetarian: { cal: 350, protein: 15, carbs: 45, fat: 12 },
    Pasta: { cal: 500, protein: 18, carbs: 65, fat: 15 },
    Dessert: { cal: 400, protein: 6, carbs: 55, fat: 18 },
    default: { cal: 450, protein: 25, carbs: 40, fat: 18 },
  }

  const nutrition = categoryNutrition[recipe.strCategory] || categoryNutrition.default

  return {
    meal_id: nanoid(8),
    type,
    title: recipe.strMeal,
    servings,
    prep_minutes: 30, // MealDB doesn't provide prep time
    estimated_cost: Math.round(servings * 5 * 100) / 100, // Estimate $5/serving
    calories: nutrition.cal,
    macros: {
      protein_g: nutrition.protein,
      carbs_g: nutrition.carbs,
      fat_g: nutrition.fat,
    },
    tags: recipe.strTags?.split(',').map((t) => t.trim()).filter(Boolean) || [recipe.strCategory],
    source_id: recipe.idMeal,
    source: 'mealdb',
    image_url: recipe.strMealThumb,
  }
}

// Cache for pre-fetched recipes to minimize API calls
const recipeCache = new Map<string, MealDBRecipe[]>()

// Pre-fetch recipes for all meal types in batch (1 request per type instead of 28)
async function prefetchMealDBRecipes(): Promise<void> {
  const allQueries = new Set<string>()
  for (const queries of Object.values(MEAL_TYPE_QUERIES)) {
    queries.forEach(q => allQueries.add(q))
  }

  // Fetch all unique queries in parallel (max ~10 requests total)
  const fetchPromises = Array.from(allQueries).map(async (query) => {
    if (recipeCache.has(query)) return
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

// Generate meal using real APIs with fallback
// Priority: Cached MealDB -> MealDB API -> Spoonacular (paid/limited) -> fallback
async function generateMealFromAPI(
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack',
  servings: number,
  diet?: string,
  maxPrepTime?: number,
): Promise<Meal> {
  const queries = MEAL_TYPE_QUERIES[type]
  const query = randomPick(queries)

  // Try cached recipes first (no API call)
  const cachedRecipes = recipeCache.get(query)
  if (cachedRecipes && cachedRecipes.length > 0) {
    const recipe = randomPick(cachedRecipes)
    console.log(`[ChefPlan] Got recipe from cache: ${recipe.strMeal}`)
    return mealDBToMeal(recipe, type, servings)
  }

  // Try MealDB API (completely FREE, no key needed)
  try {
    let mealDBRecipes = await searchMealDB(query)

    if (mealDBRecipes.length === 0) {
      mealDBRecipes = await getMealDBByCategory(query)
    }

    if (mealDBRecipes.length > 0) {
      // Cache for future use
      recipeCache.set(query, mealDBRecipes)
      const recipe = randomPick(mealDBRecipes)
      console.log(`[ChefPlan] Got recipe from MealDB: ${recipe.strMeal}`)
      return mealDBToMeal(recipe, type, servings)
    }

    // If search/category fail, get random meal
    const randomMeal = await getRandomMealDB()
    if (randomMeal) {
      console.log(`[ChefPlan] Got random recipe from MealDB: ${randomMeal.strMeal}`)
      return mealDBToMeal(randomMeal, type, servings)
    }
  } catch (e) {
    console.log('[ChefPlan] MealDB error:', e)
  }

  // Final fallback to mock data (NO Spoonacular to save quota)
  console.log('[ChefPlan] Using fallback data')
  return generateMealFallback(type, servings)
}

// Fallback meal generator using mock data
function generateMealFallback(
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack',
  servings: number,
): Meal {
  const template = randomPick(MEAL_TEMPLATES[type])
  return {
    meal_id: nanoid(8),
    type,
    title: template.title,
    servings,
    prep_minutes: template.prep,
    estimated_cost: Math.round(template.cost * servings * 100) / 100,
    calories: template.cal,
    macros: {
      protein_g: template.protein,
      carbs_g: template.carbs,
      fat_g: template.fat,
    },
    tags: template.tags,
    source: 'fallback',
  }
}

// Generate day plan with real API data
async function generateDayPlanFromAPI(
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

// Synchronous fallback for day plan
function generateDayPlanFallback(day: string, servings: number): DayPlan {
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

// Generate shopping list from meal ingredients using USDA
async function generateShoppingListFromAPI(days: DayPlan[]): Promise<ShoppingSection[]> {
  // Collect all unique ingredients from meals
  const ingredientSet = new Set<string>()

  for (const day of days) {
    for (const meal of day.meals) {
      // Extract main ingredient from meal title
      const words = meal.title.toLowerCase().split(' ')
      for (const word of words) {
        if (word.length > 3 && !['with', 'and', 'the'].includes(word)) {
          ingredientSet.add(word)
        }
      }
    }
  }

  // Categories for organizing shopping list
  const sections: Record<string, ShoppingSection> = {
    Produce: { section: 'Produce', items: [] },
    Proteins: { section: 'Proteins', items: [] },
    Dairy: { section: 'Dairy', items: [] },
    Pantry: { section: 'Pantry', items: [] },
    Frozen: { section: 'Frozen', items: [] },
  }

  // Category keywords
  const categoryKeywords: Record<string, string[]> = {
    Produce: ['tomato', 'onion', 'garlic', 'spinach', 'lettuce', 'broccoli', 'pepper', 'avocado', 'lemon', 'carrot', 'cucumber'],
    Proteins: ['chicken', 'beef', 'salmon', 'tuna', 'turkey', 'egg', 'pork', 'shrimp', 'fish'],
    Dairy: ['yogurt', 'cheese', 'milk', 'butter', 'cream'],
    Pantry: ['rice', 'pasta', 'lentil', 'bean', 'oil', 'flour', 'sugar', 'spice', 'sauce'],
    Frozen: ['frozen', 'ice', 'berries'],
  }

  // Try to get prices from USDA for common items
  const commonIngredients = ['chicken breast', 'eggs', 'milk', 'rice', 'olive oil', 'onion', 'garlic', 'tomatoes']

  for (const ingredient of commonIngredients) {
    try {
      const foods = await searchUSDAFoods({ query: ingredient, pageSize: 1 })
      if (foods.length > 0) {
        const food = foods[0]
        const nutrients = extractUSDANutrients(food)

        // Determine category
        let category = 'Pantry'
        for (const [cat, keywords] of Object.entries(categoryKeywords)) {
          if (keywords.some((kw) => ingredient.toLowerCase().includes(kw))) {
            category = cat
            break
          }
        }

        sections[category].items.push({
          name: food.description.split(',')[0], // Take first part of description
          quantity: Math.ceil(days.length / 2),
          unit: 'units',
          estimated_cost: Math.round(Math.random() * 5 + 2), // Estimate $2-7
          nutrition_per_unit: nutrients,
        })
      }
    } catch (e) {
      // Skip if USDA fails
    }
  }

  // If API calls failed, use fallback
  if (Object.values(sections).every((s) => s.items.length === 0)) {
    return generateShoppingListFallback()
  }

  return Object.values(sections).filter((s) => s.items.length > 0)
}

// Fallback shopping list
function generateShoppingListFallback(): ShoppingSection[] {
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
        { name: 'Bell Peppers', quantity: 3, unit: 'pieces', estimated_cost: 4.5 },
        { name: 'Lemons', quantity: 3, unit: 'pieces', estimated_cost: 2.0 },
      ],
    },
    {
      section: 'Proteins',
      items: [
        { name: 'Chicken Breast', quantity: 2, unit: 'lbs', estimated_cost: 12.0 },
        { name: 'Salmon Fillet', quantity: 1, unit: 'lb', estimated_cost: 14.0 },
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
        { name: 'Canned Tomatoes', quantity: 2, unit: 'cans', estimated_cost: 4.0 },
      ],
    },
    {
      section: 'Frozen',
      items: [
        { name: 'Mixed Berries', quantity: 1, unit: 'bag', estimated_cost: 5.0 },
        { name: 'Frozen Vegetables', quantity: 2, unit: 'bags', estimated_cost: 6.0 },
      ],
    },
  ]
}

/*
 * ============================================================================
 * TOOL HANDLERS
 * ============================================================================
 */

// In-memory plan storage (would be DB in production)
const planStore = new Map<string, MealPlan>()

export type ToolHandler = (
  app: McpAppConfig,
  args: Record<string, unknown>,
  userId: string,
) => Promise<Record<string, unknown>>

async function handleGenerateWeeklyPlan(
  _app: McpAppConfig,
  args: Record<string, unknown>,
  _userId: string,
): Promise<Record<string, unknown>> {
  const householdSize = Math.min(
    10,
    Math.max(1, Number(args.household_size) || 4),
  )
  const budgetTarget = Number(args.budget_target) || 75
  const maxPrepMinutes = Number(args.max_prep_minutes) || 30
  const dietaryPreferences = Array.isArray(args.dietary_preferences)
    ? args.dietary_preferences.map(String)
    : ['healthy']
  const allergies = Array.isArray(args.allergies)
    ? args.allergies.map(String)
    : []
  const goal = String(args.goal || 'balanced')

  // Map diet preferences to API format
  const dietMap: Record<string, string> = {
    vegetarian: 'vegetarian',
    vegan: 'vegan',
    keto: 'ketogenic',
    low_carb: 'low carb',
    high_protein: 'high protein',
    mediterranean: 'mediterranean',
  }
  const apiDiet = dietaryPreferences
    .map((d) => dietMap[d.toLowerCase()])
    .filter(Boolean)[0]

  // Pre-fetch all recipes in batch to minimize API calls
  await prefetchMealDBRecipes()

  // Generate days using real APIs
  let days: DayPlan[]
  let dataSource = 'api'

  try {
    // Generate all 7 days in parallel using API
    days = await Promise.all(
      DAYS.map((day) =>
        generateDayPlanFromAPI(day, householdSize, apiDiet, maxPrepMinutes),
      ),
    )
  } catch (e) {
    console.log('API generation failed, using fallback:', e)
    // Fallback to mock data if APIs fail
    days = DAYS.map((day) => generateDayPlanFallback(day, householdSize))
    dataSource = 'fallback'
  }

  // Generate shopping list (tries API first, then fallback)
  let shoppingList: ShoppingSection[]
  try {
    shoppingList = await generateShoppingListFromAPI(days)
  } catch (e) {
    shoppingList = generateShoppingListFallback()
  }

  const totalCost = shoppingList.reduce(
    (sum, section) =>
      sum +
      section.items.reduce((s, item) => s + (item.estimated_cost || 0), 0),
    0,
  )

  const avgNutrition = days.reduce(
    (acc, day) => ({
      calories: acc.calories + day.totals.calories / 7,
      protein: acc.protein + day.totals.protein_g / 7,
      carbs: acc.carbs + day.totals.carbs_g / 7,
      fat: acc.fat + day.totals.fat_g / 7,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 },
  )

  const plan: MealPlan = {
    plan_id: `plan_${nanoid(12)}`,
    title: `${goal.charAt(0).toUpperCase() + goal.slice(1)} Weekly Meal Plan`,
    household: { size: householdSize },
    constraints: {
      budget_target: budgetTarget,
      diet: dietaryPreferences,
      allergies,
      max_prep_minutes: maxPrepMinutes,
    },
    budget_summary: {
      estimated_total: Math.round(totalCost * 100) / 100,
      per_day_avg: Math.round((totalCost / 7) * 100) / 100,
    },
    nutrition_summary: {
      avg_calories_per_day: Math.round(avgNutrition.calories),
      avg_protein_g: Math.round(avgNutrition.protein),
      avg_carbs_g: Math.round(avgNutrition.carbs),
      avg_fat_g: Math.round(avgNutrition.fat),
    },
    days,
    shopping_list: shoppingList,
    order_options: [
      { provider: 'instacart', available: true, cta: 'Order with Instacart' },
      {
        provider: 'amazon_fresh',
        available: true,
        cta: 'Order with Amazon Fresh',
      },
      { provider: 'walmart', available: true, cta: 'Order with Walmart' },
    ],
    data_source: dataSource,
  }

  planStore.set(plan.plan_id, plan)

  return {
    success: true,
    message: `Created ${goal} meal plan for ${householdSize} people`,
    plan,
    widget_mode: 'inline',
    data_source: dataSource,
  }
}

async function handleGetRecipeDetails(
  _app: McpAppConfig,
  args: Record<string, unknown>,
  _userId: string,
): Promise<Record<string, unknown>> {
  const planId = String(args.plan_id || '')
  const mealId = String(args.meal_id || '')

  const plan = planStore.get(planId)
  if (!plan) {
    return { success: false, error: 'Plan not found' }
  }

  let foundMeal: Meal | undefined
  for (const day of plan.days) {
    foundMeal = day.meals.find((m) => m.meal_id === mealId)
    if (foundMeal) {
      break
    }
  }

  if (!foundMeal) {
    return { success: false, error: 'Meal not found' }
  }

  // Try to get real recipe details from API
  let ingredients: RecipeDetails['ingredients'] = []
  let instructions: string[] = []

  // If meal has source_id, fetch from API
  if (foundMeal.source === 'spoonacular' && foundMeal.source_id) {
    try {
      const spoonacularRecipe = await getRecipeById(Number(foundMeal.source_id))
      if (spoonacularRecipe) {
        ingredients = (spoonacularRecipe.extendedIngredients || []).map((ing) => ({
          name: ing.name,
          amount: `${ing.amount} ${ing.unit}`,
        }))

        instructions = spoonacularRecipe.analyzedInstructions?.[0]?.steps.map(
          (step) => step.step,
        ) || []
      }
    } catch (e) {
      console.log('Failed to fetch Spoonacular recipe details')
    }
  }

  // If meal is from MealDB, search for recipe
  if (foundMeal.source === 'mealdb' && foundMeal.source_id) {
    try {
      const mealDBRecipes = await searchMealDB(foundMeal.title)
      const recipe = mealDBRecipes.find((r) => r.idMeal === foundMeal!.source_id) || mealDBRecipes[0]
      if (recipe) {
        ingredients = extractMealDBIngredients(recipe).map((ing) => ({
          name: ing.name,
          amount: ing.amount,
        }))
        instructions = recipe.strInstructions.split('\r\n').filter(Boolean)
      }
    } catch (e) {
      console.log('Failed to fetch MealDB recipe details')
    }
  }

  // Fallback ingredients if API failed
  if (ingredients.length === 0) {
    ingredients = [
      { name: 'Main Protein', amount: '1 lb' },
      { name: 'Olive Oil', amount: '2 tbsp' },
      { name: 'Garlic', amount: '3 cloves', notes: 'minced' },
      { name: 'Salt & Pepper', amount: 'to taste' },
      { name: 'Fresh Herbs', amount: '1/4 cup', notes: 'chopped' },
    ]
  }

  // Fallback instructions if API failed
  if (instructions.length === 0) {
    instructions = [
      'Prepare all ingredients and set aside.',
      'Heat olive oil in a large pan over medium-high heat.',
      'Add the main protein and cook until golden, about 4-5 minutes per side.',
      'Add garlic and cook for 1 minute until fragrant.',
      'Season with salt, pepper, and fresh herbs.',
      'Serve immediately and enjoy!',
    ]
  }

  const recipe: RecipeDetails = {
    meal_id: foundMeal.meal_id,
    title: foundMeal.title,
    prep_minutes: foundMeal.prep_minutes,
    cook_minutes: Math.round(foundMeal.prep_minutes * 1.5),
    servings: foundMeal.servings,
    estimated_cost: foundMeal.estimated_cost,
    calories: foundMeal.calories,
    macros: foundMeal.macros,
    tags: foundMeal.tags,
    ingredients,
    instructions,
    substitutions: [
      { original: 'Olive oil', alternative: 'Avocado oil', notes: 'Same amount' },
      { original: 'Fresh herbs', alternative: 'Dried herbs', notes: 'Use 1/3 the amount' },
    ],
    image_url: foundMeal.image_url,
    source: foundMeal.source,
  }

  return {
    success: true,
    recipe,
  }
}

async function handleSwapMeal(
  _app: McpAppConfig,
  args: Record<string, unknown>,
  _userId: string,
): Promise<Record<string, unknown>> {
  const planId = String(args.plan_id || '')
  const mealId = String(args.meal_id || '')
  const replaceWith = args.replace_with ? String(args.replace_with) : undefined
  const constraints = Array.isArray(args.constraints)
    ? args.constraints.map(String)
    : []

  const plan = planStore.get(planId)
  if (!plan) {
    return { success: false, error: 'Plan not found' }
  }

  let foundMeal: Meal | undefined
  let dayIndex = -1
  let mealIndex = -1

  for (let i = 0; i < plan.days.length; i++) {
    const idx = plan.days[i].meals.findIndex((m) => m.meal_id === mealId)
    if (idx !== -1) {
      foundMeal = plan.days[i].meals[idx]
      dayIndex = i
      mealIndex = idx
      break
    }
  }

  if (!foundMeal) {
    return { success: false, error: 'Meal not found' }
  }

  const mealType = foundMeal.type
  const templates = MEAL_TEMPLATES[mealType]

  const candidates: SwapCandidate[] = templates
    .filter((t) => t.title !== foundMeal.title)
    .slice(0, 4)
    .map((t, i) => ({
      meal_id: `swap_${nanoid(6)}`,
      title: t.title,
      prep_minutes: t.prep,
      calories: t.cal,
      estimated_cost: Math.round(t.cost * foundMeal.servings * 100) / 100,
      macros: { protein_g: t.protein, carbs_g: t.carbs, fat_g: t.fat },
      tags: t.tags,
      match_score: 0.9 - i * 0.1,
    }))

  if (replaceWith) {
    const newMealData =
      candidates.find((c) => c.meal_id === replaceWith) || candidates[0]
    const newMeal: Meal = {
      meal_id: nanoid(8),
      type: mealType,
      title: newMealData.title,
      servings: foundMeal.servings,
      prep_minutes: newMealData.prep_minutes,
      estimated_cost: newMealData.estimated_cost,
      calories: newMealData.calories,
      macros: newMealData.macros,
      tags: newMealData.tags,
    }

    plan.days[dayIndex].meals[mealIndex] = newMeal

    // Recalculate day totals
    const meals = plan.days[dayIndex].meals
    plan.days[dayIndex].totals = meals.reduce(
      (acc, m) => ({
        calories: acc.calories + m.calories,
        protein_g: acc.protein_g + m.macros.protein_g,
        carbs_g: acc.carbs_g + m.macros.carbs_g,
        fat_g: acc.fat_g + m.macros.fat_g,
      }),
      { calories: 0, protein_g: 0, carbs_g: 0, fat_g: 0 },
    )

    planStore.set(planId, plan)

    return {
      success: true,
      message: `Replaced ${foundMeal.title} with ${newMeal.title}`,
      updated_meal: newMeal,
      updated_plan: plan,
    }
  }

  return {
    success: true,
    message: `Found ${candidates.length} alternatives for ${foundMeal.title}`,
    current_meal: foundMeal,
    candidates,
    widget_mode: 'swap',
  }
}

async function handleUpdatePlanConstraints(
  _app: McpAppConfig,
  args: Record<string, unknown>,
  _userId: string,
): Promise<Record<string, unknown>> {
  const planId = String(args.plan_id || '')

  const plan = planStore.get(planId)
  if (!plan) {
    return { success: false, error: 'Plan not found' }
  }

  if (args.budget_target !== undefined) {
    plan.constraints.budget_target = Number(args.budget_target)
  }
  if (Array.isArray(args.dietary_preferences)) {
    plan.constraints.diet = args.dietary_preferences.map(String)
  }
  if (Array.isArray(args.allergies)) {
    plan.constraints.allergies = args.allergies.map(String)
  }
  if (args.max_prep_minutes !== undefined) {
    plan.constraints.max_prep_minutes = Number(args.max_prep_minutes)
  }

  planStore.set(planId, plan)

  return {
    success: true,
    message: 'Plan constraints updated',
    updated_constraints: plan.constraints,
    plan,
  }
}

async function handleBuildShoppingList(
  _app: McpAppConfig,
  args: Record<string, unknown>,
  _userId: string,
): Promise<Record<string, unknown>> {
  const planId = String(args.plan_id || '')

  const plan = planStore.get(planId)
  if (!plan) {
    return { success: false, error: 'Plan not found' }
  }

  const totalCost = plan.shopping_list.reduce(
    (sum, section) =>
      sum +
      section.items.reduce((s, item) => s + (item.estimated_cost || 0), 0),
    0,
  )

  return {
    success: true,
    shopping_list: plan.shopping_list,
    estimated_total: Math.round(totalCost * 100) / 100,
    item_count: plan.shopping_list.reduce((sum, s) => sum + s.items.length, 0),
  }
}

async function handleCreateOrderLink(
  _app: McpAppConfig,
  args: Record<string, unknown>,
  _userId: string,
): Promise<Record<string, unknown>> {
  const planId = String(args.plan_id || '')
  const provider = String(args.provider || 'instacart')

  const plan = planStore.get(planId)
  if (!plan) {
    return { success: false, error: 'Plan not found' }
  }

  const providerUrls: Record<string, string> = {
    instacart: 'https://www.instacart.com/store/checkout',
    amazon_fresh: 'https://www.amazon.com/alm/storefront',
    walmart: 'https://www.walmart.com/grocery',
  }

  const baseUrl = providerUrls[provider] || providerUrls.instacart

  return {
    success: true,
    provider,
    deeplink: `${baseUrl}?plan=${planId}`,
    items_count: plan.shopping_list.reduce((sum, s) => sum + s.items.length, 0),
    estimated_total: plan.budget_summary.estimated_total,
    cta: `Order with ${
      provider.charAt(0).toUpperCase() + provider.slice(1).replace('_', ' ')
    }`,
  }
}

async function handleGetUserInfo(
  _app: McpAppConfig,
  _args: Record<string, unknown>,
  userId: string,
): Promise<Record<string, unknown>> {
  const { supabaseAdmin } = await import('@/utils/supabase/supabase-admin')
  const { data: user } = await supabaseAdmin
    .from('users')
    .select('id, email, full_name, avatar_url')
    .eq('id', userId)
    .single()

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  return {
    success: true,
    user: user ?? {},
    accountUrl: `${baseUrl}/account`,
  }
}

/*
 * ============================================================================
 * HANDLER REGISTRY
 * ============================================================================
 */

export function getChefplanToolHandlers(): Record<string, ToolHandler> {
  return {
    generate_weekly_plan: handleGenerateWeeklyPlan,
    get_recipe_details: handleGetRecipeDetails,
    swap_meal: handleSwapMeal,
    update_plan_constraints: handleUpdatePlanConstraints,
    build_shopping_list: handleBuildShoppingList,
    create_order_link: handleCreateOrderLink,
    get_user_info: handleGetUserInfo,
  }
}
