# MCP Hub

## Виджет в ChatGPT (`openai/outputTemplate`)

Ответ **`tools/call`** для публичных тулов должен содержать **`_meta['openai/outputTemplate']`** = полный HTTPS URL ресурса виджета (`…/api/mcp/<appId>/widget`). Хост подгружает HTML через **`resources/read`**; mime **`text/html+skybridge`** (как в authorization-app). Встроенный HTML в **`_meta.ui.widget`** для коннектора не используем. Внутренние тулы (`get_user_info`, …) — без `outputTemplate`, чтобы не перезапускать iframe.

---

## Lang Coach (`langcoach`)

Тестовый/базовый апп для тренировок английского: один публичный тул `open_lang_coach`, виджет-заглушка, `get_user_info` для аккаунта. **Коннектор:** `https://<домен>/api/mcp/langcoach`.

Тексты для каталога и ревью OpenAI: **[../langcoach/](../langcoach/)**. Шаблон для новых аппов: **[MCP_NEW_APP_SCAFFOLD.md](./MCP_NEW_APP_SCAFFOLD.md)**.

---

## Что делает Resume app

**Resume** — тестовое MCP-приложение для проверки архитектуры. В ChatGPT доступны инструменты:

- **create_resume** — создание резюме по job_title, experience, skills
- **improve_resume** — улучшение текста резюме по feedback
- **get_user_info** — внутренний (для виджета), скрыт от GPT

Сейчас логика минимальная (без LLM). Для продакшена нужно подключить LLM в `utils/mcp/apps/resume/tools.ts`.

---

## Что ещё нужно сделать

1. **Миграция БД** — выполнить `supabase/migrations/20250312000001_mcp_oauth_tables.sql`
2. **`TUNNEL_URL`** — fallback, если запрос идёт на **localhost** (метаданные/редиректы без публичного Host). Когда коннектор открыт по **реальному хосту Pinggy** (`Host` / `X-Forwarded-Host`), issuer и audience JWT берутся **с этого хоста**, чтобы совпадало с URL в ChatGPT. Дефолт туннеля: `utils/constants.ts`. Свой Pinggy — задай `TUNNEL_URL` или просто ходи на приложение по выданному туннелю.
3. **MCP_DOMAIN_MAP** — для мульти-доменов (см. ниже)

---

## Мульти-домены

Один бэкенд обслуживает несколько MCP-приложений на разных доменах.

### Вариант 1: Path-based (один домен)

```
pyxl.pro/api/mcp/resume   → Resume app
pyxl.pro/api/mcp/humanize → Humanize app
```

### Вариант 2: Domain-based (разные домены)

```
resume.example.com/api/mcp   → Resume app
humanize.example.com/api/mcp → Humanize app
```

**Настройка:** добавить в `.env`:

```
MCP_DOMAIN_MAP=resume.example.com:resume,humanize.example.com:humanize
```

Или JSON:

```
DOMAIN_MAP={"resume.example.com":"resume","humanize.example.com":"humanize"}
```

### DNS / Vercel

Для каждого домена:

- **Vercel:** Project Settings → Domains → добавить resume.example.com
- **DNS:** CNAME resume.example.com → cname.vercel-dns.com

Все домены указывают на один проект.

---

## Build script

`scripts/build-mcp-clients.cjs` собирает **esbuild** бандлы в `public/mcp/*.bundle.js` и **Tailwind 3** в **`resume-styles.css`**, **`chefplan-styles.css`**, **`langcoach-styles.css`** (по папке `components/mcp/<app>/`). В `widget.ts` подключаются `<link>` на CSS и `<script>` на JS через **`mcpPublicAssetUrl`** → **`?v=MCP_WIDGET_ASSETS_VERSION`** (`utils/mcp/core/mcp-asset-url.ts`). Бамп версии при изменении JS/CSS виджетов. Дополнительный инлайн `<style>` в шелле виджета — без отдельного `v=`.

**Добавить новый app:**

1. Создать `components/mcp/newapp/newapp-entry.tsx`
2. Добавить в массив `components` в скрипте:

```js
{
  name: 'NewApp',
  entry: '../components/mcp/newapp/newapp-entry.tsx',
  output: 'newapp.bundle.js',
},
```

3. Запустить `npm run build:mcp`

**Стили (как в reference):** при необходимости добавить Tailwind-сборку по аналогии с `build-mcp.cjs` в authorization-app.
