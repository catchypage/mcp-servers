/**
 * Resume widget HTML for MCP resources/read.
 * Embeds React bundle for interactive UI.
 */
export function resumeWidgetHTML(baseUrl: string): string {
  const bundleUrl = `${baseUrl}/mcp/resume.bundle.js`
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Resume Builder</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; font-family: system-ui, sans-serif; background: #0a0a0a; color: #fff; min-height: 100vh; }
    #resume-widget-root { min-height: 100vh; padding: 1rem; }
  </style>
</head>
<body>
  <div id="resume-widget-root"></div>
  <script type="module" src="${bundleUrl}"></script>
</body>
</html>`
}
