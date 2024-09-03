import { useEffect, useLayoutEffect, useState } from 'react'

export const useDimensions = (targetReference: React.RefObject<HTMLDivElement>) => {
  const getDimensions = () => {
    return {
      width: targetReference.current ? targetReference.current.offsetWidth : 0,
      height: targetReference.current ? targetReference.current.offsetHeight : 0,
    }
  }

  const [dimensions, setDimensions] = useState(getDimensions)

  const handleResize = () => {
    setDimensions(getDimensions())
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useLayoutEffect(() => {
    handleResize()
  }, [])

  return dimensions
}
