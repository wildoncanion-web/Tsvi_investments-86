"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import Image from "next/image"

const newsArticles = [
  {
    id: 1,
    image: "/news-presidential-proclamation.jpg",
    topic: "JUNE 22 PRESIDENTIAL PROCLAMATION, SUSPENDING THE ENTRY OF CERTAIN IMMIGRANTS AND NONIMMIGRANTS",
    excerpt:
      'On Monday June 22, 2020, President Trump signed a new executive order entitled, "Proclamation Suspending Entry of Aliens Who Present a Risk to the U.S. Labor Market Following the Coronavirus Outbreak."',
    date: "June 26, 2020",
  },
  {
    id: 2,
    image: "/news-visa-updates.jpg",
    topic: "NEW H-1B VISA REGULATIONS AND WHAT THEY MEAN FOR YOUR BUSINESS",
    excerpt:
      "The Department of Homeland Security has announced significant changes to H-1B visa regulations that will impact employers and foreign workers. Understanding these changes is crucial for compliance.",
    date: "March 15, 2024",
  },
  {
    id: 3,
    image: "/news-citizenship-ceremony.jpg",
    topic: "USCIS ANNOUNCES EXTENDED PROCESSING TIMES FOR NATURALIZATION APPLICATIONS",
    excerpt:
      "U.S. Citizenship and Immigration Services has updated its processing time estimates for naturalization applications. Learn what this means for your citizenship journey and how to prepare.",
    date: "February 8, 2024",
  },
]

export function ImmigrationNews() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Immigration News
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Stay informed with the latest updates and developments in immigration law
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {newsArticles.map((article) => (
            <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48 w-full">
                <Image src={article.image || "/placeholder.svg"} alt={article.topic} fill className="object-cover" />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="h-4 w-4" />
                  <time>{article.date}</time>
                </div>
                <h3 className="font-bold text-lg mb-3 text-foreground leading-tight line-clamp-2">{article.topic}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">{article.excerpt}</p>
                <Button variant="outline" className="w-full bg-transparent">
                  Read More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline">
            View All News
          </Button>
        </div>
      </div>
    </section>
  )
}
