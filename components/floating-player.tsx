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
  X,
} from 'lucide-react'
import { usePlayer } from '@/contexts/player-context'

declare global {
  interface Window {
    SC: any
  }
}

export default function FloatingPlayer() {
  const {
    currentTrack,
    isPlaying,
    queue,
    currentIndex,
    togglePlay,
    nextTrack,
    prevTrack,
    closePlayer,
    widgetRef,
  } = usePlayer()

  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(100)
  const [isMuted, setIsMuted] = useState(false)
  const [formattedTime, setFormattedTime] = useState({
    current: '0:00',
    total: '0:00',
  })
  const [isDragging, setIsDragging] = useState(false)

  // Load SoundCloud API
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

  // Initialize widget when track changes
  useEffect(() => {
    if (currentTrack && window.SC) {
      const iframe = document.createElement('iframe')
      iframe.width = '0'
      iframe.height = '0'
      iframe.src = `https://w.soundcloud.com/player/?url=${encodeURIComponent(
        currentTrack.soundcloudUrl
      )}&auto_play=${isPlaying}&hide_related=true&show_comments=false&show_user=false&show_reposts=false`
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
        widget.bind(window.SC.Widget.Events.FINISH, () => {
          nextTrack()
        })
        widget.bind(window.SC.Widget.Events.PLAY_PROGRESS, (e: any) => {
          setCurrentTime(e.currentPosition)
        })

        widget.getDuration((dur: number) => {
          setDuration(dur)
        })

        widget.setVolume(isMuted ? 0 : volume)
      })
    }
  }, [currentTrack])

  // Control play/pause
  useEffect(() => {
    if (widgetRef.current) {
      if (isPlaying) {
        widgetRef.current.play()
      } else {
        widgetRef.current.pause()
      }
    }
  }, [isPlaying])

  // Control volume
  useEffect(() => {
    if (widgetRef.current) {
      widgetRef.current.setVolume(isMuted ? 0 : volume)
    }
  }, [volume, isMuted])

  // Format time display
  useEffect(() => {
    const formatTime = (ms: number) => {
      const seconds = Math.floor(ms / 1000)
      const mins = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    setFormattedTime({
      current: formatTime(currentTime),
      total: formatTime(duration),
    })
  }, [currentTime, duration])

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (duration === 0) return

    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percentage = clickX / rect.width
    const newTime = percentage * duration

    if (widgetRef.current) {
      widgetRef.current.seekTo(newTime)
    }
  }

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || duration === 0) return

    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percentage = Math.max(0, Math.min(1, clickX / rect.width))
    const newTime = percentage * duration

    if (widgetRef.current) {
      widgetRef.current.seekTo(newTime)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseUp = () => setIsDragging(false)
      window.addEventListener('mouseup', handleGlobalMouseUp)
      return () => window.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [isDragging])

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value)
    setVolume(newVolume)
  }

  const handleMuteToggle = () => {
    setIsMuted(!isMuted)
  }

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX className='w-4 h-4' />
    if (volume < 50) return <Volume1 className='w-4 h-4' />
    return <Volume2 className='w-4 h-4' />
  }

  if (!currentTrack) return null

  return (
    <Card className='fixed bottom-6 right-6 p-4 bg-card/95 backdrop-blur-sm border-primary/20 shadow-2xl z-50 w-80'>
      <div className='flex items-center gap-3'>
        <div className='w-12 h-12 bg-linear-to-br from-primary to-accent rounded-lg flex items-center justify-center overflow-hidden shrink-0'>
          {currentTrack.image ? (
            <img
              src={currentTrack.image}
              alt={currentTrack.title}
              className='w-full h-full object-cover'
            />
          ) : (
            <div className='w-6 h-6 bg-background rounded-full'></div>
          )}
        </div>

        <div className='flex-1 min-w-0'>
          <p className='font-medium text-sm truncate'>{currentTrack.title}</p>
          <p className='text-xs text-muted-foreground truncate'>
            {currentTrack.artist}
          </p>
        </div>

        <div className='flex items-center gap-1 shrink-0'>
          <Button
            size='sm'
            variant='ghost'
            className='w-8 h-8 p-0'
            onClick={prevTrack}
            disabled={currentIndex <= 0}
          >
            <SkipBack className='w-4 h-4' />
          </Button>
          <Button
            size='sm'
            variant='ghost'
            className='w-8 h-8 p-0 text-primary'
            onClick={togglePlay}
          >
            {isPlaying ? (
              <Pause className='w-4 h-4' />
            ) : (
              <Play className='w-4 h-4' />
            )}
          </Button>
          <Button
            size='sm'
            variant='ghost'
            className='w-8 h-8 p-0'
            onClick={nextTrack}
            disabled={currentIndex >= queue.length - 1}
          >
            <SkipForward className='w-4 h-4' />
          </Button>
          <Button
            size='sm'
            variant='ghost'
            className='w-8 h-8 p-0'
            onClick={closePlayer}
          >
            <X className='w-4 h-4' />
          </Button>
        </div>
      </div>

      <div className='mt-3 space-y-2'>
        <div
          className='w-full bg-muted rounded-full h-2 cursor-pointer relative'
          onClick={handleProgressBarClick}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <div
            className='bg-primary h-full rounded-full'
            style={{
              width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
            }}
          ></div>
          <div
            className='absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full cursor-grab active:cursor-grabbing'
            style={{
              left: `calc(${duration > 0 ? (currentTime / duration) * 100 : 0}% - 6px)`,
            }}
            onMouseDown={handleMouseDown}
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
              value={isMuted ? 0 : volume}
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
