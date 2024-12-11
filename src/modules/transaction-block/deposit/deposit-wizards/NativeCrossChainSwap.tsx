import { Button } from '@components/ui/button'
import { useTokenAsset } from '@hooks/common/useTokenAsset'
import { TxReviewInfo } from '@modules/transaction-block/components/TxReviewInfo'
import { useTransactionAnimation } from '@modules/transaction-block/hooks/useTransactionAnimation'
import { useTransactionStatus } from '@modules/transaction-block/hooks/useTransactionStatus'
import { useTxStore } from '@modules/transaction-block/store/useTxStore'
import { getButtonContent } from '@modules/transaction-block/utils/getButtonText'
import { replaceCommasWithDots, trimTrailingZeros } from '@utils/formatValue'
import { useEffect } from 'react'

import { useSwap } from '../hooks/useSwap'
import { useSwitchToTokenChain } from '../hooks/useSwitchToTokenChain'
import type { IDepositWizardProperties } from '../interfaces'

export const NativeCrossChainSwap: React.FunctionComponent<
  IDepositWizardProperties
> = ({}) => {
  const {
    depositAsset,
    vaultAddress,
    depositFromNetwork,
    inputValue,
    inputValueInUSD,
    currentStep,
    setCurrentStep,
    setIntermediateError,
    setAnimationStatus,
  } = useTxStore()

  const depositAssetChain = useTokenAsset(depositAsset?.chain_id)

  const {
    status: switchToAssetChainStatus,
    switchChain: switchToAssetChain,
    error: switchError,
  } = useSwitchToTokenChain({
    chainId: depositAssetChain?.chainId ?? 1,
    onSuccessHandler: () => {
      if (currentStep === 1) {
        setCurrentStep(currentStep + 1)
      }
    },
  })

  const {
    swapTokens: swapAndDeposit,
    status: _swapAndDepositStatus,
    error: swapAndDepositError,
  } = useSwap()

  const swapAndDepositStatus = useTransactionStatus(_swapAndDepositStatus)

  const ActionButton: React.FC<{ className?: string }> = ({ className = '' }) => {
    switch (currentStep) {
      case 1: {
        return (
          <Button
            size="lg"
            type="button"
            className={className}
            onClick={switchToAssetChain}
            loading={switchToAssetChainStatus === 'pending'}
            disabled={switchToAssetChainStatus === 'confirm_in_wallet'}
          >
            {getButtonContent(
              switchToAssetChainStatus,
              `Switch to ${depositAssetChain?.name}`,
            )}
          </Button>
        )
      }
      case 2: {
        return (
          <Button
            size="lg"
            type="button"
            className={className}
            onClick={swapAndDeposit}
            loading={swapAndDepositStatus === 'pending'}
            disabled={swapAndDepositStatus === 'confirm_in_wallet'}
          >
            {getButtonContent(swapAndDepositStatus, 'Deposit')}
          </Button>
        )
      }
      default: {
        throw new Error('unknown action type')
      }
    }
  }

  useEffect(() => {
    if (swapAndDepositStatus === 'error') {
      setIntermediateError(swapAndDepositError ?? 'Unknown error')
    }

    if (switchToAssetChainStatus === 'error') {
      setIntermediateError(switchError ?? 'Unknown error')
    }
  }, [
    swapAndDepositStatus,
    setIntermediateError,
    swapAndDepositError,
    switchToAssetChainStatus,
    switchError,
  ])

  useEffect(() => {
    if (switchToAssetChainStatus === 'pending' || swapAndDepositStatus === 'pending') {
      setAnimationStatus('playing')
      return
    }

    setAnimationStatus('idle')
  }, [switchToAssetChainStatus, swapAndDepositStatus, setAnimationStatus])

  const TransactionAnimation = useTransactionAnimation()

  return (
    <>
      <TransactionAnimation />
      <TxReviewInfo
        recipient={{
          label: 'Recipient',
          value: vaultAddress ?? '',
        }}
        chain={depositFromNetwork ?? 0}
        withdraw={{
          label: 'You deposit',
          value: replaceCommasWithDots(trimTrailingZeros(inputValue)),
          usdValue: inputValueInUSD,
        }}
        receive={{
          label: 'You stake',
          value: inputValue,
          usdValue: inputValueInUSD,
        }}
      />
      <div className="flex items-center justify-center gap-2.5 self-stretch px-4 py-3">
        <ActionButton className="w-full px-[1.875rem] py-4 text-base font-medium normal-case leading-6" />
      </div>
    </>
  )
}
