'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default function AccountPage() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center company-bg-primary">
        <div className="company-text-secondary">Loading...</div>
      </div>
    )
  }

  if (!session?.user) {
    redirect('/')
  }

  return (
    <div className="min-h-screen company-bg-primary pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold company-text-primary mb-8">
          Account
        </h1>

        <div className="rounded-xl border company-border-primary company-bg-secondary p-6">
          <div className="flex items-center gap-4 mb-6">
            {session.user.image ? (
              <img
                src={session.user.image}
                alt=""
                className="w-16 h-16 rounded-full"
              />
            ) : (
              <div className="w-16 h-16 rounded-full company-bg-tertiary flex items-center justify-center text-2xl font-bold company-text-primary">
                {session.user.email?.[0]?.toUpperCase() ?? 'U'}
              </div>
            )}
            <div>
              <p className="text-lg font-semibold company-text-primary">
                {session.user.name ?? 'User'}
              </p>
              <p className="company-text-secondary">{session.user.email}</p>
            </div>
          </div>

          <p className="company-text-tertiary text-sm mb-6">
            Manage your account and subscription from here.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border company-border-primary company-text-primary hover:company-bg-tertiary transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
