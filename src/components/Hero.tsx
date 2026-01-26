'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import resumeData from '@/data/resume.json'
import ScrollFrame from './ScrollFrame'
import GradientMesh from './GradientMesh'
import PlanetaryBackground from './PlanetaryBackground'
import AnimatedText, { AnimatedGradientText } from './AnimatedText'
import MagneticButton from './MagneticButton'

// Floating orb configuration
const ORBS = [
  { size: 80, x: 15, y: 20, speed: 0.03, delay: 0 },
  { size: 60, x: 85, y: 25, speed: 0.025, delay: 0.5 },
  { size: 100, x: 10, y: 70, speed: 0.02, delay: 1 },
  { size: 50, x: 80, y: 75, speed: 0.035, delay: 1.5 },
  { size: 70, x: 50, y: 15, speed: 0.028, delay: 2 },
  { size: 40, x: 25, y: 85, speed: 0.032, delay: 0.8 },
  { size: 55, x: 75, y: 55, speed: 0.022, delay: 1.2 },
]

/**
 * Hero Component - Apple-style immersive scroll entrance
 *
 * Features:
 * - Full-screen hero with parallax effects
 * - Mouse-tracking 3D parallax effect
 * - Interactive floating orbs
 * - Spotlight glow following cursor
 * - Graceful fallback for prefers-reduced-motion
 */
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)
  const orbRefs = useRef<(HTMLDivElement | null)[]>([])
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const mousePos = useRef({ x: 0.5, y: 0.5 })
  const targetMousePos = useRef({ x: 0.5, y: 0.5 })
  const animationFrameId = useRef<number>()

  // Track scroll progress through the hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Transform values based on scroll
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.6, 0])
  const y = useTransform(scrollYProgress, [0, 1], [0, 100])

  // Smooth mouse position interpolation
  const lerp = (start: number, end: number, factor: number) => 
    start + (end - start) * factor

  // Animation loop for smooth mouse tracking
  const animate = useCallback(() => {
    mousePos.current.x = lerp(mousePos.current.x, targetMousePos.current.x, 0.08)
    mousePos.current.y = lerp(mousePos.current.y, targetMousePos.current.y, 0.08)

    const { x, y } = mousePos.current
    const centerX = (x - 0.5) * 2 // -1 to 1
    const centerY = (y - 0.5) * 2 // -1 to 1

    // Update spotlight position
    if (spotlightRef.current) {
      spotlightRef.current.style.background = `radial-gradient(600px circle at ${x * 100}% ${y * 100}%, rgba(139, 92, 246, 0.15), transparent 40%)`
    }

    // Update orb positions with parallax
    orbRefs.current.forEach((orb, index) => {
      if (orb) {
        const orbConfig = ORBS[index]
        const parallaxX = centerX * 30 * orbConfig.speed * 20
        const parallaxY = centerY * 30 * orbConfig.speed * 20
        orb.style.transform = `translate3d(${parallaxX}px, ${parallaxY}px, 0)`
      }
    })

    animationFrameId.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      if (!stickyRef.current) return
      const rect = stickyRef.current.getBoundingClientRect()
      targetMousePos.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      }
    }

    // Start animation loop
    if (!mediaQuery.matches) {
      animationFrameId.current = requestAnimationFrame(animate)
      window.addEventListener('mousemove', handleMouseMove, { passive: true })
    }

    return () => {
      mediaQuery.removeEventListener('change', handler)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [animate])

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
      <div ref={stickyRef} className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Planetary space background */}
        <PlanetaryBackground />
        
        {/* Animated gradient mesh background */}
        <GradientMesh variant="hero" className="z-0" />

        {/* Mouse-following spotlight glow */}
        <div 
          ref={spotlightRef}
          className="absolute inset-0 z-[1] pointer-events-none transition-opacity duration-300 hidden md:block"
          style={{ background: 'radial-gradient(600px circle at 50% 50%, rgba(139, 92, 246, 0.15), transparent 40%)' }}
        />

        {/* Floating interactive orbs - hidden on mobile for performance */}
        {!prefersReducedMotion && ORBS.map((orb, index) => (
          <div
            key={index}
            ref={el => { orbRefs.current[index] = el }}
            className="absolute rounded-full pointer-events-none will-change-transform hidden md:block"
            style={{
              width: orb.size,
              height: orb.size,
              left: `${orb.x}%`,
              top: `${orb.y}%`,
              background: `radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.3), rgba(168, 85, 247, 0.1) 50%, transparent 70%)`,
              filter: 'blur(1px)',
              animation: `float-orb ${3 + index * 0.5}s ease-in-out infinite`,
              animationDelay: `${orb.delay}s`,
            }}
          />
        ))}

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--bg-primary)_0%,_transparent_50%)]" />

        {/* Hero content with mouse parallax */}
        <motion.div
          style={prefersReducedMotion ? {} : { scale, opacity, y }}
          className="relative z-10 container-custom text-center px-4"
        >
          {/* Profile Picture with 3D tilt effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-8 flex justify-center perspective-1000"
          >
            <div 
              className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-accent/20 shadow-2xl transition-transform duration-200 hover:scale-105"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img
                src="/profile.jpg"
                alt={resumeData.name}
                className="w-full h-full object-cover"
              />
              {/* Shine overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
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
