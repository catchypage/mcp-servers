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
} from './Icons'

interface InlineWidgetProps {
  plan: MealPlan
  onOrderIngredients: () => void
}

export default function InlineWidget({
  plan,
  onOrderIngredients,
}: InlineWidgetProps) {
  const { household, constraints, budget_summary, nutrition_summary, days } =
    plan

  const dietLabel =
    constraints.diet.length > 0
      ? constraints.diet[0].charAt(0).toUpperCase() +
        constraints.diet[0].slice(1)
      : 'Balanced'

  return (
    <div className="cp-inline-widget">
      {/* Header */}
      <div className="cp-inline-header">
        <div className="cp-inline-logo">
          <ChefHatIcon size={28} className="cp-icon-green" />
          <span className="cp-inline-brand">ChefPlan</span>
        </div>
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

      {/* Weekly Overview */}
      <div className="cp-inline-week">
        {days.map((day) => (
          <div key={day.day} className="cp-day-card">
            <span className="cp-day-name">{day.day}</span>
            <span className="cp-day-meals">{day.meals.length}</span>
          </div>
        ))}
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

      {/* Daily Summary */}
      <div className="cp-inline-daily">
        {days.slice(0, 3).map((day) => (
          <div key={day.day} className="cp-daily-row">
            <span className="cp-daily-day">{day.day}:</span>
            <span className="cp-daily-meals">
              {day.meals.map((m) => m.title).join(' / ')}
            </span>
          </div>
        ))}
        {days.length > 3 && (
          <div className="cp-daily-more">+ {days.length - 3} more days</div>
        )}
      </div>

      {/* CTA */}
      <div className="cp-inline-actions">
        <button
          className="cp-btn cp-btn-secondary"
          onClick={onOrderIngredients}
        >
          <CartIcon size={18} />
          Order ingredients
        </button>
      </div>

      <style>{`
        .cp-inline-widget {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 20px;
          padding: 24px;
          max-width: 480px;
          max-height: 500px;
          overflow-y: auto;
          box-shadow:
            0 4px 24px rgba(0, 0, 0, 0.06),
            0 1px 2px rgba(0, 0, 0, 0.04);
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        .cp-inline-widget::-webkit-scrollbar {
          width: 6px;
        }

        .cp-inline-widget::-webkit-scrollbar-track {
          background: transparent;
        }

        .cp-inline-widget::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.15);
          border-radius: 3px;
        }

        .cp-inline-widget::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.25);
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

        .cp-icon-green {
          color: #16a34a;
        }

        .cp-icon-orange {
          color: #f97316;
        }

        .cp-inline-title {
          font-size: 22px;
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

        .cp-inline-week {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
        }

        .cp-day-card {
          flex: 1;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(34, 197, 94, 0.2);
          border-radius: 12px;
          padding: 10px 6px;
          text-align: center;
          transition: all 0.2s ease;
        }

        .cp-day-card:hover {
          border-color: rgba(34, 197, 94, 0.5);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(34, 197, 94, 0.15);
        }

        .cp-day-name {
          display: block;
          font-size: 11px;
          font-weight: 600;
          color: #374151;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .cp-day-meals {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
          border-radius: 50%;
          font-size: 12px;
          font-weight: 600;
          margin: 6px auto 0;
        }

        .cp-inline-metrics {
          display: flex;
          gap: 12px;
          padding: 16px;
          background: rgba(255, 255, 255, 0.7);
          border-radius: 14px;
          margin-bottom: 16px;
          border: 1px solid rgba(0, 0, 0, 0.04);
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
          font-size: 16px;
          font-weight: 700;
          color: #111827;
        }

        .cp-metric-label {
          font-size: 11px;
          color: #6b7280;
        }

        .cp-inline-daily {
          margin-bottom: 20px;
        }

        .cp-daily-row {
          display: flex;
          gap: 8px;
          padding: 8px 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.04);
          font-size: 13px;
        }

        .cp-daily-row:last-child {
          border-bottom: none;
        }

        .cp-daily-day {
          font-weight: 600;
          color: #374151;
          min-width: 36px;
        }

        .cp-daily-meals {
          color: #6b7280;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .cp-daily-more {
          font-size: 12px;
          color: #9ca3af;
          padding-top: 8px;
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
      `}</style>
    </div>
  )
}
