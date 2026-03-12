import type { McpAppConfig, McpToolDefinition } from '@/utils/mcp/core/registry'

const createResumeTool: McpToolDefinition = {
  name: 'create_resume',
  title: 'Create Resume',
  description: 'Create a new resume based on job title, experience, and skills.',
  inputSchema: {
    type: 'object',
    properties: {
      job_title: { type: 'string', description: 'Target job title' },
      experience: { type: 'string', description: 'Work experience summary' },
      skills: {
        type: 'array',
        items: { type: 'string' },
        description: 'List of skills',
      },
    },
    required: ['job_title'],
  },
  annotations: {
    readOnlyHint: false,
    destructiveHint: false,
    openWorldHint: true,
    idempotentHint: false,
  },
  securitySchemes: [{ type: 'oauth2', scopes: ['user:read'] }],
}

const improveResumeTool: McpToolDefinition = {
  name: 'improve_resume',
  title: 'Improve Resume',
  description: 'Improve an existing resume based on feedback.',
  inputSchema: {
    type: 'object',
    properties: {
      resume_text: { type: 'string', description: 'Current resume text' },
      feedback: { type: 'string', description: 'Feedback for improvement' },
    },
    required: ['resume_text'],
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

export const resumeTools: McpToolDefinition[] = [
  createResumeTool,
  improveResumeTool,
]

export const resumeInternalTools: McpToolDefinition[] = [getUserInfoTool]

export type ToolHandler = (
  app: McpAppConfig,
  args: Record<string, unknown>,
  userId: string
) => Promise<Record<string, unknown>>

async function handleCreateResume(
  _app: McpAppConfig,
  args: Record<string, unknown>,
  _userId: string
): Promise<Record<string, unknown>> {
  const jobTitle = String(args.job_title ?? '')
  const experience = String(args.experience ?? '')
  const skills = Array.isArray(args.skills) ? args.skills.map(String) : []

  if (!jobTitle.trim()) {
    return { success: false, error: 'job_title is required', message: 'Job title is required' }
  }

  return {
    success: true,
    message: 'Resume created successfully',
    resume: {
      jobTitle,
      experience: experience || 'To be filled',
      skills: skills.length > 0 ? skills : ['Add your skills'],
      summary: `Professional resume for ${jobTitle} position.`,
    },
  }
}

async function handleImproveResume(
  _app: McpAppConfig,
  args: Record<string, unknown>,
  _userId: string
): Promise<Record<string, unknown>> {
  const resumeText = String(args.resume_text ?? '')
  const feedback = String(args.feedback ?? '')

  if (!resumeText.trim()) {
    return { success: false, error: 'resume_text is required', message: 'Resume text is required' }
  }

  return {
    success: true,
    message: 'Resume improved',
    resume: {
      original: resumeText.slice(0, 200) + (resumeText.length > 200 ? '...' : ''),
      feedback: feedback || 'General improvements applied',
      improved: resumeText + (feedback ? `\n\n[Improvements based on: ${feedback}]` : ''),
    },
  }
}

async function handleGetUserInfo(
  _app: McpAppConfig,
  _args: Record<string, unknown>,
  userId: string
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
    create_resume: handleCreateResume,
    improve_resume: handleImproveResume,
    get_user_info: handleGetUserInfo,
  }
}
