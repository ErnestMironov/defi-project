import fbiSound from '@assets/audio/fbi.mp3'
import { useEffect, useRef, useState } from 'react'

export const SwatOverlay = () => {
  const [isRed, setIsRed] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const audioReference = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Задержка появления оверлея
    const overlayTimeout = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    // Задержка для звука (3000 + 500 = 3500 мс)
    const audioTimeout = setTimeout(() => {
      if (audioReference.current) {
        audioReference.current.play().catch((error) => {
          console.error('Failed to play audio:', error)
        })
      }
    }, 3500)

    // Интервал для мигания
    const interval = setInterval(() => {
      setIsRed((previous) => !previous)
    }, 500)

    // Создаем аудио элемент
    audioReference.current = new Audio(fbiSound)
    audioReference.current.loop = true

    return () => {
      clearTimeout(overlayTimeout)
      clearTimeout(audioTimeout)
      clearInterval(interval)
      if (audioReference.current) {
        audioReference.current.pause()
        audioReference.current.currentTime = 0
      }
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center transition-colors duration-500 ${
        isRed
          ? 'bg-gradient-to-r from-red-500/50 to-transparent'
          : 'bg-gradient-to-l from-blue-500/50 to-transparent'
      }`}
    >
      <span className="text-[20rem] font-bold text-white">RUN!!!</span>
    </div>
  )
}
