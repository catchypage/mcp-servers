/**
 * Tool handlers registry per app.
 * Add new app handlers here when creating a new MCP app.
 */

import type { McpAppConfig } from './registry'
import { getResumeToolHandlers } from '@/utils/mcp/apps/resume/tools'
import { getChefplanToolHandlers } from '@/utils/mcp/apps/chefplan/tools'
import { getLangcoachToolHandlers } from '@/utils/mcp/apps/langcoach/tools'

export type ToolHandler = (
  app: McpAppConfig,
  args: Record<string, unknown>,
  userId: string,
) => Promise<Record<string, unknown>>

type HandlersMap = Record<string, ToolHandler>

const handlerRegistry: Record<string, () => HandlersMap> = {
  resume: () => getResumeToolHandlers(),
  chefplan: () => getChefplanToolHandlers(),
  langcoach: () => getLangcoachToolHandlers(),
}

export function getToolHandlers(appId: string): HandlersMap | null {
  const loader = handlerRegistry[appId]
  return loader ? loader() : null
}

import { resumeWidgetHTML } from '@/utils/mcp/apps/resume/widget'
import { chefplanWidgetHTML } from '@/utils/mcp/apps/chefplan/widget'
import { langcoachWidgetHTML } from '@/utils/mcp/apps/langcoach/widget'
import type { MealPlan } from '@/utils/mcp/apps/chefplan/types'

export function getWidgetHtml(
  app: McpAppConfig,
  baseUrl: string,
  toolResult?: Record<string, unknown>,
): string {
  if (app.id === 'resume') {
    return resumeWidgetHTML(baseUrl)
  }
  if (app.id === 'chefplan') {
    // Pass plan data if available in tool result
    const plan = toolResult?.plan as MealPlan | undefined
    return chefplanWidgetHTML(baseUrl, plan)
  }
  if (app.id === 'langcoach') {
    return langcoachWidgetHTML(baseUrl)
  }
  return `<!DOCTYPE html><html><body><p>Widget for ${app.name}</p></body></html>`
}
