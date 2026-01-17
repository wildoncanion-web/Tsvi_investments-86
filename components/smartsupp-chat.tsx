"use client"

import { useEffect } from "react"
import Script from "next/script"

export function SmartsuppChat() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      ;(window as any)._smartsupp = (window as any)._smartsupp || {}
      ;(window as any)._smartsupp.key = "0a26b1ab3ca7fd1fcc5979c0857bd7c5142d27b9"
    }
  }, [])

  return (
    <Script
      id="smartsupp-chat"
      strategy="lazyOnload"
      src="https://www.smartsuppchat.com/loader.js?"
      onLoad={() => {
        console.log("[v0] Smartsupp loaded")
      }}
    />
  )
}
