/**
 * MCP App Registry.
 * Add new apps here - each gets its own /api/mcp/[appId] route.
 */

export interface McpToolDefinition {
  name: string
  title?: string
  description: string
  inputSchema: {
    type: string
    properties?: Record<string, unknown>
    required?: string[]
  }
  annotations?: Record<string, boolean>
  securitySchemes?: { type: string; scopes?: string[] }[]
  _meta?: Record<string, unknown>
}

export interface McpAppConfig {
  id: string
  name: string
  description?: string
  version?: string
  tools: McpToolDefinition[]
  internalTools?: McpToolDefinition[]
  widget?: string
  widgetInvoking?: string
  widgetInvoked?: string
  /** Skip OAuth verification for tools/call (public apps without auth). */
  skipAuth?: boolean
  resources?: {
    uri: string
    name: string
    description?: string
    mimeType?: string
  }[]
}

import { resumeTools } from '@/utils/mcp/apps/resume/tools'
import {
  langcoachTools,
  langcoachInternalTools,
} from '@/utils/mcp/apps/langcoach/tools'
import { nutriTools } from '@/utils/mcp/apps/nutri/tools'
import { moviepickTools } from '@/utils/mcp/apps/moviepick/tools'

export const MCP_APPS: Record<string, McpAppConfig> = {
  resume: {
    id: 'resume',
    name: 'Resume Builder',
    description: 'Create and improve resumes',
    version: '1.0.0',
    widgetInvoking: 'Opening your resume builder…',
    widgetInvoked: 'Resume builder ready!',
    skipAuth: true,
    tools: resumeTools,
    widget: '/mcp/resume.bundle.js',
    resources: [
      {
        uri: '/api/mcp/resume/widget',
        name: 'Resume Widget',
        description: 'Interactive resume builder',
        mimeType: 'text/html+skybridge',
      },
    ],
  },
  langcoach: {
    id: 'langcoach',
    name: 'Lang Coach',
    description:
      'English practice workspace: drills, vocabulary, grammar, and personalized coaching',
    version: '1.0.0',
    widgetInvoking: 'Opening Lang Coach…',
    widgetInvoked: 'English practice ready!',
    tools: langcoachTools,
    internalTools: langcoachInternalTools,
    widget: '/mcp/langcoach.bundle.js',
    resources: [
      {
        uri: '/api/mcp/langcoach/widget',
        name: 'Lang Coach Widget',
        description: 'Interactive English practice',
        mimeType: 'text/html+skybridge',
      },
    ],
  },
  chefplan2: {
    id: 'chefplan2',
    name: 'ChefPlan',
    description:
      'Metabolism calculator (BMR/TDEE/macros) and recipe finder with photos',
    version: '1.0.0',
    widgetInvoking: 'Opening ChefPlan…',
    widgetInvoked: 'Ready!',
    skipAuth: true,
    tools: nutriTools,
    widget: '/mcp/chefplan2.bundle.js',
    resources: [
      {
        uri: '/api/mcp/chefplan2/widget',
        name: 'ChefPlan Widget',
        description: 'Metabolism calculator and recipe finder',
        mimeType: 'text/html+skybridge',
      },
    ],
  },
  moviepick: {
    id: 'moviepick',
    name: 'MoviePick',
    description:
      'MoviePick: search movies and TV by title with genres and year range; random pick with the same filters',
    version: '1.0.0',
    widgetInvoking: 'Opening MoviePick…',
    widgetInvoked: 'Ready!',
    skipAuth: true,
    tools: moviepickTools,
    widget: '/mcp/moviepick.bundle.js',
    resources: [
      {
        uri: '/api/mcp/moviepick/widget',
        name: 'MoviePick Widget',
        description: 'Movie search and discovery',
        mimeType: 'text/html+skybridge',
      },
    ],
  },
}

export function resolveApp(appId: string): McpAppConfig | null {
  return MCP_APPS[appId] ?? null
}

export const APP_DOMAINS: Record<string, string[]> = {
  resume: ['mvp.mom'],
  langcoach: ['justmatch.us'],
  chefplan2: ['cuto.pro'],
  moviepick: ['nuova.pro'],
}
