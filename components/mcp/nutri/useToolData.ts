import { useState, useEffect } from 'react'
import type { ToolData } from './types'

interface ParseResult {
  data: ToolData | null
  recognized: boolean
}

function unwrapPayload(raw: unknown): ParseResult {
  if (!raw || typeof raw !== 'object') {
    return { data: null, recognized: false }
  }
  const o = raw as Record<string, unknown>
  if (o.mode === 'metabolism' || o.mode === 'recipe') {
    return { data: o as unknown as ToolData, recognized: true }
  }
  if (o.mode === 'form') {
    return { data: null, recognized: true }
  }
  const next = o.structuredContent ?? o.result ?? o.data ?? o.payload
  if (next && typeof next === 'object') {
    return unwrapPayload(next)
  }
  return { data: null, recognized: false }
}

/**
 * Polls window.openai for tool output and listens to openai:set_globals.
 * Returns parsed ToolData or null if nothing arrived within timeout.
 */
export function useToolData(): { data: ToolData | null; ready: boolean } {
  const [data, setData] = useState<ToolData | null>(null)
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
            setData(fromOutput.data)
            setReady(true)
            return
          }

          const fromResult = unwrapPayload(w.toolResult)
          if (fromResult.recognized) {
            setData(fromResult.data)
            setReady(true)
            return
          }

          if (typeof w.getToolResult === 'function') {
            try {
              const gr = await (w.getToolResult as () => Promise<unknown>)()
              const parsed = unwrapPayload(gr)
              if (parsed.recognized) {
                setData(parsed.data)
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
        setData(parsed.data)
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
