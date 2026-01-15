"use client"

import { useState } from "react"
import { walletAddresses, type CryptoKey } from "@/lib/wallet-addresses"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import QRCode from "qrcode"
import { useEffect } from "react"

interface QRCodeDisplayProps {
  crypto: CryptoKey
}

export function QRCodeDisplay({ crypto }: QRCodeDisplayProps) {
  const [copied, setCopied] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("")
  const wallet = walletAddresses[crypto]

  useEffect(() => {
    // Generate QR code
    QRCode.toDataURL(wallet.address, {
      width: 200,
      margin: 2,
      color: {
        dark: "#ffffff",
        light: "#00000000",
      },
    }).then(setQrCodeUrl)
  }, [wallet.address])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(wallet.address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      console.error("Failed to copy address")
    }
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader className="text-center">
        <CardTitle className="text-lg font-semibold text-foreground">Deposit {wallet.name}</CardTitle>
        <p className="text-sm text-muted-foreground">Send only {wallet.symbol} to this address</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* QR Code */}
        <div className="flex justify-center">
          <div className="rounded-2xl border border-border bg-secondary/50 p-4">
            {qrCodeUrl ? (
              <img
                src={qrCodeUrl || "/placeholder.svg"}
                alt={`${wallet.symbol} deposit address QR code`}
                width={200}
                height={200}
              />
            ) : (
              <div className="flex h-[200px] w-[200px] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
            )}
          </div>
        </div>

        {/* Address */}
        <div className="space-y-2">
          <p className="text-center text-sm font-medium text-muted-foreground">Wallet Address</p>
          <div className="flex items-center gap-2 rounded-lg border border-border bg-input p-3">
            <code className="flex-1 break-all text-xs text-foreground">{wallet.address}</code>
            <Button variant="ghost" size="sm" onClick={copyToClipboard} className="shrink-0">
              {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Network Info */}
        <div className="rounded-lg bg-secondary/50 p-4">
          <p className="text-sm font-medium text-foreground">Network</p>
          <p className="text-sm text-muted-foreground">{wallet.network}</p>
        </div>
      </CardContent>
    </Card>
  )
}
