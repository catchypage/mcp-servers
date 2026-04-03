/**
 * Resolve Resume widget init from ChatGPT Apps / MCP host.
 * @see https://developers.openai.com/apps-sdk/reference/ — toolOutput,
 * toolInput, structuredContent
 */

import { RESUME_STYLES } from './styles'

const VALID_STYLE_IDS = new Set(RESUME_STYLES.map((s) => s.id))

/**
 * Walk nested host shapes until we find an object with string `mode`.
 */
export function unwrapResumeInitPayload(
  data: unknown,
): Record<string, unknown> | null {
  let cur: unknown = data
  for (let depth = 0; depth < 8; depth++) {
    if (!cur || typeof cur !== 'object') {
      return null
    }
    const o = cur as Record<string, unknown>
    if (typeof o.mode === 'string') {
      return o
    }
    const next = o.structuredContent ?? o.result ?? o.data ?? o.payload
    if (next && typeof next === 'object') {
      cur = next
      continue
    }
    return null
  }
  return null
}

function str(args: Record<string, unknown>, ...keys: string[]): string {
  for (const k of keys) {
    const v = args[k]
    if (v !== undefined && v !== null && String(v).trim() !== '') {
      return String(v)
    }
  }
  return ''
}

/**
 * Map open_resume_builder tool arguments (snake_case and camelCase) to the
 * same shape as server context — used when window.openai.toolInput is set but
 * toolOutput is late or missing (hosts may normalize key casing).
 */
export function toolInputArgsToResumeInit(
  args: Record<string, unknown>,
): Record<string, unknown> {
  const modeRaw = String(args.mode ?? 'create')
    .toLowerCase()
    .trim()
  const mode = ['create', 'vacancy', 'improve'].includes(modeRaw)
    ? modeRaw
    : 'create'
  const styleRaw = String(args.style ?? 'modern')
  const style = VALID_STYLE_IDS.has(styleRaw) ? styleRaw : 'modern'

  const ctx: Record<string, unknown> = { mode, style }

  const fullName = str(args, 'full_name', 'fullName')
  if (fullName) {
    ctx.fullName = fullName
  }
  const jobTitle = str(args, 'job_title', 'jobTitle')
  if (jobTitle) {
    ctx.jobTitle = jobTitle
  }
  if (mode === 'vacancy') {
    ctx.vacancyDescription = str(
      args,
      'vacancy_description',
      'vacancyDescription',
    )
    ctx.vacancyImageUrl = str(args, 'vacancy_image_url', 'vacancyImageUrl')
  }
  if (mode === 'improve') {
    ctx.resumeText = str(args, 'resume_text', 'resumeText')
    ctx.feedback = str(args, 'feedback')
  }
  return ctx
}

/**
 * Prefer non-empty string values from `primary` when `secondary` is empty
 * (some hosts strip fields from toolOutput but keep them in toolInput).
 */
function mergeResumeInitRecords(
  secondary: Record<string, unknown> | null,
  primary: Record<string, unknown> | null,
): Record<string, unknown> | null {
  if (!secondary && !primary) {
    return null
  }
  const s = secondary ?? {}
  const p = primary ?? {}
  const keys = Object.keys(s).concat(Object.keys(p))
  const seen: Record<string, boolean> = {}
  const out: Record<string, unknown> = {}
  for (const k of keys) {
    if (seen[k]) {
      continue
    }
    seen[k] = true
    const pv = p[k]
    const sv = s[k]
    const pStr = typeof pv === 'string' ? pv.trim() : ''
    const sStr = typeof sv === 'string' ? sv.trim() : ''
    if (pStr !== '') {
      out[k] = pv
    } else if (sStr !== '') {
      out[k] = sv
    } else if (pv !== undefined && pv !== null) {
      out[k] = pv
    } else if (sv !== undefined) {
      out[k] = sv
    }
  }
  return Object.keys(out).length ? out : null
}

export function mergeToolOutputAndInput(
  toolOutput: unknown,
  toolInput: unknown,
): Record<string, unknown> | null {
  let fromOut: Record<string, unknown> | null = null
  if (toolOutput && typeof toolOutput === 'object') {
    fromOut =
      unwrapResumeInitPayload(toolOutput) ??
      (typeof (toolOutput as { mode?: unknown }).mode === 'string'
        ? { ...(toolOutput as Record<string, unknown>) }
        : null)
  }

  let fromIn: Record<string, unknown> | null = null
  if (toolInput && typeof toolInput === 'object') {
    fromIn = toolInputArgsToResumeInit(toolInput as Record<string, unknown>)
  }

  if (fromOut && fromIn) {
    return mergeResumeInitRecords(fromOut, fromIn)
  }
  return fromOut ?? fromIn
}
