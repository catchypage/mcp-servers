import type { McpAppConfig, McpToolDefinition } from '@/utils/mcp/core/registry'
import {
  searchMealDB,
  getRandomMealDB,
  extractMealDBIngredients,
  type MealDBRecipe,
} from '@/utils/mcp/apps/chefplan/api-clients'

/*
 * ═══════════════════════════════════════════
 * TOOL DEFINITIONS
 * ═══════════════════════════════════════════
 */

const calculateMetabolismTool: McpToolDefinition = {
  name: 'calculate_metabolism',
  title: 'Calculate Metabolism',
  description:
    'Calculate BMR (Basal Metabolic Rate), TDEE (Total Daily Energy Expenditure), and recommended macros based on personal data. Uses Mifflin-St Jeor equation.',
  inputSchema: {
    type: 'object',
    properties: {
      weight_kg: { type: 'number', description: 'Body weight in kilograms' },
      height_cm: { type: 'number', description: 'Height in centimeters' },
      age: { type: 'number', description: 'Age in years' },
      gender: {
        type: 'string',
        enum: ['male', 'female'],
        description: 'Biological gender',
      },
      activity_level: {
        type: 'string',
        enum: ['sedentary', 'light', 'moderate', 'active', 'very_active'],
        description:
          'sedentary (desk job), light (1-3 days/week), moderate (3-5 days/week), active (6-7 days/week), very_active (athlete)',
      },
      goal: {
        type: 'string',
        enum: ['lose', 'maintain', 'gain'],
        description: 'Weight goal: lose, maintain, or gain',
      },
    },
    required: [],
  },
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    openWorldHint: false,
    idempotentHint: true,
  },
}

const findRecipeTool: McpToolDefinition = {
  name: 'find_recipe',
  title: 'Find Recipe',
  description:
    'Search for a recipe by name or keyword. Returns recipe with photo, ingredients, instructions, and category.',
  inputSchema: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description:
          'Recipe search query (e.g. "pasta carbonara", "chicken curry")',
      },
      random: {
        type: 'boolean',
        description: 'If true, returns a random recipe (ignores query)',
      },
    },
    required: [],
  },
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    openWorldHint: true,
    idempotentHint: false,
  },
}

export const nutriTools: McpToolDefinition[] = [
  calculateMetabolismTool,
  findRecipeTool,
]

/*
 * ═══════════════════════════════════════════
 * HANDLERS
 * ═══════════════════════════════════════════
 */

export type ToolHandler = (
  app: McpAppConfig,
  args: Record<string, unknown>,
  userId: string,
) => Promise<Record<string, unknown>>

const ACTIVITY_MULTIPLIERS: Record<string, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
}

async function handleCalculateMetabolism(
  _app: McpAppConfig,
  args: Record<string, unknown>,
): Promise<Record<string, unknown>> {
  const weight = Number(args.weight_kg) || 0
  const height = Number(args.height_cm) || 0
  const age = Number(args.age) || 0

  if (weight <= 0 || height <= 0 || age <= 0) {
    return {
      success: true,
      mode: 'form',
      message:
        'Please provide weight_kg, height_cm, and age to calculate metabolism.',
    }
  }

  const gender = String(args.gender ?? 'male').toLowerCase()
  const activity = String(args.activity_level ?? 'moderate').toLowerCase()
  const goal = String(args.goal ?? 'maintain').toLowerCase()

  // Mifflin-St Jeor
  const bmr =
    gender === 'female'
      ? 10 * weight + 6.25 * height - 5 * age - 161
      : 10 * weight + 6.25 * height - 5 * age + 5

  const multiplier = ACTIVITY_MULTIPLIERS[activity] ?? 1.55
  const tdee = bmr * multiplier

  let goalCalories = tdee
  if (goal === 'lose') {
    goalCalories = tdee - 500
  } else if (goal === 'gain') {
    goalCalories = tdee + 400
  }
  goalCalories = Math.max(goalCalories, 1200)

  const protein = Math.round((goalCalories * 0.3) / 4)
  const carbs = Math.round((goalCalories * 0.4) / 4)
  const fat = Math.round((goalCalories * 0.3) / 9)

  return {
    success: true,
    mode: 'metabolism',
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    goal,
    goalCalories: Math.round(goalCalories),
    protein,
    carbs,
    fat,
    weight_kg: weight,
    height_cm: height,
    age,
    gender,
    activity_level: activity,
    message: `TDEE: ${Math.round(tdee)} kcal/day, Goal: ${Math.round(
      goalCalories,
    )} kcal/day`,
  }
}

function mealDBToRecipeResult(recipe: MealDBRecipe): Record<string, unknown> {
  const ingredients = extractMealDBIngredients(recipe)
  const rawSteps = recipe.strInstructions
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
  const tags = recipe.strTags
    ? recipe.strTags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
    : []

  return {
    success: true,
    mode: 'recipe',
    id: recipe.idMeal,
    title: recipe.strMeal,
    category: recipe.strCategory,
    area: recipe.strArea,
    image: recipe.strMealThumb,
    instructions: rawSteps,
    ingredients,
    tags,
    youtube: recipe.strYoutube ?? '',
    message: `Recipe: ${recipe.strMeal}`,
  }
}

async function handleFindRecipe(
  _app: McpAppConfig,
  args: Record<string, unknown>,
): Promise<Record<string, unknown>> {
  if (args.random === true) {
    const meal = await getRandomMealDB()
    if (meal) {
      return mealDBToRecipeResult(meal)
    }
    return { success: false, message: 'Could not fetch a random recipe.' }
  }

  const query = String(args.query ?? '').trim()
  if (!query) {
    const meal = await getRandomMealDB()
    if (meal) {
      return mealDBToRecipeResult(meal)
    }
    return {
      success: false,
      message: 'No query provided and random fetch failed.',
    }
  }

  const meals = await searchMealDB(query)
  if (meals.length > 0) {
    return mealDBToRecipeResult(meals[0])
  }

  return {
    success: false,
    message: `No recipe found for "${query}". Try a different search.`,
  }
}

export function getNutriToolHandlers(): Record<string, ToolHandler> {
  return {
    calculate_metabolism: handleCalculateMetabolism as ToolHandler,
    find_recipe: handleFindRecipe as ToolHandler,
  }
}
