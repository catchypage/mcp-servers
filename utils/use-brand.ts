'use client'

import { createContext, useContext } from 'react'
import type { BrandConfig } from './branding'

export const BrandContext = createContext<BrandConfig | null>(null)

export function useBrand(): BrandConfig {
  const brand = useContext(BrandContext)
  if (!brand) {
    throw new Error('useBrand must be used within BrandProvider')
  }
  return brand
}
