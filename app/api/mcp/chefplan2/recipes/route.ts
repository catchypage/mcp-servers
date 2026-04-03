import { NextRequest, NextResponse } from 'next/server'
import {
  searchMealDB,
  getRandomMealDB,
  extractMealDBIngredients,
  type MealDBRecipe,
} from '@/utils/mcp/apps/chefplan/api-clients'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

function toResult(recipe: MealDBRecipe) {
  const ingredients = extractMealDBIngredients(recipe)
  const steps = recipe.strInstructions
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
    id: recipe.idMeal,
    title: recipe.strMeal,
    category: recipe.strCategory,
    area: recipe.strArea,
    image: recipe.strMealThumb,
    instructions: steps,
    ingredients,
    tags,
    youtube: recipe.strYoutube ?? '',
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: cors })
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.trim() ?? ''
  const random = req.nextUrl.searchParams.get('random') === '1'

  try {
    if (random) {
      const meal = await getRandomMealDB()
      if (meal) {
        return NextResponse.json(
          { ok: true, recipes: [toResult(meal)] },
          { headers: cors },
        )
      }
      return NextResponse.json(
        { ok: false, error: 'Could not fetch random recipe' },
        { status: 502, headers: cors },
      )
    }

    if (!q) {
      return NextResponse.json(
        { ok: false, error: 'Provide ?q= or ?random=1' },
        { status: 400, headers: cors },
      )
    }

    const meals = await searchMealDB(q)
    if (meals.length > 0) {
      return NextResponse.json(
        { ok: true, recipes: meals.map(toResult) },
        { headers: cors },
      )
    }

    return NextResponse.json(
      { ok: false, error: `No recipes found for "${q}"` },
      { status: 404, headers: cors },
    )
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Search failed' },
      { status: 500, headers: cors },
    )
  }
}
