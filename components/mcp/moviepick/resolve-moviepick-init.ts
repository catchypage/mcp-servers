/**
 * Merge ChatGPT Apps toolOutput + toolInput for MoviePick (same idea as resume).
 * @see https://developers.openai.com/apps-sdk/reference/
 */

import type { MediaScope, MovieSearchItem } from './types'
import { YEAR_SLIDER_MAX, YEAR_SLIDER_MIN } from './types'

const MODES = new Set(['search', 'results', 'detail', 'random'])

export function isRandomArgTrue(v: unknown): boolean {
  if (v === true) {
    return true
  }
  if (v === 1) {
    return true
  }
  if (typeof v === 'string') {
    const s = v.toLowerCase().trim()
    return s === 'true' || s === '1' || s === 'yes'
  }
  return false
}

function str(args: Record<string, unknown>, ...keys: string[]): string {
  for (const k of keys) {
    const v = args[k]
    if (v !== undefined && v !== null && String(v).trim() !== '') {
      return String(v).trim()
    }
  }
  return ''
}

function parseMediaScopeClient(raw: unknown): MediaScope {
  const s = String(raw ?? 'movie').toLowerCase()
  if (s === 'tv' || s === 'series' || s === 'show') {
    return 'tv'
  }
  if (s === 'both' || s === 'all' || s === 'mixed') {
    return 'both'
  }
  return 'movie'
}

function parseGenreIdsClient(raw: unknown): number[] {
  if (typeof raw === 'string') {
    return raw
      .split(/[,|]/)
      .map((x) => parseInt(x.trim(), 10))
      .filter((n) => Number.isFinite(n) && n > 0)
  }
  if (Array.isArray(raw)) {
    return raw.map((x) => Number(x)).filter((n) => Number.isFinite(n) && n > 0)
  }
  return []
}

function yearOrDefault(raw: unknown, fallback: number): number {
  const n = typeof raw === 'number' ? raw : parseInt(String(raw ?? ''), 10)
  if (Number.isFinite(n) && n >= YEAR_SLIDER_MIN && n <= YEAR_SLIDER_MAX) {
    return n
  }
  return fallback
}

/**
 * Normalize tool call arguments (snake_case / camelCase) into widget init
 * fields.
 */
export function toolInputArgsToMoviepickInit(
  args: Record<string, unknown>,
): Record<string, unknown> {
  const query = str(args, 'query')
  const random = isRandomArgTrue(args.random)
  const media = parseMediaScopeClient(args.media)
  const genreIds = parseGenreIdsClient(
    args.genre_ids ?? args.genreIds ?? args.genre_ids,
  )
  const yfRaw = args.year_from ?? args.yearFrom
  const ytRaw = args.year_to ?? args.yearTo
  const singleYear = args.year

  const out: Record<string, unknown> = {
    mode: random ? 'random' : 'search',
    media,
    random,
  }
  if (query) {
    out.query = query
    out.autoSearch = true
  }
  if (genreIds.length > 0) {
    out.genreIds = genreIds
  }
  if (
    typeof singleYear === 'number' &&
    singleYear > 1900 &&
    singleYear < 2100
  ) {
    out.yearFrom = singleYear
    out.yearTo = singleYear
  } else {
    const yf = yearOrDefault(yfRaw, YEAR_SLIDER_MIN)
    const yt = yearOrDefault(ytRaw, YEAR_SLIDER_MAX)
    if (yf > YEAR_SLIDER_MIN || yt < YEAR_SLIDER_MAX) {
      out.yearFrom = yf
      out.yearTo = yt
    }
  }
  if (random) {
    out.autoPick = true
  }
  return out
}

export function unwrapMoviepickPayload(
  data: unknown,
): Record<string, unknown> | null {
  let cur: unknown = data
  for (let depth = 0; depth < 8; depth++) {
    if (!cur || typeof cur !== 'object') {
      return null
    }
    const o = cur as Record<string, unknown>
    const modeRaw = o.mode
    if (typeof modeRaw === 'string' && MODES.has(modeRaw)) {
      return { ...o }
    }
    if (o.movie && typeof o.movie === 'object') {
      return { ...o, mode: typeof modeRaw === 'string' ? modeRaw : 'detail' }
    }
    if (Array.isArray(o.results)) {
      return { ...o, mode: typeof modeRaw === 'string' ? modeRaw : 'results' }
    }
    const next =
      o.structuredContent ?? o.result ?? o.data ?? o.payload ?? o.toolResult
    if (next && typeof next === 'object') {
      cur = next
      continue
    }
    return null
  }
  return null
}

function mergeInitRecords(
  fromOutput: Record<string, unknown> | null,
  fromInput: Record<string, unknown> | null,
): Record<string, unknown> | null {
  if (!fromOutput && !fromInput) {
    return null
  }
  const o = fromOutput ?? {}
  const i = fromInput ?? {}
  const keys = new Set([...Object.keys(o), ...Object.keys(i)])
  const out: Record<string, unknown> = {}
  for (const k of keys) {
    const ov = o[k]
    const iv = i[k]
    if (k === 'movie' && ov && typeof ov === 'object') {
      out[k] = ov
      continue
    }
    if (k === 'results' && Array.isArray(ov)) {
      out[k] = ov
      continue
    }
    if (ov !== undefined && ov !== null && ov !== '') {
      if (typeof ov === 'string' && ov.trim() === '') {
        /* fall through */
      } else {
        out[k] = ov
        continue
      }
    }
    if (iv !== undefined && iv !== null && iv !== '') {
      out[k] = iv
    }
  }
  return Object.keys(out).length ? out : null
}

/**
 * Pick final mode after merging host input with MCP structured content.
 */
export function reconcileMoviepickInit(
  merged: Record<string, unknown>,
): Record<string, unknown> {
  const m = { ...merged }
  if (m.movie && typeof m.movie === 'object') {
    m.mode = 'detail'
    return m
  }
  if (Array.isArray(m.results) && m.results.length > 0) {
    m.mode = 'results'
    return m
  }
  if (isRandomArgTrue(m.random) || m.mode === 'random') {
    m.mode = 'random'
    m.random = true
    if (m.autoPick === undefined) {
      m.autoPick = true
    }
    return m
  }
  if (typeof m.mode !== 'string' || !MODES.has(m.mode)) {
    m.mode = 'search'
  }
  return m
}

export function mergeMoviepickToolOutputAndInput(
  toolOutput: unknown,
  toolInput: Record<string, unknown> | undefined,
): Record<string, unknown> | null {
  let fromOut: Record<string, unknown> | null = null
  if (toolOutput && typeof toolOutput === 'object') {
    fromOut =
      unwrapMoviepickPayload(toolOutput) ??
      unwrapMoviepickPayload({
        structuredContent: toolOutput,
      })
  }

  let fromIn: Record<string, unknown> | null = null
  if (toolInput && typeof toolInput === 'object') {
    fromIn = toolInputArgsToMoviepickInit(toolInput)
  }

  let merged: Record<string, unknown> | null = null
  if (fromOut && fromIn) {
    merged = mergeInitRecords(fromOut, fromIn)
  } else {
    merged = fromOut ?? fromIn
  }
  if (!merged) {
    return null
  }
  return reconcileMoviepickInit(merged)
}

export function parseMediaFromInit(raw: unknown): MediaScope {
  return parseMediaScopeClient(raw)
}

export function randomSnapshotFromMerged(
  ctx: Record<string, unknown>,
): import('./types').RandomSnapshot {
  const rs = ctx.randomSnapshot
  if (rs && typeof rs === 'object') {
    const o = rs as Record<string, unknown>
    return {
      media: parseMediaScopeClient(o.media ?? ctx.media),
      genreIds: parseGenreIdsClient(o.genreIds ?? o.genre_ids),
      yearFrom: yearOrDefault(o.yearFrom ?? o.year_from, YEAR_SLIDER_MIN),
      yearTo: yearOrDefault(o.yearTo ?? o.year_to, YEAR_SLIDER_MAX),
    }
  }
  return {
    media: parseMediaScopeClient(ctx.media),
    genreIds: parseGenreIdsClient(ctx.genreIds ?? ctx.genre_ids),
    yearFrom: yearOrDefault(ctx.yearFrom ?? ctx.year_from, YEAR_SLIDER_MIN),
    yearTo: yearOrDefault(ctx.yearTo ?? ctx.year_to, YEAR_SLIDER_MAX),
  }
}

export function parseSearchResultsFromInit(
  raw: unknown,
): MovieSearchItem[] | null {
  if (!Array.isArray(raw)) {
    return null
  }
  const out: MovieSearchItem[] = []
  for (const el of raw) {
    if (!el || typeof el !== 'object') {
      continue
    }
    const r = el as Record<string, unknown>
    if (
      typeof r.id === 'string' &&
      typeof r.title === 'string' &&
      (r.kind === 'movie' || r.kind === 'tv')
    ) {
      out.push({
        id: r.id,
        kind: r.kind,
        title: r.title,
        year: typeof r.year === 'string' ? r.year : '',
        poster: typeof r.poster === 'string' ? r.poster : '',
      })
    }
  }
  return out.length > 0 ? out : null
}
