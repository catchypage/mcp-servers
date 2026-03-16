import { useState } from 'react'
import type { MealPlan, Meal, DayPlan, RecipeDetails, ShoppingSection } from '@/utils/mcp/apps/chefplan/types'
import {
  ChefHatIcon,
  CalendarIcon,
  DollarIcon,
  FlameIcon,
  ProteinIcon,
  CartIcon,
  ClockIcon,
  SwapIcon,
  RefreshIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  SunriseIcon,
  SunIcon,
  MoonIcon,
  CookieIcon,
  UsersIcon,
  ZapIcon,
  LeafIcon,
  ExternalLinkIcon,
} from './Icons'

interface FullscreenWidgetProps {
  plan: MealPlan
  selectedRecipe: RecipeDetails | null
  onClose: () => void
  onSwapMeal: (mealId: string) => void
  onRebuildWeek: () => void
  onOrderIngredients: (provider: string) => void
  onSelectMeal: (planId: string, mealId: string) => void
}

const MEAL_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  breakfast: SunriseIcon,
  lunch: SunIcon,
  dinner: MoonIcon,
  snack: CookieIcon,
}

export default function FullscreenWidget({
  plan,
  selectedRecipe,
  onClose,
  onSwapMeal,
  onRebuildWeek,
  onOrderIngredients,
  onSelectMeal,
}: FullscreenWidgetProps) {
  const [selectedDay, setSelectedDay] = useState<string>(plan.days[0]?.day || 'Mon')
  const [selectedMealId, setSelectedMealId] = useState<string | null>(null)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    Produce: true,
    Proteins: true,
    Dairy: false,
    Pantry: false,
    Frozen: false,
  })

  const currentDay = plan.days.find((d) => d.day === selectedDay) || plan.days[0]

  const handleMealClick = (meal: Meal) => {
    setSelectedMealId(meal.meal_id)
    onSelectMeal(plan.plan_id, meal.meal_id)
  }

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const getTagColor = (tag: string) => {
    const colors: Record<string, string> = {
      'high-protein': 'cp-tag-green',
      'quick': 'cp-tag-orange',
      'budget': 'cp-tag-blue',
      'healthy': 'cp-tag-green',
      'vegan': 'cp-tag-emerald',
      'vegetarian': 'cp-tag-emerald',
      'kid-friendly': 'cp-tag-purple',
      'keto': 'cp-tag-amber',
      'low-carb': 'cp-tag-amber',
      'meal-prep': 'cp-tag-blue',
      'popular': 'cp-tag-pink',
    }
    return colors[tag] || 'cp-tag-gray'
  }

  return (
    <div className="cp-fullscreen">
      {/* Header */}
      <header className="cp-fs-header">
        <div className="cp-fs-header-left">
          <ChefHatIcon size={28} className="cp-icon-green" />
          <div>
            <h1 className="cp-fs-title">Weekly meal plan</h1>
            <p className="cp-fs-subtitle">
              Mar 16–22 · Family of {plan.household.size} · {plan.constraints.diet[0] || 'Balanced'} · &lt;${plan.constraints.budget_target}
            </p>
          </div>
        </div>
        <button className="cp-close-btn" onClick={onClose}>
          <CloseIcon size={24} />
        </button>
      </header>

      {/* Summary Metrics */}
      <div className="cp-fs-metrics">
        <div className="cp-fs-metric">
          <DollarIcon size={20} className="cp-icon-orange" />
          <span className="cp-fs-metric-value">${plan.budget_summary.estimated_total.toFixed(2)}</span>
          <span className="cp-fs-metric-label">Budget</span>
        </div>
        <div className="cp-fs-metric">
          <FlameIcon size={20} className="cp-icon-orange" />
          <span className="cp-fs-metric-value">{plan.nutrition_summary.avg_calories_per_day}</span>
          <span className="cp-fs-metric-label">Avg/day</span>
        </div>
        <div className="cp-fs-metric">
          <ProteinIcon size={20} className="cp-icon-green" />
          <span className="cp-fs-metric-value">{plan.nutrition_summary.avg_protein_g}g</span>
          <span className="cp-fs-metric-label">Protein</span>
        </div>
        <div className="cp-fs-metric">
          <LeafIcon size={20} className="cp-icon-green" />
          <span className="cp-fs-metric-value">{plan.nutrition_summary.avg_carbs_g}g</span>
          <span className="cp-fs-metric-label">Carbs</span>
        </div>
      </div>

      {/* Weekly Calendar */}
      <section className="cp-fs-section">
        <h2 className="cp-fs-section-title">
          <CalendarIcon size={20} />
          Weekly Calendar
        </h2>
        <div className="cp-week-tabs">
          {plan.days.map((day) => (
            <button
              key={day.day}
              className={`cp-week-tab ${selectedDay === day.day ? 'active' : ''}`}
              onClick={() => setSelectedDay(day.day)}
            >
              {day.day}
            </button>
          ))}
        </div>

        {/* Day Meals */}
        <div className="cp-day-meals">
          <div className="cp-day-header">
            <span className="cp-day-label">{currentDay.day}</span>
            <span className="cp-day-stats">
              {currentDay.totals.calories} kcal · {currentDay.totals.protein_g}g protein
            </span>
          </div>

          {currentDay.meals.map((meal) => {
            const MealIcon = MEAL_ICONS[meal.type] || SunIcon
            const isSelected = selectedMealId === meal.meal_id

            return (
              <div
                key={meal.meal_id}
                className={`cp-meal-card ${isSelected ? 'selected' : ''}`}
                onClick={() => handleMealClick(meal)}
              >
                <div className="cp-meal-icon">
                  <MealIcon size={20} />
                </div>
                <div className="cp-meal-content">
                  <span className="cp-meal-type">{meal.type}</span>
                  <span className="cp-meal-title">{meal.title}</span>
                  <div className="cp-meal-meta">
                    <span><ClockIcon size={12} /> {meal.prep_minutes} min</span>
                    <span><FlameIcon size={12} /> {meal.calories} kcal</span>
                    <span><DollarIcon size={12} /> ${meal.estimated_cost.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  className="cp-swap-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    onSwapMeal(meal.meal_id)
                  }}
                >
                  <SwapIcon size={16} />
                  Swap
                </button>
              </div>
            )
          })}
        </div>
      </section>

      {/* Selected Meal Details */}
      {selectedRecipe && (
        <section className="cp-fs-section cp-recipe-section">
          <h2 className="cp-fs-section-title">
            <ChefHatIcon size={20} />
            Selected Meal Details
          </h2>
          <div className="cp-recipe-card">
            <div className="cp-recipe-header">
              <h3 className="cp-recipe-title">{selectedRecipe.title}</h3>
              <div className="cp-recipe-tags">
                {selectedRecipe.tags.map((tag) => (
                  <span key={tag} className={`cp-tag ${getTagColor(tag)}`}>
                    {tag.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>

            <div className="cp-recipe-stats">
              <div className="cp-recipe-stat">
                <ClockIcon size={16} />
                <span>Prep {selectedRecipe.prep_minutes} min</span>
              </div>
              <div className="cp-recipe-stat">
                <UsersIcon size={16} />
                <span>Serves {selectedRecipe.servings}</span>
              </div>
              <div className="cp-recipe-stat">
                <DollarIcon size={16} />
                <span>${selectedRecipe.estimated_cost.toFixed(2)} total</span>
              </div>
            </div>

            <div className="cp-recipe-nutrition">
              <span><ProteinIcon size={14} /> Protein {selectedRecipe.macros.protein_g}g</span>
              <span><LeafIcon size={14} /> Carbs {selectedRecipe.macros.carbs_g}g</span>
              <span><ZapIcon size={14} /> Fat {selectedRecipe.macros.fat_g}g</span>
            </div>

            <div className="cp-recipe-ingredients">
              <h4>Ingredients</h4>
              <ul>
                {selectedRecipe.ingredients.map((ing, i) => (
                  <li key={i}>
                    {ing.amount} {ing.name}
                    {ing.notes && <span className="cp-ing-note"> ({ing.notes})</span>}
                  </li>
                ))}
              </ul>
            </div>

            <div className="cp-recipe-steps">
              <h4>Steps</h4>
              <ol>
                {selectedRecipe.instructions.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>

            <div className="cp-recipe-actions">
              <button className="cp-btn cp-btn-outline" onClick={() => onSwapMeal(selectedRecipe.meal_id)}>
                <SwapIcon size={16} />
                Replace this meal
              </button>
              <button className="cp-btn cp-btn-outline">
                <ZapIcon size={16} />
                Make faster
              </button>
              <button className="cp-btn cp-btn-outline">
                <DollarIcon size={16} />
                Make cheaper
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Shopping List */}
      <section className="cp-fs-section">
        <h2 className="cp-fs-section-title">
          <CartIcon size={20} />
          Shopping List
        </h2>

        <div className="cp-shopping-list">
          {plan.shopping_list.map((section) => (
            <div key={section.section} className="cp-shop-section">
              <button
                className="cp-shop-header"
                onClick={() => toggleSection(section.section)}
              >
                <span>{section.section}</span>
                <span className="cp-shop-count">{section.items.length} items</span>
                {expandedSections[section.section] ? (
                  <ChevronUpIcon size={18} />
                ) : (
                  <ChevronDownIcon size={18} />
                )}
              </button>

              {expandedSections[section.section] && (
                <div className="cp-shop-items">
                  {section.items.map((item, i) => (
                    <div key={i} className="cp-shop-item">
                      <span className="cp-shop-item-name">
                        {item.name}
                      </span>
                      <span className="cp-shop-item-qty">
                        {item.quantity} {item.unit}
                      </span>
                      {item.estimated_cost && (
                        <span className="cp-shop-item-cost">
                          ${item.estimated_cost.toFixed(2)}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Sticky Action Bar */}
      <div className="cp-fs-actions">
        <button className="cp-btn cp-btn-outline" onClick={onRebuildWeek}>
          <RefreshIcon size={18} />
          Rebuild week
        </button>
        <button className="cp-btn cp-btn-primary" onClick={() => onOrderIngredients('instacart')}>
          <CartIcon size={18} />
          Order with Instacart
          <ExternalLinkIcon size={14} />
        </button>
      </div>

      <style>{`
        .cp-fullscreen {
          min-height: 100vh;
          background: linear-gradient(135deg, #f0fdf4 0%, #ffffff 50%, #fff7ed 100%);
          padding-bottom: 100px;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        .cp-fs-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .cp-fs-header-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .cp-fs-title {
          font-size: 20px;
          font-weight: 700;
          color: #111827;
          margin: 0;
        }

        .cp-fs-subtitle {
          font-size: 13px;
          color: #6b7280;
          margin: 4px 0 0 0;
        }

        .cp-close-btn {
          background: rgba(0, 0, 0, 0.05);
          border: none;
          border-radius: 12px;
          padding: 10px;
          cursor: pointer;
          color: #6b7280;
          transition: all 0.2s;
        }

        .cp-close-btn:hover {
          background: rgba(0, 0, 0, 0.1);
          color: #111827;
        }

        .cp-icon-green { color: #16a34a; }
        .cp-icon-orange { color: #f97316; }

        .cp-fs-metrics {
          display: flex;
          gap: 16px;
          padding: 20px 24px;
          background: rgba(255, 255, 255, 0.7);
          margin: 16px 24px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
        }

        .cp-fs-metric {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .cp-fs-metric-value {
          font-size: 18px;
          font-weight: 700;
          color: #111827;
        }

        .cp-fs-metric-label {
          font-size: 11px;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .cp-fs-section {
          margin: 24px;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          border-radius: 20px;
          padding: 24px;
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
        }

        .cp-fs-section-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 16px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 20px 0;
        }

        .cp-week-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
          overflow-x: auto;
          padding-bottom: 4px;
        }

        .cp-week-tab {
          padding: 10px 20px;
          border-radius: 12px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          background: rgba(255, 255, 255, 0.8);
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .cp-week-tab:hover {
          border-color: #22c55e;
          color: #16a34a;
        }

        .cp-week-tab.active {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
          border-color: transparent;
          box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
        }

        .cp-day-meals {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .cp-day-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .cp-day-label {
          font-size: 18px;
          font-weight: 700;
          color: #111827;
        }

        .cp-day-stats {
          font-size: 13px;
          color: #6b7280;
        }

        .cp-meal-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 14px;
          border: 1px solid rgba(0, 0, 0, 0.05);
          cursor: pointer;
          transition: all 0.2s;
        }

        .cp-meal-card:hover {
          border-color: rgba(34, 197, 94, 0.3);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
        }

        .cp-meal-card.selected {
          border-color: #22c55e;
          box-shadow: 0 4px 16px rgba(34, 197, 94, 0.2);
        }

        .cp-meal-icon {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f0fdf4, #dcfce7);
          border-radius: 12px;
          color: #16a34a;
        }

        .cp-meal-content {
          flex: 1;
        }

        .cp-meal-type {
          display: block;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #9ca3af;
        }

        .cp-meal-title {
          display: block;
          font-size: 15px;
          font-weight: 600;
          color: #111827;
          margin: 2px 0 6px;
        }

        .cp-meal-meta {
          display: flex;
          gap: 12px;
          font-size: 12px;
          color: #6b7280;
        }

        .cp-meal-meta span {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .cp-swap-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: 10px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          background: white;
          font-size: 13px;
          font-weight: 500;
          color: #374151;
          cursor: pointer;
          transition: all 0.2s;
        }

        .cp-swap-btn:hover {
          border-color: #f97316;
          color: #f97316;
        }

        .cp-recipe-section {
          background: rgba(255, 255, 255, 0.95);
        }

        .cp-recipe-card {
          background: linear-gradient(135deg, rgba(240, 253, 244, 0.5), rgba(255, 255, 255, 0.8));
          border-radius: 16px;
          padding: 24px;
          border: 1px solid rgba(34, 197, 94, 0.15);
        }

        .cp-recipe-header {
          margin-bottom: 16px;
        }

        .cp-recipe-title {
          font-size: 20px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 10px;
        }

        .cp-recipe-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .cp-tag {
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          text-transform: capitalize;
        }

        .cp-tag-green {
          background: #dcfce7;
          color: #166534;
        }

        .cp-tag-orange {
          background: #ffedd5;
          color: #c2410c;
        }

        .cp-tag-blue {
          background: #dbeafe;
          color: #1e40af;
        }

        .cp-tag-emerald {
          background: #d1fae5;
          color: #065f46;
        }

        .cp-tag-purple {
          background: #f3e8ff;
          color: #7c3aed;
        }

        .cp-tag-amber {
          background: #fef3c7;
          color: #b45309;
        }

        .cp-tag-pink {
          background: #fce7f3;
          color: #be185d;
        }

        .cp-tag-gray {
          background: #f3f4f6;
          color: #4b5563;
        }

        .cp-recipe-stats {
          display: flex;
          gap: 20px;
          margin-bottom: 16px;
          padding: 12px 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .cp-recipe-stat {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #6b7280;
        }

        .cp-recipe-nutrition {
          display: flex;
          gap: 16px;
          font-size: 13px;
          color: #374151;
          margin-bottom: 20px;
        }

        .cp-recipe-nutrition span {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .cp-recipe-ingredients,
        .cp-recipe-steps {
          margin-bottom: 20px;
        }

        .cp-recipe-ingredients h4,
        .cp-recipe-steps h4 {
          font-size: 14px;
          font-weight: 600;
          color: #111827;
          margin: 0 0 10px;
        }

        .cp-recipe-ingredients ul,
        .cp-recipe-steps ol {
          padding-left: 20px;
          margin: 0;
        }

        .cp-recipe-ingredients li,
        .cp-recipe-steps li {
          font-size: 14px;
          color: #374151;
          padding: 4px 0;
        }

        .cp-ing-note {
          color: #9ca3af;
          font-style: italic;
        }

        .cp-recipe-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .cp-shopping-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .cp-shop-section {
          background: rgba(255, 255, 255, 0.8);
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(0, 0, 0, 0.04);
        }

        .cp-shop-header {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          background: transparent;
          border: none;
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          cursor: pointer;
          transition: background 0.2s;
        }

        .cp-shop-header:hover {
          background: rgba(0, 0, 0, 0.02);
        }

        .cp-shop-count {
          color: #9ca3af;
          font-weight: 400;
          margin-right: auto;
          margin-left: 8px;
        }

        .cp-shop-items {
          padding: 0 16px 14px;
        }

        .cp-shop-item {
          display: flex;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.04);
        }

        .cp-shop-item:last-child {
          border-bottom: none;
        }

        .cp-shop-item-name {
          flex: 1;
          font-size: 14px;
          color: #374151;
        }

        .cp-shop-item-qty {
          font-size: 13px;
          color: #6b7280;
          margin-right: 16px;
        }

        .cp-shop-item-cost {
          font-size: 13px;
          font-weight: 500;
          color: #16a34a;
        }

        .cp-fs-actions {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          gap: 12px;
          padding: 20px 24px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          border-top: 1px solid rgba(0, 0, 0, 0.05);
          z-index: 100;
        }

        .cp-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 24px;
          border-radius: 14px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          font-family: inherit;
        }

        .cp-btn-primary {
          flex: 2;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
          box-shadow: 0 4px 14px rgba(34, 197, 94, 0.35);
        }

        .cp-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(34, 197, 94, 0.45);
        }

        .cp-btn-outline {
          flex: 1;
          background: rgba(255, 255, 255, 0.9);
          color: #374151;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }

        .cp-btn-outline:hover {
          background: white;
          border-color: #22c55e;
          color: #16a34a;
        }

        @media (max-width: 640px) {
          .cp-fs-metrics {
            flex-wrap: wrap;
          }

          .cp-fs-metric {
            flex: 1 1 45%;
          }

          .cp-recipe-actions {
            flex-direction: column;
          }

          .cp-fs-actions {
            flex-direction: column;
          }

          .cp-btn {
            flex: none;
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}
