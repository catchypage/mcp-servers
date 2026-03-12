'use client'

import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Suspense } from 'react'

function McpOAuthContent() {
  const searchParams = useSearchParams()
  const oauthState = searchParams.get('oauth_state')
  const error = searchParams.get('error')

  const handleSignIn = (provider: string) => {
    const callbackUrl = oauthState
      ? `/api/mcp/oauth/callback?oauth_state=${oauthState}`
      : '/'
    signIn(provider, { callbackUrl })
  }

  if (!oauthState) {
    return (
      <div className="flex min-h-screen items-center justify-center company-bg-primary p-4">
        <div className="w-full max-w-md rounded-xl border company-border-primary company-bg-secondary p-8 text-center">
          <h1 className="mb-4 text-xl font-semibold company-text-primary">
            Invalid OAuth Request
          </h1>
          <p className="company-text-secondary">
            Missing oauth_state. Please try connecting again from ChatGPT.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center company-bg-primary p-4">
      <div className="w-full max-w-md rounded-xl border company-border-primary company-bg-secondary p-8">
        <h1 className="mb-2 text-xl font-semibold company-text-primary">
          Sign in to continue
        </h1>
        <p className="mb-6 text-sm company-text-secondary">
          Connect your account to use MCP tools in ChatGPT.
        </p>

        {error === 'no_session' && (
          <p className="mb-4 text-sm text-amber-500">
            Please sign in to complete the connection.
          </p>
        )}

        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleSignIn('google')}
            className="flex w-full items-center justify-center gap-3 rounded-lg border company-border-primary px-4 py-3 font-medium company-text-primary hover:company-bg-secondary transition-colors"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
              />
            </svg>
            Continue with Google
          </button>
          <button
            onClick={() => handleSignIn('credentials')}
            className="flex w-full items-center justify-center gap-3 rounded-lg border company-border-primary px-4 py-3 font-medium company-text-primary hover:company-bg-secondary transition-colors"
          >
            Sign in with Email
          </button>
        </div>
      </div>
    </div>
  )
}

export default function McpOAuthPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center company-bg-primary">
          <div className="company-text-secondary">Loading...</div>
        </div>
      }
    >
      <McpOAuthContent />
    </Suspense>
  )
}
