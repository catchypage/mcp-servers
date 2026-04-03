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

import { resumeTools, resumeInternalTools } from '@/utils/mcp/apps/resume/tools'
import {
  langcoachTools,
  langcoachInternalTools,
} from '@/utils/mcp/apps/langcoach/tools'
import { nutriTools } from '@/utils/mcp/apps/nutri/tools'

export const MCP_APPS: Record<string, McpAppConfig> = {
  resume: {
    id: 'resume',
    name: 'Resume Builder',
    description: 'Create and improve resumes',
    version: '1.0.0',
    widgetInvoking: 'Opening your resume builder…',
    widgetInvoked: 'Resume builder ready!',
    tools: resumeTools,
    internalTools: resumeInternalTools,
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
}

export function resolveApp(appId: string): McpAppConfig | null {
  return MCP_APPS[appId] ?? null
}

export const APP_DOMAINS: Record<string, string[]> = {
  resume: ['resume.pyxl.pro', 'resume.example.com'],
  langcoach: ['langcoach.pyxl.pro', 'langcoach.example.com'],
}
