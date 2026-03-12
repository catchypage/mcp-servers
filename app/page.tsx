'use client'

import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import CapabilitiesSection from '@/components/sections/CapabilitiesSection'
import AppFooter from '@/components/footer/AppFooter'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <CapabilitiesSection />
      <AppFooter />
    </>
  )
}
