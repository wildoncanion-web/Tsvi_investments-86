"use client"

import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Wallet, ArrowUpRight, Gift, CreditCard } from "lucide-react"

export function PortfolioOverview() {
  const { userProfile } = useAuth()

  const totalBalance = userProfile?.totalBalance || 0
  const availableBalance = userProfile?.availableBalance || 0
  const credits = userProfile?.credits || 0
  const bonus = userProfile?.bonus || 0
  const profit = userProfile?.profit || 0

  // Combined balance includes all values
  const combinedBalance = totalBalance + credits + bonus + profit

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Balance</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">${combinedBalance.toLocaleString()}</div>
          <p className="mt-1 text-xs text-muted-foreground">
            Base: ${totalBalance.toLocaleString()}
          </p>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Available Balance</CardTitle>
          <Wallet className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">${availableBalance.toLocaleString()}</div>
          <p className="mt-1 text-xs text-muted-foreground">Available for withdrawal</p>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Credits</CardTitle>
          <CreditCard className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-500">${credits.toLocaleString()}</div>
          <p className="mt-1 text-xs text-muted-foreground">Account credits</p>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Bonus</CardTitle>
          <Gift className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-amber-500">${bonus.toLocaleString()}</div>
          <p className="mt-1 text-xs text-muted-foreground">Bonus rewards</p>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Profit</CardTitle>
          <ArrowUpRight className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">${profit.toLocaleString()}</div>
          <p className="mt-1 text-xs text-muted-foreground">Investment earnings</p>
        </CardContent>
      </Card>
    </div>
  )
}
