'use client'

import { PlayerProvider } from '@/contexts/player-context'
import FloatingPlayer from '@/components/floating-player'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PlayerProvider>
      {children}
      <FloatingPlayer />
    </PlayerProvider>
  )
}
