import { AnimatePresence } from 'framer-motion'
import Lottie, { type LottieComponentProps } from 'lottie-react'
import { type FC, useEffect, useState } from 'react'

// Define available animation keys
export type ComicsAnimationKey =
  // Regular animations
  | '1_Animation'
  | '2_Animation'
  | '3_Animation'
  | '4_Animation'
  | '5_Animation'
  | '6_Animation'
  | '7_Animation'
  | '8_Animation'
  // Reverse animations
  | '1_animation_reverse'
  | '2_animation_reverse'
  | '3_animation_reverse'
  | '4_animation_reverse'
  | '5_animation_reverse'
  | '6_animation_reverse'
  | '7_animation_reverse'
  // Mis animations
  | '1_Animation_mis'
  | '2_Animation_mis'
  | '3_Animation_mis'
  | '4_Animation_mis'
  | '5_Animation_mis'
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

export const LottieAnimation: FC<LottieAnimationProperties> = ({
  animationKey,
  className = 'w-full',
  lottieProps,
}) => {
  const [animationData, setAnimationData] = useState<unknown>(null)

  useEffect(() => {
    import(`@assets/lottie/comics/${animationKey}.json`).then((module) => {
      setAnimationData(module.default)
    })
  }, [animationKey])

  if (!animationData) return null

  return (
    <AnimatePresence>
      <Lottie animationData={animationData} loop className={className} {...lottieProps} />
    </AnimatePresence>
  )
}
