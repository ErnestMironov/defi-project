import { TX_TYPE } from '@constants/txTypes'
import type { ComicsAnimationKey } from '@modules/transaction-block/components/LottieAnimation'
import { useEffect, useState } from 'react'

import { LottieAnimation } from '../components/LottieAnimation'
import { useTxStore } from '../store/useTxStore'

type AnimationConfig = { key: ComicsAnimationKey; loop: boolean }

const DEPOSIT_STEP_ANIMATIONS: Record<number, AnimationConfig> = {
  1: { key: '1_animation', loop: true },
  2: { key: '2_animation', loop: true },
  3: { key: '4_animation', loop: false },
}

const WITHDRAW_STEP_ANIMATIONS: Record<number, AnimationConfig> = {
  1: { key: '1_animation_reverse', loop: true },
  2: { key: '2_animation_reverse', loop: true },
  3: { key: '4_animation_reverse', loop: false },
}

const getErrorAnimation = (
  isDeposit: boolean,
  {
    networkSwitchStatus,
    approvalStatus,
    transactionStatus,
  }: {
    networkSwitchStatus: string
    approvalStatus: string
    transactionStatus: string
  },
): AnimationConfig | null => {
  if (networkSwitchStatus === 'error') {
    return {
      key: isDeposit ? '1_animation_mis' : '1_animation_reverse_mis',
      loop: false,
    }
  }

  if (approvalStatus === 'error') {
    return {
      key: isDeposit ? '3_animation_mis' : '3_animation_reverse_mis',
      loop: false,
    }
  }

  if (transactionStatus === 'error') {
    return {
      key: isDeposit ? '5_animation_mis' : '5_animation_reverse_mis',
      loop: false,
    }
  }

  return null
}

const getPendingAnimation = (
  isDeposit: boolean,
  {
    approvalStatus,
    transactionStatus,
  }: { approvalStatus: string; transactionStatus: string },
): AnimationConfig | null => {
  if (approvalStatus === 'pending') {
    return {
      key: isDeposit ? '3_animation' : '3_animation_reverse',
      loop: true,
    }
  }

  if (transactionStatus === 'pending') {
    return {
      key: isDeposit ? '5_animation' : '5_animation_reverse',
      loop: true,
    }
  }

  return null
}

export const useTransactionAnimation = () => {
  const { currentStep, networkSwitchStatus, approvalStatus, transactionStatus, txType } =
    useTxStore()

  const [currentAnimation, setCurrentAnimation] = useState<AnimationConfig>({
    key: '1_animation',
    loop: true,
  })

  useEffect(() => {
    const isDeposit = txType === TX_TYPE.DEPOSIT
    const stepAnimations = isDeposit ? DEPOSIT_STEP_ANIMATIONS : WITHDRAW_STEP_ANIMATIONS

    const errorAnimation = getErrorAnimation(isDeposit, {
      networkSwitchStatus,
      approvalStatus,
      transactionStatus,
    })
    if (errorAnimation) {
      setCurrentAnimation(errorAnimation)
      return
    }

    const pendingAnimation = getPendingAnimation(isDeposit, {
      approvalStatus,
      transactionStatus,
    })
    if (pendingAnimation) {
      setCurrentAnimation(pendingAnimation)
      return
    }

    setCurrentAnimation(
      stepAnimations[currentStep] || {
        key: isDeposit ? '5_animation' : '6_animation_reverse',
        loop: true,
      },
    )
  }, [currentStep, networkSwitchStatus, approvalStatus, transactionStatus, txType])

  return () => (
    <div className="aspect-[608/230] w-full">
      <LottieAnimation className="size-full" animationKey={currentAnimation.key} />
    </div>
  )
}
