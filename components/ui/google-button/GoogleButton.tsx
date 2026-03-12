'use client'

import { createClient } from '@/utils/supabase/client'
import { usePathname } from 'next/navigation'

const GoogleButton = ({
  className = 'shiny-button hover:from-main-color-hover hover:to-second-color-hover from-main-color to-second-color font-bold text-sm text-main-bg bg-gradient-to-r py-2 px-4 rounded-sm',
}: {
  className?: string
}) => {
  const supabase = createClient()
  const pathName = usePathname()

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}${pathName}`,
      },
    })

    if (error) {
      console.error('Auth error', error)
    } else {
      console.log('Successful login')
    }
  }

  return (
    <button onClick={() => void signInWithGoogle()} className={className}>
      Sign in with Google
    </button>
  )
}

export default GoogleButton
