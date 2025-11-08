"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Archana",
    rating: 5,
    text: "Florina and her team is really thorough and detailed in their work. Florina worked on getting my H1B visa. She meticulously followed the case progress and succeeded in securing my H1B Visa.",
  },
  {
    id: 2,
    name: "Plummer",
    rating: 5,
    text: "I was recommended by one of my friends! She went above and beyond and will give you all the support needed. I was pregnant and was going through hard times because of my former agency—I reached out for assistance on my visa. She always had time to answer your queries and will give you advices on what to do. She even made a thorough research about another lawyer who could help me on my other case. She calmed me down and give me assurance that everything will be fine (because she could see through the screen that I was so worried and anxious, and she didn't want anything to happen to my baby.) I didn't expect that she'd send us a gift when my baby was born! I highly recommend Atty. Florina — very caring (it's not just client-lawyer relationship), very knowledgeable (not just her scope), very confidence, very sweet, will give you updates about your status even without asking their firm, and she did her best on our transaction—my family liked her so much!",
  },
  {
    id: 3,
    name: "L&L",
    rating: 5,
    text: "Florina is an amazing lawyer, no doubt. Florina and her team have done all the work with high professionalism and great diligence, and we express our deep gratitude for all support received. She explains very clearly all your options; we will continue to use her services without hesitation, and we strongly recommend her.",
  },
  {
    id: 4,
    name: "Marisela",
    rating: 5,
    text: "I hired Florina to assist my elderly mother with her US citizenship process. Throughout the whole experience she and her team were very involved, sincere, diligent and professional. She explained and participated in every step and made sure to check on us and was prompt to respond every question and inquiry. My mom felt very secure and calm. I would highly recommend her because she is genuinely caring, experienced and knowledgeable. Thank you Florina!",
  },
  {
    id: 5,
    name: "Joseph Parris",
    rating: 5,
    text: "Florina, a/k/a Flory, is a trusted and revered attorney that has been the lynchpin of our success with the hiring of several key individuals for our business. She is extremely knowledgeable and always up to date with the latest changes on the immigration rules and processes. I would highly recommend hiring Flory and utilizing her firm for easy as well as complex immigration cases; she is always available for discussions and is quick to respond to questions.",
  },
  {
    id: 6,
    name: "Himanshu Vatsa",
    rating: 5,
    text: "Flory is one amazing lawyer and person. She takes personal interest in her clients situations and gets them comfortable on what the best plan of action would be. Worked on my immigration case and helped me along the way. She went above and beyond on the aspects related to immigration and also RFE (request for evidence) from the authorities. Her attention to detail is immaculate and she is a great example of dedication towards the client. Totally recommend her services.",
  },
]

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 text-foreground">
          What Our Clients Say
        </h2>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Card */}
          <div className="bg-card rounded-2xl p-8 md:p-12 shadow-lg min-h-[400px] md:min-h-[350px] flex flex-col justify-between">
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-accent text-accent" />
              ))}
            </div>

            {/* Testimonial Text */}
            <blockquote className="text-lg md:text-xl text-muted-foreground text-center leading-relaxed mb-8 flex-grow">
              "{testimonials[currentIndex].text}"
            </blockquote>

            {/* Client Name */}
            <p className="font-sans text-xl md:text-2xl font-semibold text-foreground text-center">
              {testimonials[currentIndex].name}
            </p>
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-background/80 backdrop-blur-sm hover:bg-background border-border"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-background/80 backdrop-blur-sm hover:bg-background border-border"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentIndex ? "bg-primary w-8" : "bg-muted-foreground/30"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
