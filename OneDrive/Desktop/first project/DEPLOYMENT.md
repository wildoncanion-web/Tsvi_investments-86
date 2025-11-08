# Deployment Guide - Apostol Law Firm Website

## 🚀 Quick Deploy to Vercel (Recommended)

### Step 1: Prepare Your Code
1. Make sure your code is in a Git repository (GitHub, GitLab, or Bitbucket)
2. Ensure all changes are committed

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with your GitHub account
3. Click "Add New Project"
4. Import your repository
5. Vercel will auto-detect Next.js settings

### Step 3: Configure Environment Variables
In Vercel dashboard, go to **Settings → Environment Variables** and add:

#### Required Variables:
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key_here
STRIPE_SECRET_KEY=sk_live_your_live_key_here
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

#### Optional (for Contact Form):
```
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
```

#### Optional (for Webhooks):
```
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### Step 4: Deploy
- Click "Deploy"
- Wait for build to complete
- Your site will be live at `your-project.vercel.app`

### Step 5: Custom Domain (Optional)
1. Go to **Settings → Domains**
2. Add your custom domain
3. Follow DNS instructions

---

## 🔧 Alternative Deployment Options

### Netlify
1. Go to [netlify.com](https://netlify.com)
2. Connect your Git repository
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Add environment variables in site settings

### Other Platforms
- **Railway**: railway.app
- **Render**: render.com
- **AWS Amplify**: aws.amazon.com/amplify
- **DigitalOcean App Platform**: digitalocean.com

---

## 📋 Pre-Deployment Checklist

- [ ] Test build locally: `npm run build`
- [ ] All environment variables ready
- [ ] Stripe keys switched to LIVE keys (not test)
- [ ] Formspree endpoint configured (if using contact form)
- [ ] Test all payment flows
- [ ] Test contact form
- [ ] Check mobile responsiveness
- [ ] Verify all navigation links work

---

## 🔐 Security Notes

1. **Never commit** `.env.local` to Git (already in .gitignore)
2. Use **LIVE Stripe keys** in production (not test keys)
3. Enable **HTTPS** (automatic on Vercel/Netlify)
4. Monitor Stripe Dashboard for payments
5. Set up webhooks for payment confirmation (optional)

---

## 🎯 After Deployment

1. Test the live site thoroughly
2. Set up Stripe webhooks (recommended)
3. Configure Formspree email notifications
4. Monitor analytics
5. Set up backup/recovery procedures

---

## 📞 Support

If you encounter issues:
- Check Vercel build logs
- Verify environment variables
- Test locally first
- Check browser console for errors



