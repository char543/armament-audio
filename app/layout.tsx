// app/layout.tsx
'use client'

import './globals.css'
import { PlayerProvider } from '@/contexts/player-context'
import { Geist, Manrope } from 'next/font/google'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
