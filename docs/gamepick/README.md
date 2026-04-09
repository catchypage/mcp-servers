# GamePick (MCP)

**App ID:** `gamepick`  
**Product domain:** [haos.pro](https://haos.pro)  
**Host-mapped MCP:** `POST https://haos.pro/api/mcp`  
**Explicit path:** `POST https://haos.pro/api/mcp/gamepick`

**Server:** `utils/mcp/apps/gamepick/tools.ts` (`find_game`, `browse_top_games`). **Registry:** `utils/mcp/core/registry.ts` (`skipAuth: true`). **Domain map:** `utils/mcp/core/domain-map.ts` (`haos.pro` → `gamepick`).

**Env:** `GAMEPICK_API_KEY` (or legacy fallback used by `catalog-client.ts`).

**OpenAI domain verification:** set `HAOS_PRO_OPENAI_APPS_CHALLENGE_TOKEN` so `GET https://haos.pro/.well-known/openai-apps-challenge` returns the dashboard token.

Submission copy: [APP_DIRECTORY_COPY.txt](./APP_DIRECTORY_COPY.txt) · CSP/annotations: [TOOL_JUSTIFICATIONS.txt](./TOOL_JUSTIFICATIONS.txt) · Tests: [MCP_TEST_CASES.txt](./MCP_TEST_CASES.txt)
