import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { AuthProvider } from "@/contexts/auth-context"
import { SmartsuppChat } from "@/components/smartsupp-chat"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TSVI Investments | Secure Crypto Investments",
  description:
    "Your trusted partner in cryptocurrency investments. Invest in BTC, USDC, USDT, TON, and LTC with confidence.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <AuthProvider>{children}</AuthProvider>
        <SmartsuppChat />
      </body>
    </html>
  )
}
