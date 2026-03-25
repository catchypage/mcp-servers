import type { McpAppConfig, McpToolDefinition } from '@/utils/mcp/core/registry'
import { supabaseAdmin } from '@/utils/supabase/supabase-admin'
import { getClientQuestions, scorePlacement } from './placement-scoring'
import { getOrCreateProfile, updateProfile } from './profile'

/*
 * ═══════════════════════════════════════════════════════════════════════
 * TOOL DEFINITIONS
 * ═══════════════════════════════════════════════════════════════════════
 */

const openLangCoachTool: McpToolDefinition = {
  name: 'open_lang_coach',
  title: 'Open Lang Coach',
  description:
    'Open the Lang Coach English practice workspace. Practice vocabulary and grammar, work through guided drills, track your focus topics, and personalize sessions from your account. Your space for daily English practice, speaking prompts, and structured lessons.',
  inputSchema: {
    type: 'object',
    properties: {
      topic: {
        type: 'string',
        description:
          'Optional focus topic (e.g. grammar, vocabulary, speaking)',
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

const getUserInfoTool: McpToolDefinition = {
  name: 'get_user_info',
  title: 'Get User Info',
  description:
    'INTERNAL: Only the client widget calls this. GPT must never call. Returns user + langcoach profile.',
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

const startPlacementTestTool: McpToolDefinition = {
  name: 'start_placement_test',
  title: 'Start Placement Test',
  description:
    'INTERNAL: Widget-only. Returns placement test questions (without answers) for the UI to render.',
  inputSchema: {
    type: 'object',
    properties: {
      locale: {
        type: 'string',
        description: 'UI locale code',
      },
    },
    required: [],
  },
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    openWorldHint: false,
    idempotentHint: true,
  },
  securitySchemes: [{ type: 'oauth2', scopes: ['user:read'] }],
  _meta: { 'openai/hidden': true },
}

const submitPlacementTestTool: McpToolDefinition = {
  name: 'submit_placement_test',
  title: 'Submit Placement Test',
  description:
    'INTERNAL: Widget-only. Receives answers, scores the test, saves result to langcoach_profiles, and returns the level.',
  inputSchema: {
    type: 'object',
    properties: {
      answers: {
        type: 'object',
        description: 'Map of question ID to selected option index (0-based)',
      },
    },
    required: ['answers'],
  },
  annotations: {
    readOnlyHint: false,
    destructiveHint: false,
    openWorldHint: false,
    idempotentHint: false,
  },
  securitySchemes: [{ type: 'oauth2', scopes: ['user:read'] }],
  _meta: { 'openai/hidden': true },
}

const updateProfileTool: McpToolDefinition = {
  name: 'update_langcoach_profile',
  title: 'Update Lang Coach Profile',
  description:
    'INTERNAL: Widget-only. Updates user preferences (theme, locale).',
  inputSchema: {
    type: 'object',
    properties: {
      theme: { type: 'string', description: '"dark" or "light"' },
      ui_locale: { type: 'string', description: 'Locale code' },
    },
    required: [],
  },
  annotations: {
    readOnlyHint: false,
    destructiveHint: false,
    openWorldHint: false,
    idempotentHint: true,
  },
  securitySchemes: [{ type: 'oauth2', scopes: ['user:read'] }],
  _meta: { 'openai/hidden': true },
}

/*
 * ═══════════════════════════════════════════════════════════════════════
 * EXPORTS
 * ═══════════════════════════════════════════════════════════════════════
 */

export const langcoachTools: McpToolDefinition[] = [openLangCoachTool]

export const langcoachInternalTools: McpToolDefinition[] = [
  getUserInfoTool,
  startPlacementTestTool,
  submitPlacementTestTool,
  updateProfileTool,
]

/*
 * ═══════════════════════════════════════════════════════════════════════
 * HANDLERS
 * ═══════════════════════════════════════════════════════════════════════
 */

export type ToolHandler = (
  app: McpAppConfig,
  args: Record<string, unknown>,
  userId: string,
) => Promise<Record<string, unknown>>

async function handleOpenLangCoach(
  _app: McpAppConfig,
  args: Record<string, unknown>,
  _userId: string,
): Promise<Record<string, unknown>> {
  const topic = String(args.topic ?? '').trim()
  return {
    success: true,
    message: topic
      ? `Lang Coach is ready. Focus: ${topic}.`
      : 'Lang Coach is ready. English practice UI will load in the widget.',
    topic: topic || null,
  }
}

async function handleGetUserInfo(
  _app: McpAppConfig,
  _args: Record<string, unknown>,
  userId: string,
): Promise<Record<string, unknown>> {
  const { data: user } = await supabaseAdmin
    .from('users')
    .select('id, email, full_name, avatar_url')
    .eq('id', userId)
    .single()

  const profile = await getOrCreateProfile(userId)

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  return {
    success: true,
    user: user ?? {},
    profile,
    accountUrl: `${baseUrl}/account`,
  }
}

async function handleStartPlacementTest(
  _app: McpAppConfig,
  _args: Record<string, unknown>,
  _userId: string,
): Promise<Record<string, unknown>> {
  const questions = getClientQuestions()
  return {
    success: true,
    questions,
    totalQuestions: questions.length,
  }
}

async function handleSubmitPlacementTest(
  _app: McpAppConfig,
  args: Record<string, unknown>,
  userId: string,
): Promise<Record<string, unknown>> {
  const raw = args.answers
  if (!raw || typeof raw !== 'object') {
    return { success: false, error: 'answers object is required' }
  }

  const answers: Record<string, number> = {}
  for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
    answers[k] = Number(v)
  }

  const result = scorePlacement(answers)

  try {
    await getOrCreateProfile(userId)
    await updateProfile(userId, {
      placement_level: result.level,
      placement_score: result.weightedScore ?? null,
      placement_pct: result.pct,
      placement_date: new Date().toISOString(),
    })
  } catch (e) {
    console.log('[LangCoach] Failed to save placement level:', e)
  }

  return {
    success: true,
    ...result,
  }
}

async function handleUpdateProfile(
  _app: McpAppConfig,
  args: Record<string, unknown>,
  userId: string,
): Promise<Record<string, unknown>> {
  const patch: Record<string, unknown> = {}
  if (args.theme === 'dark' || args.theme === 'light') {
    patch.theme = args.theme
  }
  if (typeof args.ui_locale === 'string' && args.ui_locale.length <= 5) {
    patch.ui_locale = args.ui_locale
  }

  if (Object.keys(patch).length === 0) {
    return { success: false, error: 'No valid fields to update' }
  }

  try {
    await getOrCreateProfile(userId)
    await updateProfile(userId, patch)
  } catch (e) {
    console.log('[LangCoach] Failed to update profile:', e)
    return { success: false, error: 'Database error' }
  }

  return { success: true, ...patch }
}

export function getLangcoachToolHandlers(): Record<string, ToolHandler> {
  return {
    open_lang_coach: handleOpenLangCoach,
    get_user_info: handleGetUserInfo,
    start_placement_test: handleStartPlacementTest,
    submit_placement_test: handleSubmitPlacementTest,
    update_langcoach_profile: handleUpdateProfile,
  }
}
