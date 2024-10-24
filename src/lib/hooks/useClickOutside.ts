import { useEffect, useRef } from 'react'

// This hook allows us to detect clicks outside of a specified element
export const useClickOutside = (
  handler: () => void,
  exceptionSelectors: string[] = [],
) => {
  const reference = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node

      const isException = exceptionSelectors.some((selector) => {
        const exceptionElement = document.querySelector(selector)
        return exceptionElement && exceptionElement.contains(target)
      })

      if (reference.current && !reference.current.contains(target) && !isException) {
        handler()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handler, exceptionSelectors])

  return reference
}
