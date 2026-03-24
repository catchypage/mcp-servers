import type { McpAppConfig, McpToolDefinition } from '@/utils/mcp/core/registry'

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

export const langcoachTools: McpToolDefinition[] = [openLangCoachTool]

export const langcoachInternalTools: McpToolDefinition[] = [getUserInfoTool]

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

export function getLangcoachToolHandlers(): Record<string, ToolHandler> {
  return {
    open_lang_coach: handleOpenLangCoach,
    get_user_info: handleGetUserInfo,
  }
}
