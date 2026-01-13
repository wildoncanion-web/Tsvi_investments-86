"use client"

import { Bitcoin } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const cryptos = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    icon: Bitcoin,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    hoverBgColor: "hover:bg-orange-500/20",
  },
  {
    name: "USDC",
    symbol: "USDC",
    icon: () => (
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
        $
      </div>
    ),
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    hoverBgColor: "hover:bg-blue-500/20",
  },
  {
    name: "Tether",
    symbol: "USDT",
    icon: () => (
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">
        ₮
      </div>
    ),
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    hoverBgColor: "hover:bg-emerald-500/20",
  },
  {
    name: "Toncoin",
    symbol: "TON",
    icon: () => (
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-500 text-xs font-bold text-white">
        T
      </div>
    ),
    color: "text-sky-500",
    bgColor: "bg-sky-500/10",
    hoverBgColor: "hover:bg-sky-500/20",
  },
  {
    name: "Litecoin",
    symbol: "LTC",
    icon: () => (
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-400 text-xs font-bold text-white">
        Ł
      </div>
    ),
    color: "text-slate-400",
    bgColor: "bg-slate-400/10",
    hoverBgColor: "hover:bg-slate-400/20",
  },
]

export function CryptoSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="border-y border-border bg-card py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Trade Top Cryptocurrencies</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Invest in the most trusted digital assets with competitive rates
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {cryptos.map((crypto, index) => (
            <div
              key={crypto.symbol}
              className={`group flex cursor-pointer flex-col items-center gap-4 rounded-2xl border border-border bg-secondary/50 p-6 transition-all duration-500 hover:border-primary/50 hover:bg-secondary hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: isVisible ? `${index * 100}ms` : "0ms" }}
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-xl ${crypto.bgColor} transition-all duration-300 group-hover:scale-110 group-hover:rotate-12`}
              >
                <crypto.icon className={`h-7 w-7 ${crypto.color}`} />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                  {crypto.name}
                </h3>
                <p className="text-sm text-muted-foreground">{crypto.symbol}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
