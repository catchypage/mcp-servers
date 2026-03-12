'use client'

import { PropsWithChildren } from 'react'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import AppHeader from '@/components/header/AppHeader'
import MetricsBackground from '@/components/background/MetricsBackground'

const Main = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <MetricsBackground />
        <AppHeader />
        <main className="flex-1">{children}</main>
      </div>
    </ThemeProvider>
  )
}

export default Main
