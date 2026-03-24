import type { McpToolDefinition } from '@/utils/mcp/core/registry'

const generateWeeklyPlanTool: McpToolDefinition = {
  name: 'generate_weekly_plan',
  title: 'Generate Weekly Meal Plan',
  description:
    'Create a personalized weekly meal plan based on household size, dietary preferences, allergies, budget, and goals.',
  inputSchema: {
    type: 'object',
    properties: {
      household_size: {
        type: 'number',
        description: 'Number of people in household (1-10)',
      },
      dietary_preferences: {
        type: 'array',
        items: { type: 'string' },
        description:
          'Dietary preferences: healthy, high_protein, low_carb, vegetarian, vegan, keto, mediterranean',
      },
      allergies: {
        type: 'array',
        items: { type: 'string' },
        description:
          'Food allergies: dairy, gluten, nuts, shellfish, eggs, soy',
      },
      budget_target: {
        type: 'number',
        description: 'Weekly budget target in USD',
      },
      goal: {
        type: 'string',
        description:
          'Primary goal: healthy, high_protein, cheap, quick, balanced',
      },
      max_prep_minutes: {
        type: 'number',
        description: 'Maximum prep time per meal in minutes',
      },
    },
    required: ['household_size'],
  },
  annotations: {
    readOnlyHint: false,
    destructiveHint: false,
    openWorldHint: true,
    idempotentHint: false,
  },
  securitySchemes: [{ type: 'oauth2', scopes: ['user:read'] }],
}

const getRecipeDetailsTool: McpToolDefinition = {
  name: 'get_recipe_details',
  title: 'Get Recipe Details',
  description:
    'Get full recipe details including ingredients, instructions, nutrition, and substitutions.',
  inputSchema: {
    type: 'object',
    properties: {
      plan_id: { type: 'string', description: 'The meal plan ID' },
      meal_id: { type: 'string', description: 'The specific meal ID' },
    },
    required: ['plan_id', 'meal_id'],
  },
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    openWorldHint: false,
    idempotentHint: true,
  },
  securitySchemes: [{ type: 'oauth2', scopes: ['user:read'] }],
}

const swapMealTool: McpToolDefinition = {
  name: 'swap_meal',
  title: 'Swap Meal',
  description:
    'Get alternative meal options or replace a specific meal in the plan.',
  inputSchema: {
    type: 'object',
    properties: {
      plan_id: { type: 'string', description: 'The meal plan ID' },
      meal_id: { type: 'string', description: 'The meal to replace' },
      constraints: {
        type: 'array',
        items: { type: 'string' },
        description:
          'Optional constraints: cheaper, faster, vegetarian, kid_friendly, high_protein',
      },
      replace_with: {
        type: 'string',
        description:
          'If provided, directly replace with this meal_id from candidates',
      },
    },
    required: ['plan_id', 'meal_id'],
  },
  annotations: {
    readOnlyHint: false,
    destructiveHint: false,
    openWorldHint: true,
    idempotentHint: false,
  },
  securitySchemes: [{ type: 'oauth2', scopes: ['user:read'] }],
}

const updatePlanConstraintsTool: McpToolDefinition = {
  name: 'update_plan_constraints',
  title: 'Update Plan Constraints',
  description: 'Update plan preferences and regenerate affected meals.',
  inputSchema: {
    type: 'object',
    properties: {
      plan_id: { type: 'string', description: 'The meal plan ID' },
      budget_target: { type: 'number', description: 'New budget target' },
      dietary_preferences: {
        type: 'array',
        items: { type: 'string' },
        description: 'Updated dietary preferences',
      },
      allergies: {
        type: 'array',
        items: { type: 'string' },
        description: 'Updated allergies list',
      },
      max_prep_minutes: { type: 'number', description: 'New max prep time' },
    },
    required: ['plan_id'],
  },
  annotations: {
    readOnlyHint: false,
    destructiveHint: false,
    openWorldHint: true,
    idempotentHint: false,
  },
  securitySchemes: [{ type: 'oauth2', scopes: ['user:read'] }],
}

const buildShoppingListTool: McpToolDefinition = {
  name: 'build_shopping_list',
  title: 'Build Shopping List',
  description:
    'Generate a consolidated shopping list grouped by store section.',
  inputSchema: {
    type: 'object',
    properties: {
      plan_id: { type: 'string', description: 'The meal plan ID' },
    },
    required: ['plan_id'],
  },
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    openWorldHint: false,
    idempotentHint: true,
  },
  securitySchemes: [{ type: 'oauth2', scopes: ['user:read'] }],
}

const createOrderLinkTool: McpToolDefinition = {
  name: 'create_order_link',
  title: 'Create Order Link',
  description:
    'Generate a deep link to order ingredients from a grocery provider.',
  inputSchema: {
    type: 'object',
    properties: {
      plan_id: { type: 'string', description: 'The meal plan ID' },
      provider: {
        type: 'string',
        description: 'Grocery provider: instacart, amazon_fresh, walmart',
      },
    },
    required: ['plan_id', 'provider'],
  },
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    openWorldHint: true,
    idempotentHint: true,
  },
  securitySchemes: [{ type: 'oauth2', scopes: ['user:read'] }],
}

const getUserInfoTool: McpToolDefinition = {
  name: 'get_user_info',
  title: 'Get User Info',
  description:
    'INTERNAL: Widget-only. Get current user info for personalization.',
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

export const chefplanTools: McpToolDefinition[] = [
  generateWeeklyPlanTool,
  getRecipeDetailsTool,
  swapMealTool,
  updatePlanConstraintsTool,
  buildShoppingListTool,
  createOrderLinkTool,
]

export const chefplanInternalTools: McpToolDefinition[] = [getUserInfoTool]
