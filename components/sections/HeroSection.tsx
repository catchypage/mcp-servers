'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function HeroSection() {
  const [showArrow, setShowArrow] = useState(true)

  useEffect(() => {
    const handleScroll = () => setShowArrow(window.scrollY <= 100)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToNext = () => {
    document
      .querySelector('#about-section')
      ?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden relative">
      <div
        className="max-w-5xl mx-auto w-full relative z-10"
        style={{ padding: '0 clamp(16px, 4vw, 48px)' }}
      >
        <div className="text-center mb-14">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 company-text-primary tracking-tight"
            initial={{ y: 30, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
          >
            We Don't Just Build Websites.
            <br />
            <span className="company-text-primary">
              We Engineer Digital Realities.
            </span>
          </motion.h1>

          <motion.p
            className="text-xl company-text-secondary max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            We are an AI-native development studio. We build cutting-edge
            applications powered by advanced AI technologies, creating
            innovative solutions for the digital future.
          </motion.p>
        </div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link
            href="/account"
            className="w-full sm:w-auto rounded-lg transition-all duration-200 flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold company-shadow-lg transform hover:scale-[1.02]"
            style={{
              backgroundColor: 'var(--company-button-primary-bg)',
              color: 'var(--company-button-primary-text)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                'var(--company-button-primary-hover)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                'var(--company-button-primary-bg)'
            }}
          >
            Explore Our Capabilities
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </Link>

          <Link
            href="/account"
            className="w-full sm:w-auto px-8 py-4 text-lg text-center font-bold rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 border-2"
            style={{
              color: 'var(--company-button-secondary-text)',
              borderColor: 'var(--company-button-secondary-border)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                'var(--company-button-secondary-hover-bg)'
              e.currentTarget.style.color =
                'var(--company-button-secondary-hover-text)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color =
                'var(--company-button-secondary-text)'
            }}
          >
            Get Started
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showArrow ? 1 : 0, y: showArrow ? 0 : 20 }}
        transition={{ duration: 0.3 }}
        onClick={scrollToNext}
        whileHover={{ y: 5 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="flex flex-col items-center gap-1"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-sm company-text-tertiary font-medium">
            Scroll
          </span>
          <svg
            className="w-6 h-6 company-text-tertiary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
