import { PostHog } from 'posthog-node'

const serverSidePosthog = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
})

type Event =
  | 'image_generation_success_gpt'
  | 'image_generation_error_gpt'
  | 'image_generation_success_generator'
  | 'image_generation_error_generator'
  | 'auth_error'
  | 'auth_warning'

interface UserData {
  userId: string
}

interface GenerationMetadata {
  model?: string
  prompt?: string
  numImages?: number
  error?: string
  errorCode?: string
  errorType?: string
  email?: string
  settings?: {
    width: number
    height: number
    steps: number
    seed: number
    cfgScale: number
    format: string
  }
}

export const sendEvent = (
  event: Event,
  userData: UserData,
  metadata?: GenerationMetadata,
): void => {
  const properties: Record<string, any> = {
    ...metadata,
    userId: userData.userId,
  }

  serverSidePosthog.capture({
    distinctId: userData.userId,
    event: event,
    properties: properties,
  })
}
