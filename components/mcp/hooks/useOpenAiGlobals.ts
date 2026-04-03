'use client'

import { useSyncExternalStore } from 'react'

/**
 * ChatGPT Apps host updates toolInput/toolOutput and dispatches this event.
 * Polling window.openai misses late updates; subscribe like official patterns.
 * @see https://developers.openai.com/apps-sdk/
 */
export const SET_GLOBALS_EVENT_TYPE = 'openai:set_globals'

export class SetGlobalsEvent extends CustomEvent<{
  globals: Record<string, unknown>
}> {
  readonly type = SET_GLOBALS_EVENT_TYPE
}

declare global {
  interface WindowEventMap {
    [SET_GLOBALS_EVENT_TYPE]: SetGlobalsEvent
  }
}

type OpenAiGlobalKey = 'toolInput' | 'toolOutput'

function subscribeToOpenAiKey(
  key: OpenAiGlobalKey,
  onChange: () => void,
): () => void {
  const handleSetGlobal = (event: SetGlobalsEvent) => {
    const g = event.detail?.globals
    if (!g || !(key in g)) {
      return
    }
    onChange()
  }
  window.addEventListener(SET_GLOBALS_EVENT_TYPE, handleSetGlobal, {
    passive: true,
  })
  return () => {
    window.removeEventListener(SET_GLOBALS_EVENT_TYPE, handleSetGlobal)
  }
}

function getOpenAiSnapshot(key: OpenAiGlobalKey): unknown {
  if (!window?.openai) {
    return undefined
  }
  return (window.openai as Record<string, unknown>)[key]
}

export function useToolInput(): Record<string, unknown> | undefined {
  return useSyncExternalStore(
    (onChange) => subscribeToOpenAiKey('toolInput', onChange),
    () => getOpenAiSnapshot('toolInput') as Record<string, unknown> | undefined,
    () => undefined,
  )
}

export function useToolOutput(): unknown {
  return useSyncExternalStore(
    (onChange) => subscribeToOpenAiKey('toolOutput', onChange),
    () => getOpenAiSnapshot('toolOutput'),
    () => undefined,
  )
}
