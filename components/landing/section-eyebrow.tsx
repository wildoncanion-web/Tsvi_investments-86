import type { ReactNode } from "react"

export function SectionEyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span aria-hidden="true" className="h-2 w-2 rotate-45 bg-primary" />
      <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-primary">{children}</span>
      <span aria-hidden="true" className="h-px w-12 bg-primary/40" />
    </div>
  )
}
