"use client"

import Link from "next/link"
import { Facebook, Linkedin, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Immigration Services Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-background">IMMIGRATION SERVICES</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/business-immigration"
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Business Immigration
                </Link>
              </li>
              <li>
                <Link href="/family-immigration" className="text-background/80 hover:text-background transition-colors">
                  Family Immigration
                </Link>
              </li>
              <li>
                <Link
                  href="/healthcare-immigration"
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Healthcare Immigration
                </Link>
              </li>
              <li>
                <Link href="/investor-visa" className="text-background/80 hover:text-background transition-colors">
                  Investor Visa
                </Link>
              </li>
              <li>
                <Link
                  href="/citizenship-naturalization"
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Citizenship / Naturalization
                </Link>
              </li>
              <li>
                <Link href="/waivers" className="text-background/80 hover:text-background transition-colors">
                  Waivers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-background">APOSTOL LAW FIRM, LLC.</h3>
            <address className="not-italic text-background/80 space-y-1">
              <p>255 PRIMERA BLVD, SUITE 160</p>
              <p>LAKE MARY, FL 32746</p>
              <p className="mt-3">
                <a href="tel:+14072583344" className="hover:text-background transition-colors">
                  (407) 258-3344
                </a>
              </p>
            </address>
          </div>

          {/* Contact Us & Social Media */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-background">CONTACT US</h3>
            <Link
              href="/connect"
              className="inline-block text-background/80 hover:text-background transition-colors mb-6"
            >
              Get in Touch →
            </Link>

            <div className="mt-6">
              <h4 className="font-semibold text-background mb-3">Follow Us</h4>
              <div className="flex gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background/80 hover:text-background transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background/80 hover:text-background transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background/80 hover:text-background transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/60 text-sm">
          <p>&copy; {new Date().getFullYear()} Apostol Law Firm, LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
