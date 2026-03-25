export interface OpenAIBridge {
  callTool: (
    toolName: string,
    args: Record<string, unknown>,
  ) => Promise<{
    structuredContent?: Record<string, unknown>
    [key: string]: unknown
  }>
  updateModelContext?: (context: Record<string, unknown>) => void
  getToolResult?: () => Promise<{
    structuredContent?: Record<string, unknown>
    [key: string]: unknown
  }>
  toolResult?: {
    structuredContent?: Record<string, unknown>
    [key: string]: unknown
  }
}

declare global {
  interface Window {
    openai?: OpenAIBridge
  }
}
