'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  useEffect(() => {
    // Set page title for 404
    document.title = '404 - Page Not Found'

    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'The page you are looking for could not be found. Please check the URL or navigate back to the homepage.',
      )
    } else {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content =
        'The page you are looking for could not be found. Please check the URL or navigate back to the homepage.'
      document.head.appendChild(meta)
    }

    // Set robots meta
    const metaRobots = document.querySelector('meta[name="robots"]')
    if (metaRobots) {
      metaRobots.setAttribute('content', 'noindex, follow')
    } else {
      const meta = document.createElement('meta')
      meta.name = 'robots'
      meta.content = 'noindex, follow'
      document.head.appendChild(meta)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated 404 number */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-8"
        >
          <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-slate-600 to-slate-400 dark:from-slate-300 dark:to-slate-500 bg-clip-text text-transparent">
            404
          </h1>
        </motion.div>

        {/* Main content */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6 mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-800 dark:text-slate-200">
            Page Not Found
          </h2>

          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            The page you're looking for doesn't exist or has been moved. Let's
            get you back on track.
          </p>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-800 rounded-lg font-medium transition-all duration-200 hover:bg-slate-700 dark:hover:bg-slate-300 shadow-lg hover:shadow-xl"
            >
              <Home className="w-5 h-5" />
              Go Home
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600 rounded-lg font-medium transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-600 shadow-lg hover:shadow-xl"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
