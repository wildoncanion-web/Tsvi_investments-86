"use client"

import { walletAddresses, type CryptoKey } from "@/lib/wallet-addresses"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle2, Clock, Shield } from "lucide-react"

interface DepositInstructionsProps {
  crypto: CryptoKey
}

export function DepositInstructions({ crypto }: DepositInstructionsProps) {
  const wallet = walletAddresses[crypto]

  const steps = [
    {
      icon: Shield,
      title: "Verify the Address",
      description: `Always double-check the wallet address before sending ${wallet.symbol}. We will never ask you to send funds to a different address.`,
    },
    {
      icon: Clock,
      title: "Wait for Confirmations",
      description: `Your deposit will be credited after ${wallet.confirmations} network confirmation${wallet.confirmations > 1 ? "s" : ""}. This usually takes 10-30 minutes.`,
    },
    {
      icon: CheckCircle2,
      title: "Funds Credited",
      description:
        "Once confirmed, your funds will automatically appear in your account balance. You can then start investing!",
    },
  ]

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">How to Deposit</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Steps */}
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={step.title} className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <step.icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">
                  {index + 1}. {step.title}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Important Notice */}
        <div className="rounded-lg border border-accent/50 bg-accent/10 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <div>
              <p className="font-medium text-accent">Important Notice</p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>
                  • Minimum deposit: {wallet.minDeposit} {wallet.symbol}
                </li>
                <li>• Only send {wallet.symbol} to this address</li>
                <li>• Sending other assets may result in permanent loss</li>
                <li>• Network: {wallet.network}</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
