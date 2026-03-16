import type { SwapCandidate, Meal } from '@/utils/mcp/apps/chefplan/types'
import {
  ClockIcon,
  FlameIcon,
  DollarIcon,
  ProteinIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  ZapIcon,
  LeafIcon,
  HeartIcon,
  StarIcon,
} from './Icons'
import { useState, useRef } from 'react'

interface SwapWidgetProps {
  currentMeal: Meal
  candidates: SwapCandidate[]
  onReplace: (candidateId: string) => void
  onClose: () => void
}

export default function SwapWidget({
  currentMeal,
  candidates,
  onReplace,
  onClose,
}: SwapWidgetProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = 280
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -amount : amount,
        behavior: 'smooth',
      })
    }
  }

  const getTagIcon = (tag: string) => {
    const icons: Record<
      string,
      React.ComponentType<{ size?: number; className?: string }>
    > = {
      'high-protein': ProteinIcon,
      quick: ZapIcon,
      budget: DollarIcon,
      healthy: HeartIcon,
      vegan: LeafIcon,
      vegetarian: LeafIcon,
    }
    return icons[tag] || StarIcon
  }

  const getPrimaryTag = (tags: string[]): string | null => {
    const priority = [
      'high-protein',
      'quick',
      'budget',
      'healthy',
      'vegan',
      'vegetarian',
    ]
    for (const p of priority) {
      if (tags.includes(p)) {
        return p
      }
    }
    return tags[0] || null
  }

  const getTagStyle = (tag: string) => {
    const styles: Record<string, string> = {
      'high-protein': 'cp-badge-green',
      quick: 'cp-badge-orange',
      budget: 'cp-badge-blue',
      healthy: 'cp-badge-emerald',
      vegan: 'cp-badge-emerald',
      vegetarian: 'cp-badge-emerald',
      'kid-friendly': 'cp-badge-purple',
    }
    return styles[tag] || 'cp-badge-gray'
  }

  return (
    <div className="cp-swap-widget">
      {/* Header */}
      <div className="cp-swap-header">
        <div className="cp-swap-title-area">
          <h2 className="cp-swap-title">Replace {currentMeal.type}</h2>
          <p className="cp-swap-current">
            Current: <strong>{currentMeal.title}</strong>
          </p>
        </div>
        <button className="cp-swap-close" onClick={onClose}>
          <CloseIcon size={20} />
        </button>
      </div>

      {/* Carousel Navigation */}
      <div className="cp-swap-nav">
        <button className="cp-nav-btn" onClick={() => scroll('left')}>
          <ChevronLeftIcon size={20} />
        </button>
        <span className="cp-nav-count">{candidates.length} alternatives</span>
        <button className="cp-nav-btn" onClick={() => scroll('right')}>
          <ChevronRightIcon size={20} />
        </button>
      </div>

      {/* Carousel */}
      <div className="cp-swap-carousel" ref={scrollRef}>
        {candidates.map((candidate, index) => {
          const primaryTag = getPrimaryTag(candidate.tags)
          const TagIcon = primaryTag ? getTagIcon(primaryTag) : null
          const isSelected = selectedId === candidate.meal_id

          return (
            <div
              key={candidate.meal_id}
              className={`cp-swap-card ${isSelected ? 'selected' : ''}`}
              onClick={() => setSelectedId(candidate.meal_id)}
            >
              {/* Match Score Badge */}
              <div className="cp-match-score">
                {Math.round(candidate.match_score * 100)}% match
              </div>

              {/* Card Content */}
              <h3 className="cp-card-title">{candidate.title}</h3>

              {/* Stats Row */}
              <div className="cp-card-stats">
                <span className="cp-card-stat">
                  <ClockIcon size={14} />
                  {candidate.prep_minutes} min
                </span>
                <span className="cp-card-stat">
                  <FlameIcon size={14} />
                  {candidate.calories} kcal
                </span>
                <span className="cp-card-stat">
                  <DollarIcon size={14} />${candidate.estimated_cost.toFixed(2)}
                </span>
              </div>

              {/* Macros */}
              <div className="cp-card-macros">
                <span>
                  <ProteinIcon size={12} /> {candidate.macros.protein_g}g
                  protein
                </span>
              </div>

              {/* Primary Badge */}
              {primaryTag && TagIcon && (
                <div className={`cp-card-badge ${getTagStyle(primaryTag)}`}>
                  <TagIcon size={14} />
                  {primaryTag.replace('-', ' ')}
                </div>
              )}

              {/* Replace Button */}
              <button
                className={`cp-replace-btn ${isSelected ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation()
                  onReplace(candidate.meal_id)
                }}
              >
                {isSelected ? (
                  <>
                    <CheckIcon size={16} />
                    Confirm
                  </>
                ) : (
                  'Replace'
                )}
              </button>
            </div>
          )
        })}
      </div>

      <style>{`
        .cp-swap-widget {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 24px;
          padding: 24px;
          max-width: 100%;
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.1);
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        .cp-swap-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
        }

        .cp-swap-title-area {
          flex: 1;
        }

        .cp-swap-title {
          font-size: 18px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 4px;
        }

        .cp-swap-current {
          font-size: 13px;
          color: #6b7280;
          margin: 0;
        }

        .cp-swap-current strong {
          color: #374151;
        }

        .cp-swap-close {
          background: rgba(0, 0, 0, 0.05);
          border: none;
          border-radius: 10px;
          padding: 8px;
          cursor: pointer;
          color: #6b7280;
          transition: all 0.2s;
        }

        .cp-swap-close:hover {
          background: rgba(0, 0, 0, 0.1);
          color: #111827;
        }

        .cp-swap-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 16px;
        }

        .cp-nav-btn {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          cursor: pointer;
          color: #374151;
          transition: all 0.2s;
        }

        .cp-nav-btn:hover {
          background: white;
          border-color: #22c55e;
          color: #16a34a;
        }

        .cp-nav-count {
          font-size: 13px;
          color: #6b7280;
        }

        .cp-swap-carousel {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding: 4px;
        }

        .cp-swap-carousel::-webkit-scrollbar {
          display: none;
        }

        .cp-swap-card {
          flex: 0 0 260px;
          scroll-snap-align: start;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(240, 253, 244, 0.5));
          border: 2px solid rgba(0, 0, 0, 0.06);
          border-radius: 18px;
          padding: 20px;
          cursor: pointer;
          transition: all 0.25s ease;
          position: relative;
        }

        .cp-swap-card:hover {
          border-color: rgba(34, 197, 94, 0.3);
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        }

        .cp-swap-card.selected {
          border-color: #22c55e;
          box-shadow: 0 8px 28px rgba(34, 197, 94, 0.2);
        }

        .cp-match-score {
          position: absolute;
          top: 12px;
          right: 12px;
          padding: 4px 10px;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
          font-size: 11px;
          font-weight: 600;
          border-radius: 20px;
        }

        .cp-card-title {
          font-size: 16px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 12px;
          padding-right: 70px;
        }

        .cp-card-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 12px;
        }

        .cp-card-stat {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: #6b7280;
        }

        .cp-card-macros {
          font-size: 12px;
          color: #374151;
          margin-bottom: 14px;
        }

        .cp-card-macros span {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .cp-card-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: capitalize;
          margin-bottom: 16px;
        }

        .cp-badge-green {
          background: #dcfce7;
          color: #166534;
        }

        .cp-badge-orange {
          background: #ffedd5;
          color: #c2410c;
        }

        .cp-badge-blue {
          background: #dbeafe;
          color: #1e40af;
        }

        .cp-badge-emerald {
          background: #d1fae5;
          color: #065f46;
        }

        .cp-badge-purple {
          background: #f3e8ff;
          color: #7c3aed;
        }

        .cp-badge-gray {
          background: #f3f4f6;
          color: #4b5563;
        }

        .cp-replace-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 12px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(0, 0, 0, 0.1);
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          cursor: pointer;
          transition: all 0.2s;
        }

        .cp-replace-btn:hover {
          background: white;
          border-color: #22c55e;
          color: #16a34a;
        }

        .cp-replace-btn.active {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          border-color: transparent;
          color: white;
          box-shadow: 0 4px 14px rgba(34, 197, 94, 0.35);
        }

        @media (max-width: 640px) {
          .cp-swap-card {
            flex: 0 0 240px;
          }
        }
      `}</style>
    </div>
  )
}
