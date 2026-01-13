"use client"

import { useEffect, useState } from "react"
import { Bitcoin } from "lucide-react"

const coins = [
  { symbol: "BTC", color: "text-orange-500", bgColor: "bg-orange-500/20", icon: Bitcoin },
  { symbol: "$", color: "text-blue-500", bgColor: "bg-blue-500/20" },
  { symbol: "₮", color: "text-emerald-400", bgColor: "bg-emerald-400/20" },
  { symbol: "T", color: "text-sky-500", bgColor: "bg-sky-500/20" },
  { symbol: "Ł", color: "text-slate-300", bgColor: "bg-slate-300/20" },
]

interface FloatingCoin {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  coin: (typeof coins)[number]
}

export function FloatingCoins() {
  const [floatingCoins, setFloatingCoins] = useState<FloatingCoin[]>([])

  useEffect(() => {
    const generated: FloatingCoin[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 30,
      duration: Math.random() * 4 + 5,
      delay: Math.random() * 2,
      coin: coins[i % coins.length],
    }))
    setFloatingCoins(generated)
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {floatingCoins.map((item) => (
        <div
          key={item.id}
          className="absolute opacity-20"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            width: item.size,
            height: item.size,
            animation: `float ${item.duration}s ease-in-out infinite`,
            animationDelay: `${item.delay}s`,
          }}
        >
          <div
            className={`flex h-full w-full items-center justify-center rounded-full ${item.coin.bgColor} backdrop-blur-sm`}
          >
            {item.coin.icon ? (
              <item.coin.icon className={`h-1/2 w-1/2 ${item.coin.color}`} />
            ) : (
              <span className={`text-lg font-bold ${item.coin.color}`}>{item.coin.symbol}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
