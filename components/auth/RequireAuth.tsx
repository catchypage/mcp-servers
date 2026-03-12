'use client'

import { useSession } from 'next-auth/react'
import Auth from './Auth'

interface RequireAuthProps {
  children: React.ReactNode
  compact?: boolean
}

export default function RequireAuth({
  children,
  compact = false,
}: RequireAuthProps) {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    if (compact) {
      return (
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-[var(--accent-primary)]/30 border-t-[var(--accent-primary)]"></div>
        </div>
      )
    }
    return (
      <div className="min-h-[calc(100vh-80px)] bg-[var(--primary-bg)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--accent-primary)]/30 border-t-[var(--accent-primary)]"></div>
      </div>
    )
  }

  if (!session) {
    if (compact) {
      return (
        <div className="w-full">
          <Auth />
        </div>
      )
    }
    return (
      <div className="min-h-[calc(100vh-80px)] bg-[var(--primary-bg)] flex flex-col items-center justify-center gap-6 p-4">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">
            Please sign in to access this page
          </h2>
          <p className="text-gray-400">
            Create an account or sign in to continue
          </p>
        </div>
        <div className="w-full max-w-md bg-[var(--secondary-bg)] backdrop-blur-sm p-8 rounded-2xl border border-[var(--card-border)] flex justify-center">
          <Auth />
        </div>
      </div>
    )
  }

  return <>{children}</>
}
