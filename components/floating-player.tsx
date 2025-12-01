'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Volume1,
} from 'lucide-react'
import { usePlayer } from '@/contexts/player-context'

declare global {
  interface Window {
    SC: any
  }
}

export default function FloatingPlayer() {
  const {
    state,
    togglePlay,
    nextTrack,
    prevTrack,
    setProgress,
    setDuration,
    setVisibility,
    setVolume,
    toggleMute,
    seekTo,
    widgetRef,
  } = usePlayer()
  const [currentTime, setCurrentTime] = useState(0)
  const [formattedTime, setFormattedTime] = useState({
    current: '0:00',
    total: '0:00',
  })

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://w.soundcloud.com/player/api.js'
    script.async = true
    document.head.appendChild(script)

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  useEffect(() => {
    if (state.currentTrack && window.SC) {
      const iframe = document.createElement('iframe')
      iframe.width = '0'
      iframe.height = '0'
      iframe.src = `https://w.soundcloud.com/player/?url=${encodeURIComponent(
        state.currentTrack.soundcloudUrl
      )}&auto_play=${
        state.isPlaying
      }&hide_related=true&show_comments=false&show_user=false&show_reposts=false`
      iframe.style.position = 'absolute'
      iframe.style.left = '-9999px'
      iframe.id = 'soundcloud-widget'

      const existingWidget = document.getElementById('soundcloud-widget')
      if (existingWidget) {
        existingWidget.remove()
      }

      document.body.appendChild(iframe)

      const widget = window.SC.Widget(iframe)
      widgetRef.current = widget

      widget.bind(window.SC.Widget.Events.READY, () => {
        widget.bind(window.SC.Widget.Events.PLAY, () => {})
        widget.bind(window.SC.Widget.Events.PAUSE, () => {})
        widget.bind(window.SC.Widget.Events.FINISH, () => {
          nextTrack()
        })
        widget.bind(window.SC.Widget.Events.PLAY_PROGRESS, (e: any) => {
          setCurrentTime(e.currentPosition)
          setProgress(e.currentPosition)
        })

        widget.getDuration((duration: number) => {
          setDuration(duration)
        })

        widget.setVolume(state.isMuted ? 0 : state.volume)
      })
    }
  }, [state.currentTrack])

  useEffect(() => {
    if (widgetRef.current) {
      if (state.isPlaying) {
        widgetRef.current.play()
      } else {
        widgetRef.current.pause()
      }
    }
  }, [state.isPlaying])

  useEffect(() => {
    if (widgetRef.current) {
      widgetRef.current.setVolume(state.isMuted ? 0 : state.volume)
    }
  }, [state.volume, state.isMuted])

  useEffect(() => {
    const formatTime = (ms: number) => {
      const seconds = Math.floor(ms / 1000)
      const mins = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    setFormattedTime({
      current: formatTime(currentTime),
      total: formatTime(state.duration),
    })
  }, [currentTime, state.duration])

  const handleTogglePlay = () => {
    togglePlay()
  }

  const handleNext = () => {
    nextTrack()
  }

  const handlePrev = () => {
    prevTrack()
  }

  const handleClose = () => {
    setVisibility(false)
    if (widgetRef.current) {
      widgetRef.current.pause()
    }
  }

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (state.duration === 0) return

    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percentage = clickX / rect.width
    const newTime = percentage * state.duration

    seekTo(newTime)
    if (widgetRef.current) {
      widgetRef.current.seekTo(newTime)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value)
    setVolume(newVolume)
  }

  const handleMuteToggle = () => {
    toggleMute()
  }

  const getVolumeIcon = () => {
    if (state.isMuted || state.volume === 0)
      return <VolumeX className='w-4 h-4' />
    if (state.volume < 50) return <Volume1 className='w-4 h-4' />
    return <Volume2 className='w-4 h-4' />
  }

  if (!state.isVisible || !state.currentTrack) return null

  return (
    <Card className='fixed bottom-6 right-6 p-4 bg-card/95 backdrop-blur-sm border-primary/20 shadow-2xl z-50 max-w-sm'>
      <div className='flex items-center space-x-3'>
        <div className='w-12 h-12 bg-linear-to-br from-primary to-accent rounded-lg flex items-center justify-center overflow-hidden'>
          {state.currentTrack?.image ? (
            <img
              src={state.currentTrack.image}
              alt={state.currentTrack.title}
              className='w-full h-full object-cover'
            />
          ) : (
            <div className='w-6 h-6 bg-background rounded-full'></div>
          )}
        </div>

        <div className='flex-1 min-w-0'>
          <p className='font-medium text-sm truncate'>
            {state.currentTrack?.title}
          </p>
          <p className='text-xs text-muted-foreground truncate'>
            {state.currentTrack?.artist}
          </p>
        </div>

        <div className='flex items-center space-x-1'>
          <Button
            size='sm'
            variant='ghost'
            className='w-8 h-8 p-0'
            onClick={handlePrev}
            disabled={state.currentIndex <= 0}
          >
            <SkipBack className='w-4 h-4' />
          </Button>
          <Button
            size='sm'
            variant='ghost'
            className='w-8 h-8 p-0 text-primary'
            onClick={handleTogglePlay}
          >
            {state.isPlaying ? (
              <Pause className='w-4 h-4' />
            ) : (
              <Play className='w-4 h-4' />
            )}
          </Button>
          <Button
            size='sm'
            variant='ghost'
            className='w-8 h-8 p-0'
            onClick={handleNext}
            disabled={state.currentIndex >= state.queue.length - 1}
          >
            <SkipForward className='w-4 h-4' />
          </Button>
        </div>

        <Button
          size='sm'
          variant='ghost'
          className='w-8 h-8 p-0'
          onClick={handleClose}
        >
          ×
        </Button>
      </div>

      <div className='mt-3 space-y-2'>
        <div
          className='w-full bg-muted rounded-full h-1 cursor-pointer hover:h-2 transition-all'
          onClick={handleProgressBarClick}
        >
          <div
            className='bg-primary h-full rounded-full transition-all duration-300'
            style={{
              width: `${
                state.duration > 0 ? (state.progress / state.duration) * 100 : 0
              }%`,
            }}
          ></div>
        </div>
        <div className='flex justify-between items-center text-xs'>
          <span className='text-muted-foreground'>{formattedTime.current}</span>

          <div className='flex items-center gap-2'>
            <Button
              size='sm'
              variant='ghost'
              className='w-6 h-6 p-0'
              onClick={handleMuteToggle}
            >
              {getVolumeIcon()}
            </Button>

            <input
              type='range'
              min='0'
              max='100'
              value={state.isMuted ? 0 : state.volume}
              onChange={handleVolumeChange}
              className='w-16 h-1 bg-muted rounded-lg appearance-none cursor-pointer slider'
            />
          </div>

          <span className='text-muted-foreground'>{formattedTime.total}</span>
        </div>
      </div>
    </Card>
  )
}
