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

  // Initialize from tool result
  useEffect(() => {
    const initData = (
      window as unknown as { __chefplan_init?: { plan?: MealPlan } }
    ).__chefplan_init
    if (initData?.plan) {
      setPlan(initData.plan)
    }
  }, [])

  const callTool = useCallback(
    async (
      toolName: string,
      args: Record<string, unknown>,
    ): Promise<Record<string, unknown> | null> => {
      if (!window.openai?.callTool) {
        setError('OpenAI bridge not available')
        return null
      }

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
      }
    },
    [callTool],
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
