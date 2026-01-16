# Firebase Authorized Domains - Quick Reference

## Domains to Add to Firebase Console

Go to: **Firebase Console → Authentication → Settings → Authorized domains**

Or direct link: https://console.firebase.google.com/project/tsvi-investments/authentication/settings/authorizeddomains

### Required Domains:

1. **Production Domain:**
   - `www.tsviinvestments.com`
   - `tsviinvestments.com` (if you use both)

2. **Vercel Preview Domain (REQUIRED):**
   - `tsvi-investments-86-9rq5p1tu3-wildon-canions-projects.vercel.app`
   - ⚠️ **Note:** Firebase does NOT accept wildcard domains like `*.vercel.app`
   - You must add the specific preview URL shown above

3. **Vercel Production Domain (if you have one):**
   - Check your Vercel dashboard → Settings → Domains
   - Usually: `tsvi-investments-86.vercel.app` (without the preview hash)
   - Or your custom domain if configured
   - ⚠️ Each Vercel preview URL is unique - you may need to add multiple if you have different preview deployments

4. **Local Development (usually already added):**
   - `localhost`

## How to Add:

1. Click **"Add domain"** button
2. Enter the domain (without `https://` or trailing `/`)
3. Click **"Add"**
4. Wait 1-2 minutes for changes to propagate

## After Adding Domains:

- The account creation should work immediately
- Check browser console (F12) for any remaining errors
- The console will now show detailed error logs if something fails

## Testing:

After adding domains, test account creation on:
- ✅ Production domain
- ✅ Vercel preview URL
- ✅ Localhost (for development)
