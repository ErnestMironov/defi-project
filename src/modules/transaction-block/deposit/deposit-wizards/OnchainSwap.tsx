import { Button } from '@components/ui/button'
import { useTokenAsset } from '@hooks/common/useTokenAsset'
import { TxReviewInfo } from '@modules/transaction-block/components/TxReviewInfo'
import { useTransactionAnimation } from '@modules/transaction-block/hooks/useTransactionAnimation'
import { useTransactionStatus } from '@modules/transaction-block/hooks/useTransactionStatus'
import { useTxStore } from '@modules/transaction-block/store/useTxStore'
import { getButtonContent } from '@modules/transaction-block/utils/getButtonText'
import { replaceCommasWithDots, trimTrailingZeros } from '@utils/formatValue'
import { useEffect, useState } from 'react'
import { type Address, parseUnits } from 'viem'

import { useApproveERC20 } from '../hooks/useApproveERC20'
import { useSwap } from '../hooks/useSwap'
import { useSwitchToTokenChain } from '../hooks/useSwitchToTokenChain'
import type { IDepositWizardProperties } from '../interfaces'

export const OnchainSwap: React.FunctionComponent<IDepositWizardProperties> = () => {
  const [currentStep, setCurrentStep] = useState(1)

  const {
    depositAsset,
    vaultAddress,
    inputValue: amount,
    swapRoute,
    depositFromNetwork,
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
    approve: approveBeforeSwap,
    status: approveStatusBeforeSwap,
    error: approveError,
  } = useApproveERC20({
    approveValue: parseUnits(amount, depositAsset?.contract_decimals ?? 6).toString(),
    tokenAddress: depositAsset?.contract_address as Address,
    transactionRequestTarget: swapRoute?.estimate?.approvalAddress,
    chainId: depositAsset?.chain_id,
    onSuccessHandler: () => {
      if (currentStep === 2) {
        setCurrentStep(3)
      }
    },
  })

  const {
    swapTokens: swapAndDeposit,
    status: _swapAndDepositStatus,
    error: swapAndDepositError,
  } = useSwap()

  const swapAndDepositStatus = useTransactionStatus(_swapAndDepositStatus)

  const chainData = useTokenAsset(depositFromNetwork)

  const ActionButton: React.FC<{ className?: string }> = ({ className = '' }) => {
    switch (currentStep) {
      case 1: {
        console.info(' ~ OnChainDeposit ~ currentStep:', 'switch to Arbitrum')
        return (
          <Button
            size="lg"
            type="button"
            error={switchStatus === 'error'}
            onClick={switchChain}
            className={className}
            loading={switchStatus === 'pending'}
            disabled={switchStatus === 'confirm_in_wallet'}
          >
            {getButtonContent(switchStatus, `Switch to ${chainData?.name}`)}
          </Button>
        )
      }
      case 2: {
        console.info(' ~ OnChainDeposit ~ currentStep:', 'approve')
        return (
          <Button
            size="lg"
            type="button"
            className={className}
            error={approveStatusBeforeSwap === 'error'}
            onClick={approveBeforeSwap}
            loading={approveStatusBeforeSwap === 'pending'}
            disabled={approveStatusBeforeSwap === 'confirm_in_wallet'}
          >
            {getButtonContent(
              approveStatusBeforeSwap,
              `Approve ${depositAsset?.contract_ticker_symbol}`,
            )}
          </Button>
        )
      }
      case 3: {
        console.info(' ~ OnChainDeposit ~ currentStep:', 'deposit')
        return (
          <Button
            size="lg"
            type="button"
            onClick={swapAndDeposit}
            className={className}
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

  useEffect(() => {
    if (swapAndDepositStatus === 'error') {
      setIntermediateError(swapAndDepositError ?? 'Unknown error')
    }

    if (approveStatusBeforeSwap === 'error') {
      setIntermediateError(approveError?.message ?? 'Unknown error')
    }

    if (switchStatus === 'error') {
      setIntermediateError(switchError ?? 'Unknown error')
    }
  }, [
    approveStatusBeforeSwap,
    swapAndDepositStatus,
    setIntermediateError,
    approveError?.message,
    swapAndDepositError,
    switchStatus,
    switchError,
  ])

  useEffect(() => {
    if (
      switchStatus === 'pending' ||
      approveStatusBeforeSwap === 'pending' ||
      swapAndDepositStatus === 'pending'
    ) {
      setAnimationStatus('playing')
      return
    }

    setAnimationStatus('idle')
  }, [switchStatus, approveStatusBeforeSwap, swapAndDepositStatus, setAnimationStatus])

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
          value: replaceCommasWithDots(trimTrailingZeros(amount)),
          usdValue: amount,
        }}
        receive={{
          label: 'You will stake',
          value: amount,
          usdValue: amount,
        }}
      />
      <div className="flex items-center justify-center gap-2.5 self-stretch px-4 py-3">
        <ActionButton className="w-full px-[1.875rem] py-4 text-base font-medium normal-case leading-6" />
      </div>
    </>
  )
}
