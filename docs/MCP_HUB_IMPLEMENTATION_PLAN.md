# MCP Hub Implementation Plan

## Executive Summary

Build an MCP platform with **one dynamic route** `/api/mcp/[appId]` instead of multiple static routes. One backend, one OAuth, one database, many MCP apps. Adding a new app = 15 minutes.

**First app:** Resume (резюме) — for testing the architecture.

---

## Part 1: Analysis of Reference Implementation (authorization-app)

### Current Structure (authorization-app)

```
api/mcp/
├── route.ts                    # Image generator (legacy single app)
├── fitpro/route.ts             # FitPro MCP - full handler
├── aihumanize/route.ts         # AI Humanize MCP
├── pythonmaster/route.ts      # Python Master MCP
├── alphascope/route.ts        # AlphaScope MCP
├── oauth/
│   ├── authorize/route.ts     # OAuth 2.0 + PKCE (shared)
│   ├── token/route.ts        # Token exchange (shared)
│   ├── callback/route.ts     # Post-login callback (shared)
│   └── register/route.ts    # Client registration
├── fitpro/
│   ├── .well-known/
│   │   ├── oauth-protected-resource/route.ts
│   │   └── oauth-authorization-server/route.ts
│   └── widgets/fitpro/route.ts  # Returns widget HTML
└── aihumanize/
    ├── .well-known/...
    └── widgets/aihumanize/route.ts
```

### Key Patterns from Reference

| Component | How it works |
|-----------|--------------|
| **OAuth flow** | ChatGPT → authorize (PKCE) → login page → callback → token exchange. Token audience = resource URL (`/api/mcp/fitpro`) |
| **Auth** | `verifyMcpToken(req, resourceUrl)` — JWT with audience = `{baseUrl}{resourceUrl}` |
| **Tools** | Each app imports its tools from `utils/mcp/{app}/`. Main tools + internal tools (get_user_info with `_meta: openai/hidden`) |
| **Widgets** | `resources/list` → `resources/read` returns HTML string. Widget HTML embeds React root, loads bundle from `/mcp/{app}.bundle.js` |
| **Build** | `scripts/build-mcp.cjs` — esbuild bundles `components/mcp/{app}/{app}-entry.tsx` → `public/mcp/{app}.bundle.js` |
| **.well-known** | Each app has its own oauth-protected-resource pointing to shared authorization server |

### Differences: Reference vs Our Plan

| Aspect | Reference (authorization-app) | Our Plan (mcp-servers) |
|--------|------------------------------|-------------------------|
| Routes | Static: `/api/mcp/fitpro`, `/api/mcp/aihumanize` | Dynamic: `/api/mcp/[appId]` |
| Registry | None — each route is separate file | `MCP_APPS` registry in `lib/mcp/core/registry.ts` |
| OAuth | Under `/api/mcp/oauth/` | Under `/api/oauth/` (or `/api/mcp/oauth/`) |
| .well-known | Per-app folder | Dynamic: `/api/mcp/[appId]/.well-known/...` |
| Token audience | `{baseUrl}/api/mcp/fitpro` | `{baseUrl}/api/mcp/{appId}` |

---

## Part 2: Architecture for mcp-servers

### Target Structure

```
mcp-servers/
├── app/
│   └── api/
│       ├── mcp/
│       │   └── [appId]/
│       │       ├── route.ts              # Single MCP handler (dynamic)
│       │       └── .well-known/
│       │           ├── oauth-protected-resource/route.ts
│       │           └── oauth-authorization-server/route.ts
│       └── oauth/
│           ├── authorize/route.ts        # MCP OAuth (PKCE)
│           ├── token/route.ts           # MCP token (adapt existing)
│           └── callback/route.ts        # MCP callback
├── lib/
│   └── mcp/
│       ├── core/
│       │   ├── registry.ts               # MCP_APPS config
│       │   ├── router.ts                # handleMcpRequest, resolveApp
│       │   ├── auth.ts                  # verifyMcpToken, getWwwAuthenticateHeader
│       │   ├── response.ts              # buildManifest, buildToolResponse
│       │   └── getBaseUrl.ts            # Base URL / tunnel
│       └── apps/
│           └── resume/
│               ├── tools.ts             # Tool definitions + handlers
│               └── widget.ts            # Widget HTML (optional)
├── components/
│   └── mcp/
│       └── resume/
│           ├── resume-entry.tsx         # Widget entry
│           └── ResumeWidget.tsx
├── public/
│   └── mcp/
│       └── resume.bundle.js             # Built by script
├── scripts/
│   └── build-mcp-clients.cjs
└── docs/
```

---

## Part 3: Implementation Phases

### PHASE 1: OAuth for MCP (Authorization Layer)

**Goal:** ChatGPT can authenticate via OAuth 2.0 + PKCE. Token audience = resource URL.

**Tasks:**

1. **Database tables** (Supabase migrations or manual):
   - `mcp_oauth_codes` — code, client_id, user_id, redirect_uri, scope, code_challenge, code_challenge_method, resource, state, expires_at
   - `mcp_oauth_states` — id, client_id, redirect_uri, state, code_challenge, code_challenge_method, resource, expires_at

2. **OAuth routes** (adapt from authorization-app):
   - `app/api/oauth/authorize/route.ts` — GET, validate PKCE, redirect to login if not authenticated, store state, redirect to `/oauth?oauth_state=...` or similar
   - `app/api/oauth/callback/route.ts` — GET, after NextAuth login, exchange oauth_state for auth code, redirect to ChatGPT
   - `app/api/oauth/token/route.ts` — POST, exchange code for JWT. **Important:** audience = `resource` from code (e.g. `{baseUrl}/api/mcp/resume`)

3. **Auth options** — ensure `auth_id` / `email` mapping to `users` table (already exists in mcp-servers).

4. **Login page for MCP** — when user not logged in, redirect to `/oauth/mcp?oauth_state=...` (or reuse existing sign-in with oauth_state in URL).

**Note:** Current mcp-servers OAuth (`/api/oauth/callback`, `/api/oauth/token`) is for GPT plugin (different flow). We need **separate** MCP OAuth or extend to support both. Recommended: new routes under `/api/mcp/oauth/` to avoid conflicts.

---

### PHASE 2: MCP Core Infrastructure

**Tasks:**

1. **`lib/mcp/core/getBaseUrl.ts`**
   - Return `TUNNEL_URL` if localhost, else `NEXT_PUBLIC_SITE_URL`

2. **`lib/mcp/core/auth.ts`**
   - `verifyMcpToken(req, resourceUrl)` — JWT verify, audience = `{baseUrl}{resourceUrl}`
   - `getWwwAuthenticateHeader(resourceUrl, error?, errorDescription?)` — for 401 responses

3. **`lib/mcp/core/registry.ts`**
   ```ts
   export type McpAppConfig = {
     id: string
     name: string
     description?: string
     tools: Record<string, McpToolDefinition>
     widget?: string  // e.g. '/mcp/resume.bundle.js'
     resources?: { uri: string; name: string; description?: string }[]
   }
   export const MCP_APPS: Record<string, McpAppConfig> = { ... }
   ```

4. **`lib/mcp/core/router.ts`**
   - `resolveApp(appId)` — get from registry
   - `handleMcpRequest(app, req)` — switch on method (initialize, tools/list, tools/call, resources/list, resources/read)

5. **`lib/mcp/core/response.ts`**
   - Helpers for JSON-RPC responses (optional, can inline)

---

### PHASE 3: Dynamic MCP Route

**Tasks:**

1. **`app/api/mcp/[appId]/route.ts`**
   - GET: return server info
   - POST: parse JSON-RPC body
   - Resolve app from registry by `params.appId`
   - If not found → 404
   - Call `handleMcpRequest(app, req)` with resourceUrl = `/api/mcp/${appId}`

2. **`app/api/mcp/[appId]/.well-known/oauth-protected-resource/route.ts`**
   - Dynamic: use `params.appId` to build resource URL
   - Return `{ resource, authorization_servers, scopes_supported }`

3. **`app/api/mcp/[appId]/.well-known/oauth-authorization-server/route.ts`**
   - Return shared metadata (authorize, token endpoints)

**Next.js routing:** `.well-known` under `[appId]` = `app/api/mcp/[appId]/.well-known/oauth-protected-resource/route.ts`

---

### PHASE 4: Resume MCP App (First App)

**Tasks:**

1. **`lib/mcp/apps/resume/tools.ts`**
   - Define tools: e.g. `create_resume`, `improve_resume`, `get_user_info` (internal)
   - Handlers call services / LLM as needed

2. **`lib/mcp/apps/resume/widget.ts`** (optional)
   - `resumeWidgetHTML(baseUrl)` — HTML with root div, script src=`/mcp/resume.bundle.js`

3. **Registry entry**
   ```ts
   resume: {
     id: 'resume',
     name: 'Resume Builder',
     tools: resumeTools,
     widget: '/mcp/resume.bundle.js',
     resources: [{ uri: '...', name: 'Resume Widget', ... }]
   }
   ```

4. **Router** — when `tools/call` for resume, dispatch to `lib/mcp/apps/resume/tools` handlers

---

### PHASE 5: Widget Build System

**Tasks:**

1. **`scripts/build-mcp-clients.cjs`**
   - Scan `components/mcp/*/` for `*-entry.tsx`
   - For each: esbuild → `public/mcp/{appId}.bundle.js`
   - Optional: Tailwind per-component (like reference)

2. **`package.json`**
   - `"build:mcp": "node scripts/build-mcp-clients.cjs"`
   - Add to `prebuild` or run manually before deploy

---

### PHASE 6: OAuth Route Placement

**Decision:** Use `/api/mcp/oauth/` to keep MCP-specific OAuth separate from existing GPT plugin OAuth.

- `app/api/mcp/oauth/authorize/route.ts`
- `app/api/mcp/oauth/token/route.ts`
- `app/api/mcp/oauth/callback/route.ts`

`.well-known/oauth-authorization-server` returns:
- `authorization_endpoint`: `{baseUrl}/api/mcp/oauth/authorize`
- `token_endpoint`: `{baseUrl}/api/mcp/oauth/token`

---

### PHASE 7: Domain Mapping (Optional, Later)

`lib/mcp/core/domain-map.ts` — map `resume.example.com` → appId `resume`. Use in middleware or route to override `appId`.

---

## Part 4: Execution Order

| Step | Phase | Deliverable |
|------|-------|-------------|
| 1 | 1 | DB tables mcp_oauth_codes, mcp_oauth_states |
| 2 | 1 | OAuth authorize, token, callback routes |
| 3 | 1 | MCP login page / redirect flow |
| 4 | 2 | lib/mcp/core/* (auth, registry, router, getBaseUrl) |
| 5 | 3 | app/api/mcp/[appId]/route.ts + .well-known |
| 6 | 4 | Resume app (tools + registry) |
| 7 | 5 | build-mcp-clients.cjs + resume widget (optional) |

---

## Part 5: Resume App Tool Spec (Draft)

For testing, Resume app can have minimal tools:

- `create_resume` — input: job_title, experience, skills → output: resume text
- `improve_resume` — input: resume_text, feedback → output: improved text
- `get_user_info` — internal, for widget

---

## Part 6: Checklist Before Starting

- [ ] Confirm Supabase tables exist or create migrations
- [ ] Confirm NextAuth session provides `user.id` (auth_id) and `user.email`
- [ ] Confirm `users` table has `id`, `auth_id`, `email` (or equivalent)
- [ ] TUNNEL_URL in .env for local ChatGPT testing
- [ ] ChatGPT app configured with: authorization URL, token URL, resource URL = `{baseUrl}/api/mcp/resume`

---

## Setup Instructions

### 1. Run database migration

Apply the migration to create MCP OAuth tables:

```bash
# Via Supabase Dashboard: SQL Editor → paste and run
# Or: supabase db push
```

Migration file: `supabase/migrations/20250312000001_mcp_oauth_tables.sql`

### 2. Environment variables

Add to `.env.local` for local ChatGPT testing:

```
TUNNEL_URL=https://your-ngrok-or-pinggy-url
```

When `NEXT_PUBLIC_SITE_URL=http://localhost:3000`, OAuth redirects use `TUNNEL_URL` so ChatGPT can reach your local server.

### 3. ChatGPT connector setup

- **Server URL:** `https://yourdomain.com/api/mcp/resume` (or tunnel URL for local)
- **OAuth:** ChatGPT will discover endpoints from `/.well-known/oauth-protected-resource`

### 4. Connect Resume app

1. In ChatGPT: Add connector → Custom MCP
2. Server URL: `{baseUrl}/api/mcp/resume`
3. ChatGPT will redirect to OAuth flow
4. Sign in at `/oauth/mcp` with oauth_state
5. After auth, you get tokens and can call tools

---

## References

- [authorization-app MCP structure](z:\develop\image-generator\auth\authorization-app\app\api\mcp)
- [authorization-app auth](z:\develop\image-generator\auth\authorization-app\utils\mcp\auth.ts)
- [authorization-app build script](z:\develop\image-generator\auth\authorization-app\scripts\build-mcp.cjs)
- [OpenAI MCP OAuth spec](https://platform.openai.com/docs/guides/mcp-oauth)
