"use client"

import { useEffect, useState } from "react"

export function SmartsuppChat() {
  const [chatLoaded, setChatLoaded] = useState(false)
  const [chatError, setChatError] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    // Check if already loaded
    // @ts-ignore - Simple check without type complications
    if (window.smartsupp) {
      console.log("✅ Smartsupp chat already loaded")
      setChatLoaded(true)
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
      console.log("✅ Smartsupp script already exists in DOM")
      // Wait a bit and check if widget appears
      setTimeout(() => {
        // @ts-ignore
        if (window.smartsupp) {
          setChatLoaded(true)
        }
      }, 2000)
      return
    }

    // Function to load the script
    const loadSmartsuppScript = () => {
      const script = document.createElement("script")
      script.type = "text/javascript"
      script.async = true
      script.src = "https://www.smartsuppchat.com/loader.js"
      
      // Add error handling
      script.onerror = () => {
        const errorMsg = "Failed to load Smartsupp chat widget"
        console.error("❌", errorMsg)
        setChatError(errorMsg)
      }
      
      script.onload = () => {
        console.log("✅ Smartsupp chat script loaded, waiting for widget...")
        // Check if widget initialized after a delay
        setTimeout(() => {
          // @ts-ignore
          if (window.smartsupp) {
            console.log("✅ Smartsupp chat widget initialized successfully")
            setChatLoaded(true)
          } else {
            console.warn("⚠️ Smartsupp script loaded but widget not initialized")
            setChatError("Chat widget failed to initialize")
          }
        }, 3000)
      }

      // Insert script into the document
      const firstScript = document.getElementsByTagName("script")[0]
      if (firstScript?.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript)
      } else if (document.body) {
        document.body.appendChild(script)
      } else {
        // Wait for body to be available
        document.addEventListener("DOMContentLoaded", () => {
          if (document.body) {
            document.body.appendChild(script)
          }
        })
      }
    }

    // Wait for DOM to be ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", loadSmartsuppScript)
    } else {
      // DOM is already ready
      loadSmartsuppScript()
    }

    // Fallback check after 5 seconds
    setTimeout(() => {
      // @ts-ignore
      if (!window.smartsupp && !chatError) {
        console.warn("⚠️ Smartsupp chat widget not detected after 5 seconds")
        setChatError("Chat widget may not be loading properly")
      }
    }, 5000)
  }, [chatError])

  // Log status for debugging (always log in production too)
  useEffect(() => {
    if (chatLoaded) {
      console.log("✅ Smartsupp chat is active")
    } else if (chatError) {
      console.error("❌ Smartsupp chat error:", chatError)
    } else {
      console.log("⏳ Smartsupp chat is loading...")
    }
  }, [chatLoaded, chatError])

  return null
}
