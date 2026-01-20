"use client"

import { initializeApp, getApps, type FirebaseApp } from "firebase/app"
import { getAuth, type Auth } from "firebase/auth"
import { getFirestore, type Firestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCI_kui2FsS249TJyfzi-Z10ksRNk8Tj1Q",
  authDomain: "tsvi-investments.firebaseapp.com",
  projectId: "tsvi-investments",
  storageBucket: "tsvi-investments.firebasestorage.app",
  messagingSenderId: "251861957646",
  appId: "1:251861957646:web:251a468323b362d771905f",
}

let _app: FirebaseApp | undefined
let _auth: Auth | undefined
let _db: Firestore | undefined

function getApp(): FirebaseApp {
  if (!_app) {
    _app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
  }
  return _app
}

export function getFirebaseAuth(): Auth {
  if (!_auth) {
    _auth = getAuth(getApp())
  }
  return _auth
}

export function getFirebaseDb(): Firestore {
  if (!_db) {
    _db = getFirestore(getApp())
  }
  return _db
}

export { getApp }
export const app = null as unknown as FirebaseApp
export const auth = null as unknown as Auth
export const db = null as unknown as Firestore
