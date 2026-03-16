'use client'

import { useState, useEffect, useCallback } from 'react'
import type {
  MealPlan,
  RecipeDetails,
  SwapCandidate,
  Meal,
  WidgetMode,
} from '@/utils/mcp/apps/chefplan/types'
import InlineWidget from './InlineWidget'
import FullscreenWidget from './FullscreenWidget'
import SwapWidget from './SwapWidget'

interface OpenAIBridge {
  callTool: (
    toolName: string,
    args: Record<string, unknown>,
  ) => Promise<{
    structuredContent?: Record<string, unknown>
    [key: string]: unknown
  }>
  updateModelContext?: (context: Record<string, unknown>) => void
}

declare global {
  interface Window {
    openai?: OpenAIBridge
  }
}

// Demo data for development/preview
const DEMO_PLAN: MealPlan = {
  plan_id: 'demo_plan_123',
  title: 'Healthy Weekly Meal Plan',
  household: { size: 4 },
  constraints: {
    budget_target: 75,
    diet: ['healthy'],
    allergies: [],
    max_prep_minutes: 30,
  },
  budget_summary: {
    estimated_total: 68.5,
    per_day_avg: 9.79,
  },
  nutrition_summary: {
    avg_calories_per_day: 1950,
    avg_protein_g: 118,
    avg_carbs_g: 190,
    avg_fat_g: 62,
  },
  days: [
    {
      day: 'Mon',
      totals: { calories: 1750, protein_g: 110, carbs_g: 180, fat_g: 58 },
      meals: [
        {
          meal_id: 'm1',
          type: 'breakfast',
          title: 'Greek Yogurt Parfait',
          servings: 4,
          prep_minutes: 10,
          estimated_cost: 4.5,
          calories: 320,
          macros: { protein_g: 22, carbs_g: 28, fat_g: 9 },
          tags: ['high-protein', 'quick'],
        },
        {
          meal_id: 'm2',
          type: 'lunch',
          title: 'Chicken Rice Bowls',
          servings: 4,
          prep_minutes: 20,
          estimated_cost: 8.2,
          calories: 540,
          macros: { protein_g: 38, carbs_g: 52, fat_g: 16 },
          tags: ['high-protein', 'meal-prep'],
        },
        {
          meal_id: 'm3',
          type: 'dinner',
          title: 'Lentil Pasta Bake',
          servings: 4,
          prep_minutes: 25,
          estimated_cost: 7.8,
          calories: 710,
          macros: { protein_g: 29, carbs_g: 66, fat_g: 18 },
          tags: ['comfort-food', 'family'],
        },
        {
          meal_id: 'm4',
          type: 'snack',
          title: 'Apple & Peanut Butter',
          servings: 4,
          prep_minutes: 2,
          estimated_cost: 3.0,
          calories: 180,
          macros: { protein_g: 6, carbs_g: 22, fat_g: 8 },
          tags: ['quick', 'healthy'],
        },
      ],
    },
    {
      day: 'Tue',
      totals: { calories: 1820, protein_g: 115, carbs_g: 185, fat_g: 60 },
      meals: [
        {
          meal_id: 'm5',
          type: 'breakfast',
          title: 'Overnight Oats',
          servings: 4,
          prep_minutes: 5,
          estimated_cost: 2.8,
          calories: 350,
          macros: { protein_g: 12, carbs_g: 58, fat_g: 8 },
          tags: ['budget', 'meal-prep'],
        },
        {
          meal_id: 'm6',
          type: 'lunch',
          title: 'Turkey Wrap',
          servings: 4,
          prep_minutes: 10,
          estimated_cost: 6.5,
          calories: 480,
          macros: { protein_g: 32, carbs_g: 42, fat_g: 18 },
          tags: ['quick', 'portable'],
        },
        {
          meal_id: 'm7',
          type: 'dinner',
          title: 'Grilled Salmon with Veggies',
          servings: 4,
          prep_minutes: 22,
          estimated_cost: 14.0,
          calories: 580,
          macros: { protein_g: 42, carbs_g: 18, fat_g: 32 },
          tags: ['high-protein', 'healthy'],
        },
        {
          meal_id: 'm8',
          type: 'snack',
          title: 'Greek Yogurt & Berries',
          servings: 4,
          prep_minutes: 3,
          estimated_cost: 3.5,
          calories: 150,
          macros: { protein_g: 12, carbs_g: 18, fat_g: 2 },
          tags: ['high-protein', 'low-fat'],
        },
      ],
    },
    {
      day: 'Wed',
      totals: { calories: 1900, protein_g: 120, carbs_g: 195, fat_g: 64 },
      meals: [
        {
          meal_id: 'm9',
          type: 'breakfast',
          title: 'Avocado Toast with Eggs',
          servings: 4,
          prep_minutes: 15,
          estimated_cost: 6.2,
          calories: 420,
          macros: { protein_g: 18, carbs_g: 32, fat_g: 24 },
          tags: ['healthy', 'popular'],
        },
        {
          meal_id: 'm10',
          type: 'lunch',
          title: 'Mediterranean Salad',
          servings: 4,
          prep_minutes: 15,
          estimated_cost: 8.0,
          calories: 420,
          macros: { protein_g: 24, carbs_g: 28, fat_g: 22 },
          tags: ['healthy', 'mediterranean'],
        },
        {
          meal_id: 'm11',
          type: 'dinner',
          title: 'Chicken Stir Fry',
          servings: 4,
          prep_minutes: 20,
          estimated_cost: 9.5,
          calories: 520,
          macros: { protein_g: 38, carbs_g: 42, fat_g: 18 },
          tags: ['quick', 'asian'],
        },
        {
          meal_id: 'm12',
          type: 'snack',
          title: 'Trail Mix',
          servings: 4,
          prep_minutes: 1,
          estimated_cost: 4.0,
          calories: 200,
          macros: { protein_g: 6, carbs_g: 20, fat_g: 12 },
          tags: ['portable', 'energy'],
        },
      ],
    },
    {
      day: 'Thu',
      totals: { calories: 1980, protein_g: 125, carbs_g: 188, fat_g: 68 },
      meals: [
        {
          meal_id: 'm13',
          type: 'breakfast',
          title: 'Smoothie Bowl',
          servings: 4,
          prep_minutes: 8,
          estimated_cost: 5.5,
          calories: 380,
          macros: { protein_g: 14, carbs_g: 52, fat_g: 12 },
          tags: ['vegan', 'refreshing'],
        },
        {
          meal_id: 'm14',
          type: 'lunch',
          title: 'Tuna Poke Bowl',
          servings: 4,
          prep_minutes: 15,
          estimated_cost: 10.0,
          calories: 450,
          macros: { protein_g: 36, carbs_g: 38, fat_g: 14 },
          tags: ['high-protein', 'fresh'],
        },
        {
          meal_id: 'm15',
          type: 'dinner',
          title: 'Beef Tacos',
          servings: 4,
          prep_minutes: 25,
          estimated_cost: 11.0,
          calories: 640,
          macros: { protein_g: 34, carbs_g: 48, fat_g: 28 },
          tags: ['kid-friendly', 'popular'],
        },
        {
          meal_id: 'm16',
          type: 'snack',
          title: 'Hummus & Veggies',
          servings: 4,
          prep_minutes: 5,
          estimated_cost: 4.5,
          calories: 160,
          macros: { protein_g: 6, carbs_g: 18, fat_g: 8 },
          tags: ['vegan', 'fiber'],
        },
      ],
    },
    {
      day: 'Fri',
      totals: { calories: 1850, protein_g: 112, carbs_g: 192, fat_g: 60 },
      meals: [
        {
          meal_id: 'm17',
          type: 'breakfast',
          title: 'Veggie Omelette',
          servings: 4,
          prep_minutes: 12,
          estimated_cost: 4.0,
          calories: 280,
          macros: { protein_g: 20, carbs_g: 8, fat_g: 18 },
          tags: ['low-carb', 'keto'],
        },
        {
          meal_id: 'm18',
          type: 'lunch',
          title: 'Lentil Soup',
          servings: 4,
          prep_minutes: 25,
          estimated_cost: 4.5,
          calories: 320,
          macros: { protein_g: 18, carbs_g: 48, fat_g: 4 },
          tags: ['budget', 'vegan'],
        },
        {
          meal_id: 'm19',
          type: 'dinner',
          title: 'Veggie Curry',
          servings: 4,
          prep_minutes: 30,
          estimated_cost: 7.5,
          calories: 480,
          macros: { protein_g: 16, carbs_g: 58, fat_g: 18 },
          tags: ['vegan', 'spicy'],
        },
        {
          meal_id: 'm20',
          type: 'snack',
          title: 'Apple & Peanut Butter',
          servings: 4,
          prep_minutes: 2,
          estimated_cost: 3.0,
          calories: 180,
          macros: { protein_g: 6, carbs_g: 22, fat_g: 8 },
          tags: ['quick', 'healthy'],
        },
      ],
    },
    {
      day: 'Sat',
      totals: { calories: 2050, protein_g: 128, carbs_g: 200, fat_g: 70 },
      meals: [
        {
          meal_id: 'm21',
          type: 'breakfast',
          title: 'Greek Yogurt Parfait',
          servings: 4,
          prep_minutes: 10,
          estimated_cost: 4.5,
          calories: 320,
          macros: { protein_g: 22, carbs_g: 28, fat_g: 9 },
          tags: ['high-protein', 'quick'],
        },
        {
          meal_id: 'm22',
          type: 'lunch',
          title: 'Chicken Rice Bowls',
          servings: 4,
          prep_minutes: 20,
          estimated_cost: 8.2,
          calories: 540,
          macros: { protein_g: 38, carbs_g: 52, fat_g: 16 },
          tags: ['high-protein', 'meal-prep'],
        },
        {
          meal_id: 'm23',
          type: 'dinner',
          title: 'Grilled Salmon with Veggies',
          servings: 4,
          prep_minutes: 22,
          estimated_cost: 14.0,
          calories: 580,
          macros: { protein_g: 42, carbs_g: 18, fat_g: 32 },
          tags: ['high-protein', 'healthy'],
        },
        {
          meal_id: 'm24',
          type: 'snack',
          title: 'Trail Mix',
          servings: 4,
          prep_minutes: 1,
          estimated_cost: 4.0,
          calories: 200,
          macros: { protein_g: 6, carbs_g: 20, fat_g: 12 },
          tags: ['portable', 'energy'],
        },
      ],
    },
    {
      day: 'Sun',
      totals: { calories: 1920, protein_g: 118, carbs_g: 188, fat_g: 65 },
      meals: [
        {
          meal_id: 'm25',
          type: 'breakfast',
          title: 'Avocado Toast with Eggs',
          servings: 4,
          prep_minutes: 15,
          estimated_cost: 6.2,
          calories: 420,
          macros: { protein_g: 18, carbs_g: 32, fat_g: 24 },
          tags: ['healthy', 'popular'],
        },
        {
          meal_id: 'm26',
          type: 'lunch',
          title: 'Turkey Wrap',
          servings: 4,
          prep_minutes: 10,
          estimated_cost: 6.5,
          calories: 480,
          macros: { protein_g: 32, carbs_g: 42, fat_g: 18 },
          tags: ['quick', 'portable'],
        },
        {
          meal_id: 'm27',
          type: 'dinner',
          title: 'Lentil Pasta Bake',
          servings: 4,
          prep_minutes: 25,
          estimated_cost: 7.8,
          calories: 710,
          macros: { protein_g: 29, carbs_g: 66, fat_g: 18 },
          tags: ['comfort-food', 'family'],
        },
        {
          meal_id: 'm28',
          type: 'snack',
          title: 'Greek Yogurt & Berries',
          servings: 4,
          prep_minutes: 3,
          estimated_cost: 3.5,
          calories: 150,
          macros: { protein_g: 12, carbs_g: 18, fat_g: 2 },
          tags: ['high-protein', 'low-fat'],
        },
      ],
    },
  ],
  shopping_list: [
    {
      section: 'Produce',
      items: [
        { name: 'Broccoli', quantity: 2, unit: 'heads', estimated_cost: 4.0 },
        { name: 'Onions', quantity: 4, unit: 'medium', estimated_cost: 2.0 },
        { name: 'Garlic', quantity: 2, unit: 'heads', estimated_cost: 1.5 },
        { name: 'Spinach', quantity: 1, unit: 'bag', estimated_cost: 3.5 },
        { name: 'Avocados', quantity: 4, unit: 'pieces', estimated_cost: 6.0 },
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
      ],
    },
    {
      section: 'Pantry',
      items: [
        { name: 'Brown Rice', quantity: 2, unit: 'lbs', estimated_cost: 4.0 },
        { name: 'Lentils', quantity: 1, unit: 'lb', estimated_cost: 3.0 },
        { name: 'Olive Oil', quantity: 1, unit: 'bottle', estimated_cost: 8.0 },
      ],
    },
  ],
  order_options: [
    { provider: 'instacart', available: true, cta: 'Order with Instacart' },
    {
      provider: 'amazon_fresh',
      available: true,
      cta: 'Order with Amazon Fresh',
    },
  ],
}

export default function ChefPlanWidget() {
  const [mode, setMode] = useState<WidgetMode>('inline')
  const [plan, setPlan] = useState<MealPlan | null>(null)
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeDetails | null>(
    null,
  )
  const [swapData, setSwapData] = useState<{
    meal: Meal
    candidates: SwapCandidate[]
  } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Initialize with demo data or from tool result
  useEffect(() => {
    // Check if we have initial data from tool result
    const initData = (
      window as unknown as { __chefplan_init?: { plan?: MealPlan } }
    ).__chefplan_init
    if (initData?.plan) {
      setPlan(initData.plan)
    } else {
      // Use demo data for development
      setPlan(DEMO_PLAN)
    }
  }, [])

  const callTool = useCallback(
    async (
      toolName: string,
      args: Record<string, unknown>,
    ): Promise<Record<string, unknown> | null> => {
      if (window.openai?.callTool) {
        try {
          setLoading(true)
          const result = await window.openai.callTool(toolName, args)
          return result.structuredContent ?? result
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Tool call failed')
          return null
        } finally {
          setLoading(false)
        }
      }
      // Fallback for demo mode
      console.log('Demo mode - tool call:', toolName, args)
      return null
    },
    [],
  )

  const handleOpenFullPlan = useCallback(() => {
    setMode('fullscreen')
  }, [])

  const handleOrderIngredients = useCallback(
    async (provider = 'instacart') => {
      if (!plan) {
        return
      }

      const result = await callTool('create_order_link', {
        plan_id: plan.plan_id,
        provider,
      })

      if (result?.deeplink) {
        window.open(result.deeplink as string, '_blank')
      } else {
        // Demo fallback
        alert(`Order link would open for ${provider}`)
      }
    },
    [plan, callTool],
  )

  const handleSwapMeal = useCallback(
    async (mealId: string) => {
      if (!plan) {
        return
      }

      const result = await callTool('swap_meal', {
        plan_id: plan.plan_id,
        meal_id: mealId,
      })

      if (result?.candidates) {
        const meal = plan.days
          .flatMap((d) => d.meals)
          .find((m) => m.meal_id === mealId)
        if (meal) {
          setSwapData({
            meal,
            candidates: result.candidates as SwapCandidate[],
          })
          setMode('swap')
        }
      } else {
        // Demo fallback - generate mock candidates
        const meal = plan.days
          .flatMap((d) => d.meals)
          .find((m) => m.meal_id === mealId)
        if (meal) {
          const mockCandidates: SwapCandidate[] = [
            {
              meal_id: 'swap_1',
              title: 'Lemon Chicken Tray Bake',
              prep_minutes: 30,
              calories: 610,
              estimated_cost: 9.8,
              macros: { protein_g: 42, carbs_g: 28, fat_g: 22 },
              tags: ['high-protein'],
              match_score: 0.92,
            },
            {
              meal_id: 'swap_2',
              title: 'Turkey Taco Bowls',
              prep_minutes: 20,
              calories: 580,
              estimated_cost: 8.4,
              macros: { protein_g: 36, carbs_g: 42, fat_g: 18 },
              tags: ['budget', 'quick'],
              match_score: 0.85,
            },
            {
              meal_id: 'swap_3',
              title: 'Chickpea Curry',
              prep_minutes: 25,
              calories: 540,
              estimated_cost: 6.9,
              macros: { protein_g: 18, carbs_g: 58, fat_g: 16 },
              tags: ['vegetarian', 'budget'],
              match_score: 0.78,
            },
            {
              meal_id: 'swap_4',
              title: 'Sheet Pan Salmon',
              prep_minutes: 28,
              calories: 520,
              estimated_cost: 12.5,
              macros: { protein_g: 44, carbs_g: 14, fat_g: 28 },
              tags: ['healthy', 'high-protein'],
              match_score: 0.72,
            },
          ]
          setSwapData({ meal, candidates: mockCandidates })
          setMode('swap')
        }
      }
    },
    [plan, callTool],
  )

  const handleReplaceMeal = useCallback(
    async (candidateId: string) => {
      if (!plan || !swapData) {
        return
      }

      const result = await callTool('swap_meal', {
        plan_id: plan.plan_id,
        meal_id: swapData.meal.meal_id,
        replace_with: candidateId,
      })

      if (result?.updated_plan) {
        setPlan(result.updated_plan as MealPlan)
      }

      // Update model context
      if (window.openai?.updateModelContext) {
        window.openai.updateModelContext({
          action: 'meal_replaced',
          original: swapData.meal.title,
          replacement: swapData.candidates.find(
            (c) => c.meal_id === candidateId,
          )?.title,
        })
      }

      setSwapData(null)
      setMode('fullscreen')
    },
    [plan, swapData, callTool],
  )

  const handleRebuildWeek = useCallback(async () => {
    if (!plan) {
      return
    }

    const result = await callTool('generate_weekly_plan', {
      household_size: plan.household.size,
      dietary_preferences: plan.constraints.diet,
      budget_target: plan.constraints.budget_target,
      max_prep_minutes: plan.constraints.max_prep_minutes,
    })

    if (result?.plan) {
      setPlan(result.plan as MealPlan)
    }
  }, [plan, callTool])

  const handleSelectMeal = useCallback(
    async (planId: string, mealId: string) => {
      const result = await callTool('get_recipe_details', {
        plan_id: planId,
        meal_id: mealId,
      })

      if (result?.recipe) {
        setSelectedRecipe(result.recipe as RecipeDetails)
      } else {
        // Demo fallback
        const meal = plan?.days
          .flatMap((d) => d.meals)
          .find((m) => m.meal_id === mealId)
        if (meal) {
          setSelectedRecipe({
            meal_id: meal.meal_id,
            title: meal.title,
            prep_minutes: meal.prep_minutes,
            cook_minutes: Math.round(meal.prep_minutes * 1.5),
            servings: meal.servings,
            estimated_cost: meal.estimated_cost,
            calories: meal.calories,
            macros: meal.macros,
            tags: meal.tags,
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
            ],
          })
        }
      }
    },
    [plan, callTool],
  )

  const handleClose = useCallback(() => {
    if (mode === 'swap') {
      setSwapData(null)
      setMode('fullscreen')
    } else {
      setMode('inline')
      setSelectedRecipe(null)
    }
  }, [mode])

  if (!plan) {
    return (
      <div className="cp-loading">
        <div className="cp-spinner" />
        <p>Loading meal plan...</p>
        <style>{`
          .cp-loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 300px;
            font-family: 'Inter', system-ui, sans-serif;
            color: #6b7280;
          }
          .cp-spinner {
            width: 40px;
            height: 40px;
            border: 3px solid #e5e7eb;
            border-top-color: #22c55e;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 16px;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  if (error) {
    return (
      <div className="cp-error">
        <p>Error: {error}</p>
        <button onClick={() => void setError(null)}>Dismiss</button>
        <style>{`
          .cp-error {
            padding: 24px;
            background: #fef2f2;
            border: 1px solid #fecaca;
            border-radius: 12px;
            text-align: center;
            font-family: 'Inter', system-ui, sans-serif;
          }
          .cp-error p {
            color: #dc2626;
            margin: 0 0 16px;
          }
          .cp-error button {
            padding: 8px 16px;
            background: white;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            cursor: pointer;
          }
        `}</style>
      </div>
    )
  }

  return (
    <>
      {loading && (
        <div className="cp-overlay">
          <div className="cp-spinner" />
        </div>
      )}

      {mode === 'inline' && (
        <InlineWidget
          plan={plan}
          onOpenFullPlan={handleOpenFullPlan}
          onOrderIngredients={() => void handleOrderIngredients()}
        />
      )}

      {mode === 'fullscreen' && (
        <FullscreenWidget
          plan={plan}
          selectedRecipe={selectedRecipe}
          onClose={handleClose}
          onSwapMeal={(id) => void handleSwapMeal(id)}
          onRebuildWeek={() => void handleRebuildWeek()}
          onOrderIngredients={(p) => void handleOrderIngredients(p)}
          onSelectMeal={(planId, mealId) =>
            void handleSelectMeal(planId, mealId)
          }
        />
      )}

      {mode === 'swap' && swapData && (
        <SwapWidget
          currentMeal={swapData.meal}
          candidates={swapData.candidates}
          onReplace={(id) => void handleReplaceMeal(id)}
          onClose={handleClose}
        />
      )}

      <style>{`
        .cp-overlay {
          position: fixed;
          inset: 0;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .cp-spinner {
          width: 48px;
          height: 48px;
          border: 4px solid #e5e7eb;
          border-top-color: #22c55e;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  )
}
