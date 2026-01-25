'use client'

import { useEffect, useState } from 'react'

interface GradientMeshProps {
  variant?: 'hero' | 'about' | 'skills' | 'experience' | 'projects' | 'courses' | 'certifications' | 'contact'
  className?: string
}

export default function GradientMesh({ variant = 'hero', className = '' }: GradientMeshProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true) // Default true to prevent flash

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const gradients = {
    hero: {
      // Vibrant multicolor: Purple + Pink + Blue + Cyan
      gradient1: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(139, 92, 246, 0.4), transparent)',
      gradient2: 'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(236, 72, 153, 0.3), transparent)',
      gradient3: 'radial-gradient(ellipse 60% 80% at 20% 100%, rgba(59, 130, 246, 0.35), transparent)',
      gradient4: 'radial-gradient(ellipse 50% 60% at 90% 20%, rgba(6, 182, 212, 0.25), transparent)',
    },
    about: {
      // Purple to Violet gradient - centered
      gradient1: 'radial-gradient(ellipse 90% 40% at 50% 50%, rgba(139, 92, 246, 0.35), transparent)',
      gradient2: 'radial-gradient(ellipse 70% 50% at 75% 45%, rgba(167, 139, 250, 0.25), transparent)',
      gradient3: 'radial-gradient(ellipse 60% 45% at 25% 55%, rgba(124, 58, 237, 0.3), transparent)',
      gradient4: 'radial-gradient(ellipse 50% 40% at 15% 50%, rgba(196, 181, 253, 0.2), transparent)',
    },
    skills: {
      // Cyan to Blue gradient - centered
      gradient1: 'radial-gradient(ellipse 90% 40% at 50% 50%, rgba(6, 182, 212, 0.35), transparent)',
      gradient2: 'radial-gradient(ellipse 70% 50% at 75% 45%, rgba(59, 130, 246, 0.3), transparent)',
      gradient3: 'radial-gradient(ellipse 60% 45% at 25% 55%, rgba(14, 165, 233, 0.25), transparent)',
      gradient4: 'radial-gradient(ellipse 50% 40% at 85% 50%, rgba(34, 211, 238, 0.2), transparent)',
    },
    experience: {
      // Emerald to Teal gradient - centered
      gradient1: 'radial-gradient(ellipse 90% 40% at 50% 50%, rgba(16, 185, 129, 0.3), transparent)',
      gradient2: 'radial-gradient(ellipse 70% 50% at 75% 45%, rgba(20, 184, 166, 0.25), transparent)',
      gradient3: 'radial-gradient(ellipse 60% 45% at 25% 55%, rgba(5, 150, 105, 0.3), transparent)',
      gradient4: 'radial-gradient(ellipse 50% 40% at 15% 50%, rgba(45, 212, 191, 0.2), transparent)',
    },
    projects: {
      // Blue to Indigo gradient - centered
      gradient1: 'radial-gradient(ellipse 90% 40% at 50% 50%, rgba(59, 130, 246, 0.35), transparent)',
      gradient2: 'radial-gradient(ellipse 70% 50% at 75% 45%, rgba(99, 102, 241, 0.3), transparent)',
      gradient3: 'radial-gradient(ellipse 60% 45% at 25% 55%, rgba(79, 70, 229, 0.25), transparent)',
      gradient4: 'radial-gradient(ellipse 50% 40% at 85% 50%, rgba(129, 140, 248, 0.2), transparent)',
    },
    courses: {
      // Orange to Amber gradient - centered
      gradient1: 'radial-gradient(ellipse 90% 40% at 50% 50%, rgba(251, 146, 60, 0.3), transparent)',
      gradient2: 'radial-gradient(ellipse 70% 50% at 75% 45%, rgba(245, 158, 11, 0.25), transparent)',
      gradient3: 'radial-gradient(ellipse 60% 45% at 25% 55%, rgba(249, 115, 22, 0.3), transparent)',
      gradient4: 'radial-gradient(ellipse 50% 40% at 15% 50%, rgba(252, 211, 77, 0.2), transparent)',
    },
    certifications: {
      // Pink to Rose gradient - centered
      gradient1: 'radial-gradient(ellipse 90% 40% at 50% 50%, rgba(236, 72, 153, 0.35), transparent)',
      gradient2: 'radial-gradient(ellipse 70% 50% at 75% 45%, rgba(251, 113, 133, 0.3), transparent)',
      gradient3: 'radial-gradient(ellipse 60% 45% at 25% 55%, rgba(219, 39, 119, 0.28), transparent)',
      gradient4: 'radial-gradient(ellipse 50% 40% at 85% 50%, rgba(253, 164, 175, 0.22), transparent)',
    },
    contact: {
      // Violet to Fuchsia gradient - centered
      gradient1: 'radial-gradient(ellipse 90% 40% at 50% 50%, rgba(167, 139, 250, 0.35), transparent)',
      gradient2: 'radial-gradient(ellipse 70% 50% at 75% 45%, rgba(232, 121, 249, 0.3), transparent)',
      gradient3: 'radial-gradient(ellipse 60% 45% at 25% 55%, rgba(192, 132, 252, 0.25), transparent)',
      gradient4: 'radial-gradient(ellipse 50% 40% at 15% 50%, rgba(240, 171, 252, 0.2), transparent)',
    },
  }

  const selectedGradients = gradients[variant]

  return (
    <div 
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ contain: 'strict' }}
    >
      {/* Gradient layer 1 - Main color - CSS animation for performance */}
      <div
        className={`absolute inset-0 ${prefersReducedMotion ? '' : 'animate-gradient-1'}`}
        style={{
          background: selectedGradients.gradient1,
          filter: 'blur(60px)',
          transform: 'translateZ(0)',
        }}
      />

      {/* Gradient layer 2 - Secondary color */}
      <div
        className={`absolute inset-0 ${prefersReducedMotion ? '' : 'animate-gradient-2'}`}
        style={{
          background: selectedGradients.gradient2,
          filter: 'blur(80px)',
          transform: 'translateZ(0)',
        }}
      />

      {/* Static gradient layers for depth without animation overhead */}
      <div
        className="absolute inset-0"
        style={{
          background: selectedGradients.gradient3,
          filter: 'blur(100px)',
          opacity: 0.7,
          transform: 'translateZ(0)',
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: selectedGradients.gradient4,
          filter: 'blur(70px)',
          opacity: 0.5,
          transform: 'translateZ(0)',
        }}
      />

      {/* Noise texture overlay for depth */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          transform: 'translateZ(0)',
        }}
      />

      {/* Subtle vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_var(--bg-primary)_100%)] opacity-30" />

      {/* Vertical fade mask - fades to white/primary at top and bottom */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, var(--bg-primary) 0%, transparent 25%, transparent 75%, var(--bg-primary) 100%)`,
        }}
      />
    </div>
  )
}
