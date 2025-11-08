# 🚀 Vercel Deployment - Step by Step Guide

## Quick Steps:

### 1. **Push Your Code to GitHub**
```bash
# If you haven't initialized Git yet:
git init
git add .
git commit -m "Apostol Law Firm website - Ready for deployment"

# Create a new repository on GitHub.com, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### 2. **Deploy to Vercel**
1. Go to **https://vercel.com**
2. Click **"Sign Up"** or **"Login"**
3. Sign in with **GitHub** (recommended)
4. Click **"Add New..."** → **"Project"**
5. **Import** your GitHub repository
6. Vercel will auto-detect Next.js settings ✅

### 3. **Configure Environment Variables**
Before clicking "Deploy", click **"Environment Variables"** and add:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_LIVE_KEY
STRIPE_SECRET_KEY=sk_live_YOUR_LIVE_KEY
NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
```

**Important:**
- Use **LIVE keys** from Stripe Dashboard (not test keys)
- Get Formspree endpoint from formspree.io (if using contact form)

### 4. **Deploy**
- Click **"Deploy"**
- Wait 2-3 minutes for build
- Your site will be live at `your-project.vercel.app`

### 5. **Custom Domain (Optional)**
- Go to **Settings → Domains**
- Add your custom domain
- Follow DNS setup instructions

---

## ✅ Pre-Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Stripe LIVE keys ready (not test keys)
- [ ] Formspree endpoint configured (optional)
- [ ] Build tested locally (`npm run build` - ✅ Already done!)

---

## 🎉 After Deployment

Your site will be live! Test:
- ✅ Homepage loads
- ✅ Navigation works
- ✅ Payment page works
- ✅ Contact form works (if Formspree configured)
- ✅ Service booking links work

---

## 📝 Notes

- Vercel provides **free HTTPS** automatically
- **Auto-deploys** on every Git push
- **Free tier** includes 100GB bandwidth/month
- **No credit card** required for free tier



