# Chatbot Not Showing - Troubleshooting Guide

## Issue: Smartsupp Chatbot Not Visible

The chatbot should appear on ALL pages (before and after login) in the bottom-right corner.

## Step 1: Check Browser Console

1. **Open browser console:** Press `F12` → Click "Console" tab
2. **Refresh the page**
3. **Look for these messages:**
   - ✅ "Smartsupp chat is loading..."
   - ✅ "Smartsupp chat script loaded, waiting for widget..."
   - ✅ "Smartsupp chat widget initialized successfully"
   - ❌ Any red errors

## Step 2: Check Network Tab

1. **Open browser console:** Press `F12` → Click "Network" tab
2. **Refresh the page**
3. **Search for "smartsupp" or "loader.js"**
4. **Check if the script loads:**
   - ✅ Status 200 = Script loaded successfully
   - ❌ Blocked/Failed = Script blocked (ad blocker, CSP, etc.)

## Step 3: Common Issues & Fixes

### Issue: Ad Blocker Blocking Script
**Fix:** 
- Disable ad blocker for your site
- Or add exception for `smartsuppchat.com`

### Issue: Content Security Policy (CSP) Blocking
**Fix:**
- Check if Vercel has CSP headers set
- Allow `smartsuppchat.com` in CSP

### Issue: Script Not Loading
**Fix:**
- Check network connection (I see "Air: Very Poor" - this could be the issue!)
- Try on a different network
- Check if `https://www.smartsuppchat.com/loader.js` is accessible

### Issue: Smartsupp Key Invalid
**Fix:**
- Verify the Smartsupp key: `0a26b1ab3ca7fd1fcc5979c0857bd7c5142d27b9`
- Check Smartsupp dashboard to ensure account is active

## Step 4: Test in Different Environments

1. **Try incognito/private window** (disables extensions)
2. **Try different browser** (Chrome, Firefox, Edge)
3. **Try different device** (mobile, tablet)
4. **Check on different network** (if network is poor)

## Step 5: Verify Smartsupp Account

1. **Go to Smartsupp Dashboard:**
   - https://dashboard.smartsupp.com/
2. **Check if account is active**
3. **Verify the key is correct**
4. **Check if widget is enabled**

## Quick Test:

Open browser console and run:
```javascript
// Check if script loaded
document.querySelector('script[src*="smartsuppchat.com"]')

// Check if window.smartsupp exists
window.smartsupp

// Check if _smartsupp config exists
window._smartsupp
```

If any of these return `null` or `undefined`, the script isn't loading properly.
