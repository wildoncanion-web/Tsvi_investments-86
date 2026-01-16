# How to Find Firestore Rules in Firebase Console

## Method 1: Direct Link (Easiest)
Click this link to go directly to the Rules editor:
**https://console.firebase.google.com/project/tsvi-investments/firestore/rules**

## Method 2: Step-by-Step Navigation

1. **Go to Firebase Console**
   - Open: https://console.firebase.google.com
   - Make sure you're in the **tsvi-investments** project

2. **Find Firestore Database**
   - Look in the **left sidebar** for "Firestore Database"
   - Click on it

3. **Look for Tabs at the Top**
   - Once you're on the Firestore Database page, you should see tabs at the top:
     - **Data** (shows your database collections)
     - **Indexes** (for database indexes)
     - **Usage** (usage statistics)
     - **Rules** ← **THIS IS WHAT YOU NEED!**

4. **Click the "Rules" Tab**
   - Click on the **"Rules"** tab
   - You should see a code editor with the current rules

## Method 3: Alternative Path

If you still can't find it:

1. Go to: **Firebase Console → Project Settings** (gear icon ⚙️)
2. Scroll down to **"Your apps"** section
3. Click on your web app
4. Look for **"Firestore Database"** link
5. Click it, then look for the **"Rules"** tab

## What You Should See

Once you're on the Rules page, you should see:
- A code editor in the center
- Current rules (probably showing `allow read, write: if false;`)
- A **"Publish"** button (usually at the top right or bottom right)
- A **"Develop and Test"** button

## If You Still Can't Find It

1. **Check if Firestore is enabled:**
   - Go to: https://console.firebase.google.com/project/tsvi-investments/firestore
   - If you see "Get started" or "Create database", you need to create Firestore first
   - Choose "Start in test mode" (we'll add proper rules after)

2. **Try a different browser** or clear cache

3. **Make sure you have the right permissions** - you need to be an owner or editor of the project

## Screenshot Reference

The Rules tab should look like this:
- Top navigation: Data | Indexes | Usage | **Rules** ← Click here
- Code editor showing the rules
- "Publish" button to save changes
