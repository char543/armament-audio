import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function ArtistsSection() {
  const artists = [
    {
      name: 'DiZzKiD',
      genre: 'Ambient Electronic',
      image: '/ambient-electronic-artist.png',
      description:
        'Pioneering soundscapes that blur the line between digital and organic.',
      releases: 3,
      streams: '2.1M',
    },
    {
      name: 'Krisis UK',
      genre: 'Techno, K-Pop',
      image: '/ARMAMENT_2.png',
      description: 'Retro-futuristic beats with a modern twist.',
      releases: 5,
      streams: '4.7M',
    },
    {
      name: 'insertNameHere',
      genre: 'Noise',
      image: '/dark-ambient-artist-portrait.png',
      description: 'Exploring the depths of atmospheric sound design.',
      releases: 2,
      streams: '1.8M',
    },
  ]

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

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {artists.map((artist, index) => {
            const objectFitClass =
              artist.image === '/ARMAMENT_2.png'
                ? 'object-contain'
                : 'object-cover'
            return (
              <Card
                key={index}
                className='group hover:scale-105 transition-all duration-300 bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/50'
              >
                <CardContent className='p-0'>
                  <div className='relative overflow-hidden rounded-t-lg'>
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
                  <div className='p-6'>
                    <h3 className='text-2xl font-headline font-bold mb-2 group-hover:text-accent transition-colors'>
                      {artist.name}
                    </h3>
                    <p className='text-muted-foreground mb-4'>
                      {artist.description}
                    </p>
                    <div className='flex justify-between items-center text-sm'>
                      <span className='text-primary font-semibold'>
                        {artist.releases} Releases
                      </span>
                      <span className='text-accent font-semibold'>
                        {artist.streams} Streams
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
