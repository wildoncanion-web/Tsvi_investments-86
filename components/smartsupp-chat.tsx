"use client"

import { useEffect } from "react"

export function SmartsuppChat() {
  useEffect(() => {
    // Check if already loaded
    if ((window as any).smartsupp) {
      console.log("[v0] Smartsupp already loaded")
      return
    }

    console.log("[v0] Loading Smartsupp...")

    // Set the key
    ;(window as any)._smartsupp = (window as any)._smartsupp || {}
    ;(window as any)._smartsupp.key = "0a26b1ab3ca7fd1fcc5979c0857bd7c5142d27b9"

    // Create smartsupp function
    ;(window as any).smartsupp =
      (window as any).smartsupp ||
      function () {
        ;((window as any).smartsupp._ = (window as any).smartsupp._ || []).push(arguments)
      }
    ;(window as any).smartsupp._ = []

    // Create and inject the script
    const script = document.createElement("script")
    script.type = "text/javascript"
    script.charset = "utf-8"
    script.async = true
    script.src = "https://www.smartsuppchat.com/loader.js?"
    script.onload = () => {
      console.log("[v0] Smartsupp script loaded successfully")
    }
    script.onerror = () => {
      console.log("[v0] Smartsupp script failed to load")
    }

    const firstScript = document.getElementsByTagName("script")[0]
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript)
    } else {
      document.head.appendChild(script)
    }
  }, [])

  return null
}
