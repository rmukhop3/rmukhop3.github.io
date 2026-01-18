'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import resumeData from '@/data/resume.json'
import ScrollFrame from './ScrollFrame'

/**
 * Hero Component - Apple-style immersive scroll entrance
 *
 * Features:
 * - Full-screen hero with parallax effects
 * - Frame-by-frame animation driven by scroll position
 * - Transforms scale, translate, and opacity based on scroll
 * - Graceful fallback for prefers-reduced-motion
 */
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Track scroll progress through the hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Transform values based on scroll
  // Scale: 1 -> 0.8 (zoom out effect)
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  // Opacity: 1 -> 0 (fade out)
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.6, 0])
  // Y position: 0 -> 100 (parallax down)
  const y = useTransform(scrollYProgress, [0, 1], [0, 100])

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const handleDownloadResume = () => {
    // Trigger resume download
    window.open('/resume.pdf', '_blank')
  }

  const handleViewWork = () => {
    // Smooth scroll to projects section
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={containerRef}
      className="relative h-[200vh] bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)]"
      id="home"
    >
      {/* Sticky container for parallax effect */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Background frame animation - only if motion is enabled */}
        {!prefersReducedMotion && (
          <ScrollFrame
            scrollProgress={scrollYProgress}
            className="absolute inset-0 z-0"
          />
        )}

        {/* Static gradient background fallback */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10" />

        {/* Hero content */}
        <motion.div
          style={prefersReducedMotion ? {} : { scale, opacity, y }}
          className="relative z-10 container-custom text-center px-4"
        >
          {/* Profile Picture */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-8 flex justify-center"
          >
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-accent/20 shadow-2xl">
              <img
                src="/profile.jpg"
                alt={resumeData.name}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="heading-xl mb-6"
          >
            Hi, I'm{' '}
            <span className="gradient-text">
              {resumeData.name.split(' ')[0]}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="text-xl md:text-2xl lg:text-3xl text-[var(--text-secondary)] mb-4 max-w-4xl mx-auto"
          >
            {resumeData.title}
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
            className="text-lg md:text-xl text-[var(--text-tertiary)] mb-12 max-w-3xl mx-auto"
          >
            {resumeData.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={handleViewWork}
              className="btn-primary"
              aria-label="View my work"
            >
              View Work
            </button>
            <button
              onClick={handleDownloadResume}
              className="btn-secondary"
              aria-label="Download resume"
            >
              Download Resume
            </button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-6 h-10 border-2 border-[var(--text-tertiary)] rounded-full flex justify-center p-2"
            >
              <motion.div className="w-1.5 h-1.5 bg-[var(--text-tertiary)] rounded-full" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
