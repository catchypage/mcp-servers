import {
  PLACEMENT_QUESTIONS_EN,
  type PlacementQuestion,
} from './placement-questions-en'

export type CefrLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1'

const CEFR_ORDER: CefrLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1']

const LEVEL_WEIGHT: Record<CefrLevel, number> = {
  A1: 1,
  A2: 2,
  B1: 3,
  B2: 4,
  C1: 5,
}

const LEVEL_THRESHOLDS: { minScore: number; level: CefrLevel }[] = [
  { minScore: 155, level: 'C1' },
  { minScore: 115, level: 'B2' },
  { minScore: 75, level: 'B1' },
  { minScore: 40, level: 'A2' },
  { minScore: 0, level: 'A1' },
]

export interface PlacementResult {
  level: CefrLevel
  label: string
  breakdown: Record<CefrLevel, { correct: number; total: number; pct: number }>
  totalCorrect: number
  totalQuestions: number
  pct: number
  weightedScore: number
}

export const CEFR_LABELS: Record<CefrLevel, string> = {
  A1: 'Beginner',
  A2: 'Elementary',
  B1: 'Intermediate',
  B2: 'Upper-Intermediate',
  C1: 'Advanced',
}

/*
 * ═══════════════════════════════════════════════════════════════════════
 * Fisher-Yates shuffle (pure, does not mutate input)
 * ═══════════════════════════════════════════════════════════════════════
 */

function shuffle<T>(arr: readonly T[]): T[] {
  const out = [...arr]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

/*
 * ═══════════════════════════════════════════════════════════════════════
 * Prepare client-safe questions with shuffled order + shuffled options
 * ═══════════════════════════════════════════════════════════════════════
 */

export interface ClientQuestion {
  id: string
  section: PlacementQuestion['section']
  cefr: PlacementQuestion['cefr']
  stem: string
  options: string[]
}

interface ShuffledMapping {
  questionId: string
  originalCorrectIndex: number
  shuffledCorrectIndex: number
}

let lastShuffleMap: ShuffledMapping[] = []

export function getClientQuestions(): ClientQuestion[] {
  const questions = PLACEMENT_QUESTIONS_EN

  const byLevel = new Map<CefrLevel, PlacementQuestion[]>()
  for (const q of questions) {
    const list = byLevel.get(q.cefr) ?? []
    list.push(q)
    byLevel.set(q.cefr, list)
  }

  const interleaved: PlacementQuestion[] = []
  for (const lvl of CEFR_ORDER) {
    const lvlQuestions = byLevel.get(lvl) ?? []
    interleaved.push(...shuffle(lvlQuestions))
  }

  lastShuffleMap = []

  return interleaved.map((q) => {
    const indices = [0, 1, 2, 3] as const
    const shuffledIndices = shuffle(indices)
    const newCorrectIndex = shuffledIndices.indexOf(q.correctIndex)

    lastShuffleMap.push({
      questionId: q.id,
      originalCorrectIndex: q.correctIndex,
      shuffledCorrectIndex: newCorrectIndex,
    })

    return {
      id: q.id,
      section: q.section,
      cefr: q.cefr,
      stem: q.stem,
      options: shuffledIndices.map((i) => q.options[i]),
    }
  })
}

/*
 * ═══════════════════════════════════════════════════════════════════════
 * Scoring — weighted approach
 *
 * Each correct answer earns points based on its CEFR level weight.
 * The final level is determined by the total weighted score against
 * predefined thresholds. This is more resilient to random gaps than
 * the consecutive-pass model.
 * ═══════════════════════════════════════════════════════════════════════
 */

export function scorePlacement(
  answers: Record<string, number>,
): PlacementResult {
  const buckets: Record<CefrLevel, { correct: number; total: number }> = {
    A1: { correct: 0, total: 0 },
    A2: { correct: 0, total: 0 },
    B1: { correct: 0, total: 0 },
    B2: { correct: 0, total: 0 },
    C1: { correct: 0, total: 0 },
  }

  let totalCorrect = 0
  let weightedScore = 0

  for (const mapping of lastShuffleMap) {
    const q = PLACEMENT_QUESTIONS_EN.find((x) => x.id === mapping.questionId)
    if (!q) {
      continue
    }

    buckets[q.cefr].total++
    const userAnswer = answers[q.id]

    if (userAnswer === mapping.shuffledCorrectIndex) {
      buckets[q.cefr].correct++
      totalCorrect++
      weightedScore += LEVEL_WEIGHT[q.cefr]
    }
  }

  if (lastShuffleMap.length === 0) {
    for (const q of PLACEMENT_QUESTIONS_EN) {
      buckets[q.cefr].total++
      const userAnswer = answers[q.id]
      if (userAnswer === q.correctIndex) {
        buckets[q.cefr].correct++
        totalCorrect++
        weightedScore += LEVEL_WEIGHT[q.cefr]
      }
    }
  }

  const breakdown = {} as PlacementResult['breakdown']
  for (const lvl of CEFR_ORDER) {
    const b = buckets[lvl]
    breakdown[lvl] = {
      correct: b.correct,
      total: b.total,
      pct: b.total > 0 ? Math.round((b.correct / b.total) * 100) : 0,
    }
  }

  let level: CefrLevel = 'A1'
  for (const t of LEVEL_THRESHOLDS) {
    if (weightedScore >= t.minScore) {
      level = t.level
      break
    }
  }

  const totalQuestions = Object.values(buckets).reduce((s, b) => s + b.total, 0)

  return {
    level,
    label: CEFR_LABELS[level],
    breakdown,
    totalCorrect,
    totalQuestions,
    pct:
      totalQuestions > 0
        ? Math.round((totalCorrect / totalQuestions) * 100)
        : 0,
    weightedScore,
  }
}
