import { useEffect, useState } from 'react'

interface CountdownTimerProperties {
  initialCountdown: number
  onComplete: () => void
}

export const CountdownTimer: React.FC<CountdownTimerProperties> = ({
  initialCountdown,
  onComplete,
}) => {
  const [countdown, setCountdown] = useState(initialCountdown)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((previous) => {
        if (previous <= 1) {
          clearInterval(timer)
          onComplete()
          return 0
        }
        return previous - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <p
      className="mt-5 text-center text-[1.125rem] uppercase leading-[120%] 
    text-gray-100"
    >
      Estimated time 0:{countdown < 10 ? `0${countdown}` : countdown}
    </p>
  )
}
