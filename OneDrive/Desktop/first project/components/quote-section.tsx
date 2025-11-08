export function QuoteSection() {
  return (
    <section className="relative min-h-[500px] flex items-center justify-center px-4 py-20">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/statue-of-liberty-american-flag.jpg')",
        }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 container mx-auto max-w-4xl text-center">
        <blockquote className="space-y-6">
          <p className="text-2xl md:text-3xl lg:text-4xl font-serif italic text-white text-balance leading-relaxed">
            &ldquo;Remember, remember always, that all of us, you and I especially, are descended from immigrants and
            revolutionists.&rdquo;
          </p>
          <footer className="text-lg md:text-xl text-white/90 font-semibold tracking-wide">
            — FRANKLIN D. ROOSEVELT
          </footer>
        </blockquote>
      </div>
    </section>
  )
}
