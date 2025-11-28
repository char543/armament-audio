import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { ReleasesSection } from '@/components/releases-section'
import ArtistsSection from '@/components/artists-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'
import FloatingPlayer from '@/components/floating-player'
import ParticlesBackground from '@/components/particles-background'

export default function Home() {
  return (
    <main className='relative min-h-screen bg-background overflow-hidden'>
      {/* Particles background – full screen, behind everything */}
      <div className='absolute inset-0 z-0 pointer-events-none'>
        <ParticlesBackground />
      </div>

      {/* All your page content – sits on top of the particles */}
      <div className='relative z-10'>
        <Navigation />
        <HeroSection />
        <AboutSection />
        <ArtistsSection />
        <ReleasesSection />
        <ContactSection />
        <Footer />
        <FloatingPlayer />
      </div>
    </main>
  )
}
