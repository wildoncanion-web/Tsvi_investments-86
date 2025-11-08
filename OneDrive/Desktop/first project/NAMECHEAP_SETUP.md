# 🌐 Namecheap Domain Setup with Vercel

## Step 1: Deploy to Vercel First

1. **Install Git** (if not installed):
   - Download: https://git-scm.com/download/win
   - Install with defaults
   - Restart terminal

2. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Apostol Law Firm website"
   # Create repo on GitHub.com, then:
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

3. **Deploy to Vercel**:
   - Go to vercel.com
   - Import from GitHub
   - Add environment variables
   - Deploy
   - You'll get: `your-project.vercel.app`

---

## Step 2: Connect Namecheap Domain to Vercel

### In Vercel Dashboard:

1. Go to your project → **Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter your Namecheap domain (e.g., `apostolfirm.com`)
4. Vercel will show you DNS records to add

### In Namecheap Dashboard:

1. Login to **Namecheap.com**
2. Go to **Domain List** → Click **Manage** on your domain
3. Go to **Advanced DNS** tab
4. Add these DNS records:

#### Option A: Use A Record (Recommended)
```
Type: A Record
Host: @
Value: 76.76.21.21
TTL: Automatic

Type: CNAME Record
Host: www
Value: cname.vercel-dns.com
TTL: Automatic
```

#### Option B: Use CNAME (Alternative)
```
Type: CNAME Record
Host: @
Value: cname.vercel-dns.com
TTL: Automatic

Type: CNAME Record
Host: www
Value: cname.vercel-dns.com
TTL: Automatic
```

**Note:** Vercel will show you the exact values - use what Vercel provides!

---

## Step 3: Update Environment Variables

In Vercel Dashboard → **Settings** → **Environment Variables**:

Update `NEXT_PUBLIC_APP_URL`:
```
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

Or if using www:
```
NEXT_PUBLIC_APP_URL=https://www.yourdomain.com
```

---

## Step 4: Wait for DNS Propagation

- DNS changes take **5 minutes to 48 hours** to propagate
- Usually works within **15-30 minutes**
- Check status in Vercel dashboard

---

## Step 5: SSL Certificate (Automatic)

- Vercel automatically provides **free SSL certificate**
- Your site will be **HTTPS** automatically
- No extra configuration needed ✅

---

## ✅ Verification Checklist

- [ ] Domain added in Vercel
- [ ] DNS records added in Namecheap
- [ ] Environment variables updated
- [ ] Wait 15-30 minutes
- [ ] Test: `https://yourdomain.com`
- [ ] Test: `https://www.yourdomain.com`

---

## 🔧 Troubleshooting

**If domain doesn't work after 30 minutes:**
1. Check DNS records in Namecheap match Vercel's instructions
2. Verify TTL is set to Automatic or 3600
3. Clear DNS cache: `ipconfig /flushdns` (Windows)
4. Check Vercel dashboard for status

**Common Issues:**
- **Wrong DNS records**: Double-check Vercel's exact values
- **DNS not propagated**: Wait longer (can take up to 48 hours)
- **SSL not working**: Wait for certificate (auto-generated, takes 5-10 minutes)

---

## 📝 Important Notes

1. **Keep Namecheap as registrar** - Vercel doesn't need to manage your domain
2. **Free SSL** - Vercel provides certificates automatically
3. **Auto-renewal** - SSL certificates auto-renew
4. **Both www and non-www** - Vercel handles both automatically

---

## 🎯 After Setup

Your site will be live at:
- `https://yourdomain.com`
- `https://www.yourdomain.com`

Both will work automatically!



