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
 * MOCK DATA GENERATORS
 * ============================================================================
 */

const MEAL_TEMPLATES = {
  breakfast: [
    {
      title: 'Greek Yogurt Parfait',
      prep: 10,
      cost: 4.5,
      cal: 320,
      protein: 22,
      carbs: 28,
      fat: 9,
      tags: ['high-protein', 'quick'],
    },
    {
      title: 'Avocado Toast with Eggs',
      prep: 15,
      cost: 5.2,
      cal: 420,
      protein: 18,
      carbs: 32,
      fat: 24,
      tags: ['healthy', 'popular'],
    },
    {
      title: 'Overnight Oats',
      prep: 5,
      cost: 2.8,
      cal: 350,
      protein: 12,
      carbs: 58,
      fat: 8,
      tags: ['budget', 'meal-prep'],
    },
    {
      title: 'Veggie Omelette',
      prep: 12,
      cost: 4.0,
      cal: 280,
      protein: 20,
      carbs: 8,
      fat: 18,
      tags: ['low-carb', 'keto'],
    },
    {
      title: 'Smoothie Bowl',
      prep: 8,
      cost: 5.5,
      cal: 380,
      protein: 14,
      carbs: 52,
      fat: 12,
      tags: ['vegan', 'refreshing'],
    },
  ],
  lunch: [
    {
      title: 'Chicken Rice Bowls',
      prep: 20,
      cost: 6.5,
      cal: 540,
      protein: 38,
      carbs: 52,
      fat: 16,
      tags: ['high-protein', 'meal-prep'],
    },
    {
      title: 'Mediterranean Salad',
      prep: 15,
      cost: 7.2,
      cal: 420,
      protein: 24,
      carbs: 28,
      fat: 22,
      tags: ['healthy', 'mediterranean'],
    },
    {
      title: 'Turkey Wrap',
      prep: 10,
      cost: 5.8,
      cal: 480,
      protein: 32,
      carbs: 42,
      fat: 18,
      tags: ['quick', 'portable'],
    },
    {
      title: 'Lentil Soup',
      prep: 25,
      cost: 3.5,
      cal: 320,
      protein: 18,
      carbs: 48,
      fat: 4,
      tags: ['budget', 'vegan'],
    },
    {
      title: 'Tuna Poke Bowl',
      prep: 15,
      cost: 8.5,
      cal: 450,
      protein: 36,
      carbs: 38,
      fat: 14,
      tags: ['high-protein', 'fresh'],
    },
  ],
  dinner: [
    {
      title: 'Lentil Pasta Bake',
      prep: 25,
      cost: 8.2,
      cal: 710,
      protein: 29,
      carbs: 66,
      fat: 18,
      tags: ['comfort-food', 'family'],
    },
    {
      title: 'Grilled Salmon with Veggies',
      prep: 22,
      cost: 12.5,
      cal: 580,
      protein: 42,
      carbs: 18,
      fat: 32,
      tags: ['high-protein', 'healthy'],
    },
    {
      title: 'Chicken Stir Fry',
      prep: 20,
      cost: 7.8,
      cal: 520,
      protein: 38,
      carbs: 42,
      fat: 18,
      tags: ['quick', 'asian'],
    },
    {
      title: 'Beef Tacos',
      prep: 25,
      cost: 9.2,
      cal: 640,
      protein: 34,
      carbs: 48,
      fat: 28,
      tags: ['kid-friendly', 'popular'],
    },
    {
      title: 'Veggie Curry',
      prep: 30,
      cost: 6.5,
      cal: 480,
      protein: 16,
      carbs: 58,
      fat: 18,
      tags: ['vegan', 'spicy'],
    },
  ],
  snack: [
    {
      title: 'Apple & Peanut Butter',
      prep: 2,
      cost: 1.5,
      cal: 180,
      protein: 6,
      carbs: 22,
      fat: 8,
      tags: ['quick', 'healthy'],
    },
    {
      title: 'Greek Yogurt & Berries',
      prep: 3,
      cost: 2.2,
      cal: 150,
      protein: 12,
      carbs: 18,
      fat: 2,
      tags: ['high-protein', 'low-fat'],
    },
    {
      title: 'Trail Mix',
      prep: 1,
      cost: 2.0,
      cal: 200,
      protein: 6,
      carbs: 20,
      fat: 12,
      tags: ['portable', 'energy'],
    },
    {
      title: 'Hummus & Veggies',
      prep: 5,
      cost: 3.0,
      cal: 160,
      protein: 6,
      carbs: 18,
      fat: 8,
      tags: ['vegan', 'fiber'],
    },
  ],
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function randomPick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function generateMeal(
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
  }
}

function generateDayPlan(day: string, servings: number): DayPlan {
  const meals = [
    generateMeal('breakfast', servings),
    generateMeal('lunch', servings),
    generateMeal('dinner', servings),
    generateMeal('snack', servings),
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

function generateShoppingList(days: DayPlan[]): ShoppingSection[] {
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

  const days = DAYS.map((day) => generateDayPlan(day, householdSize))
  const shoppingList = generateShoppingList(days)

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
  }

  planStore.set(plan.plan_id, plan)

  return {
    success: true,
    message: `Created ${goal} meal plan for ${householdSize} people`,
    plan,
    widget_mode: 'inline',
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
    ingredients: [
      { name: 'Main Protein', amount: '1 lb' },
      { name: 'Olive Oil', amount: '2 tbsp' },
      { name: 'Garlic', amount: '3 cloves', notes: 'minced' },
      { name: 'Salt & Pepper', amount: 'to taste' },
      { name: 'Fresh Herbs', amount: '1/4 cup', notes: 'chopped' },
    ],
    instructions: [
      'Prepare all ingredients and set aside.',
      'Heat olive oil in a large pan over medium-high heat.',
      'Add the main protein and cook until golden, about 4-5 minutes per side.',
      'Add garlic and cook for 1 minute until fragrant.',
      'Season with salt, pepper, and fresh herbs.',
      'Serve immediately and enjoy!',
    ],
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
