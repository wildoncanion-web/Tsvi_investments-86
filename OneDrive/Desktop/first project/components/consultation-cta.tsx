"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"

export function ConsultationCTA() {
  return (
    <section className="w-full">
      {/* US Flag Image Section */}
      <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
        <Image src="/us-flag-waving.jpg" alt="United States Flag" fill className="object-cover" priority={false} />
      </div>

      {/* Content Section */}
      <div className="bg-background py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-balance mb-8 tracking-tight">
            NO MATTER WHERE YOU LIVE, WE CAN HELP!
          </h2>

          <blockquote className="mb-8">
            <p className="text-lg md:text-xl text-muted-foreground italic text-balance leading-relaxed mb-6">
              "It is essential to understand each client's unique circumstances and goals in order to find the best
              immigration solution."
            </p>
            <footer className="text-sm font-semibold tracking-wide">
              <div className="text-foreground">FLORINA APOSTOL</div>
              <div className="text-muted-foreground mt-1">MANAGING ATTORNEY</div>
            </footer>
          </blockquote>

          <Button size="lg" className="text-base md:text-lg px-8 py-6 rounded-full font-semibold">
            Schedule a Consultation
          </Button>
        </div>
      </div>
    </section>
  )
}
