"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, TrendingUp, Zap } from "lucide-react"
import { FloatingCoins } from "./floating-coins"
import { AnimatedCounter } from "./animated-counter"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      <FloatingCoins />

      {/* Background Elements with pulse animation */}
      <div className="absolute inset-0 -z-10">
        <div className="animate-pulse-glow absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="animate-pulse-glow animation-delay-1000 absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="animate-slide-up mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            <span className="text-sm text-primary">
              Trusted by <AnimatedCounter end={10000} suffix="+" /> investors worldwide
            </span>
          </div>

          <h1 className="animate-slide-up animation-delay-200 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            {/* Finance without */}
            <br />
            <span className="animate-shimmer bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] bg-clip-text text-transparent">
              the middleman.
            </span>
          </h1>

          <p className="animate-slide-up animation-delay-400 mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
            Do more with your digital assets. The self-custody platform that brings the best of DeFi directly to you.
            Invest in BTC, USDC, USDT, TON, and LTC with confidence.
          </p>

          <div className="animate-scale-in animation-delay-600 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/register">
              <Button
                size="lg"
                className="gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
              >
                Start Investing <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/about">
              <Button
                variant="outline"
                size="lg"
                className="transition-all duration-300 hover:scale-105 bg-transparent"
              >
                Learn More
              </Button>
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="animate-scale-in animation-delay-600 group flex flex-col items-center gap-3 rounded-xl p-4 transition-all duration-300 hover:bg-secondary/50">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Bank-Grade Security</h3>
              <p className="text-sm text-muted-foreground">256-bit encryption protecting your assets</p>
            </div>
            <div className="animate-scale-in animation-delay-800 group flex flex-col items-center gap-3 rounded-xl p-4 transition-all duration-300 hover:bg-secondary/50">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground">High Returns</h3>
              <p className="text-sm text-muted-foreground">Competitive yields on your investments</p>
            </div>
            <div className="animate-scale-in animation-delay-1000 group flex flex-col items-center gap-3 rounded-xl p-4 transition-all duration-300 hover:bg-secondary/50">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Instant Deposits</h3>
              <p className="text-sm text-muted-foreground">Quick and seamless transactions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
