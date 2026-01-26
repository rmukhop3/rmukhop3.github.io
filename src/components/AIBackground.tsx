'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

interface MathSymbol {
  x: number
  y: number
  symbol: string
  opacity: number
  speed: number
  size: number
}

const MATH_SYMBOLS = [
  '∑', '∫', '∂', '∇', '∞', 'π', 'θ', 'λ', 'σ', 'μ',
  'Δ', 'Ω', '√', '≈', '≠', '∈', '∀', '∃', '⊗', '⊕',
  'α', 'β', 'γ', 'ε', 'φ', 'ψ', 'ω', '∝', '∧', '∨'
]

const AI_TERMS = [
  'f(x)', 'CNN', 'RNN', 'GPT', 'ML', 'DL', 'AI', 'NLP',
  '∂L/∂w', 'σ(x)', 'softmax', 'ReLU', 'tanh', 'LSTM',
  'P(A|B)', 'argmax', '∇θ', 'E[X]', 'Var(X)', 'H(X)'
]

export default function AIBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const nodesRef = useRef<Node[]>([])
  const symbolsRef = useRef<MathSymbol[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>()
  const [isMobile, setIsMobile] = useState(false)

  // Initialize nodes and symbols
  const initializeElements = useCallback((width: number, height: number) => {
    const nodeCount = isMobile ? 15 : 30
    const symbolCount = isMobile ? 10 : 20

    // Create neural network nodes
    nodesRef.current = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 3 + 2,
    }))

    // Create floating math symbols
    const allSymbols = [...MATH_SYMBOLS, ...AI_TERMS]
    symbolsRef.current = Array.from({ length: symbolCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      symbol: allSymbols[Math.floor(Math.random() * allSymbols.length)],
      opacity: Math.random() * 0.3 + 0.1,
      speed: Math.random() * 0.3 + 0.1,
      size: Math.random() * 14 + (isMobile ? 10 : 12),
    }))
  }, [isMobile])

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const width = canvas.width
    const height = canvas.height
    const isDark = document.documentElement.classList.contains('dark')

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw grid pattern
    ctx.strokeStyle = isDark ? 'rgba(139, 92, 246, 0.03)' : 'rgba(139, 92, 246, 0.05)'
    ctx.lineWidth = 1
    const gridSize = isMobile ? 60 : 40

    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    // Update and draw nodes
    const nodes = nodesRef.current
    const connectionDistance = isMobile ? 100 : 150
    const mouseInfluence = isMobile ? 80 : 120

    nodes.forEach((node, i) => {
      // Mouse interaction - nodes gently attracted to mouse
      const dx = mouseRef.current.x - node.x
      const dy = mouseRef.current.y - node.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      
      if (dist < mouseInfluence && dist > 0) {
        const force = (mouseInfluence - dist) / mouseInfluence * 0.02
        node.vx += (dx / dist) * force
        node.vy += (dy / dist) * force
      }

      // Update position
      node.x += node.vx
      node.y += node.vy

      // Damping
      node.vx *= 0.99
      node.vy *= 0.99

      // Bounce off edges
      if (node.x < 0 || node.x > width) node.vx *= -1
      if (node.y < 0 || node.y > height) node.vy *= -1

      // Keep within bounds
      node.x = Math.max(0, Math.min(width, node.x))
      node.y = Math.max(0, Math.min(height, node.y))

      // Draw connections to nearby nodes
      for (let j = i + 1; j < nodes.length; j++) {
        const other = nodes[j]
        const cdx = other.x - node.x
        const cdy = other.y - node.y
        const cdist = Math.sqrt(cdx * cdx + cdy * cdy)

        if (cdist < connectionDistance) {
          const opacity = (1 - cdist / connectionDistance) * 0.4
          ctx.strokeStyle = isDark 
            ? `rgba(167, 139, 250, ${opacity})` 
            : `rgba(139, 92, 246, ${opacity})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(other.x, other.y)
          ctx.stroke()
        }
      }

      // Draw node
      const gradient = ctx.createRadialGradient(
        node.x, node.y, 0,
        node.x, node.y, node.radius * 2
      )
      gradient.addColorStop(0, isDark ? 'rgba(167, 139, 250, 0.8)' : 'rgba(139, 92, 246, 0.8)')
      gradient.addColorStop(1, 'transparent')
      
      ctx.beginPath()
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()
    })

    // Update and draw math symbols
    symbolsRef.current.forEach((symbol) => {
      // Float upward
      symbol.y -= symbol.speed
      
      // Reset when off screen
      if (symbol.y < -50) {
        symbol.y = height + 50
        symbol.x = Math.random() * width
      }

      // Gentle horizontal drift
      symbol.x += Math.sin(symbol.y * 0.01) * 0.3

      // Draw symbol
      ctx.font = `${symbol.size}px "SF Mono", "Fira Code", monospace`
      ctx.fillStyle = isDark 
        ? `rgba(167, 139, 250, ${symbol.opacity})` 
        : `rgba(139, 92, 246, ${symbol.opacity})`
      ctx.textAlign = 'center'
      ctx.fillText(symbol.symbol, symbol.x, symbol.y)
    })

    animationRef.current = requestAnimationFrame(animate)
  }, [isMobile])

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
    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    handleResize()
    
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current
      if (!container) return
      const rect = container.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    // Touch support for mobile
    const handleTouchMove = (e: TouchEvent) => {
      const container = containerRef.current
      if (!container || !e.touches[0]) return
      const rect = container.getBoundingClientRect()
      mouseRef.current = {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
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
        style={{ opacity: 0.8 }}
      />
    </div>
  )
}
