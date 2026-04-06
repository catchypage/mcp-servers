import { useState, useEffect } from 'react'

interface ToolPayload {
  mode?: string
  [key: string]: unknown
}

interface ParseResult {
  payload: ToolPayload | null
  recognized: boolean
}

function unwrapPayload(raw: unknown): ParseResult {
  if (!raw || typeof raw !== 'object') {
    return { payload: null, recognized: false }
  }
  const o = raw as Record<string, unknown>
  if (o.mode === 'search' || o.mode === 'results' || o.mode === 'detail') {
    return { payload: o as ToolPayload, recognized: true }
  }
  const next = o.structuredContent ?? o.result ?? o.data ?? o.payload
  if (next && typeof next === 'object') {
    return unwrapPayload(next)
  }
  return { payload: null, recognized: false }
}

export function useToolData(): { data: ToolPayload | null; ready: boolean } {
  const [data, setData] = useState<ToolPayload | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false

    const tryResolve = async () => {
      for (let attempt = 0; attempt < 30; attempt++) {
        if (cancelled) {
          return
        }

        const w = (window as { openai?: Record<string, unknown> }).openai
        if (w) {
          const fromOutput = unwrapPayload(w.toolOutput)
          if (fromOutput.recognized) {
            setData(fromOutput.payload)
            setReady(true)
            return
          }
          const fromResult = unwrapPayload(w.toolResult)
          if (fromResult.recognized) {
            setData(fromResult.payload)
            setReady(true)
            return
          }
          if (typeof w.getToolResult === 'function') {
            try {
              const gr = await (w.getToolResult as () => Promise<unknown>)()
              const parsed = unwrapPayload(gr)
              if (parsed.recognized) {
                setData(parsed.payload)
                setReady(true)
                return
              }
            } catch {
              /* host may not support */
            }
          }
        }
        await new Promise((r) => setTimeout(r, 100))
      }
      if (!cancelled) {
        setReady(true)
      }
    }

    const handleGlobals = () => {
      const w = (window as { openai?: Record<string, unknown> }).openai
      if (!w) {
        return
      }
      const parsed = unwrapPayload(w.toolOutput)
      if (parsed.recognized) {
        setData(parsed.payload)
        setReady(true)
      }
    }

    window.addEventListener('openai:set_globals', handleGlobals)
    void tryResolve()

    return () => {
      cancelled = true
      window.removeEventListener('openai:set_globals', handleGlobals)
    }
  }, [])

  return { data, ready }
}
