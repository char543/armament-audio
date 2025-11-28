// app/layout.tsx
'use client'

import './globals.css'
import { PlayerProvider } from '@/contexts/player-context'
import { Geist, Manrope } from 'next/font/google'

import { initParticlesEngine } from '@tsparticles/react'
import { loadAll } from '@tsparticles/all'
import { useEffect } from 'react'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadAll(engine)
    })
    // no .then() needed – the engine works immediately after await
  }, [])

  return (
    <html
      lang='en'
      className={`${geist.variable} ${manrope.variable} antialiased dark`}
    >
      <body>
        <PlayerProvider>{children}</PlayerProvider>
      </body>
    </html>
  )
}
