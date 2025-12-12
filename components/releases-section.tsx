'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { usePlayer, type Track } from '@/contexts/player-context'
import { getAllReleases } from '@/data/releases'
import { ReleaseCard } from '@/components/release-card'

export function ReleasesSection() {
  const { playTrack } = usePlayer()
  const allReleases = getAllReleases()
  const releases = allReleases.slice(0, 6)

  const tracks: Track[] = releases.map((release) => ({
    id: release.id,
    title: release.title,
    artist: release.artist,
    soundcloudUrl: release.soundcloudUrl,
    image: release.image,
  }))

  const handlePlayTrack = (track: Track) => {
    playTrack(track, tracks)
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

        <div className='flex flex-wrap justify-center gap-8'>
          {releases.map((release, index) => (
            <ReleaseCard
              key={index}
              image={release.image}
              title={release.title}
              artist={release.artist}
              genre={release.genre}
              year={release.year}
              soundcloudUrl={release.soundcloudUrl}
              onPlay={() => handlePlayTrack(tracks[index])}
            />
          ))}
        </div>

        <div className='text-center mt-12'>
          <Link href='/releases'>
            <Button
              variant='outline'
              size='lg'
              className='border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 bg-transparent cursor-pointer'
            >
              View All Releases
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
