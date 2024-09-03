import { useEffect, useState } from 'react'

interface CountdownTimerProperties {
  timestamp: number
  onComplete: () => void
  duration: number // добавляем параметр для продолжительности
}

export const CountdownTimer: React.FC<CountdownTimerProperties> = ({
  timestamp,
  onComplete,
  duration,
}) => {
  const [remainingTime, setRemainingTime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      const elapsed = now - timestamp
      const remaining = Math.max(duration - Math.floor(elapsed / 1000), 0) // используем параметр продолжительности

      setRemainingTime(remaining)

      if (remaining === 0) {
        clearInterval(interval)
        onComplete()
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [timestamp, onComplete, duration])

  if (remainingTime === 0) return null

  return (
    <p className="mt-5 text-center text-[1.125rem] uppercase leading-[120%] text-gray-100">
      Estimated time {Math.floor(remainingTime / 60)}:{remainingTime % 60 < 10 ? '0' : ''}
      {remainingTime % 60}
    </p>
  )
}
