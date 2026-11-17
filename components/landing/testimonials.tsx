"use client"

import Image from "next/image"
import { Star, Quote } from "lucide-react"
import { HudFrame } from "./hud-frame"
import { SectionEyebrow } from "./section-eyebrow"
import { useSnapCarousel } from "./use-snap-carousel"
import { useEffect, useRef, useState } from "react"

const testimonials = [
  {
    name: "Michael Anderson",
    role: "Investor since 2023",
    image: "/professional-white-man-portrait.jpg",
    content:
      "TSVI Investments has transformed my portfolio. The returns are consistent and the platform is incredibly easy to use.",
    rating: 5,
  },
  {
    name: "Sarah Mitchell",
    role: "Investor since 2024",
    image: "/professional-white-woman-portrait.jpg",
    content:
      "I was skeptical at first, but after 6 months of steady returns, I'm a believer. Best decision I've made for my crypto investments.",
    rating: 5,
  },
  {
    name: "James Thompson",
    role: "Investor since 2023",
    image: "/professional-white-businessman-portrait.jpg",
    content:
      "The customer support is exceptional and withdrawals are processed within hours. Highly recommend TSVI to serious investors.",
    rating: 5,
  },
]

export function Testimonials() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const carousel = useSnapCarousel<HTMLDivElement>()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`flex flex-col gap-4 md:flex-row md:items-end md:justify-between transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="flex flex-col gap-4">
            <SectionEyebrow>Investor stories</SectionEyebrow>
            <h2 className="max-w-md text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Trusted by Investors Worldwide
            </h2>
          </div>
          <p className="text-base text-muted-foreground sm:text-lg">See what our investors have to say</p>
        </div>

        <div
          ref={carousel.ref}
          onScroll={carousel.onScroll}
          className="relative -mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pt-2 pb-4 [scrollbar-width:none] md:mx-0 md:mt-12 md:grid md:grid-cols-2 md:grid-rows-2 md:gap-6 md:overflow-visible md:p-0"
        >
          {testimonials.map((testimonial, index) => (
            <HudFrame
              key={testimonial.name}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              active={hoveredIndex === index || carousel.activeIndex === index}
              fill="var(--secondary)"
              className={`w-[86%] shrink-0 snap-center md:w-auto transition-all duration-500 ${index === 0 ? "md:row-span-2" : ""} ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              } ${hoveredIndex === index ? "-translate-y-2" : ""}`}
              contentClassName={`flex flex-col p-6 ${index === 0 ? "md:p-10 md:text-lg" : ""}`}
              style={{ transitionDelay: isVisible ? `${index * 150}ms` : "0ms" }}
            >
              {/* Quote icon */}
              <Quote
                className={`absolute top-4 right-4 h-8 w-8 transition-all duration-300 ${
                  hoveredIndex === index ? "text-primary/30 scale-110" : "text-muted/20"
                }`}
              />

              {/* Stars with animation */}
              <div className="mb-4 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 fill-accent text-accent transition-all duration-300 ${
                      hoveredIndex === index ? "scale-110" : ""
                    }`}
                    style={{ transitionDelay: `${i * 50}ms` }}
                  />
                ))}
              </div>

              <p
                className={`flex-1 text-pretty leading-relaxed text-muted-foreground transition-colors duration-300 ${
                  index === 0 ? "text-lg sm:text-xl md:text-3xl md:leading-snug" : ""
                } ${
                  hoveredIndex === index ? "text-foreground/90" : ""
                }`}
              >
                &ldquo;{testimonial.content}&rdquo;
              </p>

              <div className="mt-6 flex items-center gap-4">
                <div
                  className={`overflow-hidden rounded-full transition-all duration-300 ${
                    hoveredIndex === index ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
                  }`}
                >
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className={`rounded-full transition-transform duration-300 ${
                      hoveredIndex === index ? "scale-110" : ""
                    }`}
                  />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </HudFrame>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between md:hidden">
          <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
            <span className="text-primary">{String(carousel.activeIndex + 1).padStart(2, "0")}</span>
            {` / ${String(testimonials.length).padStart(2, "0")}`}
          </span>
          <div className="flex items-center gap-2">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.name}
                type="button"
                onClick={() => carousel.scrollTo(index)}
                aria-label={`Show review from ${testimonial.name}`}
                aria-current={carousel.activeIndex === index}
                className={`h-1.5 transition-all duration-300 ${
                  carousel.activeIndex === index ? "w-8 bg-primary" : "w-3 bg-primary/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
