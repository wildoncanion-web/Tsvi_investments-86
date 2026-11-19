"use client"

import { Bitcoin } from "lucide-react"
import { HudFrame } from "./hud-frame"
import { SectionEyebrow } from "./section-eyebrow"
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
    <section ref={sectionRef} className="border-b border-border bg-card py-14 md:py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 md:gap-12 lg:flex-row lg:items-center lg:gap-16 lg:px-8">
        <div
          className={`flex flex-col gap-4 lg:w-2/5 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <SectionEyebrow>Supported assets</SectionEyebrow>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Trade Top Cryptocurrencies
          </h2>
          <p className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Invest in the most trusted digital assets with competitive rates, all from one secure wallet.
          </p>
        </div>

        <HudFrame
          fill="var(--secondary)"
          className={`sm:hidden transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          contentClassName="flex flex-col px-4 pt-5 pb-7"
          style={{ transitionDelay: isVisible ? "150ms" : "0ms" }}
        >
          <div className="flex items-center justify-between border-b border-border pb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            <span>Asset</span>
            <span>Ticker</span>
          </div>
          <ul className="flex flex-col">
            {cryptos.map((crypto, index) => (
              <li
                key={crypto.symbol}
                className={`flex items-center gap-3 border-b border-border/60 py-3 last:border-b-0 transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                }`}
                style={{ transitionDelay: isVisible ? `${200 + index * 70}ms` : "0ms" }}
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${crypto.bgColor}`}>
                  <crypto.icon className={`h-5 w-5 ${crypto.color}`} />
                </div>
                <span className="flex-1 font-semibold text-foreground">{crypto.name}</span>
                <span className="border border-primary/40 px-2 py-0.5 font-mono text-xs font-semibold text-primary [clip-path:polygon(6px_0,100%_0,100%_calc(100%-6px),calc(100%-6px)_100%,0_100%,0_6px)]">
                  {crypto.symbol}
                </span>
              </li>
            ))}
          </ul>
        </HudFrame>

        <div className="hidden flex-1 grid-cols-3 gap-4 sm:grid">
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
