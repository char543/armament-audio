import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { ReleasesSection } from '@/components/releases-section'
import ArtistsSection from '@/components/artists-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className='min-h-screen'>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ArtistsSection />
      <ReleasesSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
