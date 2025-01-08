import { TX_TYPE } from '@constants/txTypes'
import type { ComicsAnimationKey } from '@modules/transaction-block/components/LottieAnimation'
import { memo, useEffect, useState } from 'react'

import { LottieAnimation } from '../components/LottieAnimation'
import { useTxStore } from '../store/useTxStore'

type AnimationConfig = { key: ComicsAnimationKey; loop: boolean }

// Transaction states with corresponding animations
const TRANSACTION_ANIMATIONS: Record<string, (isDeposit: boolean) => AnimationConfig> = {
  // Initial steps animations
  NETWORK_SWITCH_STEP: (isDeposit) => ({
    key: isDeposit ? '1_animation' : '1_animation_reverse',
    loop: true,
  }),
  APPROVAL_STEP: (isDeposit) => ({
    key: isDeposit ? '2_animation' : '2_animation_reverse',
    loop: true,
  }),
  TRANSACTION_STEP: (isDeposit) => ({
    key: isDeposit ? '4_animation' : '4_animation_reverse',
    loop: false,
  }),

  // Error states
  NETWORK_SWITCH_ERROR: (isDeposit) => ({
    key: isDeposit ? '1_animation_mis' : '1_animation_reverse_mis',
    loop: false,
  }),
  APPROVAL_ERROR: (isDeposit) => ({
    key: isDeposit ? '3_animation_mis' : '3_animation_reverse_mis',
    loop: false,
  }),
  TRANSACTION_ERROR: (isDeposit) => ({
    key: isDeposit ? '5_animation_mis' : '5_animation_reverse_mis',
    loop: false,
  }),

  // Pending states
  APPROVAL_PENDING: (isDeposit) => ({
    key: isDeposit ? '3_animation' : '3_animation_reverse',
    loop: true,
  }),
  TRANSACTION_PENDING: (isDeposit) => ({
    key: isDeposit ? '5_animation' : '5_animation_reverse',
    loop: true,
  }),

  // Success state
  SUCCESS: (isDeposit) => ({
    key: isDeposit ? '7_animation' : '6_animation_reverse',
    loop: true,
  }),
}

const getTransactionState = ({
  currentStep,
  networkSwitchStatus,
  approvalStatus,
  transactionStatus,
}: {
  currentStep: number
  networkSwitchStatus: string
  approvalStatus: string
  transactionStatus: string
}): string => {
  // Check errors first
  if (networkSwitchStatus === 'error') return 'NETWORK_SWITCH_ERROR'
  if (approvalStatus === 'error') return 'APPROVAL_ERROR'
  if (transactionStatus === 'error') return 'TRANSACTION_ERROR'

  // Then check pending states
  if (approvalStatus === 'pending') return 'APPROVAL_PENDING'
  if (transactionStatus === 'pending') return 'TRANSACTION_PENDING'

  // Check success
  if (transactionStatus === 'success') return 'SUCCESS'

  // If no special states, show step animation
  switch (currentStep) {
    case 1: {
      return 'NETWORK_SWITCH_STEP'
    }
    case 2: {
      return 'APPROVAL_STEP'
    }
    case 3: {
      return 'TRANSACTION_STEP'
    }
    default: {
      return 'NETWORK_SWITCH_STEP'
    }
  }
}

const TransactionAnimation = memo(() => {
  const { currentStep, networkSwitchStatus, approvalStatus, transactionStatus, txType } =
    useTxStore()

  console.log('🚀 ~ TransactionAnimation ~ currentStep:', currentStep)

  const [currentAnimation, setCurrentAnimation] = useState<AnimationConfig>(
    TRANSACTION_ANIMATIONS.NETWORK_SWITCH_STEP(true),
  )

  useEffect(() => {
    const isDeposit = txType === TX_TYPE.DEPOSIT
    const state = getTransactionState({
      currentStep,
      networkSwitchStatus,
      approvalStatus,
      transactionStatus,
    })

    const animation = TRANSACTION_ANIMATIONS[state](isDeposit)
    console.log('🚀 ~ useEffect ~ animation:', animation)
    setCurrentAnimation(animation)
  }, [currentStep, networkSwitchStatus, approvalStatus, transactionStatus, txType])

  return (
    <div className="aspect-[608/230] w-full">
      <LottieAnimation className="size-full" animationKey={currentAnimation.key} />
    </div>
  )
})

TransactionAnimation.displayName = 'TransactionAnimation'

export const useTransactionAnimation = () => TransactionAnimation
