# Firebase Authorized Domains Setup Guide

## Current Issue
Firebase Console is requesting a billing account when trying to add authorized domains, even though the billing account was created but not reflecting.

## Solutions

### Option 1: Verify & Link Billing Account (If Required)
1. **Check Billing Account Status**
   - Go to [Google Cloud Console Billing](https://console.cloud.google.com/billing)
   - Verify your billing account is active

2. **Link Billing to Firebase Project**
   - Firebase Console → Project Settings (⚙️ icon)
   - Go to **Usage and billing** tab
   - Click **Modify billing** or **Upgrade project**
   - Select your billing account and link it

3. **Wait for Propagation**
   - Changes can take 1-2 hours to reflect
   - Refresh the Firebase Console after waiting

### Option 2: Use Firebase CLI (Alternative Method)
Install Firebase CLI and use it to manage authorized domains:

```bash
# Install Firebase CLI globally
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project (if not already done)
firebase init

# Unfortunately, authorized domains can only be added via Console, not CLI
# But CLI can help verify your project connection
```

### Option 3: Try Different Console Paths
Try accessing authorized domains from:
- **Path 1**: Firebase Console → Authentication → Settings → Authorized domains
- **Path 2**: Firebase Console → Project Settings → General → Your apps → Select web app → Scroll to "Authorized domains"
- **Path 3**: Direct URL: `https://console.firebase.google.com/project/tsvi-investments/authentication/settings/authorizeddomains`

### Option 4: Temporary Workaround (For Development)
While waiting for billing account resolution:
- **Local Development**: Use `localhost` (should already be authorized)
- **v0 Preview**: The preview domain might work without explicit authorization if Firebase allows wildcard preview domains
- **Testing**: Test authentication flows on `localhost` first

### Option 5: Contact Firebase Support
If none of the above work:
1. Go to [Firebase Support](https://firebase.google.com/support)
2. Explain that you're trying to add authorized domains but billing account isn't reflecting
3. Request assistance with domain authorization for free tier (Spark plan)

## Domains to Add (Once Access is Available)
1. Your v0 preview domain (e.g., `*.v0.app` or the specific preview URL)
2. `localhost` (usually already present)
3. Your production domain (when deployed to Vercel)

## Current Code Status ✅
The code is already correctly configured:
- Uses `window.location.origin` dynamically in `contexts/auth-context.tsx` (line 70)
- Will automatically work on any authorized domain once added to Firebase

## Important Notes
- **Free Tier**: Authorized domains should be available on Spark (free) plan without billing
- **Billing Requirement**: If Firebase is requiring billing, this might be due to:
  - Exceeding free tier limits
  - Regional restrictions
  - Policy changes
  - Temporary UI bug

## Next Steps
1. Try Option 1 first (verify billing account)
2. If billing account is active and linked, wait 1-2 hours and try again
3. If still not working, try the different console paths (Option 3)
4. As last resort, contact Firebase Support (Option 5)
