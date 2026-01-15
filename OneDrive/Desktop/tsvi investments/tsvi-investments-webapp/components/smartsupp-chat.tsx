"use client"

import { useEffect } from "react"

export function SmartsuppChat() {
  useEffect(() => {
    if (typeof window === "undefined") return

    // Check if already loaded
    // @ts-ignore - Simple check without type complications
    if (window.smartsupp) {
      console.log("Smartsupp chat already loaded")
      return
    }

    // Initialize Smartsupp configuration
    // @ts-ignore
    window._smartsupp = window._smartsupp || {}
    // @ts-ignore
    window._smartsupp.key = "0a26b1ab3ca7fd1fcc5979c0857bd7c5142d27b9"

    // Check if script is already in the document
    const existingScript = document.querySelector('script[src*="smartsuppchat.com"]')
    if (existingScript) {
      console.log("Smartsupp script already exists")
      return
    }

    // Load Smartsupp script
    const script = document.createElement("script")
    script.type = "text/javascript"
    script.async = true
    script.src = "https://www.smartsuppchat.com/loader.js"
    
    // Add error handling
    script.onerror = () => {
      console.error("Failed to load Smartsupp chat widget")
    }
    
    script.onload = () => {
      console.log("Smartsupp chat widget loaded successfully")
    }

    // Insert script into the document
    const firstScript = document.getElementsByTagName("script")[0]
    if (firstScript?.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript)
    } else {
      // Fallback: append to body if no scripts exist
      if (document.body) {
        document.body.appendChild(script)
      } else {
        // Wait for body to be available
        document.addEventListener("DOMContentLoaded", () => {
          document.body.appendChild(script)
        })
      }
    }
  }, [])

  return null
}
