'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface GradientMeshProps {
  variant?: 'hero' | 'about' | 'skills' | 'experience' | 'projects' | 'courses' | 'certifications' | 'contact'
  className?: string
}

export default function GradientMesh({ variant = 'hero', className = '' }: GradientMeshProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 0.7, 0.4])

  const gradients = {
    hero: {
      // Vibrant multicolor: Purple + Pink + Blue + Cyan
      gradient1: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(139, 92, 246, 0.4), transparent)',
      gradient2: 'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(236, 72, 153, 0.3), transparent)',
      gradient3: 'radial-gradient(ellipse 60% 80% at 20% 100%, rgba(59, 130, 246, 0.35), transparent)',
      gradient4: 'radial-gradient(ellipse 50% 60% at 90% 20%, rgba(6, 182, 212, 0.25), transparent)',
    },
    about: {
      // Purple to Violet gradient
      gradient1: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(139, 92, 246, 0.35), transparent)',
      gradient2: 'radial-gradient(ellipse 70% 60% at 80% 50%, rgba(167, 139, 250, 0.25), transparent)',
      gradient3: 'radial-gradient(ellipse 60% 80% at 20% 100%, rgba(124, 58, 237, 0.3), transparent)',
      gradient4: 'radial-gradient(ellipse 50% 50% at 10% 30%, rgba(196, 181, 253, 0.2), transparent)',
    },
    skills: {
      // Cyan to Blue gradient
      gradient1: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(6, 182, 212, 0.35), transparent)',
      gradient2: 'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(59, 130, 246, 0.3), transparent)',
      gradient3: 'radial-gradient(ellipse 70% 80% at 20% 100%, rgba(14, 165, 233, 0.25), transparent)',
      gradient4: 'radial-gradient(ellipse 50% 60% at 90% 20%, rgba(34, 211, 238, 0.2), transparent)',
    },
    experience: {
      // Emerald to Teal gradient
      gradient1: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(16, 185, 129, 0.3), transparent)',
      gradient2: 'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(20, 184, 166, 0.25), transparent)',
      gradient3: 'radial-gradient(ellipse 70% 80% at 20% 100%, rgba(5, 150, 105, 0.3), transparent)',
      gradient4: 'radial-gradient(ellipse 50% 60% at 10% 20%, rgba(45, 212, 191, 0.2), transparent)',
    },
    projects: {
      // Blue to Indigo gradient
      gradient1: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(59, 130, 246, 0.35), transparent)',
      gradient2: 'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(99, 102, 241, 0.3), transparent)',
      gradient3: 'radial-gradient(ellipse 70% 80% at 20% 100%, rgba(79, 70, 229, 0.25), transparent)',
      gradient4: 'radial-gradient(ellipse 50% 60% at 90% 10%, rgba(129, 140, 248, 0.2), transparent)',
    },
    courses: {
      // Orange to Amber gradient
      gradient1: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(251, 146, 60, 0.3), transparent)',
      gradient2: 'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(245, 158, 11, 0.25), transparent)',
      gradient3: 'radial-gradient(ellipse 70% 80% at 20% 100%, rgba(249, 115, 22, 0.3), transparent)',
      gradient4: 'radial-gradient(ellipse 50% 60% at 10% 20%, rgba(252, 211, 77, 0.2), transparent)',
    },
    certifications: {
      // Pink to Rose gradient
      gradient1: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(236, 72, 153, 0.35), transparent)',
      gradient2: 'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(251, 113, 133, 0.3), transparent)',
      gradient3: 'radial-gradient(ellipse 70% 80% at 20% 100%, rgba(219, 39, 119, 0.28), transparent)',
      gradient4: 'radial-gradient(ellipse 50% 60% at 90% 15%, rgba(253, 164, 175, 0.22), transparent)',
    },
    contact: {
      // Violet to Fuchsia gradient
      gradient1: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(167, 139, 250, 0.35), transparent)',
      gradient2: 'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(232, 121, 249, 0.3), transparent)',
      gradient3: 'radial-gradient(ellipse 70% 80% at 20% 100%, rgba(192, 132, 252, 0.25), transparent)',
      gradient4: 'radial-gradient(ellipse 50% 60% at 10% 10%, rgba(240, 171, 252, 0.2), transparent)',
    },
  }

  const selectedGradients = gradients[variant]

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {/* Gradient layer 1 - Main color */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          rotate: [0, 8, 0],
          x: ['0%', '5%', '0%'],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute inset-0"
        style={{
          background: selectedGradients.gradient1,
          filter: 'blur(60px)',
        }}
      />

      {/* Gradient layer 2 - Secondary color */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, -10, 0],
          x: ['0%', '-3%', '0%'],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute inset-0"
        style={{
          background: selectedGradients.gradient2,
          filter: 'blur(80px)',
        }}
      />

      {/* Gradient layer 3 - Accent color */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          rotate: [0, 6, 0],
          y: ['0%', '5%', '0%'],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
        className="absolute inset-0"
        style={{
          background: selectedGradients.gradient3,
          filter: 'blur(100px)',
        }}
      />

      {/* Gradient layer 4 - Highlight */}
      <motion.div
        animate={{
          scale: [1, 1.18, 1],
          rotate: [0, -7, 0],
          x: ['0%', '4%', '0%'],
          y: ['0%', '-3%', '0%'],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute inset-0"
        style={{
          background: selectedGradients.gradient4,
          filter: 'blur(70px)',
        }}
      />

      {/* Noise texture overlay for depth */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_var(--bg-primary)_100%)] opacity-30" />
    </motion.div>
  )
}
