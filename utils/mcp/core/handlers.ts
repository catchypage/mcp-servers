/**
 * Tool handlers registry per app.
 * Add new app handlers here when creating a new MCP app.
 */

import type { McpAppConfig } from './registry'
import { getResumeToolHandlers } from '@/utils/mcp/apps/resume/tools'
import { getChefplanToolHandlers } from '@/utils/mcp/apps/chefplan/tools'

export type ToolHandler = (
  app: McpAppConfig,
  args: Record<string, unknown>,
  userId: string,
) => Promise<Record<string, unknown>>

type HandlersMap = Record<string, ToolHandler>

const handlerRegistry: Record<string, () => HandlersMap> = {
  resume: () => getResumeToolHandlers(),
  chefplan: () => getChefplanToolHandlers(),
}

export function getToolHandlers(appId: string): HandlersMap | null {
  const loader = handlerRegistry[appId]
  return loader ? loader() : null
}

import { resumeWidgetHTML } from '@/utils/mcp/apps/resume/widget'
import { chefplanWidgetHTML } from '@/utils/mcp/apps/chefplan/widget'

export function getWidgetHtml(app: McpAppConfig, baseUrl: string): string {
  if (app.id === 'resume') {
    return resumeWidgetHTML(baseUrl)
  }
  if (app.id === 'chefplan') {
    return chefplanWidgetHTML(baseUrl)
  }
  return `<!DOCTYPE html><html><body><p>Widget for ${app.name}</p></body></html>`
}
