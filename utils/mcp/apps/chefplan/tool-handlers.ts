import type { McpAppConfig } from '@/utils/mcp/core/registry'
import type {
  DayPlan,
  Meal,
  MealPlan,
  RecipeDetails,
  SwapCandidate,
} from './types'
import { nanoid } from 'nanoid'
import {
  getRecipeById,
  searchMealDB,
  extractMealDBIngredients,
} from './api-clients'
import {
  DAYS,
  MEAL_TYPE_QUERIES,
  generateDayPlanFallback,
  generateDayPlanFromAPI,
  generateShoppingListFallback,
  generateShoppingListFromAPI,
  mealDBToMeal,
  prefetchMealDBRecipes,
  randomPick,
  recipeCache,
} from './meal-plan-helpers'

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
  void _userId
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

  await prefetchMealDBRecipes()

  let days: DayPlan[]
  let dataSource: 'api' | 'fallback' = 'api'

  try {
    days = await Promise.all(
      DAYS.map((day) =>
        generateDayPlanFromAPI(day, householdSize, apiDiet, maxPrepMinutes),
      ),
    )
  } catch (e) {
    console.log('API generation failed, using fallback:', e)
    days = DAYS.map((day) => generateDayPlanFallback(day, householdSize))
    dataSource = 'fallback'
  }

  let shoppingList: Awaited<ReturnType<typeof generateShoppingListFromAPI>>
  try {
    shoppingList = await generateShoppingListFromAPI(days)
  } catch {
    shoppingList = generateShoppingListFallback()
  }

  const totalCost = shoppingList.reduce(
    (sum, section) =>
      sum +
      section.items.reduce((s, item) => s + (item.estimated_cost ?? 0), 0),
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
  void _userId
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

  let ingredients: RecipeDetails['ingredients'] = []
  let instructions: string[] = []

  if (foundMeal.source === 'spoonacular' && foundMeal.source_id) {
    try {
      const spoonacularRecipe = await getRecipeById(Number(foundMeal.source_id))
      if (spoonacularRecipe) {
        ingredients = (spoonacularRecipe.extendedIngredients ?? []).map(
          (ing) => ({
            name: ing.name,
            amount: `${ing.amount} ${ing.unit}`,
          }),
        )

        instructions =
          spoonacularRecipe.analyzedInstructions?.[0]?.steps.map(
            (step) => step.step,
          ) ?? []
      }
    } catch {
      console.log('Failed to fetch Spoonacular recipe details')
    }
  }

  if (foundMeal.source === 'mealdb' && foundMeal.source_id) {
    try {
      const mealDBRecipes = await searchMealDB(foundMeal.title)
      const recipe =
        mealDBRecipes.find((r) => r.idMeal === foundMeal.source_id) ??
        mealDBRecipes[0]
      if (recipe) {
        ingredients = extractMealDBIngredients(recipe).map((ing) => ({
          name: ing.name,
          amount: ing.amount,
        }))
        instructions = recipe.strInstructions.split('\r\n').filter(Boolean)
      }
    } catch {
      console.log('Failed to fetch MealDB recipe details')
    }
  }

  if (ingredients.length === 0) {
    ingredients = [
      { name: 'Main Protein', amount: '1 lb' },
      { name: 'Olive Oil', amount: '2 tbsp' },
      { name: 'Garlic', amount: '3 cloves', notes: 'minced' },
      { name: 'Salt & Pepper', amount: 'to taste' },
      { name: 'Fresh Herbs', amount: '1/4 cup', notes: 'chopped' },
    ]
  }

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
      {
        original: 'Olive oil',
        alternative: 'Avocado oil',
        notes: 'Same amount',
      },
      {
        original: 'Fresh herbs',
        alternative: 'Dried herbs',
        notes: 'Use 1/3 the amount',
      },
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
  void _userId
  const planId = String(args.plan_id || '')
  const mealId = String(args.meal_id || '')
  const replaceWith = args.replace_with ? String(args.replace_with) : undefined

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

  const mealType = foundMeal.type as 'breakfast' | 'lunch' | 'dinner' | 'snack'

  const queries = MEAL_TYPE_QUERIES[mealType]
  const candidateMeals: Meal[] = []

  for (const query of queries) {
    const cached = recipeCache.get(query)
    if (cached && cached.length > 0) {
      for (const recipe of cached) {
        if (recipe.strMeal !== foundMeal.title && candidateMeals.length < 4) {
          candidateMeals.push(
            mealDBToMeal(recipe, mealType, foundMeal.servings),
          )
        }
      }
    }
    if (candidateMeals.length >= 4) {
      break
    }
  }

  if (candidateMeals.length < 4) {
    try {
      const query = randomPick(queries)
      const recipes = await searchMealDB(query)
      for (const recipe of recipes) {
        if (recipe.strMeal !== foundMeal.title && candidateMeals.length < 4) {
          candidateMeals.push(
            mealDBToMeal(recipe, mealType, foundMeal.servings),
          )
        }
      }
    } catch (e) {
      console.log('[ChefPlan] Error fetching swap candidates:', e)
    }
  }

  const candidates: SwapCandidate[] = candidateMeals.map((meal, i) => ({
    meal_id: meal.meal_id,
    title: meal.title,
    prep_minutes: meal.prep_minutes,
    calories: meal.calories,
    estimated_cost: meal.estimated_cost,
    macros: meal.macros,
    tags: meal.tags,
    match_score: 0.95 - i * 0.05,
    image_url: meal.image_url,
  }))

  if (replaceWith) {
    const newMealData = candidates.find((c) => c.meal_id === replaceWith)
    if (!newMealData) {
      return { success: false, error: 'Replacement meal not found' }
    }

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
      image_url: newMealData.image_url,
      source: 'mealdb',
    }

    plan.days[dayIndex].meals[mealIndex] = newMeal

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
  void _userId
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
  void _userId
  const planId = String(args.plan_id || '')

  const plan = planStore.get(planId)
  if (!plan) {
    return { success: false, error: 'Plan not found' }
  }

  const totalCost = plan.shopping_list.reduce(
    (sum, section) =>
      sum +
      section.items.reduce((s, item) => s + (item.estimated_cost ?? 0), 0),
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
  void _userId
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

  const baseUrl = providerUrls[provider] ?? providerUrls.instacart

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
