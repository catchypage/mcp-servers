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
  /** Legacy bridge; prefer toolOutput for ChatGPT Apps SDK. */
  toolResult?: {
    structuredContent?: Record<string, unknown>
    [key: string]: unknown
  }
  /** Latest tool invocation output (Apps SDK). */
  toolOutput?: unknown
  /** Arguments passed to the tool that opened this widget (Apps SDK). */
  toolInput?: Record<string, unknown>
  toolResponseMetadata?: Record<string, unknown>
}

declare global {
  interface Window {
    openai?: OpenAIBridge
  }
}
