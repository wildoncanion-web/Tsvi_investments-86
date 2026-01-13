"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const plans = [
  {
    name: "Starter",
    minDeposit: "$100",
    roi: "8%",
    duration: "7 days",
    popular: false,
  },
  {
    name: "Growth",
    minDeposit: "$1,000",
    roi: "12%",
    duration: "14 days",
    popular: true,
  },
  {
    name: "Premium",
    minDeposit: "$10,000",
    roi: "18%",
    duration: "30 days",
    popular: false,
  },
]

export function InvestmentPlansCard() {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-foreground">Investment Plans</CardTitle>
        <Link href="/dashboard/plans">
          <Button variant="ghost" size="sm" className="gap-1 text-primary">
            View All <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-xl border p-4 ${
                plan.popular ? "border-primary bg-primary/5" : "border-border bg-secondary/50"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
                  Popular
                </div>
              )}
              <h4 className="font-semibold text-foreground">{plan.name}</h4>
              <div className="mt-2">
                <span className="text-2xl font-bold text-primary">{plan.roi}</span>
                <span className="text-sm text-muted-foreground"> ROI</span>
              </div>
              <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                <p>Min: {plan.minDeposit}</p>
                <p>Duration: {plan.duration}</p>
              </div>
              <Link href="/dashboard/plans" className="mt-4 block">
                <Button size="sm" variant={plan.popular ? "default" : "outline"} className="w-full">
                  Invest Now
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
