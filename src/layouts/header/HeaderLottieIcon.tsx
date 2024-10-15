import { useLottie } from 'lottie-react'
import { type ComponentProps, useEffect } from 'react'

interface HeaderLottieIconProperties extends ComponentProps<'div'> {
  isHover: boolean
  animationData: any
}

export const HeaderLottieIcon = (props: HeaderLottieIconProperties) => {
  const { animationData, className, isHover } = props

  const options = {
    animationData,
    loop: false,
    autoplay: false,
    className,
  }

  const { View, playSegments } = useLottie(options)

  useEffect(() => {
    if (isHover) {
      playSegments([0, 50], true)
    }
  }, [isHover, playSegments])

  return View
}
