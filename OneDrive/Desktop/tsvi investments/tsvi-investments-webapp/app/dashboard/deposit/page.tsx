"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { CryptoSelector } from "@/components/deposit/crypto-selector"
import { QRCodeDisplay } from "@/components/deposit/qr-code-display"
import { DepositInstructions } from "@/components/deposit/deposit-instructions"
import type { CryptoKey } from "@/lib/wallet-addresses"
import { Loader2 } from "lucide-react"

export default function DepositPage() {
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoKey>("BTC")
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="px-4 py-8 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">Deposit Funds</h1>
            <p className="mt-1 text-muted-foreground">
              Select a cryptocurrency and send funds to the provided wallet address
            </p>
          </div>

          {/* Crypto Selector */}
          <div className="mb-8">
            <h2 className="mb-4 text-sm font-medium text-muted-foreground">Select Cryptocurrency</h2>
            <CryptoSelector selectedCrypto={selectedCrypto} onSelect={setSelectedCrypto} />
          </div>

          {/* QR Code and Instructions */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <QRCodeDisplay crypto={selectedCrypto} />
            <DepositInstructions crypto={selectedCrypto} />
          </div>
        </div>
      </main>
    </div>
  )
}
