import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  icon: LucideIcon
  iconColor?: string
}

export function StatsCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  iconColor = "text-emerald-500",
}: StatsCardProps) {
  return (
    <div className="rounded-xl border border-emerald-500/20 bg-zinc-900/50 p-6 transition-all hover:border-emerald-500/40">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-zinc-500">{title}</p>
          <p className="mt-1 text-2xl font-bold text-white">{value}</p>
          {change && (
            <p
              className={cn(
                "mt-1 text-sm",
                changeType === "positive" && "text-emerald-400",
                changeType === "negative" && "text-red-400",
                changeType === "neutral" && "text-zinc-500",
              )}
            >
              {change}
            </p>
          )}
        </div>
        <div className={cn("rounded-lg bg-zinc-800 p-3", iconColor)}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  )
}
