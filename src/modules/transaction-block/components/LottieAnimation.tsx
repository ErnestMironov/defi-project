import { useTheme } from '@modules/theme/ThemeProvider'
import { AnimatePresence } from 'framer-motion'
import Lottie, { type LottieComponentProps } from 'lottie-react'
import { type FC, useEffect, useState } from 'react'

// Define available animation keys
export type ComicsAnimationKey =
  // Regular animations
  | '1_animation'
  | '2_animation'
  | '3_animation'
  | '4_animation'
  | '5_animation'
  | '6_animation'
  | '7_animation'
  | '8_animation'
  // Reverse animations
  | '1_animation_reverse'
  | '2_animation_reverse'
  | '3_animation_reverse'
  | '4_animation_reverse'
  | '5_animation_reverse'
  | '6_animation_reverse'
  | '7_animation_reverse'
  // Mis animations
  | '1_animation_mis'
  | '2_animation_mis'
  | '3_animation_mis'
  | '4_animation_mis'
  | '5_animation_mis'
  // Reverse mis animations
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

const getAnimationPath = (animationKey: string, isDarkTheme: boolean) => {
  const themePath = isDarkTheme ? '/dark' : ''
  const suffix = isDarkTheme ? '_dark' : ''

  return `/src/assets/lottie/comics${themePath}/${animationKey}${suffix}.json`
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
    console.log('getAnimationPath', getAnimationPath(animationKey, isDarkTheme))
    import(getAnimationPath(animationKey, isDarkTheme))
      .then((module) => {
        setAnimationData(module.default)
      })
      .catch((error) => {
        // If dark theme is not available, try to load light theme
        console.warn('Dark theme is not available, trying to load light theme')
        if (isDarkTheme) {
          import(`/src/assets/lottie/comics/${animationKey}.json`)
            .then((module) => {
              setAnimationData(module.default)
            })
            .catch((error_) => {
              console.error('Error loading animation data:', error_)
            })
        } else {
          console.error('Error loading animation data:', error)
        }
      })
  }, [animationKey, isDarkTheme])

  if (!animationData) return null

  return (
    <AnimatePresence>
      <Lottie animationData={animationData} loop className={className} {...lottieProps} />
    </AnimatePresence>
  )
}
