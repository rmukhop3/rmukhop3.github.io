'use client'

import { useEffect, useState, useCallback, useRef } from 'react'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const rafRef = useRef<number>()
  const ticking = useRef(false)

  const updateProgress = useCallback(() => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrolled = window.scrollY
    const newProgress = scrollableHeight > 0 ? Math.min(scrolled / scrollableHeight, 1) : 0
    setProgress(newProgress)
    ticking.current = false
  }, [])

  const onScroll = useCallback(() => {
    if (!ticking.current) {
      rafRef.current = requestAnimationFrame(updateProgress)
      ticking.current = true
    }
  }, [updateProgress])

  useEffect(() => {
    // Initial calculation
    updateProgress()
    
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', updateProgress, { passive: true })
    
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', updateProgress)
    }
  }, [onScroll, updateProgress])

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accent via-accent-light to-accent origin-left z-[100]"
      style={{ 
        transform: `scaleX(${progress})`,
        transition: 'transform 0.1s linear',
      }}
    />
  )
}
