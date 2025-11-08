import Link from "next/link"
import Image from "next/image"

const solutions = [
  {
    title: "Business Immigration",
    description: "Visa solutions for entrepreneurs, investors, and skilled professionals",
    image: "/business-immigration-icon.jpg",
    href: "/services/business-immigration",
  },
  {
    title: "Family Immigration",
    description: "Reunite with loved ones through family sponsorship programs",
    image: "/family-immigration-icon.jpg",
    href: "/services/family-immigration",
  },
  {
    title: "Healthcare Immigration",
    description: "Specialized pathways for medical professionals and healthcare workers",
    image: "/healthcare-immigration-icon.jpg",
    href: "/services/healthcare-immigration",
  },
  {
    title: "Investor Visa",
    description: "Investment-based immigration programs for business expansion",
    image: "/investor-visa-icon.jpg",
    href: "/services/investor-visa",
  },
  {
    title: "Citizenship & Naturalization",
    description: "Complete support for citizenship applications and naturalization",
    image: "/citizenship-naturalization-icon.jpg",
    href: "/services/citizenship-naturalization",
  },
]

export function ImmigrationSolutions() {
  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Immigration Solutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Comprehensive immigration services tailored to your unique needs
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {solutions.map((solution, index) => (
            <Link
              key={index}
              href={solution.href}
              className="group flex flex-col items-center text-center transition-transform hover:scale-105"
            >
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-4 shadow-lg group-hover:shadow-xl transition-shadow border-4 border-primary/20 group-hover:border-primary/40">
                <Image src={solution.image || "/placeholder.svg"} alt={solution.title} fill className="object-cover" />
              </div>
              <h3 className="font-sans text-base md:text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {solution.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
