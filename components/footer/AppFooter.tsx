'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { SITE_NAME } from '@/utils/constants'

export default function AppFooter() {
  const year = new Date().getFullYear()

  const footerLinks = {
    company: [
      { name: 'Capabilities', href: '/#about-section' },
      { name: 'Account', href: '/account' },
    ],
    product: [
      { name: 'Get Started', href: '/account' },
    ],
  }

  return (
    <footer className="company-bg-secondary border-t company-border-primary">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <span className="text-xl font-bold company-text-primary">
                  {SITE_NAME}
                </span>
              </Link>
              <p className="company-text-secondary mb-4 max-w-md">
                Engineering Digital Leverage. We build AI-native solutions that
                push the boundaries of what's possible.
              </p>
              <p className="company-text-tertiary text-sm">
                Contact:{' '}
                <a
                  href="mailto:support@pyxl.pro"
                  className="hover:company-text-primary transition-colors"
                >
                  support@pyxl.pro
                </a>
              </p>
            </motion.div>
          </div>

          <div className="col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold company-text-primary mb-4">
                Company
              </h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="company-text-secondary hover:company-text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold company-text-primary mb-4">
                Product
              </h3>
              <ul className="space-y-2">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="company-text-secondary hover:company-text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="mt-8 pt-8 border-t company-border-primary flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="company-text-tertiary text-sm mb-4 md:mb-0">
            © {year} {SITE_NAME}. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
