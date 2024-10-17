import { useEffect, useRef } from 'react'

// This hook allows us to detect clicks outside of a specified element
export const useClickOutside = (handler: () => void) => {
  const reference = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (reference.current && !reference.current.contains(event.target as Node)) {
        handler()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handler])

  return reference
}
