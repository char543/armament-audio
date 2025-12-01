'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Play, Music } from 'lucide-react'
import { usePlayer } from '@/contexts/player-context'
import { getAllReleases } from '@/data/releases'

export function HeroSection() {
  const { playTrack } = usePlayer()
  const [waveHeights, setWaveHeights] = useState<number[]>([])

  useEffect(() => {
    // Generate random heights on client side only
    setWaveHeights(Array.from({ length: 20 }, () => Math.random() * 100 + 20))
  }, [])

  const handleListenNow = () => {
    const releases = getAllReleases()
    if (releases.length > 0) {
      // Pick a random release to play
      const randomIndex = Math.floor(Math.random() * releases.length)
      const randomRelease = releases[randomIndex]

      const track = {
        id: randomRelease.id,
        title: randomRelease.title,
        artist: randomRelease.artist,
        soundcloudUrl: randomRelease.soundcloudUrl,
        image: randomRelease.image,
      }

      playTrack(track)
    }
  }

  return (
    <section
      id='home'
      className='pt-12 sm:pt-0 relative min-h-screen flex items-center justify-center overflow-hidden'
    >
      <div className='absolute inset-0'>
        {/* Animated sound wave background */}
        <div className='absolute inset-0 flex items-center justify-center opacity-20'>
          <div className='flex space-x-2'>
            {waveHeights.map((height, i) => (
              <div
                key={i}
                className='sound-wave w-1 bg-primary rounded-full'
                style={{
                  height: `${height}px`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className='relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto'>
        <div className='mb-8'>
          {/* <Music className='h-16 w-16 text-accent mx-auto mb-6 pulse-glow' /> */}
          <img
            src='/ARMAMENT_2.png'
            alt='Armament Audio Logo'
            className=' h-64 w-64 text-accent mx-auto mb-6 pulse-glow rounded-full'
          />
        </div>

        <h1 className='font-headline font-black text-4xl sm:text-6xl lg:text-8xl text-foreground mb-6 leading-tight'>
          Armament
          <span className='block bg-linear-to-r from-primary to-accent bg-clip-text text-transparent'>
            Audio
          </span>
        </h1>

        <p className='text-xl sm:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed font-sans'>
          Where creativity meets sound. Discover exceptional independent artists
          and groundbreaking releases that define the future of music.
        </p>

        <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
          <Button
            size='lg'
            onClick={handleListenNow}
            className='bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105 pulse-glow cursor-pointer'
          >
            <Play className='mr-2 h-5 w-5' />
            Listen Now
          </Button>
          <Link href='#releases'>
            <Button
              variant='outline'
              size='lg'
              className='border-accent text-accent hover:bg-accent hover:text-white px-8 py-4 text-lg bg-transparent rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer'
            >
              View Releases
            </Button>
          </Link>
        </div>

        <div className='mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto'>
          <div className='text-center'>
            <div className='text-2xl font-bold text-accent'>3+</div>
            <div className='text-sm text-muted-foreground'>Artists</div>
          </div>
          <div className='text-center'>
            <div className='text-2xl font-bold text-accent'>2+</div>
            <div className='text-sm text-muted-foreground'>Releases</div>
          </div>
          <div className='text-center'>
            <div className='text-2xl font-bold text-accent'>0M+</div>
            <div className='text-sm text-muted-foreground'>Streams</div>
          </div>
        </div>
      </div>
    </section>
  )
}
