'use client'

import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Suspense, useState } from 'react'

function McpOAuthContent() {
  const searchParams = useSearchParams()
  const oauthState = searchParams.get('oauth_state')
  const error = searchParams.get('error')

  const [showEmailForm, setShowEmailForm] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const callbackUrl = oauthState
    ? `/api/mcp/oauth/callback?oauth_state=${oauthState}`
    : '/'

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl })
  }

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl,
      })

      if (result?.error) {
        setFormError('Invalid email or password. Please try again.')
        setIsLoading(false)
      } else if (result?.ok) {
        // Redirect manually on success
        window.location.href = callbackUrl
      }
    } catch {
      setFormError('An error occurred. Please try again.')
      setIsLoading(false)
    }
  }

  if (!oauthState) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-white to-orange-50 p-4">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm p-8 text-center shadow-lg">
          <h1 className="mb-4 text-xl font-semibold text-gray-900">
            Invalid OAuth Request
          </h1>
          <p className="text-gray-600">
            Missing oauth_state. Please try connecting again from ChatGPT.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-white to-orange-50 p-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm p-8 shadow-lg">
        <div className="mb-6 flex items-center justify-center gap-2">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
            <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
            <line x1="6" x2="18" y1="17" y2="17" />
          </svg>
          <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
            ChefPlan
          </span>
        </div>

        <h1 className="mb-2 text-xl font-semibold text-gray-900 text-center">
          Sign in to continue
        </h1>
        <p className="mb-6 text-sm text-gray-600 text-center">
          Connect your account to use MCP tools in ChatGPT.
        </p>

        {(error === 'CredentialsSignin' || formError) && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200">
            <p className="text-sm text-red-600">
              {formError || 'Invalid credentials. Please check your email and password.'}
            </p>
          </div>
        )}

        {error === 'no_session' && (
          <div className="mb-4 p-3 rounded-lg bg-amber-50 border border-amber-200">
            <p className="text-sm text-amber-600">
              Please sign in to complete the connection.
            </p>
          </div>
        )}

        {!showEmailForm ? (
          <div className="flex flex-col gap-3">
            <button
              onClick={handleGoogleSignIn}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white/80 text-gray-500">or</span>
              </div>
            </div>

            <button
              onClick={() => setShowEmailForm(true)}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              Sign in with Email
            </button>
          </div>
        ) : (
          <form onSubmit={handleEmailSignIn} className="flex flex-col gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-4 py-3 font-medium text-white hover:from-green-600 hover:to-green-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>

            <button
              type="button"
              onClick={() => {
                setShowEmailForm(false)
                setFormError(null)
              }}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Back to sign in options
            </button>
          </form>
        )}

        <p className="mt-6 text-xs text-center text-gray-500">
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
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-white to-orange-50">
          <div className="text-gray-500">Loading...</div>
        </div>
      }
    >
      <McpOAuthContent />
    </Suspense>
  )
}
