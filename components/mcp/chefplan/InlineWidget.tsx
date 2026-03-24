import { useState } from 'react'
import type { MealPlan } from '@/utils/mcp/apps/chefplan/types'
import {
  ChefHatIcon,
  CalendarIcon,
  DollarIcon,
  FlameIcon,
  ProteinIcon,
  CartIcon,
  UsersIcon,
  LeafIcon,
  ClockIcon,
  ExpandIcon,
  SunriseIcon,
  SunIcon,
  MoonIcon,
  CookieIcon,
} from './Icons'

interface InlineWidgetProps {
  plan: MealPlan
  onOrderIngredients: () => void
  onOpenFullPlan: () => void
}

const MEAL_ICONS: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  breakfast: SunriseIcon,
  lunch: SunIcon,
  dinner: MoonIcon,
  snack: CookieIcon,
}

export default function InlineWidget({
  plan,
  onOrderIngredients,
  onOpenFullPlan,
}: InlineWidgetProps) {
  const { household, constraints, budget_summary, nutrition_summary, days } =
    plan
  const [selectedDay, setSelectedDay] = useState(0)

  const dietLabel =
    constraints.diet.length > 0
      ? constraints.diet[0].charAt(0).toUpperCase() +
        constraints.diet[0].slice(1)
      : 'Balanced'

  const currentDay = days[selectedDay]

  return (
    <div className="cp-inline-widget">
      {/* Header */}
      <div className="cp-inline-header">
        <div className="cp-inline-logo">
          <ChefHatIcon size={28} className="cp-icon-green" />
          <span className="cp-inline-brand">ChefPlan</span>
        </div>
        <button className="cp-expand-btn" onClick={onOpenFullPlan}>
          <ExpandIcon size={18} />
          Open Full
        </button>
      </div>

      {/* Title */}
      <h2 className="cp-inline-title">Weekly meal plan</h2>

      {/* Context Line */}
      <div className="cp-inline-context">
        <span className="cp-context-item">
          <UsersIcon size={14} />
          Family of {household.size}
        </span>
        <span className="cp-context-divider">·</span>
        <span className="cp-context-item">
          <LeafIcon size={14} />
          {dietLabel}
        </span>
        <span className="cp-context-divider">·</span>
        <span className="cp-context-item">
          <DollarIcon size={14} />
          Budget &lt;${constraints.budget_target}
        </span>
        <span className="cp-context-divider">·</span>
        <span className="cp-context-item">
          <CalendarIcon size={14} />7 days
        </span>
      </div>

      {/* Summary Metrics */}
      <div className="cp-inline-metrics">
        <div className="cp-metric">
          <DollarIcon size={18} className="cp-icon-orange" />
          <div className="cp-metric-content">
            <span className="cp-metric-value">
              ${budget_summary.estimated_total.toFixed(2)}
            </span>
            <span className="cp-metric-label">Est. total</span>
          </div>
        </div>
        <div className="cp-metric">
          <FlameIcon size={18} className="cp-icon-orange" />
          <div className="cp-metric-content">
            <span className="cp-metric-value">
              {nutrition_summary.avg_calories_per_day}
            </span>
            <span className="cp-metric-label">kcal/day</span>
          </div>
        </div>
        <div className="cp-metric">
          <ProteinIcon size={18} className="cp-icon-green" />
          <div className="cp-metric-content">
            <span className="cp-metric-value">
              {nutrition_summary.avg_protein_g}g
            </span>
            <span className="cp-metric-label">protein/day</span>
          </div>
        </div>
      </div>

      {/* Day Tabs */}
      <div className="cp-day-tabs">
        {days.map((day, index) => (
          <button
            key={day.day}
            className={`cp-day-tab ${selectedDay === index ? 'active' : ''}`}
            onClick={() => setSelectedDay(index)}
          >
            {day.day}
          </button>
        ))}
      </div>

      {/* Current Day Meals */}
      <div className="cp-meals-grid">
        {currentDay.meals.map((meal) => {
          const MealIcon = MEAL_ICONS[meal.type] || SunIcon
          return (
            <div key={meal.meal_id} className="cp-meal-card">
              {meal.image_url ? (
                <div className="cp-meal-image">
                  <img src={meal.image_url} alt={meal.title} />
                  <span className="cp-meal-type-badge">{meal.type}</span>
                </div>
              ) : (
                <div className="cp-meal-placeholder">
                  <MealIcon size={24} />
                  <span className="cp-meal-type-badge">{meal.type}</span>
                </div>
              )}
              <div className="cp-meal-info">
                <span className="cp-meal-title">{meal.title}</span>
                <div className="cp-meal-meta">
                  <span>
                    <ClockIcon size={12} /> {meal.prep_minutes}m
                  </span>
                  <span>
                    <FlameIcon size={12} /> {meal.calories}
                  </span>
                  <span>
                    <DollarIcon size={12} /> ${meal.estimated_cost.toFixed(0)}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Day Stats */}
      <div className="cp-day-stats">
        <span>{currentDay.totals.calories} kcal</span>
        <span>·</span>
        <span>{currentDay.totals.protein_g}g protein</span>
        <span>·</span>
        <span>{currentDay.totals.carbs_g}g carbs</span>
        <span>·</span>
        <span>{currentDay.totals.fat_g}g fat</span>
      </div>

      {/* CTA Buttons */}
      <div className="cp-inline-actions">
        <button className="cp-btn cp-btn-primary" onClick={onOpenFullPlan}>
          <ExpandIcon size={18} />
          View Full Plan
        </button>
        <button
          className="cp-btn cp-btn-secondary"
          onClick={onOrderIngredients}
        >
          <CartIcon size={18} />
          Order Ingredients
        </button>
      </div>

      <style>{`
        .cp-inline-widget {
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 20px;
          padding: 24px;
          width: 100%;
          max-height: 800px;
          overflow-y: auto;
          box-shadow:
            0 4px 24px rgba(0, 0, 0, 0.08),
            0 1px 2px rgba(0, 0, 0, 0.04);
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          box-sizing: border-box;
        }

        .cp-inline-widget::-webkit-scrollbar {
          width: 8px;
        }

        .cp-inline-widget::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 4px;
        }

        .cp-inline-widget::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
        }

        .cp-inline-widget::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3);
        }

        .cp-inline-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .cp-inline-logo {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .cp-inline-brand {
          font-weight: 700;
          font-size: 18px;
          background: linear-gradient(135deg, #16a34a, #22c55e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .cp-expand-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: 10px;
          border: 1px solid rgba(34, 197, 94, 0.3);
          background: rgba(34, 197, 94, 0.1);
          color: #16a34a;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .cp-expand-btn:hover {
          background: rgba(34, 197, 94, 0.2);
          border-color: #16a34a;
        }

        .cp-icon-green { color: #16a34a; }
        .cp-icon-orange { color: #f97316; }

        .cp-inline-title {
          font-size: 24px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 8px 0;
        }

        .cp-inline-context {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 6px;
          color: #6b7280;
          font-size: 13px;
          margin-bottom: 20px;
        }

        .cp-context-item {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .cp-context-divider {
          color: #d1d5db;
        }

        .cp-inline-metrics {
          display: flex;
          gap: 16px;
          padding: 16px;
          background: linear-gradient(135deg, rgba(240, 253, 244, 0.8), rgba(255, 255, 255, 0.8));
          border-radius: 14px;
          margin-bottom: 20px;
          border: 1px solid rgba(34, 197, 94, 0.15);
        }

        .cp-metric {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .cp-metric-content {
          display: flex;
          flex-direction: column;
        }

        .cp-metric-value {
          font-size: 18px;
          font-weight: 700;
          color: #111827;
        }

        .cp-metric-label {
          font-size: 11px;
          color: #6b7280;
        }

        .cp-day-tabs {
          display: flex;
          gap: 6px;
          margin-bottom: 16px;
          overflow-x: auto;
          padding-bottom: 4px;
        }

        .cp-day-tab {
          flex: 1;
          min-width: 44px;
          padding: 10px 8px;
          border-radius: 10px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          background: rgba(255, 255, 255, 0.8);
          font-size: 13px;
          font-weight: 600;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.2s;
          text-align: center;
        }

        .cp-day-tab:hover {
          border-color: rgba(34, 197, 94, 0.3);
          color: #16a34a;
        }

        .cp-day-tab.active {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
          border-color: transparent;
          box-shadow: 0 2px 8px rgba(34, 197, 94, 0.3);
        }

        .cp-meals-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 16px;
        }

        .cp-meal-card {
          background: rgba(255, 255, 255, 0.9);
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid rgba(0, 0, 0, 0.06);
          transition: all 0.2s;
        }

        .cp-meal-card:hover {
          border-color: rgba(34, 197, 94, 0.3);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transform: translateY(-2px);
        }

        .cp-meal-image {
          position: relative;
          width: 100%;
          height: 100px;
          overflow: hidden;
        }

        .cp-meal-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .cp-meal-placeholder {
          position: relative;
          width: 100%;
          height: 100px;
          background: linear-gradient(135deg, #f0fdf4, #dcfce7);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #16a34a;
        }

        .cp-meal-type-badge {
          position: absolute;
          top: 8px;
          left: 8px;
          padding: 4px 8px;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          color: white;
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          border-radius: 6px;
        }

        .cp-meal-info {
          padding: 12px;
        }

        .cp-meal-title {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 6px;
          line-height: 1.3;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .cp-meal-meta {
          display: flex;
          gap: 8px;
          font-size: 11px;
          color: #6b7280;
        }

        .cp-meal-meta span {
          display: flex;
          align-items: center;
          gap: 3px;
        }

        .cp-day-stats {
          display: flex;
          justify-content: center;
          gap: 8px;
          font-size: 12px;
          color: #6b7280;
          padding: 12px;
          background: rgba(0, 0, 0, 0.02);
          border-radius: 10px;
          margin-bottom: 20px;
        }

        .cp-inline-actions {
          display: flex;
          gap: 12px;
        }

        .cp-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 20px;
          border-radius: 14px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          font-family: inherit;
        }

        .cp-btn-primary {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
          box-shadow: 0 4px 14px rgba(34, 197, 94, 0.35);
        }

        .cp-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(34, 197, 94, 0.45);
        }

        .cp-btn-secondary {
          background: rgba(255, 255, 255, 0.9);
          color: #374151;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }

        .cp-btn-secondary:hover {
          background: white;
          border-color: #f97316;
          color: #f97316;
        }

        @media (max-width: 480px) {
          .cp-meals-grid {
            grid-template-columns: 1fr;
          }

          .cp-inline-actions {
            flex-direction: column;
          }

          .cp-inline-metrics {
            flex-wrap: wrap;
          }

          .cp-metric {
            flex: 1 1 45%;
          }
        }
      `}</style>
    </div>
  )
}
