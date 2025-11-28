import {
  Music,
  Instagram,
  Twitter,
  Youtube,
  AirplayIcon as Spotify,
} from 'lucide-react'

export function Footer() {
  return (
    <footer className='bg-card border-t border-border'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Logo and Description */}
          <div className='md:col-span-2'>
            <div className='flex items-center gap-2 mb-4'>
              <Music className='h-8 w-8 text-primary' />
              <h3 className='font-headline font-black text-xl text-card-foreground'>
                Armament Audio
              </h3>
            </div>
            <p className='text-muted-foreground leading-relaxed mb-6 max-w-md'>
              An independent music label dedicated to fostering artistic
              excellence and supporting innovative musicians across all genres.
            </p>
            <div className='flex gap-4'>
              <a
                href='#'
                className='text-muted-foreground hover:text-primary transition-colors'
              >
                <Instagram className='h-5 w-5' />
              </a>
              <a
                href='#'
                className='text-muted-foreground hover:text-primary transition-colors'
              >
                <Twitter className='h-5 w-5' />
              </a>
              <a
                href='#'
                className='text-muted-foreground hover:text-primary transition-colors'
              >
                <Youtube className='h-5 w-5' />
              </a>
              <a
                href='#'
                className='text-muted-foreground hover:text-primary transition-colors'
              >
                <Spotify className='h-5 w-5' />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='font-headline font-bold text-card-foreground mb-4'>
              Quick Links
            </h4>
            <ul className='space-y-2'>
              <li>
                <a
                  href='#home'
                  className='text-muted-foreground hover:text-primary transition-colors'
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href='#about'
                  className='text-muted-foreground hover:text-primary transition-colors'
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href='#releases'
                  className='text-muted-foreground hover:text-primary transition-colors'
                >
                  Releases
                </a>
              </li>
              <li>
                <a
                  href='#contact'
                  className='text-muted-foreground hover:text-primary transition-colors'
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className='font-headline font-bold text-card-foreground mb-4'>
              Services
            </h4>
            <ul className='space-y-2'>
              <li>
                <a
                  href='#'
                  className='text-muted-foreground hover:text-primary transition-colors'
                >
                  Artist Development
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-muted-foreground hover:text-primary transition-colors'
                >
                  Music Production
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-muted-foreground hover:text-primary transition-colors'
                >
                  Distribution
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-muted-foreground hover:text-primary transition-colors'
                >
                  Marketing
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className='border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center'>
          <p className='text-muted-foreground text-sm'>
            © 2025 Armament Audio. All rights reserved.
          </p>
          <div className='flex gap-6 mt-4 sm:mt-0'>
            <a
              href='#'
              className='text-muted-foreground hover:text-primary text-sm transition-colors'
            >
              Privacy Policy
            </a>
            <a
              href='#'
              className='text-muted-foreground hover:text-primary text-sm transition-colors'
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
