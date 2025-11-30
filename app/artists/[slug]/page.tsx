'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getArtistBySlug } from '@/data/artists'
import { getReleasesByArtist } from '@/data/releases'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card2, CardContent } from '@/components/ui/card'
import { Play, ExternalLink, ArrowLeft } from 'lucide-react'
import { use } from 'react'

interface ArtistPageProps {
  params: Promise<{
    slug: string
  }>
}

export default function ArtistPage({ params }: ArtistPageProps) {
  const { slug } = use(params)
  const artist = getArtistBySlug(slug)
  const artistReleases = getReleasesByArtist(slug)

  if (!artist) {
    notFound()
  }

  return (
    <main className='relative min-h-screen bg-background'>
      <Navigation />

      {/* Hero Section */}
      <section className='relative py-24 px-4'>
        <div className='max-w-7xl mx-auto'>
          <Link
            href='/#artists'
            className='inline-flex items-center text-accent hover:text-accent/80 mb-8 transition-colors'
          >
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back to Artists
          </Link>

          <div className='grid md:grid-cols-2 gap-12 items-start'>
            {/* Artist Image */}
            <div className='relative aspect-square rounded-xl overflow-hidden'>
              <img
                src={artist.image}
                alt={artist.name}
                className='w-full h-full object-cover'
              />
            </div>

            {/* Artist Info */}
            <div>
              <Badge className='mb-4 bg-accent text-accent-foreground'>
                {artist.genre}
              </Badge>
              <h1 className='text-5xl md:text-6xl font-headline font-bold mb-4'>
                {artist.name}
              </h1>
              <p className='text-xl text-muted-foreground mb-6'>
                {artist.description}
              </p>

              <div className='flex gap-6 mb-8'>
                <div>
                  <p className='text-3xl font-bold text-primary'>
                    {artist.releases}
                  </p>
                  <p className='text-sm text-muted-foreground'>Releases</p>
                </div>
                <div>
                  <p className='text-3xl font-bold text-accent'>
                    {artist.streams}
                  </p>
                  <p className='text-sm text-muted-foreground'>Streams</p>
                </div>
              </div>

              {/* Social Links */}
              {artist.socialLinks && (
                <div className='flex gap-4'>
                  {artist.socialLinks.soundcloud && (
                    <Button
                      variant='outline'
                      className='border-accent text-accent hover:bg-accent hover:text-accent-foreground'
                      onClick={() =>
                        window.open(artist.socialLinks?.soundcloud, '_blank')
                      }
                    >
                      <ExternalLink className='h-4 w-4 mr-2' />
                      SoundCloud
                    </Button>
                  )}
                  {artist.socialLinks.spotify && (
                    <Button
                      variant='outline'
                      className='border-accent text-accent hover:bg-accent hover:text-accent-foreground'
                      onClick={() =>
                        window.open(artist.socialLinks?.spotify, '_blank')
                      }
                    >
                      <ExternalLink className='h-4 w-4 mr-2' />
                      Spotify
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className='py-16 px-4'>
        <div className='max-w-7xl mx-auto'>
          <div className='bg-card rounded-lg p-8 border border-border'>
            <h2 className='text-3xl font-headline font-bold mb-6'>About</h2>
            <p className='text-lg text-muted-foreground leading-relaxed'>
              {artist.bio}
            </p>
          </div>
        </div>
      </section>

      {/* Discography Section */}
      {artistReleases && artistReleases.length > 0 && (
        <section className='py-16 px-4'>
          <div className='max-w-7xl mx-auto'>
            <h2 className='text-3xl font-headline font-bold mb-8'>
              Discography
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
              {artistReleases.map((release) => (
                <Card2
                  key={release.id}
                  className='bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group overflow-hidden'
                >
                  <CardContent className='p-0'>
                    <div className='relative overflow-hidden'>
                      <img
                        src={release.image}
                        alt={release.title}
                        className='w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105'
                      />
                      <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                        <Button
                          size='sm'
                          className='bg-primary hover:bg-primary/90 text-primary-foreground'
                        >
                          <Play className='h-4 w-4 mr-2' />
                          Play
                        </Button>
                      </div>
                    </div>

                    <div className='p-6'>
                      <h3 className='font-headline font-bold text-lg text-card-foreground mb-2'>
                        {release.title}
                      </h3>
                      <p className='text-sm text-muted-foreground mb-4'>
                        {release.year}
                      </p>

                      <div className='flex gap-2'>
                        <Button
                          variant='outline'
                          size='sm'
                          className='flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent'
                        >
                          <Play className='h-4 w-4 mr-2' />
                          Listen
                        </Button>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='text-muted-foreground hover:text-primary'
                          onClick={() =>
                            window.open(release.soundcloudUrl, '_blank')
                          }
                        >
                          <ExternalLink className='h-4 w-4' />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card2>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
