"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function ConnectPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      errors.name = "Name is required"
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address"
    }
    
    if (!formData.message.trim()) {
      errors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters long"
    }
    
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form before submission
    if (!validateForm()) {
      setErrorMessage("Please fix the errors below before submitting.")
      setSubmitStatus("error")
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT

    if (!formspreeEndpoint) {
      setErrorMessage("Form submission is not configured. Please email us directly at florina@apostolfirm.com")
      setSubmitStatus("error")
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject || "New Contact Form Submission",
          message: formData.message,
          _replyto: formData.email,
        }),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
        setFieldErrors({})
        setErrorMessage("")
      } else {
        const data = await response.json()
        let errorMsg = "Unable to submit your form. "
        
        if (data.error) {
          errorMsg += data.error
        } else if (response.status === 422) {
          errorMsg += "Please check that all required fields are filled correctly."
        } else if (response.status === 429) {
          errorMsg += "Too many submissions. Please try again in a few minutes."
        } else {
          errorMsg += `Server error (${response.status}). Please try again or email us directly.`
        }
        
        setErrorMessage(errorMsg)
        setSubmitStatus("error")
      }
    } catch (error) {
      let errorMsg = "Network error. "
      
      if (error instanceof TypeError && error.message.includes("fetch")) {
        errorMsg += "Please check your internet connection and try again."
      } else {
        errorMsg += "Unable to connect to the server. Please try again later."
      }
      
      setErrorMessage(errorMsg)
      setSubmitStatus("error")
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16 px-4">
        <div className="container max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-4">
              Connect With Us
            </h1>
            <p className="text-lg text-foreground/80">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <Label htmlFor="name" className="text-base font-semibold text-foreground mb-2 block">
                Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`w-full h-12 text-lg border-2 rounded-lg px-4 ${
                  fieldErrors.name ? "border-destructive" : "border-muted"
                }`}
              />
              {fieldErrors.name && (
                <p className="text-sm text-destructive mt-1">{fieldErrors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-base font-semibold text-foreground mb-2 block">
                Email Address <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className={`w-full h-12 text-lg border-2 rounded-lg px-4 ${
                  fieldErrors.email ? "border-destructive" : "border-muted"
                }`}
              />
              {fieldErrors.email && (
                <p className="text-sm text-destructive mt-1">{fieldErrors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone" className="text-base font-semibold text-foreground mb-2 block">
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(123) 456-7890"
                className="w-full h-12 text-lg border-2 border-muted rounded-lg px-4"
              />
            </div>

            {/* Subject */}
            <div>
              <Label htmlFor="subject" className="text-base font-semibold text-foreground mb-2 block">
                Subject
              </Label>
              <Input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What is this regarding?"
                className="w-full h-12 text-lg border-2 border-muted rounded-lg px-4"
              />
            </div>

            {/* Message */}
            <div>
              <Label htmlFor="message" className="text-base font-semibold text-foreground mb-2 block">
                Message <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your immigration needs..."
                rows={6}
                className={`w-full text-lg border-2 rounded-lg px-4 py-3 resize-none ${
                  fieldErrors.message ? "border-destructive" : "border-muted"
                }`}
              />
              {fieldErrors.message && (
                <p className="text-sm text-destructive mt-1">{fieldErrors.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="w-full h-14 text-lg font-semibold"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-semibold">
                  Thank you! Your message has been sent. We'll get back to you soon.
                </p>
              </div>
            )}
            {submitStatus === "error" && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 font-semibold mb-2">
                  {errorMessage || "There was an error submitting your form. Please try again."}
                </p>
                <p className="text-sm text-red-700">
                  If the problem persists, please email us directly at{" "}
                  <a href="mailto:florina@apostolfirm.com" className="underline font-semibold">
                    florina@apostolfirm.com
                  </a>
                </p>
              </div>
            )}
          </form>

          {/* Additional Contact Info */}
          <div className="mt-12 pt-8 border-t border-muted text-center">
            <p className="text-lg text-foreground/80 mb-2">
              Prefer to reach out directly?
            </p>
            <a
              href="mailto:florina@apostolfirm.com"
              className="text-lg text-primary hover:underline font-semibold"
            >
              florina@apostolfirm.com
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
