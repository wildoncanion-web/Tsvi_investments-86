"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownLeft } from "lucide-react"

// Mock transactions - in real app would come from Firebase
const mockTransactions: {
  id: string
  type: "deposit" | "withdrawal" | "earning"
  amount: number
  currency: string
  status: "pending" | "completed" | "failed"
  date: string
}[] = []

export function RecentTransactions() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        {mockTransactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <ArrowUpRight className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="mt-4 text-sm font-medium text-foreground">No transactions yet</p>
            <p className="mt-1 text-sm text-muted-foreground">Make your first deposit to start investing</p>
          </div>
        ) : (
          <div className="space-y-4">
            {mockTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between rounded-lg bg-secondary/50 p-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      tx.type === "deposit" ? "bg-primary/10" : "bg-accent/10"
                    }`}
                  >
                    {tx.type === "deposit" ? (
                      <ArrowDownLeft className="h-5 w-5 text-primary" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5 text-accent" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium capitalize text-foreground">{tx.type}</p>
                    <p className="text-sm text-muted-foreground">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${tx.type === "deposit" ? "text-primary" : "text-accent"}`}>
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
  )
}
