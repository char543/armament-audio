'use client'

import React, { createContext, useContext, useState, useRef } from 'react'

export interface Track {
  id: string
  title: string
  artist: string
  soundcloudUrl: string
  image?: string
}

interface PlayerContextType {
  currentTrack: Track | null
  isPlaying: boolean
  queue: Track[]
  currentIndex: number
  playTrack: (track: Track, newQueue?: Track[]) => void
  togglePlay: () => void
  nextTrack: () => void
  prevTrack: () => void
  closePlayer: () => void
  widgetRef: React.RefObject<any>
}

const PlayerContext = createContext<PlayerContextType | null>(null)

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [queue, setQueue] = useState<Track[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const widgetRef = useRef<any>(null)

  const playTrack = (track: Track, newQueue?: Track[]) => {
    if (newQueue) {
      setQueue(newQueue)
      const index = newQueue.findIndex((t) => t.id === track.id)
      setCurrentIndex(index >= 0 ? index : 0)
    } else if (queue.length === 0) {
      setQueue([track])
      setCurrentIndex(0)
    } else {
      const index = queue.findIndex((t) => t.id === track.id)
      if (index >= 0) {
        setCurrentIndex(index)
      }
    }

    setCurrentTrack(track)
    setIsPlaying(true)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const nextTrack = () => {
    if (currentIndex < queue.length - 1) {
      const nextIndex = currentIndex + 1
      setCurrentIndex(nextIndex)
      setCurrentTrack(queue[nextIndex])
      setIsPlaying(true)
    }
  }

  const prevTrack = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1
      setCurrentIndex(prevIndex)
      setCurrentTrack(queue[prevIndex])
      setIsPlaying(true)
    }
  }

  const closePlayer = () => {
    setCurrentTrack(null)
    setIsPlaying(false)
  }

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        queue,
        currentIndex,
        playTrack,
        togglePlay,
        nextTrack,
        prevTrack,
        closePlayer,
        widgetRef,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const context = useContext(PlayerContext)
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider')
  }
  return context
}
