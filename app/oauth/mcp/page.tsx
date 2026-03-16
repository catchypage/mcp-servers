'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import SignModal from '@/components/auth/SignModal'

function McpOAuthContent() {
  const searchParams = useSearchParams()
  const oauthState = searchParams.get('oauth_state')
  const error = searchParams.get('error')

  if (!oauthState) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="w-full max-w-md rounded-2xl p-8 text-center" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          <h1 className="mb-4 text-xl font-semibold text-white">
            Invalid OAuth Request
          </h1>
          <p className="text-white/60">
            Missing oauth_state. Please try connecting again from ChatGPT.
          </p>
        </div>
      </div>
    )
  }

  const callbackUrl = `/api/mcp/oauth/callback?oauth_state=${oauthState}`

  return (
    <div className="flex min-h-screen items-center justify-center p-4" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="w-full max-w-md rounded-2xl" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        {/* MCP branding header */}
        <div className="pt-6 px-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="2">
              <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
              <line x1="6" x2="18" y1="17" y2="17" />
            </svg>
            <span className="text-lg font-bold" style={{ color: 'var(--accent-gold)' }}>
              MCP Connect
            </span>
          </div>
          <p className="text-sm text-center text-white/60 mb-2">
            Sign in to connect your account with ChatGPT
          </p>
        </div>

        {error === 'CredentialsSignin' && (
          <div className="mx-6 mb-2 p-3 rounded-lg border" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
            <p className="text-sm text-red-400">
              Invalid credentials. Please check your email and password.
            </p>
          </div>
        )}

        {error === 'no_session' && (
          <div className="mx-6 mb-2 p-3 rounded-lg border" style={{ backgroundColor: 'rgba(251, 191, 36, 0.1)', borderColor: 'rgba(251, 191, 36, 0.3)' }}>
            <p className="text-sm text-amber-400">
              Please sign in to complete the connection.
            </p>
          </div>
        )}

        <SignModal
          options={{
            scope: 'user:read',
            state: oauthState,
            callbackUrl,
          }}
        />

        <p className="pb-6 px-6 text-xs text-center text-white/40">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  )
}

export default function McpOAuthPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
          <div className="text-white/50">Loading...</div>
        </div>
      }
    >
      <McpOAuthContent />
    </Suspense>
  )
}
