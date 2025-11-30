'use client'

import { Card2, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, ExternalLink } from 'lucide-react'
import { usePlayer, type Track } from '@/contexts/player-context'
import { getAllReleases } from '@/data/releases'

export function ReleasesSection() {
  const { playTrack, setQueue } = usePlayer()
  const releases = getAllReleases()

  const tracks: Track[] = releases.map((release) => ({
    id: release.id,
    title: release.title,
    artist: release.artist,
    soundcloudUrl: release.soundcloudUrl,
    image: release.image,
  }))

  const handlePlayTrack = (track: Track, index: number) => {
    setQueue(tracks, index)
    playTrack(track)
  }

  return (
    <section id='releases' className='py-20 px-4 sm:px-6 lg:px-8 bg-card/30'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-16'>
          <h2 className='font-headline font-black text-3xl sm:text-4xl lg:text-5xl text-foreground mb-6'>
            Latest Releases
          </h2>
          <p className='text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed'>
            Explore our diverse catalog of exceptional music from talented
            independent artists across multiple genres and styles.
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {releases.map((release, index) => (
            <Card2
              key={index}
              className='bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group overflow-hidden'
            >
              <CardContent className='p-0'>
                <div className='relative overflow-hidden'>
                  <img
                    src={release.image || '/placeholder.svg'}
                    alt={`${release.title} by ${release.artist}`}
                    className='w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105'
                  />
                  <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                    <Button
                      size='sm'
                      className='bg-primary hover:bg-primary/90 text-primary-foreground'
                      onClick={() => handlePlayTrack(tracks[index], index)}
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
                  <p className='text-primary font-medium mb-1'>
                    {release.artist}
                  </p>
                  <p className='text-sm text-muted-foreground mb-2'>
                    {release.genre}
                  </p>
                  <p className='text-sm text-muted-foreground mb-4'>
                    {release.year}
                  </p>

                  <div className='flex gap-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      className='flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent'
                      onClick={() => handlePlayTrack(tracks[index], index)}
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

        <div className='text-center mt-12'>
          <Button
            variant='outline'
            size='lg'
            className='border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 bg-transparent'
          >
            View All Releases
          </Button>
        </div>
      </div>
    </section>
  )
}
