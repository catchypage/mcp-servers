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
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
      height: 700px !important;
      min-height: 700px !important;
      max-height: 700px !important;
      overflow: hidden !important;
      font-family: system-ui, -apple-system, sans-serif;
    }
    #resume-widget-root {
      width: 100% !important;
      height: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow-y: auto;
    }
  </style>
</head>
<body>
  <div id="resume-widget-root"></div>
  <script type="module" src="${bundleUrl}"></script>
</body>
</html>`
}
