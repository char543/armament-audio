import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { artists } from '@/data/artists'

export default function ArtistsSection() {
  return (
    <section id='artists' className='py-24 px-4'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-headline font-bold mb-6'>
            Our <span className='text-accent'>Artists</span>
          </h2>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
            Discover the talented musicians pushing boundaries and creating the
            future of electronic music.
          </p>
        </div>

        <div className='flex flex-wrap justify-center gap-8'>
          {artists.map((artist, index) => {
            const objectFitClass =
              artist.image === '/ARMAMENT_2.png'
                ? 'object-contain'
                : 'object-cover'
            return (
              <Card
                key={index}
                className='group hover:scale-105 transition-all duration-300 bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/50 overflow-hidden p-0 cursor-pointer h-full w-full max-w-sm md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.334rem)]'
              >
                <Link href={`/artists/${artist.slug}`} className='block'>
                  <CardContent className='p-0 h-full flex flex-col min-h-[480px]'>
                    <div className='relative overflow-hidden'>
                      <img
                        src={artist.image || '/placeholder.svg'}
                        alt={artist.name}
                        className={`w-full h-64 ${objectFitClass} group-hover:scale-110 transition-transform duration-500`}
                      />
                      <div className='absolute inset-0 bg-linear-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                      <Badge className='absolute top-4 right-4 bg-accent text-accent-foreground'>
                        {artist.genre}
                      </Badge>
                    </div>
                    <div className='p-8 flex flex-col flex-1'>
                      <h3 className='text-2xl font-headline font-bold mb-3 group-hover:text-accent transition-colors'>
                        {artist.name}
                      </h3>
                      <p className='text-muted-foreground mb-6 flex-1 leading-relaxed'>
                        {artist.description}
                      </p>
                      <div className='flex justify-between items-center text-sm mt-auto pt-4 border-t border-border/50'>
                        <span className='text-primary font-semibold'>
                          {artist.releases} Releases
                        </span>
                        <span className='text-accent font-semibold'>
                          {artist.streams} Streams
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
