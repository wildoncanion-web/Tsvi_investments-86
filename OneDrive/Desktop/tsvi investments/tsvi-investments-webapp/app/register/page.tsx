"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Mail, CheckCircle } from "lucide-react"

export default function RegisterPage() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const { sendSignInLink } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!fullName.trim()) {
      setError("Please enter your full name")
      return
    }

    if (!agreeTerms) {
      setError("Please agree to the Terms of Service")
      return
    }

    setLoading(true)

    try {
      await sendSignInLink(email, fullName)
      setEmailSent(true)
    } catch (err: unknown) {
      const firebaseError = err as { code?: string; message?: string }
      const currentDomain = typeof window !== "undefined" ? window.location.hostname : "unknown"
      
      console.error("Registration error:", {
        code: firebaseError.code,
        message: firebaseError.message,
        domain: currentDomain,
        fullError: firebaseError,
        timestamp: new Date().toISOString()
      })
      
      if (firebaseError.code === "auth/invalid-email") {
        setError("Please enter a valid email address.")
      } else if (firebaseError.code === "auth/missing-email") {
        setError("Please enter an email address.")
      } else if (firebaseError.code === "auth/unauthorized-domain") {
        setError(`This domain (${currentDomain}) is not authorized for authentication. Please contact support or try again later.`)
        console.error("⚠️ DOMAIN NOT AUTHORIZED:", {
          currentDomain,
          action: "Add this domain to Firebase Console → Authentication → Settings → Authorized domains",
          firebaseConsole: "https://console.firebase.google.com/project/tsvi-investments/authentication/settings/authorizeddomains"
        })
      } else if (firebaseError.code === "auth/operation-not-allowed") {
        setError("Email/password accounts are not enabled. Please contact support.")
      } else {
        setError(firebaseError.message || `Failed to send sign-in link. Error: ${firebaseError.code || "Unknown error"}. Please try again or contact support.`)
      }
    } finally {
      setLoading(false)
    }
  }

  if (emailSent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
        </div>

        <Card className="w-full max-w-md border-border bg-card">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">Check your email</CardTitle>
            <CardDescription className="text-muted-foreground">
              We&apos;ve sent a sign-in link to <span className="font-medium text-foreground">{email}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-primary/5 p-4 text-sm text-muted-foreground">
              <p className="mb-2">Click the link in the email to complete your registration.</p>
              <p>The link will expire in 1 hour. If you don&apos;t see the email, check your spam folder.</p>
            </div>
            <Button variant="outline" className="w-full bg-transparent" onClick={() => setEmailSent(false)}>
              <Mail className="mr-2 h-4 w-4" />
              Use a different email
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <Card className="w-full max-w-md border-border bg-card">
        <CardHeader className="text-center">
          <Link href="/" className="mx-auto mb-4 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="text-xl font-bold text-primary-foreground">T</span>
            </div>
            <span className="text-2xl font-bold text-foreground">TSVI</span>
          </Link>
          <CardTitle className="text-2xl font-bold text-foreground">Create your account</CardTitle>
          <CardDescription className="text-muted-foreground">
            Start your investment journey today - no password needed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-foreground">
                Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                inputMode="text"
                autoComplete="name"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                autoCapitalize="none"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value.trim().toLowerCase())}
                required
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="rounded-lg bg-primary/5 p-3 text-sm text-muted-foreground">
              <Mail className="mb-1 inline h-4 w-4 text-primary" /> We&apos;ll send you a secure sign-in link. No
              password required!
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="terms"
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground">
                I agree to the{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/terms#privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending link...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Send Sign-in Link
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
