'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { Modal } from '@/components/hooks/UI/Modal'
import { SITE_NAME } from '@/utils/constants'

interface RegisterModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      await signIn('google', {
        callbackUrl: `${window.location.origin}/`,
      })
    } catch (err) {
      console.error('Unexpected error during sign in:', err)
      setIsLoading(false)
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

      onClose()
      window.location.reload()
    } catch {
      setError('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) {
    return null
  }

  return (
    <Modal
      id="modal__signup"
      isOpen={isOpen}
      onClose={onClose}
      showStripe={false}
    >
      <div className="flex flex-col justify-center items-stretch gap-6 p-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2 font-playfair">
            {isSignUp ? 'Join' : 'Sign In to'}{' '}
            <span className="text-[var(--accent-gold)]">{SITE_NAME}</span>
          </h3>
          <p className="text-[var(--text-secondary)] font-cinzel">
            {isSignUp
              ? 'Create an account to unlock personalized insights and features'
              : 'Welcome back'}
          </p>
        </div>

        <button
          onClick={() => void handleGoogleSignIn()}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 hover:opacity-90 font-medium px-4 py-3 rounded-lg transition-all duration-200 shadow-lg"
          style={{
            background:
              'linear-gradient(90deg, var(--company-button-primary-bg), var(--accent-gold))',
            color: 'var(--company-button-primary-text)',
          }}
        >
          {isLoading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                />
              </svg>
              Continue with Google
            </>
          )}
        </button>

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
    </Modal>
  )
}
