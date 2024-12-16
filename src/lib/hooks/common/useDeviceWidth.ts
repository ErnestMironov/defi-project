import { useEffect, useState } from 'react'

function useDeviceWidth(
  breakpoints = () => ({ desktop: 1023, tablet: 768, mobile: 480 }),
) {
  const isClient = typeof window !== 'undefined'
  const currentBreakpoints = breakpoints()

  const [dimensions, setDimensions] = useState(() => {
    if (!isClient) {
      return {
        isBelowDesktop: true,
        isTablet: false,
        isMobile: false,
      }
    }

    return {
      isBelowDesktop: window.matchMedia(`(max-width: ${currentBreakpoints.desktop}px)`)
        .matches,
      isTablet: window.matchMedia(
        `(min-width: ${currentBreakpoints.mobile}px) and (max-width: ${currentBreakpoints.tablet}px)`,
      ).matches,
      isMobile: window.matchMedia(`(max-width: ${currentBreakpoints.mobile}px)`).matches,
    }
  })

  useEffect(() => {
    if (!isClient) return

    const updateDimensions = () => {
      setDimensions({
        isBelowDesktop: window.matchMedia(`(max-width: ${currentBreakpoints.desktop}px)`)
          .matches,
        isTablet: window.matchMedia(
          `(min-width: ${currentBreakpoints.mobile}px) and (max-width: ${currentBreakpoints.tablet}px)`,
        ).matches,
        isMobile: window.matchMedia(`(max-width: ${currentBreakpoints.mobile}px)`)
          .matches,
      })
    }

    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [currentBreakpoints, isClient])

  return dimensions
}

export default useDeviceWidth
