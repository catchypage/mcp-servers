/**
 * Bump this when any MCP widget JS changes or when you add/change shared
 * static assets under /public/mcp/ (e.g. CSS linked via mcpPublicAssetUrl).
 * One value for all MCP apps.
 */
export const MCP_WIDGET_ASSETS_VERSION = '32'

export function getMcpWidgetAssetVersion(): string {
  return MCP_WIDGET_ASSETS_VERSION
}

/**
 * Absolute URL for a file under /public/mcp with ?v= cache-buster.
 * Use for script src and link rel="stylesheet" href. Inline <style> blocks in
 * widget HTML do not use this (they ship with the HTML — no separate URL).
 */
export function mcpPublicAssetUrl(baseUrl: string, pathname: string): string {
  const base = baseUrl.replace(/\/$/, '')
  const p = pathname.startsWith('/') ? pathname : `/${pathname}`
  const v = encodeURIComponent(getMcpWidgetAssetVersion())
  return `${base}${p}?v=${v}`
}
