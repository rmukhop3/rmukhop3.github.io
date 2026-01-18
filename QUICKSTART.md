# Quick Start Guide

Get your portfolio running in 5 minutes!

## ⚡ Quick Setup (5 minutes)

```bash
# 1. Install dependencies
npm install

# 2. Generate placeholder assets
npm run preload-frames
node scripts/generate-project-images.js

# 3. Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) 🎉

## 📝 Customize Your Portfolio (10 minutes)

### Step 1: Update Your Information

Edit `data/resume.json`:

```json
{
  "name": "YOUR NAME",
  "title": "YOUR TITLE",
  "email": "your@email.com",
  "github": "yourusername",
  "linkedin": "yourprofile"
}
```

The site will automatically update!

### Step 2: Update Skills

In `data/resume.json`, edit the `skills` array:

```json
{
  "category": "Your Category",
  "items": [
    { "name": "Python", "level": 5, "icon": "code" }
  ]
}
```

**Skill levels:** 1-5 (displayed as progress bars)

**Available icons:** See `src/components/Icon.tsx` or use generic `code`

### Step 3: Add Your Projects

```json
{
  "id": "my-project",
  "title": "Project Name",
  "subtitle": "Company/Organization",
  "description": "What the project does",
  "tech": ["React", "Node.js", "AWS"],
  "start": "Jan 2023",
  "end": "Present"
}
```

### Step 4: Customize Theme

Edit `src/app/globals.css`:

```css
:root {
  --color-accent: #6366f1;  /* Change this! */
}
```

Pick a color from [Coolors](https://coolors.co) or [Color Hunt](https://colorhunt.co)

## 🎨 Add Real Assets (Optional)

### Replace Placeholder Frames

1. Create a video (10-20 seconds)
2. Extract frames:
   ```bash
   ffmpeg -i video.mp4 -vf "fps=30,scale=1920:1080" \
     public/frames/frame-%04d.webp
   ```

### Add Project Screenshots

1. Take screenshots of your projects
2. Optimize them:
   ```bash
   npx @squoosh/cli --webp public/projects/my-screenshot.png
   ```
3. Update `data/resume.json`:
   ```json
   {
     "hero": "/projects/my-screenshot.webp"
   }
   ```

## 🚀 Deploy (15 minutes)

### Option A: Vercel (Easiest)

```bash
npm i -g vercel
vercel login
vercel --prod
```

Your site is live! ✨

### Option B: GitHub Pages

```bash
npm run build
npx gh-pages -d out
```

Enable GitHub Pages in Settings → Pages

## ✅ Post-Launch Checklist

- [ ] Test on mobile device
- [ ] Check all links work
- [ ] Download resume PDF works
- [ ] Theme toggle works
- [ ] Run Lighthouse audit: `npx lighthouse https://yoursite.com --view`
- [ ] Share on LinkedIn!

## 🆘 Common Issues

**Frames not showing?**
```bash
npm run preload-frames
```

**Build fails?**
```bash
rm -rf .next node_modules
npm install
npm run build
```

**Need help?** Check [README.md](README.md) for detailed docs.

## 🎯 Next Steps

1. **SEO**: Add custom meta tags in `src/app/layout.tsx`
2. **Analytics**: Add Google Analytics or Vercel Analytics
3. **Contact Form**: Set up Formspree or serverless function
4. **Blog**: Add a blog section with MDX

## 📚 Learn More

- [Full Documentation](README.md)
- [Deployment Guide](DEPLOYMENT.md)
- [Next.js Docs](https://nextjs.org/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)

---

Built something cool? Share it! [@rmukhop3](https://github.com/rmukhop3)
