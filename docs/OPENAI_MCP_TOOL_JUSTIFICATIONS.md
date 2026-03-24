# OpenAI MCP Tool Justifications — mcp-servers (multi-app)

Copy the sections below when submitting each app to OpenAI. Format: Read Only, Open World, Destructive, plus CSP metadata as implemented in `resources/read`.

**MCP routes:** `POST /api/mcp/{appId}` (JSON-RPC). Widget template URI: `https://<your-origin>/api/mcp/<appId>/widget`.

---

## CSP metadata (all apps, widget resource)

Returned on `resources/read` in `_meta['openai/widgetCSP']` (see `utils/mcp/core/router.ts`). Replace `<origin>` with your deployed `https://` base (same value as `openai/widgetDomain`).

```
connect_domains: <origin>
resource_domains: <origin>
```

Add extra origins here if the widget loads scripts, fonts, or APIs from other hosts (CDN, Supabase, etc.).

---

## 1. Resume Builder (`resume`)

**URL pattern:** `https://<origin>/api/mcp/resume`

### create_resume

**Read Only:** No — Opens the interactive builder and returns structured defaults; entry-style tool.

**Open World:** Yes — Accepts open-ended user text (job title, experience, skills) and style choice.

**Destructive:** No — Does not delete or overwrite stored account data by itself.

### improve_resume

**Read Only:** No — Produces modified resume text from user input (transform/generate).

**Open World:** Yes — Arbitrary resume text and feedback strings.

**Destructive:** No — No deletion of user records.

### get_user_info (internal, `openai/hidden`)

**Read Only:** Yes — Reads profile fields for the widget only.

**Open World:** Yes — User-specific account data.

**Destructive:** No.

---

## 2. ChefPlan Meal Planner (`chefplan`)

**URL pattern:** `https://<origin>/api/mcp/chefplan`

### generate_weekly_plan

**Read Only:** No — Creates a new in-memory meal plan and shopping list snapshot.

**Open World:** Yes — User preferences, allergies, budget, and goals vary widely.

**Destructive:** No — Additive session data; does not delete user account data.

### get_recipe_details

**Read Only:** Yes — Reads meal/recipe detail for a plan the user already has.

**Open World:** Yes — User-specific plan and meal identifiers and content.

**Destructive:** No.

### swap_meal

**Read Only:** No — May replace a meal when `replace_with` is set; otherwise returns candidates only.

**Open World:** Yes — Operates on user-specific plans and external recipe APIs for suggestions.

**Destructive:** No — Updates a meal slot; does not delete the whole plan.

### update_plan_constraints

**Read Only:** No — Updates constraints on an existing plan.

**Open World:** Yes — User-edited preferences on their plan.

**Destructive:** No — Metadata update only for the session plan.

### build_shopping_list

**Read Only:** Yes — Returns the shopping list already attached to the plan (no mutation).

**Open World:** Yes — User-specific plan data.

**Destructive:** No.

### create_order_link

**Read Only:** Yes — Returns a provider deeplink string; does not place an order server-side.

**Open World:** Yes — Links target third-party grocery surfaces (Instacart, Amazon Fresh, Walmart).

**Destructive:** No.

### get_user_info (internal, `openai/hidden`)

**Read Only:** Yes — Profile read for widget personalization.

**Open World:** Yes — User-specific account data.

**Destructive:** No.

---

## 3. Lang Coach (`langcoach`)

**URL pattern:** `https://<origin>/api/mcp/langcoach`

### open_lang_coach

**Read Only:** No — Entry tool that loads the practice widget and returns session context (e.g. topic), same class as `open_diagram_app`.

**Open World:** Yes — Optional topic and user-specific session.

**Destructive:** No.

### get_user_info (internal, `openai/hidden`)

**Read Only:** Yes — Profile read for the widget.

**Open World:** Yes — User-specific account data.

**Destructive:** No.

---

## Summary table

| App       | Public tools                                                                 | Read-only (hint)                                      | Write / transform (hint)                          | Destructive (hint) |
| --------- | ---------------------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------- | ------------------ |
| resume    | create_resume, improve_resume                                                | —                                                     | create_resume, improve_resume                     | —                  |
| chefplan  | generate_weekly_plan, get_recipe_details, swap_meal, update_plan_constraints, build_shopping_list, create_order_link | get_recipe_details, build_shopping_list, create_order_link | generate_weekly_plan, swap_meal, update_plan_constraints | —                  |
| langcoach | open_lang_coach                                                              | —                                                     | open_lang_coach                                   | —                  |

Internal tools (`get_user_info` where marked hidden) are read-only and non-destructive in all apps.

---

## Annotation mapping (MCP `annotations`)

| Hint              | Meaning in this codebase                                                                 |
| ----------------- | ---------------------------------------------------------------------------------------- |
| `readOnlyHint`    | `true` if the tool does not mutate app/domain state (reads, pure returns, deeplink only). |
| `destructiveHint` | `true` only for tools that delete or irreversibly remove user data (none in these apps).  |
| `openWorldHint`   | `true` when inputs or outputs are user-specific or open-ended (aligned with Blocks pattern for user-scoped reads). |
| `idempotentHint`  | `true` when repeated calls with the same args should be safe (reads and idempotent reads). |
