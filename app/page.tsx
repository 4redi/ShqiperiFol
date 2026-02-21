import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/landing/hero-section"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { PhotosSection } from "@/components/landing/photos-section"
import { FaqSection } from "@/components/landing/faq-section"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <PhotosSection />
        <HowItWorksSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  )
}
