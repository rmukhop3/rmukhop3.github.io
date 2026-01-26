'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  twinkleSpeed: number
  twinklePhase: number
}

interface Planet {
  x: number
  y: number
  radius: number
  orbitRadius: number
  orbitSpeed: number
  orbitAngle: number
  color: string
  glowColor: string
  hasRing: boolean
  moons: Moon[]
}

interface Moon {
  orbitRadius: number
  orbitSpeed: number
  orbitAngle: number
  size: number
}

interface ShootingStar {
  x: number
  y: number
  length: number
  speed: number
  angle: number
  opacity: number
  active: boolean
}

export default function PlanetaryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const starsRef = useRef<Star[]>([])
  const planetsRef = useRef<Planet[]>([])
  const shootingStarsRef = useRef<ShootingStar[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>()
  const timeRef = useRef(0)
  const [isMobile, setIsMobile] = useState(false)

  // Planet color palettes
  const PLANET_CONFIGS = [
    { color: '#8b5cf6', glowColor: 'rgba(139, 92, 246, 0.4)', hasRing: true },   // Purple (main accent)
    { color: '#6366f1', glowColor: 'rgba(99, 102, 241, 0.3)', hasRing: false },  // Indigo
    { color: '#a855f7', glowColor: 'rgba(168, 85, 247, 0.3)', hasRing: true },   // Violet
    { color: '#7c3aed', glowColor: 'rgba(124, 58, 237, 0.4)', hasRing: false },  // Purple dark
    { color: '#c084fc', glowColor: 'rgba(192, 132, 252, 0.3)', hasRing: false }, // Light purple
  ]

  // Initialize celestial objects
  const initializeElements = useCallback((width: number, height: number) => {
    const starCount = isMobile ? 80 : 150
    const planetCount = isMobile ? 3 : 5

    // Create stars
    starsRef.current = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.01,
      twinklePhase: Math.random() * Math.PI * 2,
    }))

    // Create planets with orbits
    const centerX = width / 2
    const centerY = height / 2
    
    planetsRef.current = Array.from({ length: planetCount }, (_, i) => {
      const config = PLANET_CONFIGS[i % PLANET_CONFIGS.length]
      const baseOrbitRadius = (isMobile ? 100 : 150) + i * (isMobile ? 80 : 120)
      const moonCount = config.hasRing ? 0 : Math.floor(Math.random() * 2)
      
      return {
        x: centerX,
        y: centerY,
        radius: (isMobile ? 8 : 12) + Math.random() * (isMobile ? 15 : 25),
        orbitRadius: baseOrbitRadius + Math.random() * 50,
        orbitSpeed: (0.0003 + Math.random() * 0.0004) * (i % 2 === 0 ? 1 : -1),
        orbitAngle: Math.random() * Math.PI * 2,
        color: config.color,
        glowColor: config.glowColor,
        hasRing: config.hasRing,
        moons: Array.from({ length: moonCount }, () => ({
          orbitRadius: 20 + Math.random() * 15,
          orbitSpeed: 0.002 + Math.random() * 0.003,
          orbitAngle: Math.random() * Math.PI * 2,
          size: 2 + Math.random() * 3,
        })),
      }
    })

    // Initialize shooting stars pool
    shootingStarsRef.current = Array.from({ length: 3 }, () => ({
      x: 0,
      y: 0,
      length: 80 + Math.random() * 60,
      speed: 8 + Math.random() * 6,
      angle: Math.PI / 4 + (Math.random() - 0.5) * 0.5,
      opacity: 0,
      active: false,
    }))
  }, [isMobile])

  // Spawn shooting star randomly
  const spawnShootingStar = useCallback((width: number, height: number) => {
    const inactive = shootingStarsRef.current.find(s => !s.active)
    if (inactive && Math.random() < 0.002) { // Low probability each frame
      inactive.x = Math.random() * width * 0.8
      inactive.y = Math.random() * height * 0.3
      inactive.opacity = 1
      inactive.active = true
    }
  }, [])

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const width = canvas.width
    const height = canvas.height
    const isDark = document.documentElement.classList.contains('dark')
    const centerX = width / 2
    const centerY = height / 2
    
    // Light mode opacity multiplier - make everything much more subtle
    const lightModeOpacity = isDark ? 1 : 0.25

    timeRef.current += 1

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw twinkling stars
    starsRef.current.forEach((star) => {
      const twinkle = Math.sin(timeRef.current * star.twinkleSpeed + star.twinklePhase)
      const currentOpacity = star.opacity * (0.5 + twinkle * 0.5) * lightModeOpacity
      
      ctx.beginPath()
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
      ctx.fillStyle = isDark 
        ? `rgba(255, 255, 255, ${currentOpacity})`
        : `rgba(139, 92, 246, ${currentOpacity})`
      ctx.fill()

      // Add glow to larger stars - only in dark mode
      if (star.size > 1.5 && isDark) {
        const glow = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, star.size * 3
        )
        glow.addColorStop(0, `rgba(200, 200, 255, ${currentOpacity * 0.5})`)
        glow.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()
      }
    })

    // Draw orbital paths (subtle) - only in dark mode
    if (isDark) {
      planetsRef.current.forEach((planet) => {
        ctx.beginPath()
        ctx.arc(centerX, centerY, planet.orbitRadius, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.08)'
        ctx.lineWidth = 1
        ctx.stroke()
      })
    }

    // Update and draw planets
    planetsRef.current.forEach((planet) => {
      // Update orbital position
      planet.orbitAngle += planet.orbitSpeed

      // Mouse parallax effect
      const parallaxX = (mouseRef.current.x - 0.5) * 20
      const parallaxY = (mouseRef.current.y - 0.5) * 20

      // Calculate position
      const planetX = centerX + Math.cos(planet.orbitAngle) * planet.orbitRadius + parallaxX
      const planetY = centerY + Math.sin(planet.orbitAngle) * planet.orbitRadius * 0.4 + parallaxY // Elliptical

      // Draw planet glow - reduced in light mode
      const glowOpacity = isDark ? 1 : 0.3
      const glowGradient = ctx.createRadialGradient(
        planetX, planetY, planet.radius * 0.5,
        planetX, planetY, planet.radius * 3
      )
      const glowColor = planet.glowColor.replace(/[\d.]+\)$/, `${parseFloat(planet.glowColor.match(/[\d.]+\)$/)?.[0] || '0.3') * glowOpacity})`)
      glowGradient.addColorStop(0, glowColor)
      glowGradient.addColorStop(1, 'transparent')
      ctx.beginPath()
      ctx.arc(planetX, planetY, planet.radius * 3, 0, Math.PI * 2)
      ctx.fillStyle = glowGradient
      ctx.fill()

      // Draw ring (if applicable) - only in dark mode
      if (planet.hasRing && isDark) {
        ctx.save()
        ctx.translate(planetX, planetY)
        ctx.scale(1, 0.3) // Flatten for perspective
        
        ctx.beginPath()
        ctx.arc(0, 0, planet.radius * 2, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(167, 139, 250, 0.4)'
        ctx.lineWidth = planet.radius * 0.3
        ctx.stroke()
        
        ctx.restore()
      }

      // Draw planet body - more subtle in light mode
      ctx.globalAlpha = lightModeOpacity
      const planetGradient = ctx.createRadialGradient(
        planetX - planet.radius * 0.3, planetY - planet.radius * 0.3, 0,
        planetX, planetY, planet.radius
      )
      planetGradient.addColorStop(0, isDark ? '#fff' : planet.color)
      planetGradient.addColorStop(0.1, planet.color)
      planetGradient.addColorStop(1, isDark ? '#1a1a2e' : planet.color)
      
      ctx.beginPath()
      ctx.arc(planetX, planetY, planet.radius, 0, Math.PI * 2)
      ctx.fillStyle = planetGradient
      ctx.fill()
      ctx.globalAlpha = 1

      // Draw moons - only in dark mode
      if (isDark) {
        planet.moons.forEach((moon) => {
          moon.orbitAngle += moon.orbitSpeed
          const moonX = planetX + Math.cos(moon.orbitAngle) * moon.orbitRadius
          const moonY = planetY + Math.sin(moon.orbitAngle) * moon.orbitRadius * 0.5

          ctx.beginPath()
          ctx.arc(moonX, moonY, moon.size, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(200, 200, 220, 0.8)'
          ctx.fill()
        })
      }
    })

    // Update and draw shooting stars - only in dark mode
    if (isDark) {
      spawnShootingStar(width, height)
      shootingStarsRef.current.forEach((star) => {
        if (!star.active) return

        // Move
        star.x += Math.cos(star.angle) * star.speed
        star.y += Math.sin(star.angle) * star.speed
        star.opacity -= 0.015

        if (star.opacity <= 0 || star.x > width || star.y > height) {
          star.active = false
          return
        }

        // Draw trail
        const gradient = ctx.createLinearGradient(
          star.x, star.y,
          star.x - Math.cos(star.angle) * star.length,
          star.y - Math.sin(star.angle) * star.length
        )
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`)
        gradient.addColorStop(1, 'transparent')

        ctx.beginPath()
        ctx.moveTo(star.x, star.y)
        ctx.lineTo(
          star.x - Math.cos(star.angle) * star.length,
          star.y - Math.sin(star.angle) * star.length
        )
        ctx.strokeStyle = gradient
        ctx.lineWidth = 2
        ctx.lineCap = 'round'
        ctx.stroke()
      })
    }

    animationRef.current = requestAnimationFrame(animate)
  }, [spawnShootingStar])

  // Handle resize
  const handleResize = useCallback(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const width = container.clientWidth
    const height = container.clientHeight

    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`

    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.scale(dpr, dpr)
    }

    setIsMobile(width < 768)
    initializeElements(width, height)
  }, [initializeElements])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    handleResize()

    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current
      if (!container) return
      const rect = container.getBoundingClientRect()
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      const container = containerRef.current
      if (!container || !e.touches[0]) return
      const rect = container.getBoundingClientRect()
      mouseRef.current = {
        x: (e.touches[0].clientX - rect.left) / rect.width,
        y: (e.touches[0].clientY - rect.top) / rect.height,
      }
    }

    window.addEventListener('resize', handleResize, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [handleResize, animate])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ opacity: 0.9 }}
      />
    </div>
  )
}
