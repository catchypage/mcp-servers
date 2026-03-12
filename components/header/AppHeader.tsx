'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import ThemeToggle from '@/components/theme/ThemeToggle'
import Auth from '@/components/auth/Auth'
import { SITE_NAME } from '@/utils/constants'
import LoadingDots from '@/components/ui/LoadingDots'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Account', href: '/account' },
]

export default function AppHeader() {
  const { data: session, status } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 company-bg-primary/80 backdrop-blur-md border-b company-border-primary ${
        isScrolled ? 'py-2' : 'py-3'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          <Link
            href="/"
            className="flex items-center company-text-primary hover:opacity-80 transition-opacity"
          >
            <span className="text-xl font-bold tracking-tight">{SITE_NAME}</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="company-text-secondary hover:company-text-primary transition-colors duration-200 font-medium text-sm"
              >
                {item.name}
              </Link>
            ))}

            <ThemeToggle />

            <div className="flex items-center gap-3">
              {status === 'loading' ? (
                <div className="w-5 h-5 flex items-center justify-center">
                  <LoadingDots />
                </div>
              ) : session?.user ? (
                <Link
                  href="/account"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border company-border-primary hover:company-bg-secondary transition-colors"
                >
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt=""
                      className="w-4 h-4 rounded-full"
                    />
                  ) : (
                    <span className="w-4 h-4 rounded-full company-bg-secondary flex items-center justify-center text-xs font-medium company-text-primary">
                      {session.user.email?.[0]?.toUpperCase() ?? 'U'}
                    </span>
                  )}
                  <span className="text-sm company-text-primary font-medium">
                    Account
                  </span>
                </Link>
              ) : (
                <Auth />
              )}
            </div>
          </nav>

          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            {status === 'loading' ? (
              <LoadingDots />
            ) : session?.user ? (
              <Link href="/account">
                <span className="w-8 h-8 rounded-full company-bg-secondary flex items-center justify-center text-sm font-medium company-text-primary">
                  {session.user.email?.[0]?.toUpperCase() ?? 'U'}
                </span>
              </Link>
            ) : (
              <Auth />
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="company-text-primary p-2"
              aria-label="menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <motion.div
            className="md:hidden py-4 border-t company-border-primary"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="company-text-secondary hover:company-text-primary font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}
