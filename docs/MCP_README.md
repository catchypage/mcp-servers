# MCP Hub

## Что делает Resume app

**Resume** — тестовое MCP-приложение для проверки архитектуры. В ChatGPT доступны инструменты:

- **create_resume** — создание резюме по job_title, experience, skills
- **improve_resume** — улучшение текста резюме по feedback
- **get_user_info** — внутренний (для виджета), скрыт от GPT

Сейчас логика минимальная (без LLM). Для продакшена нужно подключить LLM в `utils/mcp/apps/resume/tools.ts`.

---

## Что ещё нужно сделать

1. **Миграция БД** — выполнить `supabase/migrations/20250312000001_mcp_oauth_tables.sql`
2. **TUNNEL_URL** — для локального теста с ChatGPT
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

`scripts/build-mcp-clients.cjs` собирает React-виджеты в `public/mcp/*.bundle.js`.

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
