'use client'

import { PropsWithChildren } from 'react'
import Header from '@/components/ui/header'

const Main = ({ children }: PropsWithChildren) => {
  return (
    <main className="flex flex-col min-h-screen font-prompt">
      <Header />
      {children}
    </main>
  )
}

export default Main
