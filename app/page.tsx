import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/landing/hero-section"
import { CryptoSection } from "@/components/landing/crypto-section"
import { InvestmentPlans } from "@/components/landing/investment-plans"
import { Testimonials } from "@/components/landing/testimonials"
import { CTASection } from "@/components/landing/cta-section"
import { PriceTicker } from "@/components/landing/price-ticker"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <PriceTicker />
        <CryptoSection />
        <InvestmentPlans />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
