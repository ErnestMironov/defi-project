import { useTheme } from '@modules/theme/ThemeProvider'
import { AnimatePresence } from 'framer-motion'
import Lottie, { type LottieComponentProps } from 'lottie-react'
import { type FC, useEffect, useState } from 'react'

// Define available animation keys
export type ComicsAnimationKey =
  | '1_animation'
  | '2_animation'
  | '3_animation'
  | '4_animation'
  | '5_animation'
  | '6_animation'
  | '7_animation'
  | '8_animation'
  | '1_animation_reverse'
  | '2_animation_reverse'
  | '3_animation_reverse'
  | '4_animation_reverse'
  | '5_animation_reverse'
  | '6_animation_reverse'
  | '7_animation_reverse'
  | '1_animation_mis'
  | '2_animation_mis'
  | '3_animation_mis'
  | '4_animation_mis'
  | '5_animation_mis'
  | '1_animation_reverse_mis'
  | '2_animation_reverse_mis'
  | '3_animation_reverse_mis'
  | '4_animation_reverse_mis'
  | '5_animation_reverse_mis'

type LottieAnimationProperties = {
  animationKey: ComicsAnimationKey
  className?: string
  lottieProps?: Partial<Omit<LottieComponentProps, 'animationData' | 'className'>>
}

export const LottieAnimation: FC<LottieAnimationProperties> = ({
  animationKey,
  className = 'w-full',
  lottieProps,
}) => {
  const [animationData, setAnimationData] = useState<unknown>(null)
  const { theme } = useTheme()
  const isDarkTheme = theme === 'dark'

  useEffect(() => {
    const basePath = '/comics'
    const darkSuffix = isDarkTheme ? '_dark' : ''
    const url = `${basePath}/${
      isDarkTheme ? 'dark/' : ''
    }${animationKey}${darkSuffix}.json`

    fetch(url)
      .then(async (res) => {
        if (!res.ok) {
          if (isDarkTheme) {
            return fetch(`${basePath}/${animationKey}.json`)
          }
          throw new Error(`Error loading: ${res.statusText}`)
        }
        return res
      })
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((error) => {
        console.error('Error while loading the animation:', error)
      })
  }, [animationKey, isDarkTheme])

  if (!animationData) {
    return null
  }

  return (
    <AnimatePresence>
      <Lottie className={className} animationData={animationData} loop {...lottieProps} />
    </AnimatePresence>
  )
}
