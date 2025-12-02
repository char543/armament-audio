'use client'

import React, { createContext, useContext, useReducer, useRef } from 'react'

interface Track {
  id: string
  title: string
  artist: string
  soundcloudUrl: string
  image?: string
  duration?: number
}

interface PlayerState {
  currentTrack: Track | null
  isPlaying: boolean
  isVisible: boolean
  progress: number
  duration: number
  queue: Track[]
  currentIndex: number
  volume: number
  isMuted: boolean
}

type PlayerAction =
  | { type: 'PLAY_TRACK'; track: Track }
  | { type: 'TOGGLE_PLAY' }
  | { type: 'NEXT_TRACK' }
  | { type: 'PREV_TRACK' }
  | { type: 'SET_PROGRESS'; progress: number }
  | { type: 'SET_DURATION'; duration: number }
  | { type: 'SET_VISIBILITY'; visible: boolean }
  | { type: 'SET_QUEUE'; queue: Track[]; index?: number }
  | { type: 'SET_VOLUME'; volume: number }
  | { type: 'TOGGLE_MUTE' }
  | { type: 'SEEK_TO'; position: number }

const initialState: PlayerState = {
  currentTrack: null,
  isPlaying: false,
  isVisible: false,
  progress: 0,
  duration: 0,
  queue: [],
  currentIndex: -1,
  volume: 100,
  isMuted: false,
}

function playerReducer(state: PlayerState, action: PlayerAction): PlayerState {
  switch (action.type) {
    case 'PLAY_TRACK':
      return {
        ...state,
        currentTrack: action.track,
        isPlaying: true,
        isVisible: true,
        progress: 0,
      }
    case 'TOGGLE_PLAY':
      return {
        ...state,
        isPlaying: !state.isPlaying,
      }
    case 'NEXT_TRACK':
      if (state.currentIndex < state.queue.length - 1) {
        const nextIndex = state.currentIndex + 1
        return {
          ...state,
          currentTrack: state.queue[nextIndex],
          currentIndex: nextIndex,
          progress: 0,
          isPlaying: true,
        }
      }
      return state
    case 'PREV_TRACK':
      if (state.currentIndex > 0) {
        const prevIndex = state.currentIndex - 1
        return {
          ...state,
          currentTrack: state.queue[prevIndex],
          currentIndex: prevIndex,
          progress: 0,
          isPlaying: true,
        }
      }
      return state
    case 'SET_PROGRESS':
      return {
        ...state,
        progress: action.progress,
      }
    case 'SET_DURATION':
      return {
        ...state,
        duration: action.duration,
      }
    case 'SET_VISIBILITY':
      return {
        ...state,
        isVisible: action.visible,
      }
    case 'SET_QUEUE':
      return {
        ...state,
        queue: action.queue,
        currentIndex: action.index ?? -1,
      }
    case 'SET_VOLUME':
      return {
        ...state,
        volume: action.volume,
        isMuted: action.volume === 0,
      }
    case 'TOGGLE_MUTE':
      return {
        ...state,
        isMuted: !state.isMuted,
      }
    case 'SEEK_TO':
      return {
        ...state,
        progress: action.position,
      }
    default:
      return state
  }
}

interface PlayerContextType {
  state: PlayerState
  playTrack: (track: Track) => void
  togglePlay: () => void
  nextTrack: () => void
  prevTrack: () => void
  setProgress: (progress: number) => void
  setDuration: (duration: number) => void
  setVisibility: (visible: boolean) => void
  setQueue: (queue: Track[], index?: number) => void
  setVolume: (volume: number) => void
  toggleMute: () => void
  seekTo: (position: number) => void
  widgetRef: React.RefObject<any>
}

const PlayerContext = createContext<PlayerContextType | null>(null)

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(playerReducer, initialState)
  const widgetRef = useRef<any>(null)

  const playTrack = (track: Track) => {
    // Ensure queue/currentIndex are set so next/prev work even when a single
    // track is played directly. If track exists in queue, set currentIndex
    // accordingly; otherwise make it the single-item queue.
    const existingIndex = state.queue.findIndex((t) => t.id === track.id)
    if (existingIndex !== -1) {
      dispatch({ type: 'SET_QUEUE', queue: state.queue, index: existingIndex })
    } else {
      dispatch({ type: 'SET_QUEUE', queue: [track], index: 0 })
    }

    dispatch({ type: 'PLAY_TRACK', track })
  }

  const togglePlay = () => {
    dispatch({ type: 'TOGGLE_PLAY' })
  }

  const nextTrack = () => {
    dispatch({ type: 'NEXT_TRACK' })
  }

  const prevTrack = () => {
    dispatch({ type: 'PREV_TRACK' })
  }

  const setProgress = (progress: number) => {
    dispatch({ type: 'SET_PROGRESS', progress })
  }

  const setDuration = (duration: number) => {
    dispatch({ type: 'SET_DURATION', duration })
  }

  const setVisibility = (visible: boolean) => {
    dispatch({ type: 'SET_VISIBILITY', visible })
  }

  const setQueue = (queue: Track[], index?: number) => {
    dispatch({ type: 'SET_QUEUE', queue, index })
  }

  const setVolume = (volume: number) => {
    dispatch({ type: 'SET_VOLUME', volume })
  }

  const toggleMute = () => {
    dispatch({ type: 'TOGGLE_MUTE' })
  }

  const seekTo = (position: number) => {
    dispatch({ type: 'SEEK_TO', position })
  }

  return (
    <PlayerContext.Provider
      value={{
        state,
        playTrack,
        togglePlay,
        nextTrack,
        prevTrack,
        setProgress,
        setDuration,
        setVisibility,
        setQueue,
        setVolume,
        toggleMute,
        seekTo,
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

export type { Track }
