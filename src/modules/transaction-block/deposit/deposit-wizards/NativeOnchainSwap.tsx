import { Button } from '@components/ui/button'
import { SuccessButton } from '@modules/transaction-block/components/SuccessButton'
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

export const NativeOnchainSwap: React.FunctionComponent<
  IDepositWizardProperties
> = () => {
  const {
    vaultAddress,
    currentStep,
    setCurrentStep,
    depositAsset,
    depositFromNetwork,
    depositToNetwork,
    vault,
    inputValue,
    inputValueInUSD,
    transactionHash,
    setIntermediateError,
    setAnimationStatus,
  } = useTxStore()

  const {
    status: switchStatus,
    switchChain,
    error: switchError,
  } = useSwitchToTokenChain({
    chainId: depositAsset?.chain_id,
    onSuccessHandler: () => {
      if (currentStep === 1) {
        setCurrentStep(2)
      }
    },
  })

  const {
    swapTokens: swapAndDeposit,
    status: _swapAndDepositStatus,
    error: swapAndDepositError,
  } = useSwap()

  const ActionButton: React.FC<{ className?: string }> = ({ className = '' }) => {
    switch (currentStep) {
      case 1: {
        return (
          <Button
            size="lg"
            type="button"
            onClick={switchChain}
            loading={switchStatus === 'pending'}
            disabled={switchStatus === 'confirm_in_wallet'}
            className={className}
            error={switchStatus === 'error'}
          >
            {getButtonContent(switchStatus, 'Switch to Arbitrum')}
          </Button>
        )
      }

      case 2: {
        if (swapAndDepositStatus === 'success') {
          return <SuccessButton className={className} />
        }

        return (
          <Button
            size="lg"
            type="button"
            className={className}
            onClick={swapAndDeposit}
            loading={swapAndDepositStatus === 'pending'}
            disabled={swapAndDepositStatus === 'confirm_in_wallet'}
            error={swapAndDepositStatus === 'error'}
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

  const swapAndDepositStatus = useTransactionStatus(_swapAndDepositStatus)

  useEffect(() => {
    if (swapAndDepositStatus === 'error') {
      setIntermediateError(swapAndDepositError ?? 'Unknown error')
    }

    if (switchStatus === 'error') {
      setIntermediateError(switchError ?? 'Unknown error')
    }
  }, [
    swapAndDepositStatus,
    setIntermediateError,
    swapAndDepositError,
    switchStatus,
    switchError,
  ])

  useEffect(() => {
    if (switchStatus === 'pending' || swapAndDepositStatus === 'pending') {
      setAnimationStatus('playing')
      return
    }

    setAnimationStatus('idle')
  }, [switchStatus, swapAndDepositStatus, setAnimationStatus])

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
          token: {
            symbol: depositAsset?.contract_ticker_symbol ?? '',
            network: depositFromNetwork ?? 1,
          },
        }}
        receive={{
          label: 'You stake',
          value: inputValue,
          usdValue: inputValueInUSD,
          token: {
            symbol: vault ?? '',
            network: depositToNetwork ?? 1,
          },
        }}
        success={{
          show: swapAndDepositStatus === 'success',
          type: 'deposit',
          hash: transactionHash ?? '',
        }}
      />
      <div className="flex items-center justify-center gap-2.5 self-stretch px-4 py-3">
        <ActionButton className="w-full px-[1.875rem] py-4 text-base font-medium normal-case leading-6" />
      </div>
    </>
  )
}
