/**
 * Generate Project Placeholder Images
 *
 * Creates placeholder images for projects until you add real screenshots.
 * Uses Sharp to generate gradient backgrounds with project names.
 *
 * Usage:
 *   node scripts/generate-project-images.js
 */

const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

// Load resume data
const resumeData = require('../data/resume.json')

const WIDTH = 1200
const HEIGHT = 630 // Standard OG image size

const gradients = [
  ['#667eea', '#764ba2'], // Purple
  ['#f093fb', '#f5576c'], // Pink
  ['#4facfe', '#00f2fe'], // Blue
  ['#43e97b', '#38f9d7'], // Green
  ['#fa709a', '#fee140'], // Orange
]

async function generateProjectImage(project, index) {
  const outputDir = path.join(process.cwd(), 'public', 'projects')

  // Create directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // Select gradient based on index
  const [color1, color2] = gradients[index % gradients.length]

  // Create SVG
  const svg = `
    <svg width="${WIDTH}" height="${HEIGHT}">
      <defs>
        <linearGradient id="grad${index}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad${index})"/>

      <!-- Overlay pattern -->
      <g opacity="0.1">
        ${Array.from({ length: 20 }).map((_, i) => `
          <circle cx="${Math.random() * WIDTH}" cy="${Math.random() * HEIGHT}"
                  r="${20 + Math.random() * 50}" fill="white"/>
        `).join('')}
      </g>

      <!-- Project title -->
      <text x="50%" y="45%"
            font-family="Arial, sans-serif"
            font-size="60"
            font-weight="bold"
            fill="white"
            text-anchor="middle"
            dominant-baseline="middle">
        ${project.title.length > 30 ? project.title.substring(0, 27) + '...' : project.title}
      </text>

      <!-- Subtitle -->
      <text x="50%" y="55%"
            font-family="Arial, sans-serif"
            font-size="30"
            fill="rgba(255,255,255,0.9)"
            text-anchor="middle"
            dominant-baseline="middle">
        ${project.subtitle}
      </text>
    </svg>
  `

  const buffer = Buffer.from(svg)

  // Generate hero image
  const heroPath = path.join(outputDir, `${project.id}-hero.jpg`)
  await sharp(buffer)
    .jpeg({ quality: 90 })
    .toFile(heroPath)

  // Generate gallery images (3 variations)
  for (let i = 1; i <= 3; i++) {
    const galleryPath = path.join(outputDir, `${project.id}-${i}.jpg`)

    // Create slight variations for gallery
    const variantSvg = svg.replace(
      '<g opacity="0.1">',
      `<g opacity="${0.05 + i * 0.03}">`
    )

    await sharp(Buffer.from(variantSvg))
      .jpeg({ quality: 85 })
      .toFile(galleryPath)
  }

  console.log(`✅ Generated images for: ${project.title}`)
}

async function generateAllProjectImages() {
  console.log('🎨 Generating project placeholder images...\n')

  for (let i = 0; i < resumeData.projects.length; i++) {
    await generateProjectImage(resumeData.projects[i], i)
  }

  console.log('\n✨ All project images generated!')
  console.log(`📂 Location: public/projects/`)
  console.log('\n💡 Tip: Replace these with actual project screenshots for production')
}

// Run
generateAllProjectImages().catch(console.error)
