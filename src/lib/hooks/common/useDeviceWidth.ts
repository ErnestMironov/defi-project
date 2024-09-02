import { useEffect, useState } from 'react'

function useDeviceWidth(
  breakpoints = () => ({ desktop: 1023, tablet: 768, mobile: 480 }),
) {
  const [isBelowDesktop, setIsBelowDesktop] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const updateDeviceWidth = () => {
      const currentBreakpoints = breakpoints()

      setIsBelowDesktop(
        window.matchMedia(`(max-width: ${currentBreakpoints.desktop}px)`).matches,
      )
      setIsTablet(
        window.matchMedia(
          `(min-width: ${currentBreakpoints.mobile}px) and (max-width: ${currentBreakpoints.tablet}px)`,
        ).matches,
      )
      setIsMobile(
        window.matchMedia(`(max-width: ${currentBreakpoints.mobile}px)`).matches,
      )
    }

    updateDeviceWidth()
    window.addEventListener('resize', updateDeviceWidth)

    return () => {
      window.removeEventListener('resize', updateDeviceWidth)
    }
  }, [breakpoints])

  return { isBelowDesktop, isTablet, isMobile }
}

export default useDeviceWidth
