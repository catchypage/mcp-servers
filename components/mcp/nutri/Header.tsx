import React from 'react'
import type { Screen } from './types'

interface Props {
  screen: Screen
  onNavigate: (s: Screen) => void
}

export default function Header({ screen, onNavigate }: Props) {
  const isCalc = screen === 'form' || screen === 'metabolism'
  const isRecipe = screen === 'recipe' || screen === 'recipe-search'

  return (
    <div className="flex items-center justify-between px-4 h-12 border-b border-slate-800 bg-[#0b1120] shrink-0 relative z-10">
      <div className="flex items-center gap-2">
        <div className="w-[26px] h-[26px] rounded-[7px] bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-sm leading-none">
          🍳
        </div>
        <span className="text-[15px] font-bold text-slate-100 tracking-tight">
          ChefPlan
        </span>
      </div>

      <div className="flex gap-1">
        <Tab active={isCalc} onClick={() => onNavigate('form')}>
          Calculator
        </Tab>
        <Tab active={isRecipe} onClick={() => onNavigate('recipe-search')}>
          Recipes
        </Tab>
      </div>
    </div>
  )
}

function Tab({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 text-xs font-semibold rounded-md border-none cursor-pointer transition-colors ${
        active
          ? 'bg-slate-800 text-slate-100'
          : 'bg-transparent text-slate-500 hover:text-slate-300'
      }`}
    >
      {children}
    </button>
  )
}
