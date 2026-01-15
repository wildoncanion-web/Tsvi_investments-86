"use client"

import { Button } from "@/components/ui/button"
import { Check, Sparkles } from "lucide-react"
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
    <section ref={sectionRef} className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Investment Plans</h2>
          <p className="mt-4 text-lg text-muted-foreground">Choose a plan that fits your investment goals</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              onMouseEnter={() => setHoveredPlan(plan.name)}
              onMouseLeave={() => setHoveredPlan(null)}
              className={`relative flex flex-col rounded-2xl border transition-all duration-500 ${
                plan.popular
                  ? "border-primary bg-primary/5"
                  : hoveredPlan === plan.name
                    ? "border-primary/50 bg-card"
                    : "border-border bg-card"
              } p-6 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${
                hoveredPlan === plan.name ? "-translate-y-2 shadow-2xl shadow-primary/20" : ""
              }`}
              style={{ transitionDelay: isVisible ? `${index * 150}ms` : "0ms" }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
