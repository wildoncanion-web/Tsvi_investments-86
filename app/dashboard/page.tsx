"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { PortfolioOverview } from "@/components/dashboard/portfolio-overview"
import { HoldingsCard } from "@/components/dashboard/holdings-card"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { InvestmentPlansCard } from "@/components/dashboard/investment-plans-card"
import { Loader2 } from "lucide-react"

export default function DashboardPage() {
  const { user, userProfile, loading } = useAuth()
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
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">
              Welcome back, {userProfile?.displayName?.split(" ")[0] || "Investor"}
            </h1>
            <p className="mt-1 text-muted-foreground">Here&apos;s an overview of your investment portfolio</p>
          </div>

          {/* Portfolio Overview */}
          <div className="mb-8">
            <PortfolioOverview />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              <InvestmentPlansCard />
              <RecentTransactions />
            </div>
            <div>
              <HoldingsCard />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
