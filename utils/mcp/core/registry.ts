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
  resources?: {
    uri: string
    name: string
    description?: string
    mimeType?: string
  }[]
}

import { resumeTools, resumeInternalTools } from '@/utils/mcp/apps/resume/tools'
import {
  chefplanTools,
  chefplanInternalTools,
} from '@/utils/mcp/apps/chefplan/tools'
import {
  langcoachTools,
  langcoachInternalTools,
} from '@/utils/mcp/apps/langcoach/tools'

export const MCP_APPS: Record<string, McpAppConfig> = {
  resume: {
    id: 'resume',
    name: 'Resume Builder',
    description: 'Create and improve resumes',
    version: '1.0.0',
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
  chefplan: {
    id: 'chefplan',
    name: 'ChefPlan Meal Planner',
    description:
      'AI-powered weekly meal planning with nutrition tracking, shopping lists, and grocery ordering',
    version: '1.0.0',
    tools: chefplanTools,
    internalTools: chefplanInternalTools,
    widget: '/mcp/chefplan.bundle.js',
    resources: [
      {
        uri: '/api/mcp/chefplan/widget',
        name: 'ChefPlan Widget',
        description: 'Interactive meal planning widget',
        mimeType: 'text/html+skybridge',
      },
    ],
  },
  langcoach: {
    id: 'langcoach',
    name: 'Lang Coach',
    description: 'English practice drills and coaching (scaffold)',
    version: '1.0.0',
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
}

export function resolveApp(appId: string): McpAppConfig | null {
  return MCP_APPS[appId] ?? null
}

/**
 * Domains per app (for reference / docs).
 * Actual mapping: MCP_DOMAIN_MAP env or domain-map.ts
 */
export const APP_DOMAINS: Record<string, string[]> = {
  resume: ['resume.pyxl.pro', 'resume.example.com'],
  chefplan: ['chefplan.pyxl.pro', 'meals.pyxl.pro', 'chefplan.example.com'],
  langcoach: ['langcoach.pyxl.pro', 'langcoach.example.com'],
}
