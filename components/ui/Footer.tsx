'use client'

import Link from 'next/link'
import { Heart, Star, Calendar } from 'lucide-react'
import { useBrand } from '@/utils/use-brand'

const Footer = () => {
  const brand = useBrand()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900/80 backdrop-blur-xl border-t border-gray-700/50 mt-auto relative z-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* App Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Star className="w-6 h-6 text-purple-400" />
              <h3 className="text-lg font-bold text-white">{brand.name}</h3>
            </div>
            <p className="text-sm text-gray-300">
              Your daily cosmic guidance and astrological insights
            </p>
            <div className="flex items-center text-xs text-gray-400">
              <Calendar className="w-3 h-3 mr-1" />
              {currentYear}
            </div>
          </div>

          {/* Horoscopes */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Horoscopes</h4>
            <div className="space-y-2">
              <Link
                href="/horoscopes/daily"
                className="block text-sm text-gray-300 hover:text-white transition-colors"
              >
                Daily Horoscope
              </Link>
              <Link
                href="/horoscopes/weekly"
                className="block text-sm text-gray-300 hover:text-white transition-colors"
              >
                Weekly Horoscope
              </Link>
              <Link
                href="/horoscopes/monthly"
                className="block text-sm text-gray-300 hover:text-white transition-colors"
              >
                Monthly Horoscope
              </Link>
              <Link
                href="/horoscopes/2025"
                className="block text-sm text-gray-300 hover:text-white transition-colors"
              >
                2025 Horoscope
              </Link>
            </div>
          </div>

          {/* Astrology */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Astrology</h4>
            <div className="space-y-2">
              <Link
                href="/astrology/birth-chart"
                className="block text-sm text-gray-300 hover:text-white transition-colors"
              >
                Birth Chart
              </Link>
              <Link
                href="/compatibility"
                className="block text-sm text-gray-300 hover:text-white transition-colors"
              >
                Compatibility
              </Link>
              <Link
                href="/horoscopes/chinese"
                className="block text-sm text-gray-300 hover:text-white transition-colors"
              >
                Chinese Horoscope
              </Link>
              <Link
                href="/personality"
                className="block text-sm text-gray-300 hover:text-white transition-colors"
              >
                Personality Tests
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Legal</h4>
            <div className="space-y-2">
              <Link
                href="/policy"
                className="block text-sm text-gray-300 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/pricing"
                className="block text-sm text-gray-300 hover:text-white transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/terms"
                className="block text-sm text-gray-300 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/contact"
                className="block text-sm text-gray-300 hover:text-white transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700/50 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-400" />
              <span>for cosmic explorers</span>
            </div>
            <div className="text-sm text-gray-400">
              © {currentYear} {brand.name}. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
