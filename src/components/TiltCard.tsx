'use client'

import { useRef, useState, useCallback, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface TiltCardProps {
  children: ReactNode
  className?: string
  tiltAmount?: number
  glareOpacity?: number
}

export default function TiltCard({
  children,
  className = '',
  tiltAmount = 10,
  glareOpacity = 0.2,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 })
  const [isHovering, setIsHovering] = useState(false)
  const rafRef = useRef<number>()

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    // Use RAF for smoother updates
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const mouseX = e.clientX - centerX
      const mouseY = e.clientY - centerY

      // Calculate rotation
      const rotateX = (mouseY / (rect.height / 2)) * -tiltAmount
      const rotateY = (mouseX / (rect.width / 2)) * tiltAmount

      // Calculate glare position (0-100%)
      const glareX = ((e.clientX - rect.left) / rect.width) * 100
      const glareY = ((e.clientY - rect.top) / rect.height) * 100

      setTilt({ rotateX, rotateY })
      setGlarePosition({ x: glareX, y: glareY })
    })
  }, [tiltAmount])

  const handleMouseEnter = useCallback(() => setIsHovering(true), [])

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    setIsHovering(false)
    setTilt({ rotateX: 0, rotateY: 0 })
    setGlarePosition({ x: 50, y: 50 })
  }, [])

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={false}
      animate={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        scale: isHovering ? 1.02 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 25,
        mass: 0.5,
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
        willChange: 'transform',
      }}
    >
      {children}

      {/* Glare effect overlay */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
        initial={false}
        animate={{
          opacity: isHovering ? glareOpacity : 0,
        }}
        transition={{ duration: 0.15 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(
              circle at ${glarePosition.x}% ${glarePosition.y}%,
              rgba(255, 255, 255, 0.4) 0%,
              transparent 60%
            )`,
          }}
        />
      </motion.div>

      {/* Subtle border glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          boxShadow: isHovering
            ? '0 0 30px rgba(139, 92, 246, 0.3), inset 0 0 30px rgba(139, 92, 246, 0.05)'
            : '0 0 0px transparent',
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}
