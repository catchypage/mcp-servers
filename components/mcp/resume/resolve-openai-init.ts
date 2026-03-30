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

/**
 * Map open_resume_builder tool arguments (snake_case) to the same shape as
 * server context — used when window.openai.toolInput is set but toolOutput is
 * late or missing (known host quirks).
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

  if (args.full_name) {
    ctx.fullName = String(args.full_name)
  }
  if (args.job_title) {
    ctx.jobTitle = String(args.job_title)
  }
  if (mode === 'vacancy') {
    ctx.vacancyDescription = String(args.vacancy_description ?? '')
    ctx.vacancyImageUrl = String(args.vacancy_image_url ?? '')
  }
  if (mode === 'improve') {
    ctx.resumeText = String(args.resume_text ?? '')
    ctx.feedback = String(args.feedback ?? '')
  }
  return ctx
}

function mergeToolOutputAndInput(
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
    return { ...fromIn, ...fromOut }
  }
  return fromOut ?? fromIn
}

function readLegacyBridge(w: NonNullable<Window['openai']>): Record<string, unknown> | null {
  const tr = w.toolResult
  if (!tr) {
    return null
  }
  return (
    unwrapResumeInitPayload(tr) ??
    unwrapResumeInitPayload({ structuredContent: tr }) ??
    null
  )
}

/**
 * Collect init payload: official toolOutput + toolInput, legacy helpers, then
 * MCP get_init_context. Retries while host injects globals (local + ChatGPT).
 */
export async function collectResumeInitFromOpenAI(
  callGetInitContext: () => Promise<Record<string, unknown> | null>,
): Promise<Record<string, unknown> | null> {
  const maxAttempts = 25
  const delayMs = 80

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const w = window.openai

    if (w) {
      const merged = mergeToolOutputAndInput(w.toolOutput, w.toolInput)
      if (merged?.mode) {
        return merged
      }

      const legacy = readLegacyBridge(w)
      if (legacy?.mode) {
        return legacy
      }

      if (attempt < 8 && w.getToolResult) {
        try {
          const gr = await w.getToolResult()
          const u = unwrapResumeInitPayload(gr)
          if (u?.mode) {
            return u
          }
        } catch {
          /* host may not support */
        }
      }
    }

    await new Promise((r) => setTimeout(r, delayMs))
  }

  const fromServer = await callGetInitContext()
  if (!fromServer) {
    return null
  }
  return unwrapResumeInitPayload(fromServer) ?? fromServer
}
