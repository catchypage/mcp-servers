'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { signIn } from 'next-auth/react'
import AuthButtons from './AuthButtons'
import { SITE_NAME } from '@/utils/constants'

interface SignModalProps {
  register?: boolean
  options: {
    state?: string
    scope: string
    redirectUri?: string
    user_request?: string
    callbackUrl?: string // Custom callback URL for MCP OAuth flow
  }
}

const SignModal = ({
  register = false,
  options: {
    scope,
    state = 'default_state',
    redirectUri,
    callbackUrl: customCallbackUrl,
  },
}: SignModalProps) => {
  const pathName = usePathname()

  const [redirectUrl, setRedirectUrl] = useState('')
  const [isGptFlow, setIsGptFlow] = useState(false)
  const [isSignUp, setIsSignUp] = useState(register)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    /*
     * If custom callback URL is provided (e.g., MCP OAuth flow),
     * use it directly
     */
    if (customCallbackUrl) {
      setIsGptFlow(true)
      setRedirectUrl(customCallbackUrl)
      return
    }

    const isGptAuthentication =
      !!redirectUri && redirectUri.includes('chat.openai.com')
    setIsGptFlow(isGptAuthentication)

    if (isGptAuthentication) {
      const queryParams = new URLSearchParams({
        scope,
        register: `${register}`,
        consented: `true`,
        redirect_uri: `${window.location.origin}${pathName}`,
        state: state,
      })

      if (redirectUri) {
        queryParams.set('redirect_uri', redirectUri)
      }

      const url = `${
        window.location.origin
      }/api/oauth/callback?${queryParams.toString()}`
      setRedirectUrl(url)
    } else {
      setRedirectUrl(`${window.location.origin}${pathName}`)
    }
  }, [scope, register, pathName, state, redirectUri, customCallbackUrl])

  const singInWithProvider = (provider: string) => {
    if (provider === 'google') {
      if (isGptFlow) {
        void signIn('google', { callbackUrl: redirectUrl })
      } else {
        void signIn('google')
      }
    }
  }

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (isSignUp) {
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
          return
        }
      }

      const result = await signIn('credentials', {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
      })

      if (result?.error) {
        setError(
          isSignUp
            ? 'Account created. Please sign in.'
            : 'Invalid email or password',
        )
        if (isSignUp) {
          setIsSignUp(false)
        }
        return
      }

      if (isGptFlow) {
        window.location.href = redirectUrl
      } else {
        window.location.reload()
      }
    } catch {
      setError('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col justify-center items-stretch gap-5 p-6">
      <div className="flex flex-col gap-5">
        <h1 className="text-[var(--text-primary)] text-center text-xl font-playfair">
          {isSignUp ? 'Sign Up' : 'Sign In'} to{' '}
          <span className="text-2xl font-bold text-[var(--accent-gold)]">
            {SITE_NAME}
          </span>
        </h1>
        <AuthButtons singInWithProvider={singInWithProvider} />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span
              className="w-full border-t"
              style={{ borderColor: 'var(--company-border-primary)' }}
            />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span
              className="px-2"
              style={{
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-secondary)',
              }}
            >
              or
            </span>
          </div>
        </div>

        <form
          onSubmit={(e) => void handleCredentialsSubmit(e)}
          className="flex flex-col gap-4"
        >
          {isSignUp && (
            <input
              type="text"
              placeholder="Name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/60 focus:outline-none focus:border-[var(--accent-gold)]"
              style={{
                backgroundColor: 'var(--company-bg-tertiary)',
                borderColor: 'var(--company-border-primary)',
              }}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/60 focus:outline-none focus:border-[var(--accent-gold)]"
            style={{
              backgroundColor: 'var(--company-bg-tertiary)',
              borderColor: 'var(--company-border-primary)',
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full px-4 py-3 rounded-lg border text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/60 focus:outline-none focus:border-[var(--accent-gold)]"
            style={{
              backgroundColor: 'var(--company-bg-tertiary)',
              borderColor: 'var(--company-border-primary)',
            }}
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg hover:opacity-90 font-medium transition-opacity disabled:opacity-50"
            style={{
              backgroundColor: 'var(--accent-gold)',
              color: 'var(--company-button-primary-text)',
            }}
          >
            {isLoading ? 'Please wait...' : isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setIsSignUp(!isSignUp)
            setError('')
          }}
          className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        >
          {isSignUp
            ? 'Already have an account? Sign In'
            : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  )
}

export default SignModal
