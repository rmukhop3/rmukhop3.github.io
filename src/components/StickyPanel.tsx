'use client'

import { ReactNode, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * StickyPanel Component - Apple-style sticky storytelling panels
 *
 * Creates a panel that sticks while scrolling through content,
 * with parallax effects on child elements.
 *
 * Performance:
 * - Uses CSS position: sticky for native browser optimization
 * - Framer Motion scroll transforms are GPU-accelerated
 * - No layout thrashing - all transforms use transform property
 *
 * @param children - Content to display in the panel
 * @param className - Additional CSS classes
 * @param height - Height of the scroll area (default: 100vh)
 */

interface StickyPanelProps {
  children: ReactNode
  className?: string
  height?: string
}

export default function StickyPanel({
  children,
  className = '',
  height = '100vh',
}: StickyPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Track scroll progress through this panel
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Parallax effect: content moves slower than scroll
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.3])

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ height }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y, opacity }}
          className="w-full"
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}
