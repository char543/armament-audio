'use client'

import Particles, { initParticlesEngine } from '@tsparticles/react'
import { useEffect, useState } from 'react'
import { loadFull } from 'tsparticles'
import type { Engine } from '@tsparticles/engine'

export default function ParticlesBackground() {
  const [engineLoaded, setEngineLoaded] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine)
    }).then(() => setEngineLoaded(true))
  }, [])

  if (!engineLoaded) return null

  return (
    <div className='absolute inset-0 z-0 pointer-events-none'>
      <Particles
        id='particles'
        options={{
          particles: {
            number: { value: 15, density: { enable: true } },
            shape: {
              type: 'image',
              options: {
                image: [
                  { src: '/ps-circle.svg', width: 50, height: 53 },
                  { src: '/ps-x.svg', width: 60, height: 63 },
                  { src: '/ps-square.svg', width: 20, height: 23 },
                  { src: '/ps-triangle.svg', width: 20, height: 23 },
                ],
              },
            },
            opacity: {
              value: 0.18,
              animation: { enable: false },
            },
            size: {
              value: 12,
              animation: { enable: false },
            },
            links: { enable: false },
            move: {
              enable: true,
              speed: 3,
              direction: 'none',
              random: false,
              straight: false,
              outModes: { default: 'out' },
            },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: 'repulse' },
              onClick: { enable: true, mode: 'push' },
              resize: { enable: true },
            },
            modes: {
              repulse: { distance: 200, duration: 0.4 },
              push: { quantity: 4 },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  )
}
