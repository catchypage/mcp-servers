import type { McpAppConfig, McpToolDefinition } from '@/utils/mcp/core/registry'

/**
 * Available resume styles
 */
export const RESUME_STYLE_IDS = [
  'classic', // Classic Professional - Traditional, clean, formal
  'modern', // Modern Minimal - Clean, whitespace, modern
  'executive', // Executive Dark - Premium dark for senior positions
  'creative', // Creative Bold - Colorful for creative industries
  'terminal', // Tech Terminal - Developer-focused aesthetics
  'sidebar', // Elegant Sidebar - Two-column with sidebar
  'swiss', // Swiss Minimalist - Typography-focused
  'nature', // Nature Organic - Soft earthy tones
] as const

export type ResumeStyleId = (typeof RESUME_STYLE_IDS)[number]

/**
 * Pending context store — when GPT calls open_resume_builder,
 * we stash the mode + data here so the widget can retrieve it
 * via the internal get_init_context callTool.
 */
const pendingContext = new Map<string, Record<string, unknown>>()

/*
 * ═══════════════════════════════════════════════════════════════
 * PUBLIC TOOLS (visible to GPT)
 * ═══════════════════════════════════════════════════════════════
 */

const openResumeBuilderTool: McpToolDefinition = {
  name: 'open_resume_builder',
  title: 'Open Resume Builder',
  description:
    'Open the Resume Builder workspace. Use mode="create" to create a new resume, mode="vacancy" to tailor a resume for a specific job vacancy, or mode="improve" to improve an existing resume. Supports 8 professional styles: Classic, Modern, Executive, Creative, Terminal, Sidebar, Swiss, Nature.',
  inputSchema: {
    type: 'object',
    properties: {
      mode: {
        type: 'string',
        description: 'Widget mode: "create" (default), "vacancy", or "improve"',
        enum: ['create', 'vacancy', 'improve'],
      },
      job_title: { type: 'string', description: 'Target job title' },
      full_name: { type: 'string', description: 'Full name for the resume' },
      style: {
        type: 'string',
        description: 'Resume style',
        enum: RESUME_STYLE_IDS,
      },
      vacancy_description: {
        type: 'string',
        description: 'Job vacancy description (for mode=vacancy)',
      },
      vacancy_image_url: {
        type: 'string',
        description: 'URL to vacancy screenshot (for mode=vacancy)',
      },
      resume_text: {
        type: 'string',
        description: 'Existing resume text (for mode=improve)',
      },
      feedback: {
        type: 'string',
        description: 'Improvement feedback (for mode=improve)',
      },
    },
    required: [],
  },
  annotations: {
    readOnlyHint: false,
    destructiveHint: false,
    openWorldHint: true,
    idempotentHint: false,
  },
  securitySchemes: [{ type: 'oauth2', scopes: ['user:read'] }],
}

/*
 * ═══════════════════════════════════════════════════════════════
 * INTERNAL TOOLS (hidden, called by widget via callTool)
 * ═══════════════════════════════════════════════════════════════
 */

const getInitContextTool: McpToolDefinition = {
  name: 'get_init_context',
  title: 'Get Init Context',
  description:
    'INTERNAL: Widget-only. Returns the mode and data from the last open_resume_builder call.',
  inputSchema: { type: 'object', properties: {}, required: [] },
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    openWorldHint: false,
    idempotentHint: true,
  },
  securitySchemes: [{ type: 'oauth2', scopes: ['user:read'] }],
  _meta: { 'openai/hidden': true },
}

const getUserInfoTool: McpToolDefinition = {
  name: 'get_user_info',
  title: 'Get User Info',
  description:
    'INTERNAL: Only the client widget calls this. GPT must never call. User info for the widget.',
  inputSchema: { type: 'object', properties: {}, required: [] },
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    openWorldHint: true,
    idempotentHint: true,
  },
  securitySchemes: [{ type: 'oauth2', scopes: ['user:read'] }],
  _meta: { 'openai/hidden': true },
}

/*
 * ═══════════════════════════════════════════════════════════════
 * EXPORTS
 * ═══════════════════════════════════════════════════════════════
 */

export const resumeTools: McpToolDefinition[] = [openResumeBuilderTool]

export const resumeInternalTools: McpToolDefinition[] = [
  getInitContextTool,
  getUserInfoTool,
]

/*
 * ═══════════════════════════════════════════════════════════════
 * HANDLERS
 * ═══════════════════════════════════════════════════════════════
 */

export type ToolHandler = (
  app: McpAppConfig,
  args: Record<string, unknown>,
  userId: string,
) => Promise<Record<string, unknown>>

async function handleOpenResumeBuilder(
  _app: McpAppConfig,
  args: Record<string, unknown>,
  userId: string,
): Promise<Record<string, unknown>> {
  const modeRaw = String(args.mode ?? 'create')
    .toLowerCase()
    .trim()
  const mode = ['create', 'vacancy', 'improve'].includes(modeRaw)
    ? modeRaw
    : 'create'
  const jobTitle = String(args.job_title ?? '')
  const fullName = String(args.full_name ?? '')
  const style = String(args.style ?? 'modern')
  const validStyle = RESUME_STYLE_IDS.includes(style as ResumeStyleId)
    ? style
    : 'modern'

  const context: Record<string, unknown> = { mode, style: validStyle }

  if (fullName) {
    context.fullName = fullName
  }
  if (jobTitle) {
    context.jobTitle = jobTitle
  }

  if (mode === 'vacancy') {
    context.vacancyDescription = String(args.vacancy_description ?? '')
    context.vacancyImageUrl = String(args.vacancy_image_url ?? '')
  }

  if (mode === 'improve') {
    context.resumeText = String(args.resume_text ?? '')
    context.feedback = String(args.feedback ?? '')
  }

  // Stash for widget to pick up via get_init_context
  pendingContext.set(userId, context)

  const messages: Record<string, string> = {
    create:
      'Resume builder is ready. Choose from 8 professional styles and fill in your details.',
    vacancy:
      'Resume builder opened in vacancy tailoring mode. Paste or review the vacancy and AI will adapt your resume.',
    improve:
      'Resume builder opened for improvement. Review and enhance your resume.',
  }

  /*
   * Include `context` in the tool result so the widget can read it via
   * getToolResult() / toolResult. Memory-only get_init_context breaks on
   * serverless (another instance) or cold starts.
   */
  return {
    success: true,
    message: messages[mode] ?? messages.create,
    ...context,
  }
}

async function handleGetInitContext(
  _app: McpAppConfig,
  _args: Record<string, unknown>,
  userId: string,
): Promise<Record<string, unknown>> {
  const ctx = pendingContext.get(userId)
  if (ctx) {
    /*
     * Do not delete after read. The widget may call get_init_context more than
     * once (e.g. React 18 StrictMode double-mount in dev, or iframe reload).
     * Next open_resume_builder overwrites this map entry for the same user.
     */
    return { success: true, ...ctx }
  }
  return { success: true, mode: 'create' }
}

async function handleGetUserInfo(
  _app: McpAppConfig,
  _args: Record<string, unknown>,
  userId: string,
): Promise<Record<string, unknown>> {
  const { supabaseAdmin } = await import('@/utils/supabase/supabase-admin')
  const { data: user } = await supabaseAdmin
    .from('users')
    .select('id, email, full_name, avatar_url')
    .eq('id', userId)
    .single()

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  return {
    success: true,
    user: user ?? {},
    accountUrl: `${baseUrl}/account`,
  }
}

export function getResumeToolHandlers(): Record<string, ToolHandler> {
  return {
    open_resume_builder: handleOpenResumeBuilder,
    get_init_context: handleGetInitContext,
    get_user_info: handleGetUserInfo,
  }
}
