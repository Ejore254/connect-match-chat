# MeetHeart - Vercel Deployment Guide

## ✅ Prerequisites

- GitHub account
- Vercel account (free at https://vercel.com)
- Your code in a GitHub repository

## 🚀 Step-by-Step Deployment

### Step 1: Push Code to GitHub

Your code is ready to push. Use the UI button in Builder.io to push to GitHub:

1. Click the **"Push/Create PR"** button (top right of UI)
2. Select your GitHub repository (or create a new one)
3. This pushes all changes to `main` branch

### Step 2: Go to Vercel

1. Visit https://vercel.com
2. Sign in with your GitHub account
3. Click **"New Project"**

### Step 3: Import Repository

1. Select your GitHub repository (where you pushed MeetHeart)
2. Click **"Import"**
3. Vercel will auto-detect the configuration

### Step 4: Configure (Optional)

**Build Settings:**
- Build Command: `pnpm build`
- Output Directory: `dist/spa`
- Install Command: `pnpm install`

These are already set in `vercel.json` - Vercel will use them automatically.

**Environment Variables** (Only if using Supabase):
- Go to **Settings → Environment Variables**
- Add `VITE_SUPABASE_URL` = your Supabase URL
- Add `VITE_SUPABASE_ANON_KEY` = your Supabase anon key

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait for build to complete (2-3 minutes)
3. Get your live URL! 🎉

## 🔗 After Deployment

Your app is now live at:
```
https://your-project-name.vercel.app
```

### Features That Work:
- ✅ All pages load correctly
- ✅ No 404 errors on page refresh
- ✅ Sign up and sign in work
- ✅ Chat interface fully functional
- ✅ Authentication persists
- ✅ Mobile responsive
- ✅ Dark mode works

### What Happens on Every Push:
- Every time you push to `main` branch
- Vercel automatically rebuilds and deploys
- New URL is live within 2-3 minutes
- No downtime

## 🔐 Environment Variables (Optional)

To use Supabase for real data:

1. Get your Supabase credentials:
   - Go to https://app.supabase.com
   - Project Settings → API
   - Copy `Project URL` and `anon public key`

2. Add to Vercel:
   - Project Settings → Environment Variables
   - Add:
     ```
     VITE_SUPABASE_URL=https://your-project.supabase.co
     VITE_SUPABASE_ANON_KEY=your-anon-key
     ```

3. Redeploy:
   - Go to **Deployments**
   - Click **"..."** on latest deployment
   - Select **"Redeploy"**

## 🧪 Test Your Deployment

After deployment, test these:

1. **Homepage**: Should load with "Join Now" button
2. **Sign Up**: Click "Join Now" → Create account
3. **Sign In**: Use demo@meetheart.com / demo123456
4. **Chat**: Send messages and see them instantly
5. **Navigation**: All links should work
6. **Mobile**: Open on phone and test responsiveness
7. **Refresh**: Refresh any page - should not show 404

## ❌ Troubleshooting

### 404 Errors on Page Refresh
**Solution**: Already fixed with `vercel.json` rewrites!

### Build Fails
1. Check build command: `pnpm build`
2. Run locally: `pnpm build` should work
3. Check node version in Vercel (should be 18+)

### Chat Not Working
- App uses local storage by default
- Messages persist in browser
- For real-time: Connect Supabase and set env variables

### Slow Builds
- Vercel caches dependencies
- Rebuilds after dependency changes
- Standard Vercel plan handles this fine

## 📊 Vercel Analytics

After deployment, check:
1. **Deployments** tab - see all builds
2. **Analytics** tab - see page views and performance
3. **Settings** - configure custom domains

## 🎯 Custom Domain (Optional)

To use your own domain:

1. In Vercel: Settings → Domains
2. Add your custom domain
3. Update DNS records at your domain provider
4. Takes 24 hours to fully propagate

Example: `yourdomain.com` instead of `meetheart.vercel.app`

## 📈 Next Steps After Deployment

1. **Test thoroughly** - Make sure everything works
2. **Share link** - Send deployment URL to friends
3. **Monitor** - Check Vercel Analytics for traffic
4. **Update** - Push code changes, they auto-deploy
5. **Scale up** - Add real backend with Supabase when ready

## 💡 Pro Tips

### Tip 1: Preview Deployments
Every push creates a preview deployment:
- Vercel gives you preview URL
- Test changes before going to production
- Perfect for testing with team

### Tip 2: Rollback
If something breaks:
1. Go to **Deployments** tab
2. Find previous working deployment
3. Click **"..."** → **"Promote to Production"**
4. Live immediately!

### Tip 3: Monitor Performance
- Vercel Analytics shows real user metrics
- Web Vitals tell you if site is fast
- Aim for green scores

### Tip 4: Environment-Specific Config
Use different env variables for:
- Production (Vercel)
- Preview (Vercel preview)
- Local development (.env.local)

## 🆘 Support

**Vercel Documentation**: https://vercel.com/docs

**Issues to Check**:
1. Is code pushed to GitHub? ✓
2. Is repository public or private? (Vercel can see it)
3. Are environment variables set? (if using Supabase)
4. Did build complete successfully? (check build logs)

## ✨ Final Checklist Before Sharing

- [ ] App builds without errors
- [ ] All pages load correctly
- [ ] Sign up works
- [ ] Sign in with demo credentials works
- [ ] Chat interface works
- [ ] No 404 errors on refresh
- [ ] Mobile looks good
- [ ] Vercel deployment is live
- [ ] Share URL with friends!

---

**Congratulations! Your dating app is live on the internet!** 🎉

Need help? Check the README.md for more details about features and development.
