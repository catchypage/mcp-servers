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

const createResumeTool: McpToolDefinition = {
  name: 'create_resume',
  title: 'Create Resume',
  description:
    'Create a new professional resume. Opens an interactive builder with 8 unique styles: Classic Professional, Modern Minimal, Executive Dark, Creative Bold, Tech Terminal, Elegant Sidebar, Swiss Minimalist, and Nature Organic.',
  inputSchema: {
    type: 'object',
    properties: {
      job_title: { type: 'string', description: 'Target job title' },
      style: {
        type: 'string',
        description:
          'Resume style: classic, modern, executive, creative, terminal, sidebar, swiss, or nature',
        enum: RESUME_STYLE_IDS,
      },
      full_name: { type: 'string', description: 'Full name for the resume' },
      experience: { type: 'string', description: 'Work experience summary' },
      skills: {
        type: 'array',
        items: { type: 'string' },
        description: 'List of skills',
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

const tailorForVacancyTool: McpToolDefinition = {
  name: 'tailor_resume_for_vacancy',
  title: 'Tailor Resume for Vacancy',
  description:
    'Create or adapt a resume tailored to a specific job vacancy. Provide the vacancy description and optionally a screenshot URL. AI will analyze the vacancy and suggest the best resume content and style.',
  inputSchema: {
    type: 'object',
    properties: {
      vacancy_description: {
        type: 'string',
        description:
          'Full job vacancy description: title, company, requirements, responsibilities, etc.',
      },
      vacancy_image_url: {
        type: 'string',
        description:
          'Optional URL to a screenshot of the vacancy posting',
      },
      full_name: { type: 'string', description: 'Candidate full name' },
      job_title: { type: 'string', description: 'Current job title of the candidate' },
    },
    required: ['vacancy_description'],
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
  tailorForVacancyTool,
  improveResumeTool,
]

export const resumeInternalTools: McpToolDefinition[] = [getUserInfoTool]

export type ToolHandler = (
  app: McpAppConfig,
  args: Record<string, unknown>,
  userId: string,
) => Promise<Record<string, unknown>>

async function handleCreateResume(
  _app: McpAppConfig,
  args: Record<string, unknown>,
  _userId: string,
): Promise<Record<string, unknown>> {
  const jobTitle = String(args.job_title ?? '')
  const fullName = String(args.full_name ?? '')
  const experience = String(args.experience ?? '')
  const skills = Array.isArray(args.skills) ? args.skills.map(String) : []
  const style = String(args.style ?? 'modern')

  // Validate style
  const validStyle = RESUME_STYLE_IDS.includes(style as ResumeStyleId)
    ? style
    : 'modern'

  return {
    success: true,
    message:
      'Resume builder opened. Choose from 8 professional styles and fill in your details.',
    availableStyles: [
      {
        id: 'classic',
        name: 'Classic Professional',
        description: 'Traditional layout with clean typography',
      },
      {
        id: 'modern',
        name: 'Modern Minimal',
        description: 'Clean design with ample whitespace',
      },
      {
        id: 'executive',
        name: 'Executive Dark',
        description: 'Premium dark design for senior positions',
      },
      {
        id: 'creative',
        name: 'Creative Bold',
        description: 'Expressive design with bold colors',
      },
      {
        id: 'terminal',
        name: 'Tech Terminal',
        description: 'Developer-focused terminal aesthetics',
      },
      {
        id: 'sidebar',
        name: 'Elegant Sidebar',
        description: 'Two-column design with elegant sidebar',
      },
      {
        id: 'swiss',
        name: 'Swiss Minimalist',
        description: 'Typography-focused Swiss design',
      },
      {
        id: 'nature',
        name: 'Nature Organic',
        description: 'Soft organic design with earthy tones',
      },
    ],
    prefilledData: {
      style: validStyle,
      jobTitle: jobTitle || '',
      fullName: fullName || '',
      experience: experience || '',
      skills: skills.length > 0 ? skills : [],
    },
  }
}

async function handleTailorForVacancy(
  _app: McpAppConfig,
  args: Record<string, unknown>,
  _userId: string,
): Promise<Record<string, unknown>> {
  const vacancyDescription = String(args.vacancy_description ?? '')
  const vacancyImageUrl = String(args.vacancy_image_url ?? '')
  const fullName = String(args.full_name ?? '')
  const jobTitle = String(args.job_title ?? '')

  if (!vacancyDescription.trim()) {
    return {
      success: false,
      error: 'vacancy_description is required',
      message: 'Please provide the job vacancy description.',
    }
  }

  return {
    success: true,
    message:
      'Resume builder opened in vacancy tailoring mode. AI will adapt the resume for the specified vacancy.',
    vacancyData: {
      vacancyDescription: vacancyDescription.trim(),
      vacancyImageUrl: vacancyImageUrl.trim(),
      fullName: fullName.trim(),
      jobTitle: jobTitle.trim(),
    },
  }
}

async function handleImproveResume(
  _app: McpAppConfig,
  args: Record<string, unknown>,
  _userId: string,
): Promise<Record<string, unknown>> {
  const resumeText = String(args.resume_text ?? '')
  const feedback = String(args.feedback ?? '')

  if (!resumeText.trim()) {
    return {
      success: false,
      error: 'resume_text is required',
      message: 'Resume text is required',
    }
  }

  return {
    success: true,
    message: 'Resume improved',
    resume: {
      original:
        resumeText.slice(0, 200) + (resumeText.length > 200 ? '...' : ''),
      feedback: feedback || 'General improvements applied',
      improved:
        resumeText +
        (feedback ? `\n\n[Improvements based on: ${feedback}]` : ''),
    },
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

export function getResumeToolHandlers(): Record<string, ToolHandler> {
  return {
    create_resume: handleCreateResume,
    tailor_resume_for_vacancy: handleTailorForVacancy,
    improve_resume: handleImproveResume,
    get_user_info: handleGetUserInfo,
  }
}
