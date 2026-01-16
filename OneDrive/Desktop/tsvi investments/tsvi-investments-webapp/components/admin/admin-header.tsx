
"use client"

import { Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface AdminHeaderProps {
  title: string
  description?: string
}

export function AdminHeader({ title, description }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-emerald-500/20 bg-zinc-950/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-6">
        <div>
          <h1 className="text-xl font-bold text-white">{title}</h1>
          {description && <p className="text-sm text-zinc-500">{description}</p>}
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <Input
              placeholder="Search..."
              className="w-64 border-zinc-800 bg-zinc-900/50 pl-9 text-white placeholder:text-zinc-500 focus:border-emerald-500/50"
            />
          </div>
          <Button variant="ghost" size="icon" className="relative text-zinc-400 hover:text-white">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-emerald-500" />
          </Button>
        </div>
      </div>
    </header>
  )
}
