import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative h-[400px] md:h-[500px] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/new-york-skyline.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative z-10 text-center px-4">
            <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold text-white text-balance">
              Welcome To Apostol Law Firm
              <br />
              Immigration Attorneys
            </h1>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-background">
          <div className="container px-4 max-w-4xl mx-auto">
            <h2 className="font-sans text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              Why Our Firm Is Passionate About Immigration Law?
            </h2>

            <div className="space-y-6 text-lg text-foreground/80 leading-relaxed">
              <p>
                Our passion for immigration law is rooted in the immigration story of our founding member, Florina
                Apostol (Flory). For her, immigration law is more than a career choice – it is a true calling.
              </p>

              <p>
                Flory was born in Romania. In 2000, she received her LL.B. Bachelor of Law from the Ecological
                University Law School, one of the most prestigious law schools in Romania. In the same year, she found
                the courage to immigrate to the United States. Her courage was justified by her strong belief that there
                is no greater reward than the American Dream. She arrived in the United States, the land of opportunity,
                with her 7-year-old daughter, 2 suitcases, a strong determination, and a burning desire to work hard and
                succeed.
              </p>

              <p>
                As a new immigrant, Flory faced many challenges and difficulties. One difficulty that she faced was the
                language barrier. She enrolled in the English to Speakers of Other Languages (ESOL) program at Seminole
                State College in Florida in order to navigate her new life in America. Like many immigrants, Flory
                experienced the emotional difficulty of coping with the culture shock. She went through the honeymoon
                phase, the crisis phase, the acceptance phase and finally after 2 years she reached the adjustment
                phase.
              </p>

              <p>
                However, the most difficult challenge for Flory was her struggle through a variety of legal issues.
                During her immigration process, she made one big mistake, representing herself instead of getting the
                help she needed from an experienced immigration attorney. She listened to tidbits of advice from her
                well-meaning friends and family, which were out of context, based on their incomplete understanding of
                her unique circumstances and the law. These "tidbits" became a slow-ticking time-bomb threatening to
                erode her immigration opportunity and the future of her loved ones. She experienced first-hand what it
                looks like when one of those "tidbits" blows-up.
              </p>

              <p>
                Her immigration case was denied, and she went through lots of fear, guilt, anxiety, and uncertainty
                about her immigration status. In addition, she experienced unnecessary expenses, and a significant delay
                in obtaining her lawful permanent resident status. However, this temporary defeat triggered an "aha
                moment" in her life. It reminded her of a lifelong lesson about the true power of expertise and
                specialized knowledge. It changed her mind-set about the true meaning of expense versus investment. With
                her denial notice in hand, she took immediate steps to invest in her and her family's future by getting
                the help from an experienced immigration attorney, which gave her peace of mind, a sense of security and
                faith that her dream would come true. Her attorney took the necessary legal steps and won her case.
                Finally, after 6 years, Flory and her daughter became U.S. citizens and their American Dream Came True.
              </p>

              <p>
                Having been through the immigration process herself, Flory developed a passion to make a difference in
                the life of thousands of immigrants, one at a time. In 2005, Flory obtained her paralegal certificate
                from Seminole State College in FL. She gained extensive immigration experience by working for diverse
                healthcare companies, law firms and multinational companies where she diligently and efficiently managed
                a heavy immigration caseload. In 2014, Flory graduated from the LL.M., Masters of U.S. Law program at
                Florida Coastal School of Law, in Jacksonville. Shortly after that, she passed the Washington State BAR
                exam and became an attorney. After a few years working for other law firms, Flory decided to open her
                own law firm so that she could provide more value and treat her clients as she would want her family to
                be treated.
              </p>
            </div>

            <div className="mt-12 flex flex-col items-center">
              <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-primary shadow-lg mb-6">
                <Image
                  src="/florina-reading-with-dog.jpg"
                  alt="Florina Apostol reading with her dog"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-lg text-foreground/80 leading-relaxed text-center max-w-3xl">
                As a daughter, mother, immigrant, entrepreneur, and attorney, Flory can relate to what her clients are
                going through, and she is committed to providing zealous, compassionate representation with the highest
                level of ethics and professionalism. Flory dedicates her entire legal career to helping and educating
                immigrants. She states:
              </p>
            </div>

            <div className="mt-16 bg-accent/10 rounded-lg p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-primary shadow-xl flex-shrink-0">
                  <Image
                    src="/florina-apostol-professional.jpg"
                    alt="Florina Apostol - Professional Photo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <blockquote className="text-lg md:text-xl text-foreground/90 leading-relaxed italic">
                    "I do what I love: helping courageous men and women around the globe who seek new opportunities and
                    a better life to make the American Dream Come True. Nothing is more fulfilling than standing next to
                    happy clients when they are swearing in as U.S. citizens and reciting the pledge of allegiance
                    together. Every day I am fueled with new energy, vitality, and strength from the courage of my
                    clients. It does not matter where they come from, their American Dream is built on the same
                    foundation – COURAGE. I know very well that you need courage to leave the only home you have ever
                    known and leave many of the loved ones behind to start a new life in the United States of America.
                    While it is a high responsibility, I am deeply honored when clients trust our law firm with their
                    future and their children's future."
                  </blockquote>
                  <div className="mt-6 text-right">
                    <p className="font-bold text-lg text-foreground">FLORINA APOSTOL</p>
                    <p className="text-sm text-foreground/70 uppercase tracking-wide">Managing Attorney</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-foreground/10 space-y-4 text-lg text-foreground/80 leading-relaxed">
                <p>
                  Flory is a member of the American Immigration Lawyers Association (AILA), American Immigration Lawyers
                  Association of Central Florida Chapter, and a member of the Washington State Bar Association.
                </p>
                <p>
                  Outside of work, Flory frequently volunteers with local charitable groups and is actively involved in
                  non-for-profit organizations. Flory lives life to the fullest. She loves reading, gardening, ballroom
                  dancing, yoga, and traveling with her family and dog around the United States. As an outdoor
                  enthusiast, Flory explores all that Florida has to offer. Don't be a stranger if you ever catch her
                  jogging with her dog, Noodle, in the park or along the beach.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-accent/5">
          <div className="container px-4 max-w-5xl mx-auto">
            <h2 className="font-sans text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Why Choose the Apostol Law Firm
            </h2>

            <div className="mb-8">
              <h3 className="font-sans text-xl md:text-2xl font-semibold text-foreground mb-6">
                We provide Value-Added Services such as:
              </h3>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-lg text-foreground/80 leading-relaxed">
                    Compassionate, personalized support to help ease the burden of a complex immigration visa process.
                  </p>
                </div>

                <div className="flex gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-lg text-foreground/80 leading-relaxed">
                    Strategic and tailored consultation to help individuals and businesses achieve their goals.
                  </p>
                </div>

                <div className="flex gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-lg text-foreground/80 leading-relaxed">
                    Robust resources to help you understand the immigration law in a changing world.
                  </p>
                </div>

                <div className="flex gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-lg text-foreground/80 leading-relaxed">
                    Free guidance on how to obtain a driver license, social security number, and many other federal
                    government benefits.
                  </p>
                </div>

                <div className="flex gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-lg text-foreground/80 leading-relaxed">
                    State-of-the-art case management technology which will provide 24/7 access to your case matters,
                    case status with USCIS, and serve as a central resource for information transfer and document upload
                    and storage.
                  </p>
                </div>

                <div className="flex gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-lg text-foreground/80 leading-relaxed">
                    Guidance, support, and technology to help get your employees on the ground quickly and compliantly.
                  </p>
                </div>

                <div className="flex gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-lg text-foreground/80 leading-relaxed">Reporting and analytics for businesses.</p>
                </div>

                <div className="flex gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-lg text-foreground/80 leading-relaxed">
                    Business review meetings periodically to discuss strategies and anticipated needs.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center">
              <h3 className="font-sans text-2xl md:text-3xl font-bold text-foreground mb-6">HAVE A QUESTION?</h3>
              <Button size="lg" className="text-lg px-8 py-6">
                SCHEDULE A CONSULTATION
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
