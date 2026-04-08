/**
 * Tool handlers registry per app.
 * Add new app handlers here when creating a new MCP app.
 */

import type { McpAppConfig } from './registry'
import { getResumeToolHandlers } from '@/utils/mcp/apps/resume/tools'
import { getLangcoachToolHandlers } from '@/utils/mcp/apps/langcoach/tools'
import { getNutriToolHandlers } from '@/utils/mcp/apps/nutri/tools'
import { getMoviepickToolHandlers } from '@/utils/mcp/apps/moviepick/tools'
import { getGamepickToolHandlers } from '@/utils/mcp/apps/gamepick/tools'

export type ToolHandler = (
  app: McpAppConfig,
  args: Record<string, unknown>,
  userId: string,
) => Promise<Record<string, unknown>>

type HandlersMap = Record<string, ToolHandler>

const handlerRegistry: Record<string, () => HandlersMap> = {
  resume: () => getResumeToolHandlers(),
  langcoach: () => getLangcoachToolHandlers(),
  chefplan2: () => getNutriToolHandlers(),
  moviepick: () => getMoviepickToolHandlers(),
  gamepick: () => getGamepickToolHandlers(),
}

export function getToolHandlers(appId: string): HandlersMap | null {
  const loader = handlerRegistry[appId]
  return loader ? loader() : null
}

import { resumeWidgetHTML } from '@/utils/mcp/apps/resume/widget'
import { langcoachWidgetHTML } from '@/utils/mcp/apps/langcoach/widget'
import { nutriWidgetHTML } from '@/utils/mcp/apps/nutri/widget'
import { moviepickWidgetHTML } from '@/utils/mcp/apps/moviepick/widget'
import { gamepickWidgetHTML } from '@/utils/mcp/apps/gamepick/widget'

export function getWidgetHtml(app: McpAppConfig, baseUrl: string): string {
  if (app.id === 'resume') {
    return resumeWidgetHTML(baseUrl)
  }
  if (app.id === 'langcoach') {
    return langcoachWidgetHTML(baseUrl)
  }
  if (app.id === 'chefplan2') {
    return nutriWidgetHTML(baseUrl)
  }
  if (app.id === 'moviepick') {
    return moviepickWidgetHTML(baseUrl)
  }
  if (app.id === 'gamepick') {
    return gamepickWidgetHTML(baseUrl)
  }
  return `<!DOCTYPE html><html><body><p>Widget for ${app.name}</p></body></html>`
}
