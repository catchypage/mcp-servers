import type { RecipeData } from './types'

function getBaseUrl(): string {
  const scripts = document.querySelectorAll('script[src*="chefplan2.bundle"]')
  if (scripts.length > 0) {
    return new URL((scripts[0] as HTMLScriptElement).src).origin
  }
  return ''
}

export function proxyImageUrl(originalUrl: string): string {
  if (!originalUrl) {
    return ''
  }
  const base = getBaseUrl()
  return `${base}/api/mcp/chefplan2/img?url=${encodeURIComponent(originalUrl)}`
}

export function openExternal(url: string) {
  const oa = (
    window as { openai?: { openExternal?: (p: { href: string }) => void } }
  ).openai
  if (oa?.openExternal) {
    oa.openExternal({ href: url })
  } else {
    window.open(url, '_blank')
  }
}

interface RecipeApiItem {
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

function apiToRecipe(r: RecipeApiItem): RecipeData {
  return { mode: 'recipe', ...r }
}

export async function searchRecipes(query: string): Promise<RecipeData[]> {
  const base = getBaseUrl()
  try {
    const res = await fetch(
      `${base}/api/mcp/chefplan2/recipes?q=${encodeURIComponent(query)}`,
    )
    if (!res.ok) {
      return []
    }
    const json = (await res.json()) as {
      ok: boolean
      recipes?: RecipeApiItem[]
    }
    if (!json.ok || !json.recipes) {
      return []
    }
    return json.recipes.map(apiToRecipe)
  } catch {
    return []
  }
}

export async function fetchRandomRecipe(): Promise<RecipeData | null> {
  const base = getBaseUrl()
  try {
    const res = await fetch(`${base}/api/mcp/chefplan2/recipes?random=1`)
    if (!res.ok) {
      return null
    }
    const json = (await res.json()) as {
      ok: boolean
      recipes?: RecipeApiItem[]
    }
    if (!json.ok || !json.recipes?.length) {
      return null
    }
    return apiToRecipe(json.recipes[0])
  } catch {
    return null
  }
}
