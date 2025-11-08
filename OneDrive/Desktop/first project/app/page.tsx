import { AnnouncementBar } from "@/components/announcement-bar"
import { Header } from "@/components/header"
import { HeroCarousel } from "@/components/hero-carousel"
import { ImmigrationSolutions } from "@/components/immigration-solutions"
import { MissionStatement } from "@/components/mission-statement"
import { QuoteSection } from "@/components/quote-section"
import { FounderStory } from "@/components/founder-story"
import { ConsultationCTA } from "@/components/consultation-cta"
import TestimonialsCarousel from "@/components/testimonials-carousel"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <AnnouncementBar />
      <Header />
      <HeroCarousel />
      <ImmigrationSolutions />
      <MissionStatement />
      <QuoteSection />
      <FounderStory />
      <ConsultationCTA />
      <TestimonialsCarousel />
      <Footer />
    </main>
  )
}
