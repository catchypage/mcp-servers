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
  // Method to get the initial tool result that triggered the widget
  getToolResult?: () => Promise<{
    structuredContent?: Record<string, unknown>
    [key: string]: unknown
  }>
  // Some versions expose toolResult directly
  toolResult?: {
    structuredContent?: Record<string, unknown>
    [key: string]: unknown
  }
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
  const [initTimeout, setInitTimeout] = useState(false)

  // Initialize from tool result - multiple sources
  useEffect(() => {
    // Helper to extract plan from various data formats
    const extractPlan = (data: unknown): MealPlan | null => {
      if (!data || typeof data !== 'object') return null
      const obj = data as Record<string, unknown>

      // Direct plan object
      if (obj.plan_id && obj.days) {
        return obj as unknown as MealPlan
      }
      // Nested plan property
      if (obj.plan && typeof obj.plan === 'object') {
        const plan = obj.plan as Record<string, unknown>
        if (plan.plan_id && plan.days) {
          return plan as unknown as MealPlan
        }
      }
      // structuredContent wrapper (MCP Apps format)
      if (obj.structuredContent && typeof obj.structuredContent === 'object') {
        return extractPlan(obj.structuredContent)
      }
      // content wrapper
      if (obj.content && typeof obj.content === 'object') {
        return extractPlan(obj.content)
      }
      // payload wrapper (mcp:init format)
      if (obj.payload && typeof obj.payload === 'object') {
        return extractPlan(obj.payload)
      }
      // result wrapper
      if (obj.result && typeof obj.result === 'object') {
        return extractPlan(obj.result)
      }
      // data wrapper (some hosts use this)
      if (obj.data && typeof obj.data === 'object') {
        return extractPlan(obj.data)
      }
      return null
    }

    // 1. Try data-plan attribute on root element (base64 encoded, CSP-safe)
    const rootElement = document.getElementById('chefplan-widget-root')
    const planDataAttr = rootElement?.getAttribute('data-plan')
    if (planDataAttr) {
      try {
        const decoded = atob(planDataAttr)
        const planData = JSON.parse(decoded) as MealPlan
        if (planData?.plan_id && planData?.days) {
          setPlan(planData)
          return
        }
      } catch (e) {
        console.error('[ChefPlan] Failed to parse data-plan attribute:', e)
      }
    }

    // 2. Try __chefplan_init (legacy server-side injection)
    const initData = (
      window as unknown as { __chefplan_init?: { plan?: MealPlan } }
    ).__chefplan_init
    if (initData?.plan) {
      setPlan(initData.plan)
      return
    }
    // Also try extractPlan on initData in case format differs
    if (initData) {
      const extracted = extractPlan(initData)
      if (extracted) {
        setPlan(extracted)
        return
      }
    }

    // 3. Try window.openai bridge (ChatGPT MCP Apps)
    const tryOpenAIBridge = async () => {
      // Try direct toolResult property
      if (window.openai?.toolResult) {
        const plan = extractPlan(window.openai.toolResult)
        if (plan) {
          setPlan(plan)
          return true
        }
      }
      // Try getToolResult method
      if (window.openai?.getToolResult) {
        try {
          const result = await window.openai.getToolResult()
          const plan = extractPlan(result)
          if (plan) {
            setPlan(plan)
            return true
          }
        } catch (e) {
          console.error('[ChefPlan] getToolResult failed:', e)
        }
      }
      return false
    }

    tryOpenAIBridge()

    // 4. Listen for postMessage from ChatGPT parent (MCP Apps)
    const handleMessage = (event: MessageEvent) => {
      const data = event.data
      const plan = extractPlan(data)
      if (plan) {
        setPlan(plan)
      }
    }

    window.addEventListener('message', handleMessage)

    // 5. Request initial data from parent
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'mcp:ready', app: 'chefplan' }, '*')
    }

    // 6. Set timeout to show helpful error if data not received
    const timeout = setTimeout(() => {
      setInitTimeout(true)
    }, 8000)

    return () => {
      window.removeEventListener('message', handleMessage)
      clearTimeout(timeout)
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
        {!initTimeout ? (
          <>
            <div className="cp-spinner" />
            <p>Loading meal plan...</p>
          </>
        ) : (
          <>
            <p className="cp-timeout-title">Unable to load meal plan</p>
            <p className="cp-timeout-hint">
              The widget did not receive plan data from the host application.
              Please try refreshing or generating a new meal plan.
            </p>
          </>
        )}
        <style>{`
          .cp-loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 300px;
            font-family: 'Inter', system-ui, sans-serif;
            color: #6b7280;
            text-align: center;
            padding: 24px;
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
          .cp-timeout-title {
            font-size: 18px;
            font-weight: 600;
            color: #374151;
            margin-bottom: 8px;
          }
          .cp-timeout-hint {
            font-size: 14px;
            color: #6b7280;
            max-width: 300px;
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
          onOpenFullPlan={handleOpenFullPlan}
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
