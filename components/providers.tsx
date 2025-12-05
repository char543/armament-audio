'use client'

import { PlayerProvider } from '@/contexts/player-context'

export function Providers({ children }: { children: React.ReactNode }) {
  return <PlayerProvider>{children}</PlayerProvider>
}
