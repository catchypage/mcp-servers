import './openai-types'

function isIntrinsicHeightNotifier(
  v: unknown,
): v is (heightPx: number) => void {
  return typeof v === 'function'
}

/** Report widget content height to the ChatGPT host (when supported). */
export function notifyOpenAiIntrinsicHeight(heightPx: number): void {
  const candidate = window.openai?.notifyIntrinsicHeight
  if (!isIntrinsicHeightNotifier(candidate)) {
    return
  }
  candidate(heightPx)
}
