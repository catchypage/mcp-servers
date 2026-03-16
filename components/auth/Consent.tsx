import { SITE_NAME } from '@/utils/constants'
import AuthButtons from './AuthButtons'
import { signIn } from 'next-auth/react'

const Consent = ({
  redirect_uri,
  scope,
  state,
}: {
  redirect_uri: string
  scope: string
  state: string
}) => {
  const singInWithProvider = (provider: string) => {
    const queryParams = new URLSearchParams({
      scope,
      register: 'true',
      consented: 'true',
      email_consent: 'true',
      redirect_uri,
      state,
    })

    const redirectUrl = `${
      window.location.origin
    }/api/oauth/callback?${queryParams.toString()}`
    void signIn(provider, {
      callbackUrl: redirectUrl,
    })
  }

  return (
    <div
      className="flex justify-center items-center gap-1 h-[100%] min-h-screen"
      style={{ backgroundColor: 'var(--company-bg-primary)' }}
    >
      <div
        className="md:w-1/2 flex flex-col justify-center items-stretch gap-5 p-8 rounded-2xl border backdrop-blur-sm"
        style={{
          backgroundColor: 'var(--company-bg-secondary)',
          borderColor: 'var(--company-border-primary)',
        }}
      >
        <div className="flex flex-col gap-5">
          <h1
            className="text-center text-xl"
            style={{ color: 'var(--text-primary)' }}
          >
            {'Sign Up'} to{' '}
            <span
              className="text-2xl font-bold"
              style={{ color: 'var(--accent-gold)' }}
            >
              {SITE_NAME}
            </span>
          </h1>
          <AuthButtons singInWithProvider={singInWithProvider} />
        </div>
      </div>
    </div>
  )
}

export default Consent
