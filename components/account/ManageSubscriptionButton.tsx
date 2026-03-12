/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ManageSubscriptionButton() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleManageSubscription = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/create-portal-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to create portal link')
      }

      const data = (await response.json()) as { url: string }

      if (!data.url) {
        throw new Error('No portal URL received')
      }

      router.push(data.url)
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to open subscription portal. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={() => void handleManageSubscription()}
      disabled={isLoading}
      className="bg-gradient-to-r from-yellow-400 via-fuchsia-500 to-cyan-400 text-white px-4 py-2 md:px-6 md:py-3 rounded-xl font-medium hover:opacity-90 transition-all duration-200 shadow shadow-yellow-400/10 text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? 'Loading...' : 'Manage Subscription'}
    </button>
  )
}
