"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownLeft, Loader2 } from "lucide-react"

// Mock transactions - would come from Firebase in real app
const mockTransactions: {
  id: string
  type: "deposit" | "withdrawal" | "earning"
  amount: number
  currency: string
  status: "pending" | "completed" | "failed"
  date: string
}[] = []

export default function TransactionsPage() {
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
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">Transaction History</h1>
            <p className="mt-1 text-muted-foreground">View all your deposits, withdrawals, and earnings</p>
          </div>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground">All Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              {mockTransactions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                    <ArrowUpRight className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="mt-6 text-lg font-medium text-foreground">No transactions yet</p>
                  <p className="mt-2 max-w-sm text-muted-foreground">
                    Your transaction history will appear here once you make your first deposit
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {mockTransactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between rounded-lg bg-secondary/50 p-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                            tx.type === "deposit" ? "bg-primary/10" : "bg-accent/10"
                          }`}
                        >
                          {tx.type === "deposit" ? (
                            <ArrowDownLeft className="h-6 w-6 text-primary" />
                          ) : (
                            <ArrowUpRight className="h-6 w-6 text-accent" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium capitalize text-foreground">{tx.type}</p>
                          <p className="text-sm text-muted-foreground">{tx.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${tx.type === "deposit" ? "text-primary" : "text-accent"}`}>
                          {tx.type === "deposit" ? "+" : "-"}${tx.amount.toFixed(2)} {tx.currency}
                        </p>
                        <p
                          className={`text-sm capitalize ${
                            tx.status === "completed"
                              ? "text-primary"
                              : tx.status === "pending"
                                ? "text-accent"
                                : "text-destructive"
                          }`}
                        >
                          {tx.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
