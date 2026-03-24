import { mcpPublicAssetUrl } from '@/utils/mcp/core/mcp-asset-url'

/**
 * Resume widget HTML for MCP resources/read.
 * Embeds React bundle for interactive UI.
 */
export function resumeWidgetHTML(baseUrl: string): string {
  const stylesUrl = mcpPublicAssetUrl(baseUrl, '/mcp/resume-styles.css')
  const bundleUrl = mcpPublicAssetUrl(baseUrl, '/mcp/resume.bundle.js')
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Resume Builder</title>
  <link rel="stylesheet" href="${stylesUrl}" />
  <style>
    html, body { margin: 0; padding: 0; width: 100%; min-height: 100vh; }
    * { box-sizing: border-box; }
    #resume-widget-root { min-height: 100vh; padding: 1rem; }
  </style>
</head>
<body>
  <div id="resume-widget-root"></div>
  <script type="module" src="${bundleUrl}"></script>
</body>
</html>`
}
