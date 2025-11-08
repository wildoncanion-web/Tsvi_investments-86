import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function InvestorVisaPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-16 md:py-24 bg-background">
          <div className="container px-4 max-w-4xl">
            <h1 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Investor Visa
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Investment-based immigration programs for business expansion and entrepreneurial ventures in the United
              States.
            </p>

            <div className="prose prose-lg max-w-none mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Our Services Include:</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>EB-5 Immigrant Investor Program</li>
                <li>E-2 Treaty Investor Visa</li>
                <li>Regional Center Investments</li>
                <li>Direct Investment Projects</li>
                <li>Business Plan Development</li>
              </ul>
            </div>

            <Link href="/contact">
              <Button size="lg" className="font-semibold">
                Schedule a Consultation
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
