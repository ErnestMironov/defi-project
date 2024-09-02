import { useEffect, useState } from 'react'

interface CountdownTimerProperties {
  timestamp: number
  onComplete: () => void
}

export const CountdownTimer: React.FC<CountdownTimerProperties> = ({
  timestamp,
  onComplete,
}) => {
  const [remainingTime, setRemainingTime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      const elapsed = now - timestamp
      const remaining = Math.max(120 - Math.floor(elapsed / 1000), 0) // 120 секунд (2 минуты)

      setRemainingTime(remaining)

      if (remaining === 0) {
        clearInterval(interval)
        onComplete()
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [timestamp, onComplete])

  return (
    <p className="mt-5 text-center text-[1.125rem] uppercase leading-[120%] text-gray-100">
      Estimated time {Math.floor(remainingTime / 60)}:{remainingTime % 60 < 10 ? '0' : ''}
      {remainingTime % 60}
    </p>
  )
}
