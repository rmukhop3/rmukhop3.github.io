'use client'

import { useEffect, useState, useCallback, useRef } from 'react'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(true)
  
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: -100, y: -100 })
  const dotPosRef = useRef({ x: -100, y: -100 })
  const ringPosRef = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number>()

  // Smooth animation loop
  const animate = useCallback(() => {
    // Lerp for smooth following
    const dotLerp = 0.35
    const ringLerp = 0.15
    
    dotPosRef.current.x += (posRef.current.x - dotPosRef.current.x) * dotLerp
    dotPosRef.current.y += (posRef.current.y - dotPosRef.current.y) * dotLerp
    
    ringPosRef.current.x += (posRef.current.x - ringPosRef.current.x) * ringLerp
    ringPosRef.current.y += (posRef.current.y - ringPosRef.current.y) * ringLerp
    
    if (dotRef.current) {
      dotRef.current.style.transform = `translate3d(${dotPosRef.current.x}px, ${dotPosRef.current.y}px, 0) translate(-50%, -50%)`
    }
    if (ringRef.current) {
      ringRef.current.style.transform = `translate3d(${ringPosRef.current.x}px, ${ringPosRef.current.y}px, 0) translate(-50%, -50%)`
    }
    
    rafRef.current = requestAnimationFrame(animate)
  }, [])

  const onMouseMove = useCallback((e: MouseEvent) => {
    posRef.current.x = e.clientX
    posRef.current.y = e.clientY
    if (!isVisible) setIsVisible(true)
  }, [isVisible])

  const onMouseLeave = useCallback(() => setIsVisible(false), [])
  const onMouseEnter = useCallback(() => setIsVisible(true), [])

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
    }
    checkTouch()
  }, [])

  useEffect(() => {
    if (isTouchDevice) return

    // Start animation loop
    rafRef.current = requestAnimationFrame(animate)

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.body.addEventListener('mouseleave', onMouseLeave)
    document.body.addEventListener('mouseenter', onMouseEnter)

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer')
      ) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer')
      ) {
        setIsHovering(false)
      }
    }

    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mouseout', handleMouseOut, { passive: true })

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMouseMove)
      document.body.removeEventListener('mouseleave', onMouseLeave)
      document.body.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [isTouchDevice, animate, onMouseMove, onMouseLeave, onMouseEnter])

  if (isTouchDevice) return null

  return (
    <>
      <style jsx global>{`
        @media (hover: hover) and (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          width: isHovering ? 12 : 8,
          height: isHovering ? 12 : 8,
          backgroundColor: 'white',
          borderRadius: '50%',
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.15s, height 0.15s, opacity 0.15s',
        }}
      />

      {/* Outer ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          width: isHovering ? 48 : 40,
          height: isHovering ? 48 : 40,
          border: `${isHovering ? 2 : 1.5}px solid var(--color-accent)`,
          borderRadius: '50%',
          opacity: isVisible ? (isHovering ? 0.8 : 0.4) : 0,
          transition: 'width 0.2s, height 0.2s, opacity 0.2s, border-width 0.2s',
        }}
      />
    </>
  )
}
