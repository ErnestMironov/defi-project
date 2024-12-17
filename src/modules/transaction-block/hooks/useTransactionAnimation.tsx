import type { ComicsAnimationKey } from '@modules/transaction-block/components/LottieAnimation'
import { useEffect, useState } from 'react'

import { LottieAnimation } from '../components/LottieAnimation'
import { useTxStore } from '../store/useTxStore'

export const useTransactionAnimation = () => {
  const { currentStep, networkSwitchStatus, approvalStatus, transactionStatus, txType } =
    useTxStore()

  const [currentAnimation, setCurrentAnimation] = useState<{
    key: ComicsAnimationKey
    loop: boolean
  }>({
    key: '1_animation',
    loop: true,
  })

  useEffect(() => {
    const getAnimationKey = (): { key: ComicsAnimationKey; loop: boolean } => {
      if (approvalStatus === 'pending') return { key: '3_animation', loop: true }
      if (transactionStatus === 'pending') {
        return { key: '5_animation', loop: true }
      }

      // handle errors
      if (networkSwitchStatus === 'error') return { key: '1_animation_mis', loop: false }
      if (approvalStatus === 'error') return { key: '3_animation_mis', loop: false }
      if (transactionStatus === 'error') {
        return {
          key: '5_animation_mis',
          loop: false,
        }
      }

      const stepAnimations: Record<number, { key: ComicsAnimationKey; loop: boolean }> = {
        1: { key: '1_animation', loop: true },
        2: { key: '2_animation', loop: true },
        3: { key: '4_animation', loop: false },
      }

      return stepAnimations[currentStep] || { key: '5_Animation', loop: true }
    }

    setCurrentAnimation(getAnimationKey())
  }, [
    currentStep,
    networkSwitchStatus,
    approvalStatus,
    transactionStatus,
    txType,
    setCurrentAnimation,
  ])

  return () => <LottieAnimation className="w-full" animationKey={currentAnimation.key} />
}
