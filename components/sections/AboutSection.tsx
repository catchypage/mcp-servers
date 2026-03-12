'use client'

import { motion } from 'framer-motion'

export default function AboutSection() {
  return (
    <section id="about-section" className="py-20 relative overflow-hidden">
      <div
        className="max-w-4xl mx-auto text-center relative z-10"
        style={{ padding: '0 clamp(16px, 4vw, 48px)' }}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-8 company-text-primary"
          initial={{ y: 50, opacity: 0, scale: 0.8 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 80 }}
          viewport={{ once: true }}
        >
          We Thrive on Complexity
        </motion.h2>

        <motion.p
          className="text-xl company-text-secondary max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          Our expertise lies where standard solutions fail. We specialize in
          building AI-powered applications that push the boundaries of what's
          possible in the digital landscape.
        </motion.p>

        <motion.p
          className="text-xl company-text-secondary mt-4 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          We create innovative applications that leverage ChatGPT, advanced AI
          APIs, and cutting-edge technologies to deliver exceptional user
          experiences and solve complex business challenges.
        </motion.p>

        <motion.div
          className="mt-8 flex items-center justify-center"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="w-16 h-1 company-bg-primary rounded-full" />
          <div className="w-2 h-2 company-bg-primary rounded-full mx-4" />
          <div className="w-16 h-1 company-bg-primary rounded-full" />
        </motion.div>
      </div>
    </section>
  )
}
