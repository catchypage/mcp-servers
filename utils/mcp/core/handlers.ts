/**
 * Tool handlers registry per app.
 * Add new app handlers here when creating a new MCP app.
 */

import type { McpAppConfig } from './registry'

export type ToolHandler = (
  app: McpAppConfig,
  args: Record<string, unknown>,
  userId: string
) => Promise<Record<string, unknown>>

type HandlersMap = Record<string, ToolHandler>

const handlerRegistry: Record<string, () => HandlersMap> = {
  resume: () => {
    const { getResumeToolHandlers } = require('@/utils/mcp/apps/resume/tools')
    return getResumeToolHandlers()
  },
  chefplan: () => {
    const { getChefplanToolHandlers } = require('@/utils/mcp/apps/chefplan/tools')
    return getChefplanToolHandlers()
  },
}

export function getToolHandlers(appId: string): HandlersMap | null {
  const loader = handlerRegistry[appId]
  return loader ? loader() : null
}

export function getWidgetHtml(app: McpAppConfig, baseUrl: string): string {
  if (app.id === 'resume') {
    const { resumeWidgetHTML } = require('@/utils/mcp/apps/resume/widget')
    return resumeWidgetHTML(baseUrl)
  }
  if (app.id === 'chefplan') {
    const { chefplanWidgetHTML } = require('@/utils/mcp/apps/chefplan/widget')
    return chefplanWidgetHTML(baseUrl)
  }
  return `<!DOCTYPE html><html><body><p>Widget for ${app.name}</p></body></html>`
}
