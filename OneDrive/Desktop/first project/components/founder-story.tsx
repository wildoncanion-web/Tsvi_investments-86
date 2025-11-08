"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"

export function FounderStory() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 text-balance">
          Why Our Firm Is Passionate About Immigration Law
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Our passion for immigration law is rooted in the immigration story of our founding member, Florina Apostol
              (Flory). For her, immigration law is more than a career choice – it is a true calling. Flory was born in
              Romania and in the year of 2000, she found the courage to immigrate to the United States. Her courage was
              justified by her strong belief that there is no greater reward than the American Dream. She arrived in the
              United States, the land of opportunity, with her 7-year-old daughter, 2 suitcases, a strong determination,
              and a burning desire to work hard and succeed.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Having been through the immigration process herself, Flory developed a passion to make a difference in the
              life of thousands of immigrants, one at a time. She decided to open her own law firm so that she could
              provide more value and treat her clients as she would want her family to be treated. As a daughter,
              mother, immigrant, entrepreneur, and attorney, Flory can relate to what her clients are going through.
            </p>
            <Button size="lg" className="mt-4">
              Full Story
            </Button>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
                <Image
                  src="/florina-apostol-headshot.jpg"
                  alt="Florina Apostol - Managing Attorney"
                  width={320}
                  height={320}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-accent/30 rounded-2xl p-8 md:p-12 border border-accent">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <svg className="w-12 h-12 text-primary/40" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            <blockquote className="text-lg md:text-xl leading-relaxed text-foreground mb-8 italic">
              I do what I love: helping courageous men and women around the globe who seek new opportunities and a
              better life to make the American Dream Come True. Nothing is more fulfilling than standing next to happy
              clients when they are swearing in as U.S. citizens and reciting the pledge of allegiance together. Every
              day I am fueled with new energy, vitality, and strength from the courage of my clients. It does not matter
              where they come from, their American Dream is built on the same foundation – COURAGE. I know very well
              that you need courage to leave the only home you have ever known and leave many of the loved ones behind
              to start a new life in the United States of America. While it is a high responsibility, I am deeply
              honored when clients trust our law firm with their future and their children's future.
            </blockquote>
            <div className="text-center">
              <p className="font-bold text-lg tracking-wide text-foreground">FLORINA APOSTOL</p>
              <p className="text-sm text-muted-foreground tracking-wider mt-1">MANAGING ATTORNEY</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
