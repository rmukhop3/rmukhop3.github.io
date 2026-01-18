/**
 * Preload Frames Script
 *
 * This script generates placeholder frame images for the scroll-driven animation.
 * In production, replace these with actual video frames or design assets.
 *
 * Usage:
 *   npm run preload-frames
 *
 * Requirements:
 *   - Sharp installed (included in devDependencies)
 *   - Creates WebP frames for optimal performance
 */

const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

// Configuration
const TOTAL_FRAMES = 60
const FRAME_WIDTH = 1920
const FRAME_HEIGHT = 1080
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'frames')

/**
 * Generate a gradient frame with frame number overlay
 * This is a placeholder - replace with your actual video frames
 */
async function generatePlaceholderFrame(frameIndex, totalFrames) {
  // Calculate color gradient based on frame position
  const progress = frameIndex / (totalFrames - 1)

  // Create gradient colors
  const r1 = Math.floor(99 + progress * (67 - 99)) // #6366f1 to #4338ca
  const g1 = Math.floor(102 + progress * (56 - 102))
  const b1 = Math.floor(241 + progress * (202 - 241))

  // Create SVG with gradient background
  const svg = `
    <svg width="${FRAME_WIDTH}" height="${FRAME_HEIGHT}">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:rgb(${r1},${g1},${b1});stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgb(67,56,202);stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)"/>
      <text x="50%" y="50%" font-family="Arial" font-size="120" fill="white" text-anchor="middle" dominant-baseline="middle" opacity="0.3">
        Frame ${frameIndex + 1}
      </text>
    </svg>
  `

  return Buffer.from(svg)
}

async function generateFrames() {
  console.log('🎬 Generating frame sequence...')
  console.log(`Total frames: ${TOTAL_FRAMES}`)
  console.log(`Resolution: ${FRAME_WIDTH}x${FRAME_HEIGHT}`)
  console.log(`Output directory: ${OUTPUT_DIR}`)

  // Create output directory if it doesn't exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
    console.log('📁 Created frames directory')
  }

  console.log('\n🖼️  Generating frames...')

  const startTime = Date.now()

  // Generate all frames
  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const frameNumber = String(i).padStart(4, '0')
    const outputPath = path.join(OUTPUT_DIR, `frame-${frameNumber}.webp`)

    // Generate placeholder frame
    const svgBuffer = await generatePlaceholderFrame(i, TOTAL_FRAMES)

    // Convert to WebP with sharp
    await sharp(svgBuffer)
      .webp({
        quality: 85,
        effort: 6, // Balance between compression and speed
      })
      .toFile(outputPath)

    // Progress indicator
    const progress = Math.floor(((i + 1) / TOTAL_FRAMES) * 100)
    process.stdout.write(`\r  Progress: ${progress}% (${i + 1}/${TOTAL_FRAMES})`)
  }

  const endTime = Date.now()
  const duration = ((endTime - startTime) / 1000).toFixed(2)

  console.log(`\n\n✅ Generated ${TOTAL_FRAMES} frames in ${duration}s`)
  console.log('📊 Frame size: ~10-20KB each (WebP compressed)')
  console.log(
    '💡 Tip: Replace these placeholder frames with your actual video frames or design assets'
  )
  console.log(
    '\n📝 To extract frames from a video, use FFmpeg:'
  )
  console.log(
    '   ffmpeg -i input.mp4 -vf "fps=30,scale=1920:1080" public/frames/frame-%04d.webp'
  )
}

// Alternative: Extract frames from video using FFmpeg
// Uncomment this function if you have a video file to extract from
/*
async function extractFramesFromVideo(videoPath) {
  const { execSync } = require('child_process')

  console.log('🎥 Extracting frames from video...')
  console.log(`Input: ${videoPath}`)

  try {
    execSync(
      `ffmpeg -i "${videoPath}" -vf "fps=${TOTAL_FRAMES}/10,scale=${FRAME_WIDTH}:${FRAME_HEIGHT}" -q:v 2 "${OUTPUT_DIR}/frame-%04d.webp"`,
      { stdio: 'inherit' }
    )
    console.log('✅ Frames extracted successfully')
  } catch (error) {
    console.error('❌ Error extracting frames:', error.message)
    process.exit(1)
  }
}
*/

// Run the script
generateFrames()
  .then(() => {
    console.log('\n🎉 Done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Error:', error)
    process.exit(1)
  })
