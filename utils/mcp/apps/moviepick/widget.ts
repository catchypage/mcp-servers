import { mcpPublicAssetUrl } from '@/utils/mcp/core/mcp-asset-url'

export function moviepickWidgetHTML(baseUrl: string): string {
  const stylesUrl = mcpPublicAssetUrl(baseUrl, '/mcp/moviepick-styles.css')
  const bundleUrl = mcpPublicAssetUrl(baseUrl, '/mcp/moviepick.bundle.js')
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MoviePick</title>
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
    body { background: #0f172a; color: #e2e8f0; }
    #moviepick-root {
      width: 100% !important;
      height: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
    }
  </style>
</head>
<body>
  <div id="moviepick-root"></div>
  <script type="module" src="${bundleUrl}"></script>
</body>
</html>`
}
