'use client'

import React from 'react'
import { BrandContext } from '@/utils/use-brand'
import type { BrandConfig } from '@/utils/branding'

export default function BrandProvider({
  brand,
  children,
}: {
  brand: BrandConfig
  children: React.ReactNode
}) {
  return <BrandContext.Provider value={brand}>{children}</BrandContext.Provider>
}
