# Complete File Structure

## 📂 Directory Tree

```
rmukhop3.github.io/sweet-mendel/
├── 📄 Configuration Files
│   ├── package.json              # Dependencies & scripts
│   ├── next.config.js            # Next.js configuration (static export)
│   ├── tailwind.config.js        # Tailwind CSS customization
│   ├── tsconfig.json             # TypeScript configuration
│   ├── postcss.config.js         # PostCSS for Tailwind
│   ├── jest.config.js            # Jest testing configuration
│   ├── jest.setup.js             # Jest setup file
│   ├── .eslintrc.json            # ESLint rules
│   └── .gitignore                # Git ignore patterns
│
├── 📁 src/
│   ├── 📁 app/                   # Next.js App Router
│   │   ├── layout.tsx            # Root layout (SEO, metadata, theme)
│   │   ├── page.tsx              # Home page (all sections)
│   │   └── globals.css           # Global styles & CSS variables
│   │
│   ├── 📁 components/            # React Components
│   │   ├── Hero.tsx              # Hero section with scroll animations
│   │   ├── ScrollFrame.tsx       # Frame-by-frame animation controller
│   │   ├── StickyPanel.tsx       # Sticky storytelling panels
│   │   ├── ProjectOverlay.tsx    # Project detail modal
│   │   ├── Icon.tsx              # SVG icon components (18+ icons)
│   │   ├── Navigation.tsx        # Responsive nav with mobile menu
│   │   ├── ThemeProvider.tsx     # Dark/light theme context & toggle
│   │   ├── Footer.tsx            # Footer with links & theme toggle
│   │   │
│   │   ├── 📁 sections/          # Page Sections
│   │   │   ├── About.tsx         # About section with stats
│   │   │   ├── Skills.tsx        # Skills grid with categories
│   │   │   ├── Experience.tsx    # Timeline with expandable cards
│   │   │   ├── Projects.tsx      # Project cards with overlays
│   │   │   └── Contact.tsx       # Contact form & social links
│   │   │
│   │   └── 📁 __tests__/         # Unit Tests
│   │       ├── ProjectCard.test.tsx     # Project component tests
│   │       └── ScrollFrame.test.tsx     # Scroll animation tests
│   │
│   └── 📁 data/
│       └── resume.json           # Single source of truth for content
│
├── 📁 public/                    # Static Assets
│   ├── 📁 frames/                # Scroll animation frames (60 WebP images)
│   │   ├── frame-0001.webp       # Frame 1
│   │   ├── frame-0002.webp       # Frame 2
│   │   └── ...                   # Frames 3-60
│   │
│   ├── 📁 projects/              # Project images
│   │   ├── sarah-hero.jpg        # Project hero images
│   │   ├── sarah-1.jpg           # Project gallery images
│   │   └── ...                   # More project images
│   │
│   ├── resume.pdf                # Generated resume PDF
│   ├── favicon.ico               # Site favicon
│   ├── robots.txt                # SEO robots file
│   └── sitemap.xml               # SEO sitemap
│
├── 📁 scripts/                   # Utility Scripts
│   ├── generate-resume-pdf.js    # Generate PDF from HTML (Puppeteer)
│   ├── preload-frames.js         # Generate placeholder frames (Sharp)
│   └── generate-project-images.js # Generate project placeholders
│
├── 📁 .next/                     # Next.js build output (gitignored)
├── 📁 out/                       # Static export output (gitignored)
├── 📁 node_modules/              # Dependencies (gitignored)
│
└── 📄 Documentation
    ├── README.md                 # Main documentation (comprehensive)
    ├── QUICKSTART.md             # 5-minute quick start guide
    ├── DEPLOYMENT.md             # Deployment guide (all platforms)
    └── FILE_STRUCTURE.md         # This file
```

## 📋 File Descriptions

### Configuration Files

| File | Purpose | Key Settings |
|------|---------|--------------|
| `package.json` | NPM config | Scripts, dependencies, version |
| `next.config.js` | Next.js config | Static export, image optimization |
| `tailwind.config.js` | Tailwind CSS | Theme colors, animations, dark mode |
| `tsconfig.json` | TypeScript | Strict mode, path aliases (@/*) |
| `jest.config.js` | Testing | jsdom environment, module mapping |

### Source Files (`src/`)

#### App Directory
- **`layout.tsx`**: Root layout with SEO metadata, JSON-LD schema, theme provider
- **`page.tsx`**: Main page composing all sections
- **`globals.css`**: CSS variables, theme definitions, utility classes, print styles

#### Components

| Component | Lines | Purpose |
|-----------|-------|---------|
| `Hero.tsx` | ~150 | Full-screen hero with parallax scroll effects |
| `ScrollFrame.tsx` | ~200 | Canvas-based frame-by-frame animation engine |
| `StickyPanel.tsx` | ~60 | Reusable sticky scroll panel wrapper |
| `ProjectOverlay.tsx` | ~180 | Modal for project details with animations |
| `Icon.tsx` | ~250 | 18+ inline SVG icons with accessibility |
| `Navigation.tsx` | ~120 | Responsive nav with mobile menu |
| `ThemeProvider.tsx` | ~60 | Theme context (dark/light mode) |
| `Footer.tsx` | ~100 | Footer with links and theme toggle |

#### Sections

| Section | Purpose | Data Source |
|---------|---------|-------------|
| `About.tsx` | Bio, stats, social links | `resume.json` |
| `Skills.tsx` | Skills grid by category | `resume.json.skills[]` |
| `Experience.tsx` | Timeline with expandable cards | `resume.json.experience[]` |
| `Projects.tsx` | Project grid with overlays | `resume.json.projects[]` |
| `Contact.tsx` | Contact form & info | `resume.json` contact fields |

### Data Schema (`data/resume.json`)

```typescript
interface Resume {
  // Personal Info
  name: string
  title: string
  tagline: string
  location: string
  email: string
  phone: string
  website: string
  github: string
  linkedin: string
  summary: string

  // Skills
  skills: {
    category: string
    items: {
      name: string
      level: 1 | 2 | 3 | 4 | 5
      icon: string
    }[]
  }[]

  // Experience
  experience: {
    id: string
    company: string
    location: string
    role: string
    start: string
    end: string
    description: string
    bullets: string[]
    tech: string[]
  }[]

  // Projects
  projects: {
    id: string
    title: string
    subtitle: string
    description: string
    challenge?: string
    solution?: string
    tech: string[]
    highlights?: string[]
    start: string
    end: string
    live?: string
    repo?: string
    paper?: string
  }[]

  // Education
  education: {
    degree: string
    school: string
    location: string
    specialization: string
    start: string
    end: string
    gpa: string
    courses: string[]
  }[]
}
```

### Scripts

| Script | Purpose | Dependencies |
|--------|---------|--------------|
| `generate-resume-pdf.js` | Convert HTML to PDF | Puppeteer |
| `preload-frames.js` | Generate placeholder frames | Sharp |
| `generate-project-images.js` | Generate project images | Sharp |

### NPM Scripts

```json
{
  "dev": "next dev",                    // Development server
  "build": "next build",                // Production build
  "start": "next start",                // Serve production build
  "lint": "next lint",                  // Run ESLint
  "test": "jest --watch",               // Run tests (watch)
  "test:ci": "jest --ci",               // Run tests (CI)
  "generate-pdf": "node scripts/generate-resume-pdf.js",
  "preload-frames": "node scripts/preload-frames.js"
}
```

## 🔧 Tech Stack

### Frontend
- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Inline SVG components

### Build & Dev Tools
- **Package Manager**: npm
- **Bundler**: Webpack (via Next.js)
- **Compiler**: SWC (via Next.js)
- **Linter**: ESLint
- **Formatter**: Prettier (optional)

### Testing
- **Framework**: Jest
- **Library**: React Testing Library
- **Environment**: jsdom

### Utilities
- **PDF Generation**: Puppeteer
- **Image Processing**: Sharp
- **Type Checking**: TypeScript

## 📊 Bundle Breakdown (estimated)

```
Total JavaScript: ~180 KB gzipped

├── React + React DOM: ~45 KB
├── Next.js runtime: ~35 KB
├── Framer Motion: ~50 KB
├── Components: ~30 KB
├── Resume data: ~5 KB
└── Utilities: ~15 KB
```

## 🎨 Asset Sizes

```
Frames (60 WebP images):
- Each frame: ~15-20 KB
- Total: ~1.2 MB
- Lazy loaded (preload 10, fetch rest on scroll)

Project Images:
- Hero images: ~100-150 KB each (JPEG)
- Gallery images: ~80-120 KB each
- Total: ~1-2 MB depending on project count

Fonts:
- Inter (Latin subset): ~50 KB
- Self-hosted via next/font
```

## 🔍 Key Features by File

### Performance Optimizations
- **`ScrollFrame.tsx`**: Canvas rendering, RAF throttling, lazy loading
- **`Hero.tsx`**: Reduced motion support, transform animations
- **`globals.css`**: CSS containment, will-change hints

### Accessibility
- **All components**: ARIA attributes, semantic HTML
- **`Navigation.tsx`**: Keyboard navigation, focus trap
- **`ProjectOverlay.tsx`**: ESC to close, click outside
- **`Icon.tsx`**: Proper aria-labels

### SEO
- **`layout.tsx`**: Open Graph, Twitter Cards, JSON-LD
- **`page.tsx`**: Semantic headings hierarchy
- **Public files**: robots.txt, sitemap.xml

## 📱 Responsive Breakpoints

Defined in `tailwind.config.js`:
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

## 🎭 Theme System

CSS Variables in `globals.css`:

```css
:root {
  /* Light mode */
  --color-accent: #6366f1
  --bg-primary: #ffffff
  --text-primary: #111827
}

.dark {
  /* Dark mode */
  --color-accent: #818cf8
  --bg-primary: #0f172a
  --text-primary: #f1f5f9
}
```

## 🚀 Build Output

After `npm run build`:

```
out/
├── index.html              # Main page
├── _next/
│   ├── static/
│   │   ├── chunks/         # JS bundles
│   │   └── css/            # Compiled CSS
├── frames/                 # Copied from public/
├── projects/               # Copied from public/
└── resume.pdf              # Copied from public/
```

---

This structure provides:
✅ Easy maintenance (single data source)
✅ Fast development (hot reload)
✅ Optimal performance (code splitting)
✅ Great DX (TypeScript, clear separation)
✅ Production ready (static export)
