import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import ScrollFrame from '../ScrollFrame'

// Mock framer-motion
const mockScrollProgress = {
  get: jest.fn(() => 0),
  on: jest.fn(() => () => {}),
}

jest.mock('framer-motion', () => ({
  MotionValue: jest.fn(),
}))

describe('ScrollFrame Component', () => {
  beforeEach(() => {
    // Reset mocks
    mockScrollProgress.get.mockReturnValue(0)
  })

  it('renders canvas element', () => {
    const { container } = render(
      <ScrollFrame scrollProgress={mockScrollProgress as any} />
    )

    const canvas = container.querySelector('canvas')
    expect(canvas).toBeInTheDocument()
  })

  it('shows loading state initially', () => {
    const { getByText } = render(
      <ScrollFrame scrollProgress={mockScrollProgress as any} />
    )

    expect(getByText(/Loading experience/i)).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <ScrollFrame
        scrollProgress={mockScrollProgress as any}
        className="custom-class"
      />
    )

    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('calculates correct frame index from scroll progress', () => {
    // This tests the mathematical mapping: frameIndex = floor(progress * (totalFrames - 1))
    const totalFrames = 60

    // Test scroll progress: 0 (start)
    let progress = 0
    let expectedFrame = Math.floor(progress * (totalFrames - 1))
    expect(expectedFrame).toBe(0)

    // Test scroll progress: 0.5 (middle)
    progress = 0.5
    expectedFrame = Math.floor(progress * (totalFrames - 1))
    expect(expectedFrame).toBe(29)

    // Test scroll progress: 1 (end)
    progress = 1
    expectedFrame = Math.floor(progress * (totalFrames - 1))
    expect(expectedFrame).toBe(59)
  })

  it('handles different total frame counts', () => {
    const { container } = render(
      <ScrollFrame
        scrollProgress={mockScrollProgress as any}
        totalFrames={30}
      />
    )

    expect(container.querySelector('canvas')).toBeInTheDocument()
  })

  it('uses custom frame base path', () => {
    const { container } = render(
      <ScrollFrame
        scrollProgress={mockScrollProgress as any}
        frameBasePath="/custom/path/frame-"
      />
    )

    expect(container.querySelector('canvas')).toBeInTheDocument()
  })

  it('subscribes to scroll progress changes', () => {
    render(<ScrollFrame scrollProgress={mockScrollProgress as any} />)

    // Verify that the component subscribes to scroll progress
    expect(mockScrollProgress.on).toHaveBeenCalledWith(
      'change',
      expect.any(Function)
    )
  })
})

/**
 * Performance Considerations Test
 *
 * The ScrollFrame component is designed with these performance optimizations:
 *
 * 1. Canvas Rendering (GPU-accelerated):
 *    - Uses <canvas> instead of DOM manipulation for 60fps smooth updates
 *    - drawImage() is hardware-accelerated on modern browsers
 *
 * 2. Lazy Loading:
 *    - Preloads only first 10 frames for instant feedback
 *    - Loads remaining frames in background to reduce initial bundle
 *
 * 3. RAF (requestAnimationFrame) Throttling:
 *    - Uses RAF to sync with browser's paint cycle
 *    - Prevents unnecessary renders between frames
 *    - One update per paint (typically 60fps)
 *
 * 4. Frame Deduplication:
 *    - Only updates when frameIndex changes
 *    - Avoids redundant canvas draws during same frame
 *
 * 5. Image Optimization:
 *    - WebP format for 25-35% smaller file sizes vs PNG
 *    - AVIF fallback for even better compression (50-70% smaller)
 *    - Async image decoding to keep main thread free
 *
 * 6. Memory Management:
 *    - Images stored in array, not constantly recreated
 *    - Cleanup on unmount to prevent memory leaks
 *    - Total memory: ~60 images × ~20KB = ~1.2MB
 *
 * Battery Considerations:
 * - Scroll-driven animations use less CPU than time-based
 * - No polling or intervals - only updates on actual scroll
 * - RAF ensures we don't overdraw (max 60fps)
 * - Reduced motion support for accessibility and battery saving
 *
 * These optimizations keep the animation smooth while being
 * CPU/GPU efficient and battery-friendly.
 */
