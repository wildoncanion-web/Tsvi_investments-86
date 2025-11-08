export function AnnouncementBar() {
  return (
    <div className="w-full bg-primary py-2.5 px-4 text-center">
      <p className="text-sm font-medium text-primary-foreground">
        <span className="inline-block mr-2">🎯</span>
        Free consultation for new clients - Limited time offer
        <a href="#contact" className="ml-2 underline underline-offset-4 hover:no-underline">
          Book now
        </a>
      </p>
    </div>
  )
}
