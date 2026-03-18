/**
 * External API clients for ChefPlan
 * All APIs used here are FREE (with rate limits)
 *
 * APIs:
 * 1. Spoonacular - Recipes, meal planning, nutrition (free tier: 150 requests/day)
 * 2. USDA FoodData Central - Official US nutrition database (completely free)
 * 3. Open Food Facts - Product data, prices (completely free, open source)
 */

// =============================================================================
// TYPES
// =============================================================================

export interface SpoonacularRecipe {
  id: number
  title: string
  readyInMinutes: number
  servings: number
  image: string
  imageType: string
  nutrition?: {
    nutrients: Array<{
      name: string
      amount: number
      unit: string
    }>
  }
  pricePerServing?: number
  diets?: string[]
  cuisines?: string[]
  dishTypes?: string[]
  extendedIngredients?: Array<{
    id: number
    name: string
    amount: number
    unit: string
    original: string
  }>
  analyzedInstructions?: Array<{
    steps: Array<{
      number: number
      step: string
    }>
  }>
}

export interface SpoonacularMealPlanDay {
  meals: Array<{
    id: number
    title: string
    readyInMinutes: number
    servings: number
    sourceUrl: string
    image: string
    imageType: string
  }>
  nutrients: {
    calories: number
    protein: number
    fat: number
    carbohydrates: number
  }
}

export interface USDAFood {
  fdcId: number
  description: string
  dataType: string
  brandOwner?: string
  foodNutrients: Array<{
    nutrientId: number
    nutrientName: string
    nutrientNumber: string
    unitName: string
    value: number
  }>
}

export interface OpenFoodFactsProduct {
  code: string
  product_name: string
  brands?: string
  categories?: string
  nutriments?: {
    'energy-kcal_100g'?: number
    proteins_100g?: number
    carbohydrates_100g?: number
    fat_100g?: number
  }
  image_url?: string
}

// =============================================================================
// SPOONACULAR API CLIENT (Free tier: 150 requests/day)
// https://spoonacular.com/food-api
// =============================================================================

const SPOONACULAR_BASE_URL = 'https://api.spoonacular.com'

function getSpoonacularApiKey(): string {
  const key = process.env.SPOONACULAR_API_KEY
  if (!key) {
    console.warn('SPOONACULAR_API_KEY not set, using demo mode')
    return ''
  }
  return key
}

export async function searchRecipes(params: {
  query?: string
  diet?: string
  intolerances?: string
  maxReadyTime?: number
  number?: number
  addRecipeNutrition?: boolean
}): Promise<SpoonacularRecipe[]> {
  const apiKey = getSpoonacularApiKey()
  if (!apiKey) return []

  const searchParams = new URLSearchParams({
    apiKey,
    number: String(params.number || 10),
    addRecipeNutrition: String(params.addRecipeNutrition ?? true),
    ...(params.query && { query: params.query }),
    ...(params.diet && { diet: params.diet }),
    ...(params.intolerances && { intolerances: params.intolerances }),
    ...(params.maxReadyTime && { maxReadyTime: String(params.maxReadyTime) }),
  })

  try {
    const response = await fetch(
      `${SPOONACULAR_BASE_URL}/recipes/complexSearch?${searchParams}`,
    )
    if (!response.ok) {
      console.error('Spoonacular API error:', response.status)
      return []
    }
    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error('Spoonacular API error:', error)
    return []
  }
}

export async function getRecipeById(
  recipeId: number,
): Promise<SpoonacularRecipe | null> {
  const apiKey = getSpoonacularApiKey()
  if (!apiKey) return null

  try {
    const response = await fetch(
      `${SPOONACULAR_BASE_URL}/recipes/${recipeId}/information?apiKey=${apiKey}&includeNutrition=true`,
    )
    if (!response.ok) return null
    return await response.json()
  } catch (error) {
    console.error('Spoonacular API error:', error)
    return null
  }
}

export async function generateMealPlan(params: {
  timeFrame: 'day' | 'week'
  targetCalories?: number
  diet?: string
  exclude?: string
}): Promise<SpoonacularMealPlanDay[] | null> {
  const apiKey = getSpoonacularApiKey()
  if (!apiKey) return null

  const searchParams = new URLSearchParams({
    apiKey,
    timeFrame: params.timeFrame,
    ...(params.targetCalories && {
      targetCalories: String(params.targetCalories),
    }),
    ...(params.diet && { diet: params.diet }),
    ...(params.exclude && { exclude: params.exclude }),
  })

  try {
    const response = await fetch(
      `${SPOONACULAR_BASE_URL}/mealplanner/generate?${searchParams}`,
    )
    if (!response.ok) return null
    const data = await response.json()
    return params.timeFrame === 'week' ? data.week : [data]
  } catch (error) {
    console.error('Spoonacular API error:', error)
    return null
  }
}

export async function getRandomRecipes(params: {
  number?: number
  tags?: string
}): Promise<SpoonacularRecipe[]> {
  const apiKey = getSpoonacularApiKey()
  if (!apiKey) return []

  const searchParams = new URLSearchParams({
    apiKey,
    number: String(params.number || 5),
    ...(params.tags && { tags: params.tags }),
  })

  try {
    const response = await fetch(
      `${SPOONACULAR_BASE_URL}/recipes/random?${searchParams}`,
    )
    if (!response.ok) return []
    const data = await response.json()
    return data.recipes || []
  } catch (error) {
    console.error('Spoonacular API error:', error)
    return []
  }
}

// =============================================================================
// USDA FOODDATA CENTRAL API (Completely FREE)
// https://fdc.nal.usda.gov/api-guide.html
// =============================================================================

const USDA_BASE_URL = 'https://api.nal.usda.gov/fdc/v1'

function getUSDAApiKey(): string {
  // USDA provides a demo key for testing: DEMO_KEY
  // For production, get a free key at https://fdc.nal.usda.gov/api-key-signup.html
  return process.env.USDA_API_KEY || 'DEMO_KEY'
}

export async function searchUSDAFoods(params: {
  query: string
  pageSize?: number
  dataType?: string[]
}): Promise<USDAFood[]> {
  const apiKey = getUSDAApiKey()

  try {
    const response = await fetch(`${USDA_BASE_URL}/foods/search?api_key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: params.query,
        pageSize: params.pageSize || 10,
        dataType: params.dataType || ['Survey (FNDDS)', 'Foundation', 'SR Legacy'],
      }),
    })
    if (!response.ok) return []
    const data = await response.json()
    return data.foods || []
  } catch (error) {
    console.error('USDA API error:', error)
    return []
  }
}

export async function getUSDAFoodById(fdcId: number): Promise<USDAFood | null> {
  const apiKey = getUSDAApiKey()

  try {
    const response = await fetch(
      `${USDA_BASE_URL}/food/${fdcId}?api_key=${apiKey}`,
    )
    if (!response.ok) return null
    return await response.json()
  } catch (error) {
    console.error('USDA API error:', error)
    return null
  }
}

// Helper to extract common nutrients from USDA response
export function extractUSDANutrients(food: USDAFood): {
  calories: number
  protein: number
  carbs: number
  fat: number
} {
  const nutrients = food.foodNutrients || []

  const findNutrient = (names: string[]): number => {
    const nutrient = nutrients.find((n) =>
      names.some(
        (name) =>
          n.nutrientName?.toLowerCase().includes(name.toLowerCase()),
      ),
    )
    return nutrient?.value || 0
  }

  return {
    calories: findNutrient(['energy', 'calories']),
    protein: findNutrient(['protein']),
    carbs: findNutrient(['carbohydrate']),
    fat: findNutrient(['total lipid', 'fat']),
  }
}

// =============================================================================
// OPEN FOOD FACTS API (Completely FREE, Open Source)
// https://world.openfoodfacts.org/data
// =============================================================================

const OPENFOODFACTS_BASE_URL = 'https://world.openfoodfacts.org'

export async function searchOpenFoodFacts(params: {
  query: string
  pageSize?: number
  categories?: string
}): Promise<OpenFoodFactsProduct[]> {
  const searchParams = new URLSearchParams({
    search_terms: params.query,
    page_size: String(params.pageSize || 10),
    json: '1',
    ...(params.categories && { tagtype_0: 'categories', tag_contains_0: 'contains', tag_0: params.categories }),
  })

  try {
    const response = await fetch(
      `${OPENFOODFACTS_BASE_URL}/cgi/search.pl?${searchParams}`,
      {
        headers: {
          'User-Agent': 'ChefPlan/1.0 (contact@example.com)',
        },
      },
    )
    if (!response.ok) return []
    const data = await response.json()
    return data.products || []
  } catch (error) {
    console.error('Open Food Facts API error:', error)
    return []
  }
}

export async function getOpenFoodFactsProduct(
  barcode: string,
): Promise<OpenFoodFactsProduct | null> {
  try {
    const response = await fetch(
      `${OPENFOODFACTS_BASE_URL}/api/v0/product/${barcode}.json`,
      {
        headers: {
          'User-Agent': 'ChefPlan/1.0 (contact@example.com)',
        },
      },
    )
    if (!response.ok) return null
    const data = await response.json()
    return data.status === 1 ? data.product : null
  } catch (error) {
    console.error('Open Food Facts API error:', error)
    return null
  }
}

// =============================================================================
// THEMEALDB API (Completely FREE)
// https://www.themealdb.com/api.php
// =============================================================================

const MEALDB_BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

export interface MealDBRecipe {
  idMeal: string
  strMeal: string
  strCategory: string
  strArea: string
  strInstructions: string
  strMealThumb: string
  strTags: string | null
  strYoutube: string
  strIngredient1?: string
  strIngredient2?: string
  strIngredient3?: string
  strIngredient4?: string
  strIngredient5?: string
  strIngredient6?: string
  strIngredient7?: string
  strIngredient8?: string
  strIngredient9?: string
  strIngredient10?: string
  strMeasure1?: string
  strMeasure2?: string
  strMeasure3?: string
  strMeasure4?: string
  strMeasure5?: string
  strMeasure6?: string
  strMeasure7?: string
  strMeasure8?: string
  strMeasure9?: string
  strMeasure10?: string
}

export async function searchMealDB(query: string): Promise<MealDBRecipe[]> {
  try {
    const response = await fetch(
      `${MEALDB_BASE_URL}/search.php?s=${encodeURIComponent(query)}`,
    )
    if (!response.ok) return []
    const data = await response.json()
    return data.meals || []
  } catch (error) {
    console.error('MealDB API error:', error)
    return []
  }
}

export async function getRandomMealDB(): Promise<MealDBRecipe | null> {
  try {
    const response = await fetch(`${MEALDB_BASE_URL}/random.php`)
    if (!response.ok) return null
    const data = await response.json()
    return data.meals?.[0] || null
  } catch (error) {
    console.error('MealDB API error:', error)
    return null
  }
}

export async function getMealDBById(id: string): Promise<MealDBRecipe | null> {
  try {
    const response = await fetch(`${MEALDB_BASE_URL}/lookup.php?i=${id}`)
    if (!response.ok) return null
    const data = await response.json()
    return data.meals?.[0] || null
  } catch (error) {
    console.error('MealDB API error:', error)
    return null
  }
}

export async function getMealDBByCategory(
  category: string,
): Promise<MealDBRecipe[]> {
  try {
    // Filter by category returns only basic info (idMeal, strMeal, strMealThumb)
    const response = await fetch(
      `${MEALDB_BASE_URL}/filter.php?c=${encodeURIComponent(category)}`,
    )
    if (!response.ok) return []
    const data = await response.json()
    const basicMeals = data.meals || []

    // Get full details for up to 5 random meals
    if (basicMeals.length === 0) return []

    const selectedMeals = basicMeals
      .sort(() => Math.random() - 0.5)
      .slice(0, 5)

    const fullMeals = await Promise.all(
      selectedMeals.map((m: { idMeal: string }) => getMealDBById(m.idMeal)),
    )

    return fullMeals.filter((m): m is MealDBRecipe => m !== null)
  } catch (error) {
    console.error('MealDB API error:', error)
    return []
  }
}

export async function getMealDBCategories(): Promise<string[]> {
  try {
    const response = await fetch(`${MEALDB_BASE_URL}/categories.php`)
    if (!response.ok) return []
    const data = await response.json()
    return data.categories?.map((c: { strCategory: string }) => c.strCategory) || []
  } catch (error) {
    console.error('MealDB API error:', error)
    return []
  }
}

// Helper to extract ingredients from MealDB recipe
export function extractMealDBIngredients(
  recipe: MealDBRecipe,
): Array<{ name: string; amount: string }> {
  const ingredients: Array<{ name: string; amount: string }> = []

  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}` as keyof MealDBRecipe]
    const measure = recipe[`strMeasure${i}` as keyof MealDBRecipe]

    if (ingredient && typeof ingredient === 'string' && ingredient.trim()) {
      ingredients.push({
        name: ingredient.trim(),
        amount: (measure as string)?.trim() || '',
      })
    }
  }

  return ingredients
}
