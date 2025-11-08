"use client"

import { Menu, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"

export function Header() {
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/immigration-services", label: "Legal Services and Pricing" },
    { href: "/pay", label: "Pay Here" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="container mx-auto px-4 py-2">
        <div className="bg-card border border-border rounded-lg shadow-sm flex items-center justify-between px-4 h-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
              <span className="font-sans text-sm font-bold text-primary-foreground">AL</span>
            </div>
            <span className="font-sans text-base font-semibold text-foreground hidden sm:inline">Apostol Law Firm</span>
          </Link>

          {/* Email and Menu */}
          <div className="flex items-center gap-3">
            <a
              href="mailto:florina@apostolfirm.com"
              className="hidden md:flex items-center gap-1.5 text-xs text-foreground/70 hover:text-primary transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              <span className="text-xs">florina@apostolfirm.com</span>
            </a>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] p-4 bg-transparent border-0">
                <div className="bg-card border border-border rounded-lg shadow-sm p-4 mt-4">
                  <nav className="flex flex-col gap-2">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="text-sm font-medium text-foreground hover:text-primary hover:bg-accent rounded-md px-3 py-2 transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                  
                  {/* Email in menu */}
                  <div className="mt-4 pt-4 border-t border-border">
                    <a
                      href="mailto:florina@apostolfirm.com"
                      className="flex items-center gap-2 text-xs text-foreground/70 hover:text-primary transition-colors"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      <span>florina@apostolfirm.com</span>
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
