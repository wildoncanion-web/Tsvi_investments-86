# Firestore Security Rules Setup Guide

## Problem
You're seeing the error: **"Missing or insufficient permissions"** when trying to create accounts.

This is because Firestore security rules are blocking access to the database.

## Solution: Update Firestore Security Rules

### Step 1: Go to Firestore Rules in Firebase Console

1. Open Firebase Console: https://console.firebase.google.com/project/tsvi-investments
2. Click on **"Firestore Database"** in the left sidebar
3. Click on the **"Rules"** tab at the top

### Step 2: Copy and Paste These Rules

Replace the existing rules with these:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can read/write their own data
    match /users/{userId} {
      // Allow users to read their own profile
      allow read: if request.auth != null && request.auth.uid == userId;
      
      // Allow users to create their own profile when signing up
      allow create: if request.auth != null && request.auth.uid == userId;
      
      // Allow users to update their own profile
      allow update: if request.auth != null && request.auth.uid == userId;
      
      // Prevent users from deleting their own profile
      allow delete: if false;
    }
    
    // Deposits collection - users can read/write their own deposits
    match /deposits/{depositId} {
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
      allow create: if request.auth != null && request.data.userId == request.auth.uid;
      allow update: if request.auth != null && resource.data.userId == request.auth.uid;
      allow delete: if false;
    }
    
    // Investments collection - users can read/write their own investments
    match /investments/{investmentId} {
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
      allow create: if request.auth != null && request.data.userId == request.auth.uid;
      allow update: if request.auth != null && resource.data.userId == request.auth.uid;
      allow delete: if false;
    }
    
    // Transactions collection - users can read their own transactions
    match /transactions/{transactionId} {
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
      allow create: if request.auth != null && request.data.userId == request.auth.uid;
      allow update: if false; // Transactions should be immutable
      allow delete: if false;
    }
  }
}
```

### Step 3: Publish the Rules

1. Click **"Publish"** button
2. Wait a few seconds for the rules to deploy
3. Rules are active immediately

### Step 4: Test Account Creation

1. Go back to your website
2. Try creating an account again
3. It should work now! ✅

## What These Rules Do

- ✅ **Users can read/write their own profile** in the `users` collection
- ✅ **Users can create their own profile** when they sign up
- ✅ **Users can only access their own deposits, investments, and transactions**
- ❌ **Users cannot delete their data** (prevents accidental data loss)
- ❌ **Users cannot access other users' data** (security)

## Direct Link to Rules Editor

https://console.firebase.google.com/project/tsvi-investments/firestore/rules

## Troubleshooting

If you still see errors after updating rules:
1. Make sure you clicked **"Publish"** (not just "Save")
2. Wait 30-60 seconds for rules to propagate
3. Refresh your browser and try again
4. Check browser console (F12) for any new error messages
