/**
 * Generate Resume PDF Script
 *
 * This script uses Puppeteer to convert the resume HTML page to a production-quality PDF.
 * It applies print-specific CSS and generates a clean, professional resume PDF.
 *
 * Usage:
 *   npm run generate-pdf
 *
 * Requirements:
 *   - Puppeteer installed (included in devDependencies)
 *   - Server running at localhost:3000 (or adjust URL below)
 */

const puppeteer = require('puppeteer')
const path = require('path')

async function generateResumePDF() {
  console.log('🚀 Starting PDF generation...')

  let browser
  try {
    // Launch headless browser
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })

    const page = await browser.newPage()

    // Set viewport for consistent rendering
    await page.setViewport({
      width: 1200,
      height: 1600,
      deviceScaleFactor: 2, // High DPI for crisp text
    })

    console.log('📄 Loading resume page...')

    // Load the resume page
    // Change this URL based on your environment:
    // - Development: http://localhost:3000/resume
    // - Production build: serve the out/ directory and point to it
    const resumeURL = process.env.RESUME_URL || 'http://localhost:3000'

    await page.goto(resumeURL, {
      waitUntil: 'networkidle2',
      timeout: 30000,
    })

    // Wait for fonts to load
    await page.evaluateHandle('document.fonts.ready')

    console.log('🎨 Applying print styles...')

    // Add custom print styles
    await page.addStyleTag({
      content: `
        /* Hide navigation and non-essential elements */
        nav, .no-print {
          display: none !important;
        }

        /* Optimize for print */
        body {
          background: white !important;
          color: black !important;
          font-size: 11pt;
        }

        /* Ensure proper page breaks */
        section {
          page-break-inside: avoid;
        }

        /* Clean margins */
        .container-custom {
          max-width: 100% !important;
          padding: 0 !important;
        }

        /* Optimize spacing */
        .section {
          padding: 1rem 0 !important;
        }

        /* Make sure colors print well */
        .gradient-text {
          color: #4f46e5 !important;
          -webkit-text-fill-color: #4f46e5 !important;
        }

        /* Remove shadows and effects */
        .glass, .neumorphic {
          box-shadow: none !important;
          background: white !important;
          border: 1px solid #e5e7eb !important;
        }
      `,
    })

    console.log('💾 Generating PDF...')

    // Generate PDF
    const outputPath = path.join(process.cwd(), 'public', 'resume.pdf')

    await page.pdf({
      path: outputPath,
      format: 'Letter', // 8.5 x 11 inches
      printBackground: false, // Don't print background colors/images
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in',
      },
      displayHeaderFooter: false,
      preferCSSPageSize: false,
    })

    console.log(`✅ PDF generated successfully: ${outputPath}`)
  } catch (error) {
    console.error('❌ Error generating PDF:', error)
    process.exit(1)
  } finally {
    if (browser) {
      await browser.close()
    }
  }
}

// Run the script
generateResumePDF()
  .then(() => {
    console.log('🎉 Done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Fatal error:', error)
    process.exit(1)
  })
