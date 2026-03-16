'use client'

import { useSearchParams } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Suspense } from 'react'
import { SITE_NAME } from '@/utils/constants'

function McpOAuthContent() {
  const searchParams = useSearchParams()
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [isCredentialsLoading, setIsCredentialsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isRegister, setIsRegister] = useState(false)

  const oauthState = searchParams.get('oauth_state')
  const errorParam = searchParams.get('error')

  useEffect(() => {
    if (errorParam) {
      setError(
        errorParam === 'no_session'
          ? 'Please sign in to continue'
          : 'An error occurred',
      )
    }
  }, [errorParam])

  useEffect(() => {
    if (status === 'authenticated' && session?.user && oauthState) {
      window.location.href = `/api/mcp/oauth/callback?oauth_state=${oauthState}`
    }
  }, [status, session, oauthState])

  const handleSignIn = async (provider: string) => {
    if (!oauthState) {
      setError('Missing OAuth state parameter')
      return
    }

    setIsLoading(true)
    try {
      const callbackUrl = `${window.location.origin}/api/mcp/oauth/callback?oauth_state=${oauthState}`
      await signIn(provider, { callbackUrl })
    } catch (err) {
      console.error('Sign in error:', err)
      setError('Failed to sign in')
      setIsLoading(false)
    }
  }

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!oauthState) {
      setError('Missing OAuth state parameter')
      return
    }

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setIsCredentialsLoading(true)
    setError(null)

    try {
      if (isRegister) {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            password,
            name: name.trim() || undefined,
          }),
        })

        const data = (await res.json()) as { error?: string }

        if (!res.ok) {
          setError(data.error ?? 'Registration failed')
          setIsCredentialsLoading(false)
          return
        }
      }

      const callbackUrl = `${window.location.origin}/api/mcp/oauth/callback?oauth_state=${oauthState}`

      const result = await signIn('credentials', {
        email: email.trim().toLowerCase(),
        password,
        callbackUrl,
        redirect: false,
      })

      if (result?.error) {
        setError(
          isRegister
            ? 'Account created but login failed. Try signing in.'
            : 'Invalid email or password',
        )
        setIsCredentialsLoading(false)
      } else if (result?.url) {
        window.location.href = result.url
      }
    } catch (err) {
      console.error('Credentials auth error:', err)
      setError('Something went wrong')
      setIsCredentialsLoading(false)
    }
  }

  if (!oauthState) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{ backgroundColor: 'var(--company-bg-primary)' }}
      >
        <div
          className="rounded-xl shadow-lg p-8 max-w-md w-full text-center"
          style={{
            backgroundColor: 'var(--company-bg-secondary)',
            border: '1px solid var(--company-border-primary)',
          }}
        >
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2
            className="text-xl font-semibold mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            Invalid Request
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Missing required OAuth parameters. Please try again from ChatGPT.
          </p>
        </div>
      </div>
    )
  }

  if (status === 'loading') {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{ backgroundColor: 'var(--company-bg-primary)' }}
      >
        <div
          className="rounded-xl shadow-lg p-8 max-w-md w-full text-center"
          style={{
            backgroundColor: 'var(--company-bg-secondary)',
            border: '1px solid var(--company-border-primary)',
          }}
        >
          <div
            className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
            style={{ borderColor: 'var(--accent-gold)' }}
          />
          <p style={{ color: 'var(--text-secondary)' }}>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: 'var(--company-bg-primary)' }}
    >
      <div
        className="rounded-xl shadow-lg p-8 max-w-md w-full"
        style={{
          backgroundColor: 'var(--company-bg-secondary)',
          border: '1px solid var(--company-border-primary)',
        }}
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--accent-gold)"
              strokeWidth="2"
            >
              <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
              <line x1="6" x2="18" y1="17" y2="17" />
            </svg>
            <span
              className="text-lg font-bold"
              style={{ color: 'var(--accent-gold)' }}
            >
              MCP Connect
            </span>
          </div>
          <h1
            className="text-2xl font-bold mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            Connect to {SITE_NAME}
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            {isRegister ? 'Create an account' : 'Sign in'} to connect your
            account with ChatGPT
          </p>
        </div>

        {error && (
          <div
            className="rounded-lg p-4 mb-6 border"
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              borderColor: 'rgba(239, 68, 68, 0.3)',
            }}
          >
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={() => void handleSignIn('google')}
            disabled={isLoading || isCredentialsLoading}
            className="w-full flex items-center justify-center gap-3 rounded-lg px-4 py-3 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: 'var(--company-bg-tertiary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--company-border-primary)',
            }}
          >
            {isLoading ? (
              <div
                className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin"
                style={{ borderColor: 'var(--accent-gold)' }}
              />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                />
              </svg>
            )}
            Continue with Google
          </button>
        </div>

        <div className="flex items-center gap-4 my-6">
          <div
            className="flex-1 h-px"
            style={{ backgroundColor: 'var(--company-border-primary)' }}
          />
          <span style={{ color: 'var(--text-tertiary)' }}>or</span>
          <div
            className="flex-1 h-px"
            style={{ backgroundColor: 'var(--company-border-primary)' }}
          />
        </div>

        <form
          onSubmit={(e) => void handleCredentialsSubmit(e)}
          className="space-y-3"
        >
          {isRegister && (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (optional)"
              disabled={isCredentialsLoading || isLoading}
              className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 disabled:opacity-50"
              style={{
                backgroundColor: 'var(--company-bg-tertiary)',
                borderColor: 'var(--company-border-primary)',
                color: 'var(--text-primary)',
              }}
            />
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            disabled={isCredentialsLoading || isLoading}
            className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-gold)] disabled:opacity-50"
            style={{
              backgroundColor: 'var(--company-bg-tertiary)',
              border: '1px solid var(--company-border-primary)',
              color: 'var(--text-primary)',
            }}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            disabled={isCredentialsLoading || isLoading}
            className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-gold)] disabled:opacity-50"
            style={{
              backgroundColor: 'var(--company-bg-tertiary)',
              border: '1px solid var(--company-border-primary)',
              color: 'var(--text-primary)',
            }}
          />
          <button
            type="submit"
            disabled={isCredentialsLoading || isLoading || !email || !password}
            className="w-full flex items-center justify-center gap-3 rounded-lg px-4 py-3 font-medium transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: 'var(--accent-gold)',
              color: 'var(--company-button-primary-text)',
            }}
          >
            {isCredentialsLoading ? (
              <div
                className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin"
                style={{
                  borderColor: 'var(--company-button-primary-text)',
                }}
              />
            ) : isRegister ? (
              'Create Account'
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister)
              setError(null)
            }}
            className="text-sm underline hover:opacity-80"
            style={{ color: 'var(--accent-gold)' }}
          >
            {isRegister
              ? 'Already have an account? Sign in'
              : "Don't have an account? Register"}
          </button>
        </div>

        <div
          className="mt-6 text-center text-xs"
          style={{ color: 'var(--text-tertiary)' }}
        >
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </div>
      </div>
    </div>
  )
}

export default function McpOAuthPage() {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ backgroundColor: 'var(--company-bg-primary)' }}
        >
          <div
            className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin"
            style={{ borderColor: 'var(--accent-gold)' }}
          />
        </div>
      }
    >
      <McpOAuthContent />
    </Suspense>
  )
}
