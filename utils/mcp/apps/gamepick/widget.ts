import { mcpPublicAssetUrl } from '@/utils/mcp/core/mcp-asset-url'

export function gamepickWidgetHTML(baseUrl: string): string {
  const stylesUrl = mcpPublicAssetUrl(baseUrl, '/mcp/gamepick-styles.css')
  const bundleUrl = mcpPublicAssetUrl(baseUrl, '/mcp/gamepick.bundle.js')
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>GamePick</title>
  <link rel="stylesheet" href="${stylesUrl}" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      font-family: system-ui, -apple-system, sans-serif;
    }
    body { background: #09090b; color: #e4e4e7; }
    #gamepick-root {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
    }
  </style>
</head>
<body>
  <div id="gamepick-root"></div>
  <script type="module" src="${bundleUrl}"></script>
</body>
</html>`
}
