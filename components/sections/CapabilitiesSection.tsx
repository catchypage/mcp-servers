'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function CapabilitiesSection() {
  const [hoveredIndex, setHoveredIndex] = useState(0)

  const capabilities = [
    {
      id: '01',
      title: 'AI-Powered Applications',
      description:
        'We build sophisticated applications that integrate ChatGPT, AI APIs, and machine learning to create intelligent, responsive systems that adapt to user needs.',
      icon: '🤖',
    },
    {
      id: '02',
      title: 'Advanced Web Development',
      description:
        'We create cutting-edge web applications with modern technologies like React, Next.js, and WebGL, delivering exceptional user experiences and performance.',
      icon: '⚡',
    },
    {
      id: '03',
      title: 'Scalable Solutions',
      description:
        'We engineer robust, scalable platforms that handle high traffic and complex operations. Our solutions are built to grow with your business using modern cloud technologies.',
      icon: '🚀',
    },
  ]

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-8 company-text-primary"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Our Domain
        </motion.h2>

        <motion.p
          className="text-xl company-text-secondary text-center mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          We specialize in creating innovative solutions that combine AI
          technologies with cutting-edge web development:
        </motion.p>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.id}
              className="group relative"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredIndex(index)}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="absolute -inset-1 company-bg-primary rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-sm" />

              <motion.div
                className="relative company-bg-secondary rounded-2xl p-8 company-shadow-md border company-border-primary hover:company-shadow-xl transition-all duration-300 h-full flex flex-col"
                animate={{
                  borderColor:
                    hoveredIndex === index
                      ? 'var(--company-accent-primary)'
                      : 'var(--company-border-primary)',
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    className="w-16 h-16 company-bg-primary rounded-2xl flex items-center justify-center company-shadow-lg"
                    animate={{
                      rotate: hoveredIndex === index ? 5 : 0,
                      scale: hoveredIndex === index ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-2xl">{capability.icon}</span>
                  </motion.div>
                  <span className="text-2xl font-bold company-text-tertiary">
                    {capability.id}
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold company-text-primary mb-4 leading-tight">
                    {capability.title}
                  </h3>
                  <p className="company-text-secondary leading-relaxed">
                    {capability.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
