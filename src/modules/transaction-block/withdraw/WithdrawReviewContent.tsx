import { Button } from '@components/ui/button'
import { CHAIN_NAMES_BY_ID } from '@constants/chains'
import BigNumber from 'bignumber.js'
import { useEffect, useMemo } from 'react'
import { parseUnits } from 'viem'

import { SuccessButton } from '../components/SuccessButton'
import { TxReviewInfo } from '../components/TxReviewInfo'
import { useApproveERC20 } from '../deposit/hooks/useApproveERC20'
import { useSwitchToTokenChain } from '../deposit/hooks/useSwitchToTokenChain'
import { useTransactionAnimation } from '../hooks/useTransactionAnimation'
import { useTransactionStatus } from '../hooks/useTransactionStatus'
import { useTxStore } from '../store/useTxStore'
import { getButtonContent } from '../utils/getButtonText'
import { useWithdrawTransaction } from './hooks/useWithdrawTransaction'
import { useActiveAccount } from '@hooks/useActiveAccount'

export const WithdrawReviewContent = () => {
  const {
    withdrawInputValue: amount,
    withdrawInputValueInUSD: withdrawAmountInUSD,
    mtToken,
    currentStep,
    withdrawFromNetwork,
    withdrawToNetwork,
    transactionHash,
    setIntermediateError,
    setCurrentStep,
    setNetworkSwitchStatus,
    setApprovalStatus,
    setTransactionStatus,
  } = useTxStore()

  const { address } = useActiveAccount()

  const inputValueInMtToken = useMemo(() => {
    const parsedAmount = parseUnits(amount, mtToken?.decimals ?? 6)

    const inputValueBN = new BigNumber(parsedAmount.toString())
    const lpBalanceBN = new BigNumber(mtToken?.balance?.toString() ?? 0)
    const balanceBN = new BigNumber(mtToken?.stableBalance?.toString() ?? 0)

    if (
      inputValueBN.isZero() ||
      lpBalanceBN.isZero() ||
      balanceBN.isZero() ||
      inputValueBN.isNaN() ||
      lpBalanceBN.isNaN() ||
      balanceBN.isNaN()
    ) {
      return '0'
    }

    return inputValueBN.multipliedBy(lpBalanceBN).div(balanceBN).toFixed(0)
  }, [amount, mtToken?.balance, mtToken?.decimals, mtToken?.stableBalance])

  const { status: switchStatus, switchChain } = useSwitchToTokenChain({
    chainId: mtToken?.chainData?.chainId ?? 1,
    onSuccessHandler: () => {
      if (currentStep <= 1) {
        setCurrentStep(2)
      }
    },
  })

  const {
    approve,
    status: approveStatus,
    error: approveError,
  } = useApproveERC20({
    approveValue: inputValueInMtToken,
    tokenAddress: mtToken?.address,
    transactionRequestTarget: mtToken?.address,
    chainId: mtToken?.chainData?.chainId,
    onSuccessHandler: () => {
      if (currentStep === 2) {
        setCurrentStep(3)
      }
    },
  })

  const {
    withdraw,
    status: currentWithdrawStatus,
    error: withdrawError,
  } = useWithdrawTransaction({
    amount: inputValueInMtToken,
  })

  const withdrawStatus = useTransactionStatus(currentWithdrawStatus)

  useEffect(() => {
    if (approveError || withdrawError || switchStatus === 'error') {
      setIntermediateError(
        approveError?.message || withdrawError?.message || switchStatus,
      )
    }
  }, [approveError, withdrawError, switchStatus, setIntermediateError])

  function handleTryAgain(callback: () => void) {
    setIntermediateError(null)
    callback()
  }

  const ActionButton: React.FC<{ className?: string }> = ({ className = '' }) => {
    switch (currentStep) {
      case 1: {
        return (
          <Button
            disabled={switchStatus === 'confirm_in_wallet'}
            size="lg"
            type="button"
            error={switchStatus === 'error'}
            className={className}
            onClick={() => handleTryAgain(switchChain)}
          >
            {getButtonContent(
              switchStatus,
              `Switch to ${
                CHAIN_NAMES_BY_ID[
                  mtToken?.chainData?.chainId as keyof typeof CHAIN_NAMES_BY_ID
                ]
              }`,
            )}
          </Button>
        )
      }
      case 2: {
        return (
          <Button
            loading={approveStatus === 'pending'}
            size="lg"
            type="button"
            className={className}
            disabled={approveStatus === 'confirm_in_wallet'}
            error={approveStatus === 'error'}
            onClick={() => handleTryAgain(approve)}
          >
            {getButtonContent(approveStatus, `Approve ${mtToken?.symbol}`)}
          </Button>
        )
      }
      case 3: {
        if (withdrawStatus === 'success') {
          return <SuccessButton className={className} />
        }

        return (
          <Button
            loading={withdrawStatus === 'pending'}
            size="lg"
            type="button"
            disabled={withdrawStatus === 'pending'}
            className={className}
            error={withdrawStatus === 'error'}
            onClick={() => handleTryAgain(withdraw)}
          >
            {getButtonContent(withdrawStatus, 'Withdraw')}
          </Button>
        )
      }
      default: {
        throw new Error('unknown action type')
      }
    }
  }

  const isCrossChain = withdrawFromNetwork !== withdrawToNetwork
  const renderWithdrawInfo = useMemo(() => {
    switch (isCrossChain) {
      case true: {
        return (
          <TxReviewInfo
            recipient={{ label: 'Recipient', value: address ?? '' }}
            chain={withdrawFromNetwork ?? 1}
            withdraw={{
              label: 'Withdraw',
              value: amount,
              usdValue: withdrawAmountInUSD,
              token: {
                symbol: mtToken?.stable ?? '',
                network: withdrawFromNetwork ?? 1,
              },
            }}
            receive={{
              label: 'Receive',
              value: amount,
              usdValue: withdrawAmountInUSD,
              token: {
                symbol: mtToken?.stable ?? '',
                network: withdrawToNetwork ?? 1,
              },
            }}
            success={{
              show: withdrawStatus === 'success',
              type: 'withdraw',
              hash: transactionHash ?? '',
            }}
          />
        )
      }
      case false: {
        return (
          <TxReviewInfo
            recipient={{ label: 'Recipient', value: address ?? '' }}
            chain={withdrawFromNetwork ?? 1}
            withdraw={{
              label: 'Withdraw',
              value: amount,
              usdValue: withdrawAmountInUSD,
              token: {
                symbol: mtToken?.stable ?? '',
                network: withdrawFromNetwork ?? 1,
              },
            }}
            receive={{
              label: 'Receive',
              value: amount,
              usdValue: withdrawAmountInUSD,
              token: {
                symbol: mtToken?.stable ?? '',
                network: withdrawFromNetwork ?? 1,
              },
            }}
            success={{
              show: withdrawStatus === 'success',
              type: 'withdraw',
              hash: transactionHash ?? '',
            }}
          />
        )
      }
      default: {
        throw new Error('unknown action type')
      }
    }
  }, [
    isCrossChain,
    address,
    withdrawFromNetwork,
    amount,
    withdrawAmountInUSD,
    mtToken?.stable,
    withdrawToNetwork,
    withdrawStatus,
    transactionHash,
  ])

  const TransactionAnimation = useTransactionAnimation()

  useEffect(() => {
    setNetworkSwitchStatus(switchStatus)
    setApprovalStatus(approveStatus)
    setTransactionStatus(withdrawStatus)
    console.log('🚀 ~ useEffect', withdrawStatus, approveStatus, switchStatus)
  }, [
    withdrawStatus,
    approveStatus,
    switchStatus,
    setNetworkSwitchStatus,
    setApprovalStatus,
    setTransactionStatus,
  ])

  return (
    <>
      <TransactionAnimation />
      {renderWithdrawInfo}

      <div className="flex items-center justify-center gap-2.5 self-stretch px-4 py-3">
        <ActionButton className="w-full px-[1.875rem] py-4 text-base font-medium normal-case leading-6 hover:bg-main-80" />
      </div>
    </>
  )
}
