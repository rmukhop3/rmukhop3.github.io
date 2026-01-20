'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface GradientMeshProps {
  variant?: 'purple' | 'blue' | 'pink' | 'multicolor'
  className?: string
}

export default function GradientMesh({ variant = 'purple', className = '' }: GradientMeshProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.3])

  const gradients = {
    purple: {
      gradient1: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(139, 92, 246, 0.3), transparent)',
      gradient2: 'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(167, 139, 250, 0.2), transparent)',
      gradient3: 'radial-gradient(ellipse 60% 80% at 20% 100%, rgba(124, 58, 237, 0.25), transparent)',
    },
    blue: {
      gradient1: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(59, 130, 246, 0.3), transparent)',
      gradient2: 'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(96, 165, 250, 0.2), transparent)',
      gradient3: 'radial-gradient(ellipse 60% 80% at 20% 100%, rgba(37, 99, 235, 0.25), transparent)',
    },
    pink: {
      gradient1: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(236, 72, 153, 0.3), transparent)',
      gradient2: 'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(251, 113, 133, 0.2), transparent)',
      gradient3: 'radial-gradient(ellipse 60% 80% at 20% 100%, rgba(219, 39, 119, 0.25), transparent)',
    },
    multicolor: {
      gradient1: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(139, 92, 246, 0.3), transparent)',
      gradient2: 'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(236, 72, 153, 0.2), transparent)',
      gradient3: 'radial-gradient(ellipse 60% 80% at 20% 100%, rgba(59, 130, 246, 0.25), transparent)',
    },
  }

  const selectedGradients = gradients[variant]

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {/* Gradient layers */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute inset-0"
        style={{
          background: selectedGradients.gradient1,
          filter: 'blur(40px)',
        }}
      />

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute inset-0"
        style={{
          background: selectedGradients.gradient2,
          filter: 'blur(60px)',
        }}
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 3, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute inset-0"
        style={{
          background: selectedGradients.gradient3,
          filter: 'blur(80px)',
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </motion.div>
  )
}
