"use client"

import { Bitcoin } from "lucide-react"
import { HudFrame } from "./hud-frame"
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
    name: "Ethereum",
    symbol: "ETH",
    icon: () => (
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500 text-xs font-bold text-white">
        E
      </div>
    ),
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    hoverBgColor: "hover:bg-indigo-500/20",
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
  {
    name: "Dogecoin",
    symbol: "DOGE",
    icon: () => (
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white">
        D
      </div>
    ),
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    hoverBgColor: "hover:bg-amber-500/20",
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
    <section ref={sectionRef} className="border-b border-border bg-card py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:flex-row lg:items-center lg:gap-16 lg:px-8">
        <div
          className={`flex flex-col gap-4 lg:w-2/5 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">Supported assets</span>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Trade Top Cryptocurrencies
          </h2>
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
            Invest in the most trusted digital assets with competitive rates, all from one secure wallet.
          </p>
        </div>

        <div className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-3">
          {cryptos.map((crypto, index) => (
            <HudFrame
              key={crypto.symbol}
              fill="var(--secondary)"
              className={`group cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:[--frame-color:var(--primary)] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              contentClassName="flex flex-col items-center gap-3 p-4 sm:gap-4 sm:p-6"
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
            </HudFrame>
          ))}
        </div>
      </div>
    </section>
  )
}
