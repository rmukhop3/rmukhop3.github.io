'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import resumeData from '@/data/resume.json'
import ScrollFrame from './ScrollFrame'
import GradientMesh from './GradientMesh'
import AnimatedText, { AnimatedGradientText } from './AnimatedText'
import MagneticButton from './MagneticButton'

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
      className="relative h-[200vh] bg-[var(--bg-primary)]"
      id="home"
    >
      {/* Sticky container for parallax effect */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Animated gradient mesh background */}
        <GradientMesh variant="hero" className="z-0" />

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--bg-primary)_0%,_transparent_50%)]" />

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
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-accent/20 shadow-2xl">
              <img
                src="/profile.jpg"
                alt={resumeData.name}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="heading-xl mb-6"
          >
            <AnimatedText text="Hi, I'm" delay={0.3} />{' '}
            <AnimatedGradientText
              text={resumeData.name.split(' ')[0]}
              delay={0.5}
            />
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
            <MagneticButton strength={0.4}>
              <button
                onClick={handleViewWork}
                className="btn-primary"
                aria-label="View my work"
              >
                View Work
              </button>
            </MagneticButton>
            <MagneticButton strength={0.4}>
              <button
                onClick={handleDownloadResume}
                className="btn-secondary"
                aria-label="Download resume"
              >
                Download Resume
              </button>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
