export interface Artist {
  slug: string
  name: string
  genre: string
  image: string
  description: string
  releases: number
  streams: string
  bio: string
  socialLinks?: {
    soundcloud?: string
    instagram?: string
    twitter?: string
    spotify?: string
  }
}

export const artists: Artist[] = [
  {
    slug: 'dizzkid',
    name: 'DiZzKiD',
    genre: 'Ambient Electronic',
    image: '/dizzkid.avif',
    description:
      'Pioneering soundscapes that blur the line between digital and organic.',
    releases: 2,
    streams: '2.1M',
    bio: 'DiZzKiD is an innovative electronic music producer specializing in ambient soundscapes. With a unique approach to sound design, DiZzKiD creates immersive audio experiences that transport listeners to otherworldly realms. Drawing inspiration from nature and technology, each track is carefully crafted to blur the boundaries between the digital and organic worlds.',
    socialLinks: {
      soundcloud: 'https://soundcloud.com/dizzkiduk',
    },
  },
  {
    slug: 'krisis-uk',
    name: 'Krisis UK',
    genre: 'Techno, K-Pop',
    image: '/ARMAMENT_2.png',
    description: 'Retro-futuristic beats with a modern twist.',
    releases: 2,
    streams: '4.7M',
    bio: 'Krisis UK is a boundary-pushing producer who seamlessly blends techno with unexpected K-Pop influences, creating a sound that is both nostalgic and futuristic. Known for innovative production techniques and genre-defying tracks, Krisis UK has built a dedicated following with a unique sonic signature that stands out in the electronic music landscape.',
    socialLinks: {
      soundcloud: 'https://soundcloud.com/user-541890138',
    },
  },
  {
    slug: 'insertnamehere',
    name: 'insertNameHere',
    genre: 'Noise',
    image: '/dark-ambient-artist-portrait.png',
    description: 'Exploring the depths of atmospheric sound design.',
    releases: 2,
    streams: '1.8M',
    bio: 'insertNameHere pushes the boundaries of experimental noise and dark ambient music. With a focus on texture and atmosphere, this enigmatic artist creates haunting soundscapes that challenge conventional listening experiences. Each release is an exploration into the darker corners of sound, where chaos meets careful composition.',
    socialLinks: {
      soundcloud: 'https://soundcloud.com/your-track-url',
    },
  },
]

export function getArtistBySlug(slug: string): Artist | undefined {
  return artists.find((artist) => artist.slug === slug)
}

export function getAllArtistSlugs(): string[] {
  return artists.map((artist) => artist.slug)
}
