/**
 * Merge ChatGPT Apps toolOutput + toolInput for GamePick.
 */

import type { GameSearchItem } from './types'
import { proxyGameImageUrl } from './api'

const MODES = new Set(['search', 'results', 'detail'])

function str(args: Record<string, unknown>, ...keys: string[]): string {
  for (const k of keys) {
    const v = args[k]
    if (v !== undefined && v !== null && String(v).trim() !== '') {
      return String(v).trim()
    }
  }
  return ''
}

export function toolInputArgsToGamepickInit(
  args: Record<string, unknown>,
): Record<string, unknown> {
  const query = str(args, 'query')
  const gid = args.game_id ?? args.gameId
  const out: Record<string, unknown> = {}
  if (typeof gid === 'number' && Number.isFinite(gid) && gid > 0) {
    out.game_id = Math.floor(gid)
  } else if (typeof gid === 'string' && /^\d+$/.test(gid.trim())) {
    out.game_id = parseInt(gid.trim(), 10)
  }
  if (query) {
    out.query = query
    out.autoSearch = true
  }
  return out
}

export function unwrapGamepickPayload(
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
    if (o.game && typeof o.game === 'object') {
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
  const keys = Array.from(new Set([...Object.keys(o), ...Object.keys(i)]))
  const out: Record<string, unknown> = {}
  for (const k of keys) {
    const ov: unknown = Object.prototype.hasOwnProperty.call(o, k)
      ? o[k]
      : undefined
    const iv: unknown = Object.prototype.hasOwnProperty.call(i, k)
      ? i[k]
      : undefined
    if (k === 'game' && ov && typeof ov === 'object') {
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

export function reconcileGamepickInit(
  merged: Record<string, unknown>,
): Record<string, unknown> {
  const m = { ...merged }
  if (m.game && typeof m.game === 'object') {
    m.mode = 'detail'
    return m
  }
  if (Array.isArray(m.results) && m.results.length > 0) {
    m.mode = 'results'
    return m
  }
  if (typeof m.mode !== 'string' || !MODES.has(m.mode)) {
    m.mode = 'search'
  }
  return m
}

export function mergeGamepickToolOutputAndInput(
  toolOutput: unknown,
  toolInput: Record<string, unknown> | undefined,
): Record<string, unknown> | null {
  let fromOut: Record<string, unknown> | null = null
  if (toolOutput && typeof toolOutput === 'object') {
    fromOut =
      unwrapGamepickPayload(toolOutput) ??
      unwrapGamepickPayload({
        structuredContent: toolOutput,
      })
  }

  let fromIn: Record<string, unknown> | null = null
  if (toolInput && typeof toolInput === 'object') {
    fromIn = toolInputArgsToGamepickInit(toolInput)
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
  return reconcileGamepickInit(merged)
}

export function parseGamesFromInit(raw: unknown): GameSearchItem[] | null {
  if (!Array.isArray(raw)) {
    return null
  }
  const out: GameSearchItem[] = []
  for (const el of raw) {
    if (!el || typeof el !== 'object') {
      continue
    }
    const r = el as Record<string, unknown>
    if (typeof r.id === 'string' && typeof r.title === 'string') {
      const rawPoster = typeof r.poster === 'string' ? r.poster : ''
      out.push({
        id: r.id,
        title: r.title,
        year: typeof r.year === 'string' ? r.year : '',
        genre: typeof r.genre === 'string' ? r.genre : '',
        poster: proxyGameImageUrl(rawPoster),
        link: typeof r.link === 'string' ? r.link : '',
      })
    }
  }
  return out.length > 0 ? out : null
}
