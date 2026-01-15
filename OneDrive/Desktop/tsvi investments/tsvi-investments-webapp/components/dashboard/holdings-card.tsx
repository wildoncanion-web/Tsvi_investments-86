"use client"

import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bitcoin } from "lucide-react"

const cryptoData = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    icon: Bitcoin,
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    icon: () => (
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
        $
      </div>
    ),
  },
  {
    symbol: "USDT",
    name: "Tether",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    icon: () => (
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">
        ₮
      </div>
    ),
  },
  {
    symbol: "TON",
    name: "Toncoin",
    color: "text-sky-500",
    bgColor: "bg-sky-500/10",
    icon: () => (
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-500 text-xs font-bold text-white">
        T
      </div>
    ),
  },
  {
    symbol: "LTC",
    name: "Litecoin",
    color: "text-slate-400",
    bgColor: "bg-slate-400/10",
    icon: () => (
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-400 text-xs font-bold text-white">
        Ł
      </div>
    ),
  },
]

export function HoldingsCard() {
  const { userProfile } = useAuth()

  const holdings = userProfile?.holdings || {
    BTC: 0,
    USDC: 0,
    USDT: 0,
    TON: 0,
    LTC: 0,
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Your Holdings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {cryptoData.map((crypto) => (
            <div key={crypto.symbol} className="flex items-center justify-between rounded-lg bg-secondary/50 p-3">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${crypto.bgColor}`}>
                  <crypto.icon className={`h-5 w-5 ${crypto.color}`} />
                </div>
                <div>
                  <p className="font-medium text-foreground">{crypto.name}</p>
                  <p className="text-sm text-muted-foreground">{crypto.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-foreground">
                  {holdings[crypto.symbol as keyof typeof holdings]?.toFixed(8) || "0.00000000"}
                </p>
                <p className="text-sm text-muted-foreground">≈ $0.00</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
