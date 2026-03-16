'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { useSession } from 'next-auth/react'
import Consent from './Consent'

function OAuthContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session, status } = useSession()

  const state = searchParams.get('state')!
  const redirectUri = searchParams.get('redirect_uri')!
  const scope = 'email profile'
  const client_id = searchParams.get('client_id')!

  if (
    !(
      state &&
      client_id &&
      redirectUri?.startsWith('https://chat.openai.com/aip')
    )
  ) {
    router.push('/')
    return null
  }

  if (status === 'loading') {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center"
        style={{ backgroundColor: 'var(--company-bg-primary)' }}
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin"
            style={{ borderColor: 'var(--accent-gold)' }}
          />
          <p style={{ color: 'var(--text-secondary)' }}>Loading...</p>
        </div>
      </div>
    )
  }

  if (session?.user) {
    // Если есть сессия - редирект на callback
    const queryParams = new URLSearchParams({
      scope,
      register: 'true',
      consented: 'true',
      redirect_uri: redirectUri,
      state,
    })

    if (state) {
      queryParams.append('state', state)
    }

    const redirectUrl = `${
      window.location.origin
    }/api/oauth/callback?${queryParams.toString()}`
    router.push(redirectUrl)
    return null
  }

  // Если нет сессии - показываем Consent
  return <Consent redirect_uri={redirectUri} scope={scope} state={state} />
}

export default function OAuthHandler() {
  return (
    <Suspense
      fallback={
        <div
          className="fixed inset-0 flex items-center justify-center"
          style={{ backgroundColor: 'var(--company-bg-primary)' }}
        >
          <div className="flex flex-col items-center gap-4">
            <div
              className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin"
              style={{ borderColor: 'var(--accent-gold)' }}
            />
            <p style={{ color: 'var(--text-secondary)' }}>Loading...</p>
          </div>
        </div>
      }
    >
      <OAuthContent />
    </Suspense>
  )
}
