"use client"

import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react"

export function PortfolioOverview() {
  const { userProfile } = useAuth()

  const totalBalance = userProfile?.totalBalance || 0
  const holdings = userProfile?.holdings || {
    BTC: 0,
    USDC: 0,
    USDT: 0,
    TON: 0,
    LTC: 0,
  }

  // Calculate total holdings value (simplified - in real app would use live prices)
  const totalHoldings = Object.values(holdings).reduce((sum, val) => sum + val, 0)

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Balance</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">${totalBalance.toLocaleString()}</div>
          <p className="mt-1 flex items-center gap-1 text-xs text-primary">
            <ArrowUpRight className="h-3 w-3" />
            +0.00% from last month
          </p>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Active Investments</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">$0.00</div>
          <p className="mt-1 flex items-center gap-1 text-xs text-primary">
            <ArrowUpRight className="h-3 w-3" />0 active plans
          </p>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Earnings</CardTitle>
          <ArrowUpRight className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">$0.00</div>
          <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">All time earnings</p>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Pending Withdrawals</CardTitle>
          <ArrowDownRight className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">$0.00</div>
          <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">0 pending requests</p>
        </CardContent>
      </Card>
    </div>
  )
}
