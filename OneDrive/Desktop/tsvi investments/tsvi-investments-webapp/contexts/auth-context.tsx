"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import {
  onAuthStateChanged,
  signOut,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  type User,
} from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { isAdmin } from "@/lib/admin"

interface UserProfile {
  uid: string
  email: string
  displayName: string
  photoURL?: string
  createdAt: Date
  totalBalance: number
  holdings: {
    BTC: number
    USDC: number
    USDT: number
    TON: number
    LTC: number
  }
}

interface AuthContextType {
  user: User | null
  userProfile: UserProfile | null
  loading: boolean
  isAdmin: boolean
  sendSignInLink: (email: string, displayName?: string) => Promise<void>
  completeSignIn: (email: string, displayName?: string) => Promise<void>
  logout: () => Promise<void>
  isEmailLink: (url: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [adminStatus, setAdminStatus] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      setAdminStatus(isAdmin(user?.email))
      if (user) {
        const profileDoc = await getDoc(doc(db, "users", user.uid))
        if (profileDoc.exists()) {
          setUserProfile(profileDoc.data() as UserProfile)
        }
      } else {
        setUserProfile(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const sendSignInLink = async (email: string, displayName?: string) => {
    // Get current origin - works on all devices (mobile, desktop, tablet)
    const currentOrigin =
      typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : "https://www.tsviinvestments.com"

    const actionCodeSettings = {
      url: `${currentOrigin}/auth/callback`,
      handleCodeInApp: true,
      // Ensure it works on mobile browsers
      iOS: {
        bundleId: undefined, // Not needed for web
      },
      android: {
        packageName: undefined, // Not needed for web
        installApp: false,
        minimumVersion: undefined,
      },
    }

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings)

      // Store email for verification - works on all devices
      if (typeof window !== "undefined" && window.localStorage) {
        try {
          window.localStorage.setItem("emailForSignIn", email)
          if (displayName) {
            window.localStorage.setItem("displayNameForSignIn", displayName)
          }
        } catch (storageError) {
          // Handle localStorage errors (e.g., private browsing mode)
          console.warn("Could not save to localStorage:", storageError)
        }
      }
    } catch (error: unknown) {
      const firebaseError = error as { code?: string; message?: string }
      console.error("Error sending sign-in link:", {
        code: firebaseError.code,
        message: firebaseError.message,
        currentOrigin: currentOrigin,
        email: email,
        timestamp: new Date().toISOString()
      })
      throw error
    }
  }

  const isEmailLink = (url: string) => {
    return isSignInWithEmailLink(auth, url)
  }

  const completeSignIn = async (email: string, displayName?: string) => {
    if (!isSignInWithEmailLink(auth, window.location.href)) {
      throw new Error("Invalid sign-in link")
    }

    const result = await signInWithEmailLink(auth, email, window.location.href)

    window.localStorage.removeItem("emailForSignIn")
    window.localStorage.removeItem("displayNameForSignIn")

    const profileDoc = await getDoc(doc(db, "users", result.user.uid))

    if (!profileDoc.exists()) {
      const newProfile: UserProfile = {
        uid: result.user.uid,
        email: result.user.email!,
        displayName: displayName || email.split("@")[0],
        createdAt: new Date(),
        totalBalance: 0,
        holdings: {
          BTC: 0,
          USDC: 0,
          USDT: 0,
          TON: 0,
          LTC: 0,
        },
      }

      await setDoc(doc(db, "users", result.user.uid), newProfile)
      setUserProfile(newProfile)
    } else {
      setUserProfile(profileDoc.data() as UserProfile)
    }
  }

  const logout = async () => {
    await signOut(auth)
    setUserProfile(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        isAdmin: adminStatus,
        sendSignInLink,
        completeSignIn,
        logout,
        isEmailLink,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
