"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Loader2 } from "lucide-react"
import Link from "next/link"

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

export default function PlansPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="px-4 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-foreground">Investment Plans</h1>
            <p className="mt-2 text-muted-foreground">Choose a plan that fits your investment goals</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative flex flex-col ${
                  plan.popular ? "border-primary bg-primary/5" : "border-border bg-card"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Most Popular
                  </div>
                )}
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-foreground">{plan.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-4xl font-bold text-primary">{plan.roi}</span>
                    <span className="text-muted-foreground"> ROI</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Duration: {plan.duration}</p>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <div className="mb-6 space-y-2 border-t border-border pt-4">
                    <p className="text-sm text-muted-foreground">
                      Min: <span className="font-medium text-foreground">{plan.minDeposit}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Max: <span className="font-medium text-foreground">{plan.maxDeposit}</span>
                    </p>
                  </div>

                  <ul className="mb-6 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link href="/dashboard/deposit">
                    <Button variant={plan.popular ? "default" : "outline"} className="w-full">
                      Invest Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
