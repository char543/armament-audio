export interface Release {
  id: string
  title: string
  artist: string
  artistSlug: string
  year: string
  genre: string
  image: string
  soundcloudUrl: string
}

export const releases: Release[] = [
  {
    id: '1',
    title: 'Dinosaur',
    artist: 'Krisis UK',
    artistSlug: 'krisis-uk',
    year: '2025',
    genre: 'Pigeoncore',
    image: '/abstract-music-waves-dark.png',
    soundcloudUrl: 'https://soundcloud.com/user-541890138/dinosaur',
  },
  {
    id: '2',
    title: 'Acoustic Sessions Vol. 3',
    artist: 'DiZzKiD',
    artistSlug: 'dizzkid',
    year: '2023',
    genre: 'Folk/Acoustic',
    image: '/acoustic-folk-album.png',
    soundcloudUrl:
      'https://soundcloud.com/dizzkiduk/ace-hood-top-dizzkid-bootleg',
  },
  {
    id: '3',
    title: 'Vertigo',
    artist: 'Krisis UK',
    artistSlug: 'krisis-uk',
    year: '2025',
    genre: 'Pokemon Rap/Ambient VaperWave',
    image: '/midnight-echoes-album-cover.png',
    soundcloudUrl:
      'https://soundcloud.com/user-541890138/krisisuk-vertigo-free-download',
  },
  {
    id: '4',
    title: 'Raw & Unfiltered',
    artist: 'insertNameHere',
    artistSlug: 'insertnamehere',
    year: '2023',
    genre: 'Rock/Alternative',
    image: '/raw-rock-album-cover.png',
    soundcloudUrl: 'https://soundcloud.com/your-track-url-5',
  },
  {
    id: '5',
    title: 'Neon Dreams',
    artist: 'DiZzKiD',
    artistSlug: 'dizzkid',
    year: '2024',
    genre: 'Synthwave Tribal Trap',
    image: '/digital-dreams-ambient-album.png',
    soundcloudUrl:
      'https://soundcloud.com/dizzkiduk/ace-hood-top-dizzkid-bootleg',
  },
  {
    id: '6',
    title: 'Jazz After Dark',
    artist: 'insertNameHere',
    artistSlug: 'insertnamehere',
    year: '2022',
    genre: 'Jazz/Contemporary',
    image: '/jazz-after-dark-contemporary-album-cover.png',
    soundcloudUrl: 'https://soundcloud.com/your-track-url-6',
  },
]

export function getReleasesByArtist(artistSlug: string): Release[] {
  return releases.filter((release) => release.artistSlug === artistSlug)
}

export function getAllReleases(): Release[] {
  return releases
}
