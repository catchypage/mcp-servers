import { mcpPublicAssetUrl } from '@/utils/mcp/core/mcp-asset-url'

/**
 * Lang Coach widget HTML for MCP resources/read and tools/call widget meta.
 */
export function langcoachWidgetHTML(baseUrl: string): string {
  const stylesUrl = mcpPublicAssetUrl(baseUrl, '/mcp/langcoach-styles.css')
  const bundleUrl = mcpPublicAssetUrl(baseUrl, '/mcp/langcoach.bundle.js')
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Lang Coach</title>
  <link rel="stylesheet" href="${stylesUrl}" />
  <style>
    html, body { margin: 0; padding: 0; width: 100%; min-height: 100vh; }
    * { box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; background: #0f1419; color: #e7e9ea; }
    #langcoach-widget-root { min-height: 100vh; }
  </style>
</head>
<body>
  <div id="langcoach-widget-root"></div>
  <script type="module" src="${bundleUrl}"></script>
</body>
</html>`
}
