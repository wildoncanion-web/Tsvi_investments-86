"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const slides = [
  {
    title: "Your Journey to a New Beginning",
    description: "Expert immigration guidance for individuals and families seeking new opportunities",
    image: "/diverse-people-celebrating-success-immigration.jpg",
  },
  {
    title: "Business Immigration Made Simple",
    description: "Streamlined visa solutions for entrepreneurs and corporations expanding globally",
    image: "/business-professionals-handshake-international.jpg",
  },
  {
    title: "Family Reunification Services",
    description: "Bringing families together across borders with compassionate legal support",
    image: "/happy-family-reunion-airport.jpg",
  },
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval) // Cleanup on unmount
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="relative w-full h-[600px] md:h-[700px]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={slides[currentSlide].image || "/placeholder.svg"}
          alt={slides[currentSlide].title}
          className="object-cover w-full h-full"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative container px-4 h-full flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance leading-tight">
            {slides[currentSlide].title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 text-pretty leading-relaxed max-w-2xl mx-auto">
            {slides[currentSlide].description}
          </p>
          <Link href="/connect">
            <Button size="lg" className="text-base px-8 py-6 rounded-full">
              Connect With Us Now
            </Button>
          </Link>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={prevSlide}
          className="rounded-full h-10 w-10 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        {/* Pagination Dots */}
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={nextSlide}
          className="rounded-full h-10 w-10 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </section>
  )
}
