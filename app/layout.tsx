'use client'

import './globals.css'
import { Geist, Manrope } from 'next/font/google'
import { PlayerProvider } from '@/contexts/player-context'
import SmokeBackground from '@/components/react-smoke'
import { useRef } from 'react'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const smokeRef = useRef(null)

  return (
    <html
      lang='en'
      className={`${geist.variable} ${manrope.variable} antialiased dark`}
    >
      <body className='relative'>
        <div ref={smokeRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          <SmokeBackground />
        </div>
        <div style={{ position: 'relative', zIndex: 10 }}>
          <PlayerProvider>{children}</PlayerProvider>
        </div>
      </body>
    </html>
  )
}
