'use client'

import { Card2, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, ExternalLink } from 'lucide-react'

interface ReleaseCardProps {
  image: string
  title: string
  artist?: string
  genre?: string
  year: string
  soundcloudUrl: string
  onPlay: () => void
}

export function ReleaseCard({
  image,
  title,
  artist,
  genre,
  year,
  soundcloudUrl,
  onPlay,
}: ReleaseCardProps) {
  return (
    <Card2 className='bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group overflow-hidden w-full max-w-sm md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.334rem)]'>
      <CardContent className='p-0'>
        <div className='relative overflow-hidden'>
          <img
            src={image || '/placeholder.svg'}
            alt={`${title}${artist ? ` by ${artist}` : ''}`}
            className='w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105'
          />
          <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
            <Button
              size='sm'
              className='bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer'
              onClick={onPlay}
            >
              <Play className='h-4 w-4 mr-2' />
              Play
            </Button>
          </div>
        </div>

        <div className='p-6'>
          <h3 className='font-headline font-bold text-lg text-card-foreground mb-2'>
            {title}
          </h3>
          {artist && <p className='text-primary font-medium mb-1'>{artist}</p>}
          {genre && (
            <p className='text-sm text-muted-foreground mb-2'>{genre}</p>
          )}
          <p className='text-sm text-muted-foreground mb-4'>{year}</p>

          <Button
            variant='ghost'
            size='sm'
            className='text-muted-foreground hover:text-primary w-full cursor-pointer'
            onClick={() => window.open(soundcloudUrl, '_blank')}
          >
            <ExternalLink className='h-4 w-4 mr-2' />
            View on SoundCloud
          </Button>
        </div>
      </CardContent>
    </Card2>
  )
}
