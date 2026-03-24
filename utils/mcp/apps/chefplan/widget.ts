import { mcpPublicAssetUrl } from '@/utils/mcp/core/mcp-asset-url'
import type { MealPlan } from './types'

export function chefplanWidgetHTML(baseUrl: string, plan?: MealPlan): string {
  const stylesUrl = mcpPublicAssetUrl(baseUrl, '/mcp/chefplan-styles.css')
  const bundleUrl = mcpPublicAssetUrl(baseUrl, '/mcp/chefplan.bundle.js')
  // Encode plan data as base64 to safely embed in data attribute (avoids CSP issues with inline scripts)
  const planDataAttr = plan
    ? ` data-plan="${Buffer.from(JSON.stringify(plan)).toString('base64')}"`
    : ''
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ChefPlan - Meal Planner</title>
  <link rel="stylesheet" href="${stylesUrl}" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --cp-white: #ffffff;
      --cp-green-50: #f0fdf4;
      --cp-green-100: #dcfce7;
      --cp-green-200: #bbf7d0;
      --cp-green-400: #4ade80;
      --cp-green-500: #22c55e;
      --cp-green-600: #16a34a;
      --cp-green-700: #15803d;
      --cp-orange-50: #fff7ed;
      --cp-orange-100: #ffedd5;
      --cp-orange-400: #fb923c;
      --cp-orange-500: #f97316;
      --cp-orange-600: #ea580c;
      --cp-gray-50: #f9fafb;
      --cp-gray-100: #f3f4f6;
      --cp-gray-200: #e5e7eb;
      --cp-gray-300: #d1d5db;
      --cp-gray-400: #9ca3af;
      --cp-gray-500: #6b7280;
      --cp-gray-600: #4b5563;
      --cp-gray-700: #374151;
      --cp-gray-800: #1f2937;
      --cp-gray-900: #111827;

      --cp-glass-bg: rgba(255, 255, 255, 0.7);
      --cp-glass-border: rgba(255, 255, 255, 0.3);
      --cp-glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
      --cp-blur: 12px;
    }

    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, var(--cp-green-50) 0%, var(--cp-white) 50%, var(--cp-orange-50) 100%);
      color: var(--cp-gray-800);
      min-height: 100vh;
      line-height: 1.5;
    }

    #chefplan-widget-root {
      min-height: 100vh;
      padding: 1rem;
    }

    /* Glassmorphism utilities */
    .glass {
      background: var(--cp-glass-bg);
      backdrop-filter: blur(var(--cp-blur));
      -webkit-backdrop-filter: blur(var(--cp-blur));
      border: 1px solid var(--cp-glass-border);
      box-shadow: var(--cp-glass-shadow);
    }

    .glass-dark {
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(var(--cp-blur));
      -webkit-backdrop-filter: blur(var(--cp-blur));
    }

    /* Scrollbar styling */
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: var(--cp-gray-300);
      border-radius: 3px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: var(--cp-gray-400);
    }
  </style>
</head>
<body>
  <div id="chefplan-widget-root"${planDataAttr}></div>
  <script type="module" src="${bundleUrl}"></script>
</body>
</html>`
}
