'use client'

import Link from 'next/link'
import { ReleaseCard } from '@/components/release-card'
import { ArrowLeft } from 'lucide-react'
import { usePlayer, type Track } from '@/contexts/player-context'
import { getAllReleases } from '@/data/releases'

export default function ReleasesPage() {
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
    <main className='relative z-10 min-h-screen'>
      <section className='py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='mb-12'>
            <Link
              href='/'
              className='inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-8'
            >
              <ArrowLeft className='w-4 h-4 mr-2' />
              Back to Home
            </Link>

            <div className='text-center'>
              <h1 className='font-headline font-black text-3xl sm:text-4xl lg:text-5xl text-foreground mb-6'>
                All Releases
              </h1>
              <p className='text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed'>
                Explore our complete catalog of exceptional music from talented
                independent artists across multiple genres and styles.
              </p>
            </div>
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
                onPlay={() => handlePlayTrack(tracks[index], index)}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
