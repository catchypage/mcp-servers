'use client'

import React, { useState, useEffect } from 'react'
import type { Screen, MetabolismData, RecipeData } from './types'
import { useToolData } from './useToolData'
import { fetchRandomRecipe } from './api'
import Header from './Header'
import CalcForm from './CalcForm'
import MetabolismResult from './MetabolismResult'
import RecipeSearch from './RecipeSearch'
import RecipeCard from './RecipeCard'

export default function NutriWidget() {
  const { data: toolData, ready } = useToolData()
  const [screen, setScreen] = useState<Screen>('loading')
  const [metaData, setMetaData] = useState<MetabolismData | null>(null)
  const [recipeData, setRecipeData] = useState<RecipeData | null>(null)
  const [randomLoading, setRandomLoading] = useState(false)

  useEffect(() => {
    if (!ready) {
      return
    }
    if (toolData) {
      if (toolData.mode === 'metabolism') {
        setMetaData(toolData)
      }
      if (toolData.mode === 'recipe') {
        setRecipeData(toolData)
      }
      setScreen(toolData.mode)
    } else {
      setScreen('form')
    }
  }, [ready, toolData])

  const handleCalcResult = (d: MetabolismData) => {
    setMetaData(d)
    setScreen('metabolism')
  }

  const handleRecipeSelect = (d: RecipeData) => {
    setRecipeData(d)
    setScreen('recipe')
  }

  const handleRandom = async () => {
    setRandomLoading(true)
    const r = await fetchRandomRecipe()
    setRandomLoading(false)
    if (r) {
      handleRecipeSelect(r)
    }
  }

  if (screen === 'loading') {
    return (
      <div className="h-[600px] flex items-center justify-center text-slate-500 text-sm font-sans bg-slate-900">
        Loading ChefPlan…
      </div>
    )
  }

  return (
    <div className="h-[600px] flex flex-col bg-slate-900 text-slate-200 font-sans overflow-hidden">
      <Header screen={screen} onNavigate={setScreen} />
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {screen === 'form' && (
          <CalcForm onResult={handleCalcResult} initial={metaData} />
        )}

        {screen === 'metabolism' && metaData && (
          <MetabolismResult
            data={metaData}
            onRecalculate={() => setScreen('form')}
          />
        )}

        {screen === 'recipe-search' && (
          <RecipeSearch onSelect={handleRecipeSelect} />
        )}

        {screen === 'recipe' && recipeData && (
          <RecipeCard
            data={recipeData}
            onSearchNew={() => setScreen('recipe-search')}
            onRandom={() => void handleRandom()}
            randomLoading={randomLoading}
          />
        )}
      </div>
    </div>
  )
}
