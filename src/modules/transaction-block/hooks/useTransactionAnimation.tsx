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
    key: '1_Animation',
    loop: true,
  })

  useEffect(() => {
    const getAnimationKey = (): { key: ComicsAnimationKey; loop: boolean } => {
      if (approvalStatus === 'pending') return { key: '3_Animation', loop: true }
      if (transactionStatus === 'pending') {
        return { key: '5_Animation', loop: true }
      }

      // handle errors
      if (networkSwitchStatus === 'error') return { key: '1_Animation_mis', loop: false }
      if (approvalStatus === 'error') return { key: '3_Animation_mis', loop: false }
      if (transactionStatus === 'error') {
        return {
          key: '5_Animation_mis',
          loop: false,
        }
      }

      const stepAnimations: Record<number, { key: ComicsAnimationKey; loop: boolean }> = {
        1: { key: '1_Animation', loop: true },
        2: { key: '2_Animation', loop: true },
        3: { key: '4_Animation', loop: false },
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
