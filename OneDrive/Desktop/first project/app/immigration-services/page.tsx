"use client"

import { useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Check } from "lucide-react"

export default function ImmigrationServicesPage() {
  useEffect(() => {
    // Smooth scroll to Legal Services and Pricing section on page load
    setTimeout(() => {
      const element = document.getElementById('legal-services-pricing')
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        })
      }
    }, 300) // Delay to ensure page content is rendered
  }, [])
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Section One - Hero Landing Page with Cover Photo */}
        <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="/diverse-people-celebrating-success-immigration.jpg"
              alt="Diverse people in harmony"
              className="object-cover w-full h-full"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* Content Overlay */}
          <div className="relative container px-4 h-full flex items-center justify-center">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 text-balance leading-tight">
                Immigration
                <br />
                Solution For Professionals, Businesses,
                <br />
                Investors And Family
              </h1>
              <Link href="mailto:florina@apostolfirm.com">
                <Button size="lg" className="text-base px-8 py-6 rounded-full bg-primary hover:bg-primary/90">
                  Email Us Today Florina@Apostolfirm.Com
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Section Two - About Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 text-foreground">
              LET US FIND THE BEST IMMIGRATION SOLUTION FOR YOU
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <p className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-6">
                Apostol Law Firm provides representation to clients throughout the United States and the world.
              </p>
              <p className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-8">
                Our immigration professionals are intelligent and driven as they are passionate and caring. We treat our clients with compassion and work relentlessly to help them make their American Dream Come True. We approach every interaction - with each company and each individual - with an unwavering commitment to service.
              </p>
              
              {/* Book Appointment Button */}
              <div className="text-center mt-10">
                <Link href="/connect">
                  <Button size="lg" className="text-base px-8 py-6 rounded-full">
                    Book an Appointment
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Legal Services and Pricing Section */}
        <section id="legal-services-pricing" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 text-foreground">
              Legal Services and Pricing
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {/* Initial Consultation */}
              <div className="border-2 border-muted rounded-lg p-6 hover:border-primary transition-colors flex flex-col">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-3">
                    Initial Consultation
                  </span>
                  <p className="text-foreground/80 text-sm leading-relaxed mb-4">
                    Review of legal matters, advice session
                  </p>
                </div>
                <div className="mt-auto space-y-3">
                  <div className="flex justify-between items-center border-t border-muted pt-3">
                    <span className="text-lg font-semibold text-foreground">Price:</span>
                    <span className="text-xl font-bold text-primary">$150</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground/70">Duration:</span>
                    <span className="text-sm font-medium text-foreground">1 Hour</span>
                  </div>
                  <Link href="/pay?service=Initial Consultation&amount=150&reference=REF-CON-001">
                    <Button className="w-full mt-4">Book Now</Button>
                  </Link>
                </div>
              </div>

              {/* Contract Drafting */}
              <div className="border-2 border-muted rounded-lg p-6 hover:border-primary transition-colors flex flex-col">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-3">
                    Contract Drafting
                  </span>
                  <p className="text-foreground/80 text-sm leading-relaxed mb-4">
                    Creation of business contracts
                  </p>
                </div>
                <div className="mt-auto space-y-3">
                  <div className="flex justify-between items-center border-t border-muted pt-3">
                    <span className="text-lg font-semibold text-foreground">Price:</span>
                    <span className="text-xl font-bold text-primary">$500</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground/70">Duration:</span>
                    <span className="text-sm font-medium text-foreground">Varies</span>
                  </div>
                  <Link href="/pay?service=Contract Drafting&amount=500&reference=REF-CDR-002">
                    <Button className="w-full mt-4">Book Now</Button>
                  </Link>
                </div>
              </div>

              {/* Contract Review */}
              <div className="border-2 border-muted rounded-lg p-6 hover:border-primary transition-colors flex flex-col">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-3">
                    Contract Review
                  </span>
                  <p className="text-foreground/80 text-sm leading-relaxed mb-4">
                    Detailed analysis and legal advice on existing contracts
                  </p>
                </div>
                <div className="mt-auto space-y-3">
                  <div className="flex justify-between items-center border-t border-muted pt-3">
                    <span className="text-lg font-semibold text-foreground">Price:</span>
                    <span className="text-xl font-bold text-primary">$300</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground/70">Duration:</span>
                    <span className="text-sm font-medium text-foreground">Varies</span>
                  </div>
                  <Link href="/pay?service=Contract Review&amount=300&reference=REF-CRE-003">
                    <Button className="w-full mt-4">Book Now</Button>
                  </Link>
                </div>
              </div>

              {/* Intellectual Property */}
              <div className="border-2 border-muted rounded-lg p-6 hover:border-primary transition-colors flex flex-col">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-3">
                    Intellectual Property
                  </span>
                  <p className="text-foreground/80 text-sm leading-relaxed mb-4">
                    Trademark and patent registration
                  </p>
                </div>
                <div className="mt-auto space-y-3">
                  <div className="flex justify-between items-center border-t border-muted pt-3">
                    <span className="text-lg font-semibold text-foreground">Price:</span>
                    <span className="text-xl font-bold text-primary">From $1000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground/70">Duration:</span>
                    <span className="text-sm font-medium text-foreground">Varies</span>
                  </div>
                  <Link href="/pay?service=Intellectual Property&amount=1000&reference=REF-IPP-004">
                    <Button className="w-full mt-4">Book Now</Button>
                  </Link>
                </div>
              </div>

              {/* Corporate Formation */}
              <div className="border-2 border-muted rounded-lg p-6 hover:border-primary transition-colors flex flex-col">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-3">
                    Corporate Formation
                  </span>
                  <p className="text-foreground/80 text-sm leading-relaxed mb-4">
                    Assistance with forming a corporation or LLC
                  </p>
                </div>
                <div className="mt-auto space-y-3">
                  <div className="flex justify-between items-center border-t border-muted pt-3">
                    <span className="text-lg font-semibold text-foreground">Price:</span>
                    <span className="text-xl font-bold text-primary">$1500</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground/70">Duration:</span>
                    <span className="text-sm font-medium text-foreground">Varies</span>
                  </div>
                  <Link href="/pay?service=Corporate Formation&amount=1500&reference=REF-COR-005">
                    <Button className="w-full mt-4">Book Now</Button>
                  </Link>
                </div>
              </div>

              {/* Litigation */}
              <div className="border-2 border-muted rounded-lg p-6 hover:border-primary transition-colors flex flex-col">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-3">
                    Litigation
                  </span>
                  <p className="text-foreground/80 text-sm leading-relaxed mb-4">
                    Civil litigation services per hour
                  </p>
                </div>
                <div className="mt-auto space-y-3">
                  <div className="flex justify-between items-center border-t border-muted pt-3">
                    <span className="text-lg font-semibold text-foreground">Price:</span>
                    <span className="text-xl font-bold text-primary">$300/hr</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-foreground/70">Duration:</span>
                    <span className="text-sm font-medium text-foreground">Varies</span>
                  </div>
                  <Link href="/pay?service=Litigation&amount=300&reference=REF-LIT-006">
                    <Button className="w-full mt-4">Book Now</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Three - Two Column Layout */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Left Part - Immigration Journey */}
              <div>
                <h2 className="font-sans text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Let us guide and help you on your immigration journey
                </h2>
                <div className="space-y-4 text-lg text-foreground/90 leading-relaxed">
                  <p>
                    Whether you want to come to the U.S. to be with family or loved ones, find new job opportunities, study, or invest in a business, we are here to help YOU.
                  </p>
                  <p>
                    Our team is committed to providing zealous, ethical, compassionate representation. We constantly monitor developments in immigration law and use state-of-the-art technology for research, client communications, and case management.
                  </p>
                </div>
              </div>

              {/* Right Part - Value-Added Services */}
              <div>
                <h3 className="font-sans text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Our Value-Added Services:
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <span className="text-lg text-foreground/90">
                      Compassionate, personalized support to help ease the burden of a complex immigration visa process.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <span className="text-lg text-foreground/90">
                      Strategic and tailored consultation to help individuals and businesses achieve their goals.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <span className="text-lg text-foreground/90">
                      Robust resources to help you understand the immigration law in a changing world.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <span className="text-lg text-foreground/90">
                      Free guidance on how to obtain a driver license, social security number, federal government benefits, U.S. passport and many more benefits in the United States.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <span className="text-lg text-foreground/90">
                      State-of-the-art case management technology which will provide 24/7 access to your case matters, case status with USCIS, and serve as a central resource for information transfer and document upload and storage.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <span className="text-lg text-foreground/90">
                      Guidance, support, and technology to help get your employees on the ground quickly and compliantly.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <span className="text-lg text-foreground/90">
                      Reporting and analytics for businesses.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <span className="text-lg text-foreground/90">
                      Business review meetings periodically to discuss strategies and anticipated needs.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
        </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
