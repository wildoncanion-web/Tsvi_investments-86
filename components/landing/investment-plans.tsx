"use client"

import { Button } from "@/components/ui/button"
import { Check, Sparkles } from "lucide-react"
import { HudFrame } from "./hud-frame"
import { SectionEyebrow } from "./section-eyebrow"
import { useSnapCarousel } from "./use-snap-carousel"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

const plans = [
  {
    name: "Starter",
    minDeposit: "$100",
    maxDeposit: "$999",
    roi: "8%",
    duration: "7 days",
    features: ["Daily returns", "24/7 Support", "Instant withdrawals"],
    popular: false,
  },
  {
    name: "Growth",
    minDeposit: "$1,000",
    maxDeposit: "$9,999",
    roi: "12%",
    duration: "14 days",
    features: ["Daily returns", "Priority support", "Instant withdrawals", "Portfolio tracking"],
    popular: true,
  },
  {
    name: "Premium",
    minDeposit: "$10,000",
    maxDeposit: "$49,999",
    roi: "18%",
    duration: "30 days",
    features: ["Daily returns", "VIP support", "Instant withdrawals", "Portfolio tracking", "Personal advisor"],
    popular: false,
  },
  {
    name: "Elite",
    minDeposit: "$50,000",
    maxDeposit: "Unlimited",
    roi: "25%",
    duration: "60 days",
    features: [
      "Daily returns",
      "Dedicated manager",
      "Instant withdrawals",
      "Portfolio tracking",
      "Personal advisor",
      "Custom strategies",
    ],
    popular: false,
  },
]

export function InvestmentPlans() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const carousel = useSnapCarousel<HTMLDivElement>()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="border-y border-border bg-card py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`flex flex-col items-start gap-4 md:items-center md:text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <SectionEyebrow>Plans</SectionEyebrow>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Investment Plans</h2>
          <p className="text-pretty text-base text-muted-foreground sm:text-lg">
            Choose a plan that fits your investment goals
          </p>
        </div>

        <div
          role="group"
          aria-label="Jump to plan"
          className="mt-8 grid grid-cols-4 border border-border bg-background/40 md:hidden"
        >
          {plans.map((plan, index) => {
            const isActive = carousel.activeIndex === index
            return (
              <button
                key={plan.name}
                type="button"
                onClick={() => carousel.scrollTo(index)}
                aria-pressed={isActive}
                className={`relative flex flex-col items-center gap-0.5 border-r border-border py-2.5 last:border-r-0 transition-colors duration-300 ${
                  isActive ? "bg-primary/10" : ""
                }`}
              >
                <span className={`text-xs font-semibold ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                  {plan.name}
                </span>
                <span className={`font-mono text-sm font-bold ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                  {plan.roi}
                </span>
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 bottom-0 h-0.5 bg-primary transition-transform duration-300 ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </button>
            )
          })}
        </div>

        <div
          ref={carousel.ref}
          onScroll={carousel.onScroll}
          className="relative -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pt-10 pb-4 [scrollbar-width:none] md:mx-0 md:mt-4 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4"
        >
          {plans.map((plan, index) => (
            <HudFrame
              key={plan.name}
              onMouseEnter={() => setHoveredPlan(plan.name)}
              onMouseLeave={() => setHoveredPlan(null)}
              active={hoveredPlan === plan.name}
              variant={plan.popular ? "highlight" : "default"}
              fill={plan.popular ? "color-mix(in oklab, var(--primary) 6%, var(--card))" : "var(--card)"}
              showTab={!plan.popular}
              className={`w-4/5 shrink-0 snap-center sm:w-3/5 md:w-auto transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${
                hoveredPlan === plan.name ? "-translate-y-2" : ""
              }`}
              contentClassName="flex flex-col p-6 pt-8"
              style={{ transitionDelay: isVisible ? `${index * 150}ms` : "0ms" }}
            >
              {plan.popular && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground [clip-path:polygon(0_0,100%_0,calc(100%-8px)_100%,8px_100%)]">
                  <Sparkles className="h-3 w-3 animate-pulse" />
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                <div className="mt-4">
                  <span
                    className={`text-4xl font-bold transition-all duration-300 ${hoveredPlan === plan.name ? "text-primary scale-110 inline-block" : "text-primary"}`}
                  >
                    {plan.roi}
                  </span>
                  <span className="text-muted-foreground"> ROI</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">Duration: {plan.duration}</p>
              </div>

              <div className="mb-6 space-y-2 border-t border-border pt-6">
                <p className="text-sm text-muted-foreground">
                  Min: <span className="font-medium text-foreground">{plan.minDeposit}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Max: <span className="font-medium text-foreground">{plan.maxDeposit}</span>
                </p>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li
                    key={feature}
                    className={`flex items-center gap-2 text-sm text-muted-foreground transition-all duration-300 ${
                      hoveredPlan === plan.name ? "translate-x-1" : ""
                    }`}
                    style={{ transitionDelay: `${featureIndex * 50}ms` }}
                  >
                    <Check
                      className={`h-4 w-4 transition-colors duration-300 ${hoveredPlan === plan.name ? "text-accent" : "text-primary"}`}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link href="/register">
                <Button
                  variant={plan.popular ? "default" : "outline"}
                  className={`w-full transition-all duration-300 ${
                    hoveredPlan === plan.name && !plan.popular ? "bg-primary text-primary-foreground" : ""
                  }`}
                >
                  Get Started
                </Button>
              </Link>
            </HudFrame>
          ))}
        </div>
      </div>
    </section>
  )
}
