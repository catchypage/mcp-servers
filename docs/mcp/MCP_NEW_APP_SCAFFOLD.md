# MCP new app scaffold (for agents)

Paste this file into an agent when you want a **new empty MCP app** in this repo. The **reference minimal implementation** is **`langcoach`** (`utils/mcp/apps/langcoach/`, `components/mcp/langcoach/`).

## What you get

- **Connector URL:** `https://<your-domain>/api/mcp/<appId>` (example: `langcoach` → `/api/mcp/langcoach`)
- **OAuth:** shared `/api/mcp/oauth/*` (no new routes)
- **One public tool** + **`get_user_info`** internal (hidden from GPT, for widget / account)
- **Widget:** HTML shell + React bundle in `public/mcp/<appId>.bundle.js`

## Naming

- **`appId`:** lowercase, no spaces, ASCII (e.g. `langcoach`, `vocabdrill`). Used in URLs and registry keys.
- **Display name:** human-readable in `McpAppConfig.name`.

## Checklist (copy when creating `<appId>`)

Replace `<appId>`, `<AppPascal>`, `<app-file>` (`langcoach` → your id, `LangCoach` → your component prefix).

### 1. Tools + handlers

Create `utils/mcp/apps/<appId>/tools.ts`:

- Export `<appId>Tools` — array of `McpToolDefinition` (at least one public tool).
- Export `<appId>InternalTools` — include **`get_user_info`** with `_meta: { 'openai/hidden': true }` (copy from `langcoach/tools.ts`).
- Implement handlers; public tool result must include **`message`** (string) — MCP router uses it as assistant-visible text.
- Export **`get<AppPascal>ToolHandlers()`** → `Record<string, ToolHandler>`.

### 2. Widget HTML

Create `utils/mcp/apps/<appId>/widget.ts`:

- Export **`<appId>WidgetHTML(baseUrl: string)`** returning HTML with a single root div **`#<appId>-widget-root`** (hyphenated id matching the bundle entry).
- **`<link href="…-styles.css">`** and **`<script src="…bundle.js">`**: always **`mcpPublicAssetUrl(baseUrl, '/mcp/…')`** from `@/utils/mcp/core/mcp-asset-url` (shared **`MCP_WIDGET_ASSETS_VERSION`**). Inline **`<style>`** in the shell has no `?v=`.

### 3. Registry

Edit `utils/mcp/core/registry.ts`:

- Import tools/internal tools from `@/utils/mcp/apps/<appId>/tools`.
- Add **`MCP_APPS[<appId>]`** with `id`, `name`, `description`, `version`, `tools`, `internalTools`, `widget: '/mcp/<appId>.bundle.js'`, `resources` (uri `/api/mcp/<appId>/widget`, …).
- Optional: add **`APP_DOMAINS[<appId>]`** for documentation.

### 4. Handler registry + widget branch

Edit `utils/mcp/core/handlers.ts`:

- Import **`get<AppPascal>ToolHandlers`** and **`<appId>WidgetHTML`**.
- Add **`handlerRegistry[<appId>]`**.
- In **`getWidgetHtml`**, add **`if (app.id === '<appId>')`** returning **`<appId>WidgetHTML(baseUrl)`** (pass `toolResult` if the widget needs tool output — see `chefplan`).

### 5. React client bundle

- `components/mcp/<appId>/<appId>-entry.tsx` — mount root on `#<appId>-widget-root` (copy `langcoach/langcoach-entry.tsx`).
- `components/mcp/<appId>/<AppPascal>Widget.tsx` — placeholder UI (`'use client'` if using hooks).

### 6. Build script

Edit `scripts/build-mcp-clients.cjs` — append to **`components`** array (Tailwind scans `components/mcp/<appId>/` for utilities):

```js
{
  name: '<AppPascal>',
  entry: '../components/mcp/<appId>/<appId>-entry.tsx',
  output: '<appId>.bundle.js',
  stylesCss: '<appId>-styles.css',
  tailwindContent: './components/mcp/<appId>/**/*.{tsx,ts}',
},
```

In **`widget.ts`**: `<link rel="stylesheet" href="${mcpPublicAssetUrl(baseUrl, '/mcp/<appId>-styles.css')}" />` before the shell `<style>` block.

### 7. Verify

- Run **`npm run build:mcp`** locally (skipped on `CI=true` / `VERCEL=1`).
- GET **`/api/mcp/<appId>`** should return JSON with `endpoints.mcp` and `endpoints.widget`.
- ChatGPT connector: **MCP URL** = `https://<domain>/api/mcp/<appId>` (Developer mode → Connectors).

## Do not duplicate

- **No new** `app/api/mcp/<appId>/route.ts` — dynamic **`app/api/mcp/[appId]/route.ts`** handles all apps.
- **No new OAuth routes** unless product requirements change.

## Optional next steps

- Rich tools: add `_meta['openai/outputTemplate']` like `chefplan` if needed.
- **DB:** new tables only when the app needs its own data; **`get_user_info`** already uses `users`.

## Lang Coach (live example)

| Item | Value |
|------|--------|
| `appId` | `langcoach` |
| Public tool | `open_lang_coach` |
| Internal | `get_user_info` |
| Files | `utils/mcp/apps/langcoach/*`, `components/mcp/langcoach/*` |
