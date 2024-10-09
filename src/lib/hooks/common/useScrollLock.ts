import { useCallback, useEffect, useState } from 'react'

export const useScrollLock = () => {
  const [isLocked, setIsLocked] = useState(false)

  useEffect(() => {
    if (isLocked) {
      document.body.classList.add('scroll-locked')
    } else {
      document.body.classList.remove('scroll-locked')
    }

    return () => {
      document.body.classList.remove('scroll-locked')
    }
  }, [isLocked])

  const lock = useCallback(() => setIsLocked(true), [])
  const unlock = useCallback(() => setIsLocked(false), [])

  return { lock, unlock }
}
