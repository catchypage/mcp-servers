# MoviePick — docs

| File | Use |
|------|-----|
| [APP_DIRECTORY_COPY.txt](./APP_DIRECTORY_COPY.txt) | Catalog copy: description, example prompt, release notes, URLs |
| [TOOL_JUSTIFICATIONS.txt](./TOOL_JUSTIFICATIONS.txt) | Tool annotations + CSP notes (OpenAI form) — matches `utils/mcp/apps/moviepick/tools.ts` |
| [MCP_TEST_CASES.txt](./MCP_TEST_CASES.txt) | Positive (5) + negative (3) MCP test cases for submission |
| [OPENAI_REVIEW_TEST_ACCOUNT.txt](./OPENAI_REVIEW_TEST_ACCOUNT.txt) | Reviewer login (N/A — no auth) |

Shared MCP hub: [../mcp/README.md](../mcp/README.md).

**Server:** `utils/mcp/apps/moviepick/tools.ts` (tool `find_movie`, annotations). **Registry:** `utils/mcp/core/registry.ts` (`moviepick`, `skipAuth: true`). **Domain:** `nuova.pro` → `moviepick` (`utils/mcp/core/domain-map.ts`).
