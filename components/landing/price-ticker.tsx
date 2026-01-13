"use client"

import { useEffect, useState } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"

const cryptoPrices = [
  { symbol: "BTC", name: "Bitcoin", price: 97842.5, change: 2.45 },
  { symbol: "USDC", name: "USD Coin", price: 1.0, change: 0.01 },
  { symbol: "USDT", name: "Tether", price: 1.0, change: -0.02 },
  { symbol: "TON", name: "Toncoin", price: 5.67, change: 4.12 },
  { symbol: "LTC", name: "Litecoin", price: 108.34, change: -1.23 },
]

export function PriceTicker() {
  const [prices, setPrices] = useState(cryptoPrices)

  useEffect(() => {
    const interval = setInterval(() => {
      setPrices((prev) =>
        prev.map((crypto) => ({
          ...crypto,
          price:
            crypto.symbol === "USDC" || crypto.symbol === "USDT"
              ? crypto.price
              : crypto.price * (1 + (Math.random() - 0.5) * 0.002),
          change: crypto.change + (Math.random() - 0.5) * 0.1,
        })),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const duplicatedPrices = [...prices, ...prices]

  return (
    <div className="overflow-hidden border-y border-border bg-card/50 py-3">
      <div className="animate-ticker flex w-max gap-8">
        {duplicatedPrices.map((crypto, index) => (
          <div key={`${crypto.symbol}-${index}`} className="flex items-center gap-3 px-4">
            <span className="font-semibold text-foreground">{crypto.symbol}</span>
            <span className="text-muted-foreground">
              ${crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span
              className={`flex items-center gap-1 text-sm ${crypto.change >= 0 ? "text-primary" : "text-destructive"}`}
            >
              {crypto.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {crypto.change >= 0 ? "+" : ""}
              {crypto.change.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
