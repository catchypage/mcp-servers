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
    * { box-sizing: border-box; }
    html, body {
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
      height: 600px !important;
      min-height: 600px !important;
      max-height: 600px !important;
      overflow: hidden !important;
    }
    body { font-family: system-ui, sans-serif; background: #0f1419; color: #e7e9ea; }
    #langcoach-widget-root {
      width: 100% !important;
      height: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
    }
  </style>
</head>
<body>
  <div id="langcoach-widget-root"></div>
  <script type="module" src="${bundleUrl}"></script>
</body>
</html>`
}
