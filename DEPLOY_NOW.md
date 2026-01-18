# Deploy to GitHub Pages - Quick Guide

Your site is currently showing the README because GitHub Pages needs the **built** files, not the source code.

## 🚀 Deploy Steps

### Step 1: Commit the GitHub Actions Workflow

```bash
cd /Users/rmukhop3/.claude-worktrees/rmukhop3.github.io/sweet-mendel

# Add all files
git add .

# Commit
git commit -m "Add GitHub Actions deployment workflow"

# Push to GitHub
git push origin sweet-mendel
```

### Step 2: Configure GitHub Pages Settings

1. Go to: https://github.com/rmukhop3/rmukhop3.github.io/settings/pages

2. **Change Source** from:
   - ❌ "Deploy from a branch" → `main` branch

   To:
   - ✅ "GitHub Actions"

3. Click **Save**

### Step 3: Trigger Deployment

The GitHub Action will automatically run when you push. Or you can:

1. Go to: https://github.com/rmukhop3/rmukhop3.github.io/actions
2. Click "Deploy to GitHub Pages" workflow
3. Click "Run workflow" → "Run workflow"

### Step 4: Wait for Build (2-3 minutes)

Watch the action run at:
https://github.com/rmukhop3/rmukhop3.github.io/actions

You'll see:
- ✅ Build job (installs deps, builds site)
- ✅ Deploy job (deploys to GitHub Pages)

### Step 5: Visit Your Site!

Once deployed, visit:
**https://rmukhop3.github.io**

---

## 🔧 Alternative: Manual Deploy (If Actions Don't Work)

If GitHub Actions fail, use this manual method:

```bash
# 1. Build locally
npm install
npm run preload-frames
node scripts/generate-project-images.js
npm run build

# 2. Install gh-pages
npm install -D gh-pages

# 3. Deploy
npx gh-pages -d out -b main

# This will push the 'out' folder to the 'main' branch
```

Then in GitHub Settings → Pages:
- Source: "Deploy from a branch"
- Branch: `main`
- Folder: `/ (root)`

---

## 📊 What's Happening?

**Current Issue:**
GitHub Pages is serving your source code (README.md) instead of the built website.

**Solution:**
The GitHub Actions workflow:
1. Installs dependencies
2. Generates frames and images
3. Builds the Next.js site (`npm run build`)
4. Deploys the `out/` folder to GitHub Pages

**Result:**
Your portfolio website will be live at https://rmukhop3.github.io

---

## 🐛 Troubleshooting

### Action Fails?

Check the error in the Actions tab. Common issues:

**"npm ci" fails**
- Make sure `package-lock.json` is committed
- Or change `npm ci` to `npm install` in `.github/workflows/deploy.yml`

**"Permission denied"**
- Go to Settings → Actions → General
- Under "Workflow permissions", select "Read and write permissions"
- Save

**Build fails**
- Check the build logs in Actions tab
- Test locally first: `npm run build`

### Site Shows 404?

- Wait 2-3 minutes after deployment
- Check GitHub Pages settings point to "GitHub Actions"
- Visit https://rmukhop3.github.io (not /sweet-mendel)

### Images Not Loading?

If images don't load, update `next.config.js`:

```js
basePath: '/your-repo-name',  // Only if using a project site
```

For `rmukhop3.github.io` (user site), keep `basePath: ''`

---

## ✅ Expected Result

After successful deployment:

1. Visit https://rmukhop3.github.io
2. See your portfolio with:
   - Hero section with your name
   - About section
   - Skills grid
   - Experience timeline
   - Projects showcase
   - Contact form
3. Dark/light theme toggle works
4. Smooth scroll animations

---

## 🎯 Next Steps After Deploy

1. **Test on mobile** - Visit on your phone
2. **Share the link** - Add to your resume, LinkedIn
3. **Add custom domain** (optional):
   - Buy a domain (e.g., riyankmukhopadhyay.com)
   - Add CNAME file to `public/`
   - Configure DNS records
   - Enable in GitHub Pages settings

---

## 📞 Need Help?

If deployment fails:
1. Check the Actions tab for error logs
2. Try the manual deploy method above
3. Make sure all files are committed and pushed

Your site structure is ready - just need to build and deploy! 🚀
