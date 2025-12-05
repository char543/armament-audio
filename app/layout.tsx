import type { Metadata } from 'next'
import { Geist, Manrope } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' })

export const metadata: Metadata = {
  title: 'Armament Audio',
  description:
    'Where creativity meets sound. Discover exceptional independent artists and groundbreaking releases.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={`${geist.variable} ${manrope.variable} dark`}>
      <body className='antialiased'>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
