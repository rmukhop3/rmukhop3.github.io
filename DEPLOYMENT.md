# Deployment Guide

Complete guide for deploying your portfolio to various platforms.

## 📋 Pre-Deployment Checklist

- [ ] Update `data/resume.json` with your actual information
- [ ] Generate or add custom frames to `public/frames/`
- [ ] Test locally: `npm run dev`
- [ ] Run build: `npm run build`
- [ ] Test production build: `npm start`
- [ ] Run tests: `npm test`
- [ ] Check accessibility: `npx lighthouse http://localhost:3000`
- [ ] Generate resume PDF: `npm run generate-pdf`

## 🚀 Deployment Options

### Option 1: GitHub Pages (Static Hosting)

**Best for:** Free hosting, simple deployment

```bash
# 1. Build the site
npm run build

# 2. Add .nojekyll file to out directory
touch out/.nojekyll

# 3. Create gh-pages branch and deploy
git add -f out
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix out origin gh-pages

# Or use gh-pages npm package
npm install -D gh-pages
npx gh-pages -d out
```

**Configure GitHub Pages:**
1. Go to repository Settings > Pages
2. Source: Deploy from branch `gh-pages`
3. Folder: `/ (root)`
4. Save

**Custom Domain (Optional):**
1. Add `CNAME` file to `public/` directory with your domain
2. Update DNS records at your domain provider:
   ```
   Type: CNAME
   Name: www (or @)
   Value: yourusername.github.io
   ```

### Option 2: Vercel (Recommended)

**Best for:** Automatic deployments, serverless functions, edge network

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

**Or connect via GitHub:**
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure:
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `out`
4. Deploy

**Environment Variables (if using serverless contact form):**
- Add in Vercel Dashboard > Settings > Environment Variables
- `FORMSPREE_ENDPOINT` or custom API keys

### Option 3: Netlify

**Best for:** Continuous deployment, forms, split testing

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Production deploy
netlify deploy --prod
```

**Or connect via GitHub:**
1. Go to [netlify.com](https://netlify.com)
2. New site from Git
3. Configure:
   - Build command: `npm run build`
   - Publish directory: `out`
4. Deploy

**Netlify Forms (Optional):**
Update `Contact.tsx` form with:
```html
<form name="contact" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contact" />
  <!-- rest of form -->
</form>
```

### Option 4: AWS S3 + CloudFront

**Best for:** Full AWS integration, CDN, custom infrastructure

```bash
# Build site
npm run build

# Sync to S3 bucket
aws s3 sync out/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

**Setup:**
1. Create S3 bucket
2. Enable static website hosting
3. Set bucket policy for public read
4. Create CloudFront distribution
5. Point to S3 bucket
6. Add custom domain (Route 53)
7. Configure SSL certificate (ACM)

## 🔧 Build Optimization

### Reduce Bundle Size

```bash
# Analyze bundle
npm run build
# Check .next/build-manifest.json

# Install bundle analyzer
npm i @next/bundle-analyzer

# Add to next.config.js:
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)

# Analyze
ANALYZE=true npm run build
```

### Image Optimization

```bash
# Convert images to WebP
npm i -g @squoosh/cli

# Optimize all images in public/
find public -name "*.png" -o -name "*.jpg" | \
  xargs -I {} @squoosh/cli --webp {}
```

### Performance Checklist

- [ ] Lazy load images and heavy components
- [ ] Use `next/image` for automatic optimization
- [ ] Enable gzip/brotli compression
- [ ] Minimize JavaScript bundle
- [ ] Use CDN for static assets
- [ ] Enable HTTP/2
- [ ] Set proper cache headers

## 🔐 Security

### Content Security Policy

Add to `next.config.js`:

```js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
]

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}
```

## 📊 Analytics Setup

### Google Analytics

```bash
npm install @next/third-parties
```

Add to `layout.tsx`:
```tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
      <GoogleAnalytics gaId="G-XXXXXXXXXX" />
    </html>
  )
}
```

### Vercel Analytics

```bash
npm i @vercel/analytics
```

Add to `layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

## 🔄 CI/CD Setup

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear all caches
rm -rf .next out node_modules package-lock.json
npm install
npm run build
```

### Assets Not Loading

- Check `next.config.js` has `output: 'export'`
- Verify `basePath` is set correctly for GitHub Pages
- Check browser console for 404 errors

### Routing Issues

For static export, Next.js generates HTML files:
- `/about` becomes `/about.html`
- Configure web server to serve without `.html` extension
- Or use client-side routing only

## 📱 PWA Setup (Optional)

```bash
npm install next-pwa
```

Create `next.config.js`:
```js
const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = withPWA({
  // your config
})
```

Add `manifest.json` to `public/`:
```json
{
  "name": "Riyank Mukhopadhyay - Portfolio",
  "short_name": "Portfolio",
  "description": "Machine Learning Engineer Portfolio",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0f172a",
  "theme_color": "#6366f1",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

## 🎯 SEO Optimization

### Sitemap Generation

Create `scripts/generate-sitemap.js`:

```js
const fs = require('fs')
const path = require('path')

const BASE_URL = 'https://rmukhop3.github.io'

const pages = [
  '',
  '#about',
  '#skills',
  '#experience',
  '#projects',
  '#contact',
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${BASE_URL}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`

fs.writeFileSync(
  path.join(process.cwd(), 'public', 'sitemap.xml'),
  sitemap
)

console.log('✅ Sitemap generated')
```

Add to `package.json`:
```json
"scripts": {
  "generate-sitemap": "node scripts/generate-sitemap.js"
}
```

### Robots.txt

Create `public/robots.txt`:
```
User-agent: *
Allow: /

Sitemap: https://rmukhop3.github.io/sitemap.xml
```

## 📈 Post-Deployment

### Monitor Performance

- [ ] Run Lighthouse audit
- [ ] Check PageSpeed Insights
- [ ] Monitor Core Web Vitals
- [ ] Test on multiple devices
- [ ] Verify analytics tracking

### Test Checklist

- [ ] All links work
- [ ] Images load correctly
- [ ] Forms submit properly
- [ ] PDF download works
- [ ] Theme toggle persists
- [ ] Mobile responsive
- [ ] Accessibility (screen reader)
- [ ] SEO meta tags present
- [ ] Social sharing previews

## 🆘 Support

If you encounter issues:
1. Check build logs for errors
2. Verify Node.js version (18+)
3. Clear caches and rebuild
4. Check platform-specific docs:
   - [Vercel](https://vercel.com/docs)
   - [Netlify](https://docs.netlify.com)
   - [GitHub Pages](https://docs.github.com/en/pages)

---

Happy deploying! 🚀
