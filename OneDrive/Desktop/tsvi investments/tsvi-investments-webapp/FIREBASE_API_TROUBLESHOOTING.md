# Firebase API Error Troubleshooting Guide

## Error: "identitytoolkit.googleapis.com responded with status 4"

This error means Firebase Authentication API is being blocked. Here's how to fix it:

## Step 1: Enable Firebase APIs in Google Cloud Console

1. **Go to Google Cloud Console:**
   - https://console.cloud.google.com/apis/library?project=tsvi-investments

2. **Enable these APIs (search for each and click "Enable"):**
   - ✅ **Identity Toolkit API** (this is what's failing!)
   - ✅ **Firebase Authentication API**
   - ✅ **Cloud Firestore API**
   - ✅ **Firebase Installations API**

3. **Wait 2-3 minutes** for APIs to activate

## Step 2: Check API Key Restrictions

1. **Go to Google Cloud Console → APIs & Services → Credentials:**
   - https://console.cloud.google.com/apis/credentials?project=tsvi-investments

2. **Find your API key:** `AIzaSyCI_kui2FsS249TJyfzi-Z10ksRNk8Tj1Q`

3. **Click on the API key to edit it**

4. **Check "API restrictions":**
   - If it says "Restrict key", make sure these are allowed:
     - ✅ Identity Toolkit API
     - ✅ Firebase Authentication API
     - ✅ Cloud Firestore API
   - **OR** set it to "Don't restrict key" (for testing)

5. **Check "Application restrictions":**
   - If restricted, make sure your domain is allowed:
     - `tsviinvestments.com`
     - `www.tsviinvestments.com`
     - `*.vercel.app` (for Vercel deployments)
   - **OR** set to "None" (for testing)

6. **Click "Save"**

## Step 3: Check Firebase Billing

1. **Go to Firebase Console:**
   - https://console.firebase.google.com/project/tsvi-investments/settings/usage

2. **Check if billing is enabled:**
   - If not, you might hit quota limits
   - Free tier should work, but verify it's active

## Step 4: Verify Domain Authorization (Again)

1. **Go to Firebase Console → Authentication → Settings:**
   - https://console.firebase.google.com/project/tsvi-investments/authentication/settings/authorizeddomains

2. **Make sure these domains are listed:**
   - ✅ `tsviinvestments.com`
   - ✅ `www.tsviinvestments.com`
   - ✅ `tsvi-investments-86-9rq5p1tu3-wildon-canions-projects.vercel.app`

## Step 5: Test After Changes

1. Wait 2-3 minutes after making changes
2. Clear browser cache (Ctrl+Shift+Delete)
3. Try account creation again
4. Check browser console (F12) for new errors

## Direct Links:

- **Google Cloud Console APIs:** https://console.cloud.google.com/apis/library?project=tsvi-investments
- **API Credentials:** https://console.cloud.google.com/apis/credentials?project=tsvi-investments
- **Firebase Authorized Domains:** https://console.firebase.google.com/project/tsvi-investments/authentication/settings/authorizeddomains
