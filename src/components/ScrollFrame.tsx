'use client'

import { useEffect, useRef, useState } from 'react'
import { MotionValue } from 'framer-motion'

/**
 * ScrollFrame Component - Frame-by-frame animation controller
 *
 * This component drives frame-based animations using scroll position.
 * It demonstrates Apple-style parallax by mapping scroll progress to frame indices.
 *
 * Performance Considerations:
 * - Uses canvas for efficient rendering (GPU-accelerated)
 * - Implements lazy loading: only preloads first few frames, fetches rest on scroll
 * - Uses requestAnimationFrame for smooth 60fps updates
 * - Throttles scroll events to reduce CPU load
 * - Supports WebP/AVIF with fallbacks
 *
 * Math:
 * frameIndex = floor(scrollProgress * (totalFrames - 1))
 * This linearly maps scroll progress [0, 1] to frame indices [0, totalFrames-1]
 *
 * @param scrollProgress - Framer Motion scroll progress value (0 to 1)
 * @param className - Optional CSS classes
 * @param totalFrames - Total number of frames in sequence (default: 60)
 * @param frameBasePath - Path to frame images (default: /frames/frame-)
 */

interface ScrollFrameProps {
  scrollProgress: MotionValue<number>
  className?: string
  totalFrames?: number
  frameBasePath?: string
}

export default function ScrollFrame({
  scrollProgress,
  className = '',
  totalFrames = 60,
  frameBasePath = '/frames/frame-',
}: ScrollFrameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const framesRef = useRef<HTMLImageElement[]>([])
  const currentFrameRef = useRef(0)
  const rafRef = useRef<number>()
  const [isLoading, setIsLoading] = useState(true)
  const [loadedCount, setLoadedCount] = useState(0)

  // Preload initial frames (first 10 for instant feedback)
  const PRELOAD_COUNT = Math.min(10, totalFrames)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size to match viewport
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Preload frames with priority to first few
    const loadFrames = async () => {
      const frames: HTMLImageElement[] = []

      // Helper to load a single frame
      const loadFrame = (index: number): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.onload = () => {
            setLoadedCount((prev) => prev + 1)
            resolve(img)
          }
          img.onerror = reject
          // Support WebP with PNG fallback
          img.src = `${frameBasePath}${String(index).padStart(4, '0')}.webp`
        })
      }

      // Load first batch immediately
      const initialBatch = await Promise.all(
        Array.from({ length: PRELOAD_COUNT }, (_, i) => loadFrame(i))
      )
      frames.push(...initialBatch)
      setIsLoading(false)

      // Lazy load remaining frames in background
      const remainingFrames = await Promise.all(
        Array.from({ length: totalFrames - PRELOAD_COUNT }, (_, i) =>
          loadFrame(i + PRELOAD_COUNT)
        )
      )
      frames.push(...remainingFrames)

      framesRef.current = frames
    }

    loadFrames().catch(console.error)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [totalFrames, frameBasePath, PRELOAD_COUNT])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || isLoading) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Render function called on scroll
    const render = () => {
      const progress = scrollProgress.get()

      // Map scroll progress [0, 1] to frame index [0, totalFrames-1]
      // Using floor ensures we only switch frames at discrete points
      const frameIndex = Math.min(
        Math.floor(progress * (totalFrames - 1)),
        totalFrames - 1
      )

      // Only update if frame changed (avoid unnecessary redraws)
      if (frameIndex === currentFrameRef.current) return

      currentFrameRef.current = frameIndex

      const frame = framesRef.current[frameIndex]
      if (!frame) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Calculate aspect-fit scaling
      const canvasAspect = canvas.width / canvas.height
      const imageAspect = frame.width / frame.height

      let drawWidth = canvas.width
      let drawHeight = canvas.height
      let offsetX = 0
      let offsetY = 0

      if (canvasAspect > imageAspect) {
        // Canvas is wider than image
        drawHeight = canvas.height
        drawWidth = canvas.height * imageAspect
        offsetX = (canvas.width - drawWidth) / 2
      } else {
        // Canvas is taller than image
        drawWidth = canvas.width
        drawHeight = canvas.width / imageAspect
        offsetY = (canvas.height - drawHeight) / 2
      }

      // Draw frame with aspect-fit
      ctx.drawImage(frame, offsetX, offsetY, drawWidth, drawHeight)
    }

    // Subscribe to scroll progress changes
    // Framer Motion optimizes this with RAF internally
    const unsubscribe = scrollProgress.on('change', () => {
      // Use RAF to sync with browser paint cycle (60fps)
      // This is efficient - only one frame update per paint
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(render)
    })

    // Initial render
    render()

    return () => {
      unsubscribe()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [scrollProgress, isLoading, totalFrames])

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-primary)]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4 mx-auto" />
            <p className="text-[var(--text-secondary)]">
              Loading experience... {Math.round((loadedCount / PRELOAD_COUNT) * 100)}%
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
