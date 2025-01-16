import { Button } from '@components/ui/button'
import { CHAIN_NAMES_BY_ID } from '@constants/chains'
import { SuccessButton } from '@modules/transaction-block/components/SuccessButton'
import { TxReviewInfo } from '@modules/transaction-block/components/TxReviewInfo'
import { useTransactionAnimation } from '@modules/transaction-block/hooks/useTransactionAnimation'
import { useTransactionStatus } from '@modules/transaction-block/hooks/useTransactionStatus'
import { useTxStore } from '@modules/transaction-block/store/useTxStore'
import { getButtonContent } from '@modules/transaction-block/utils/getButtonText'
import { replaceCommasWithDots, trimTrailingZeros } from '@utils/formatValue'
import { useEffect } from 'react'
import { type Address, parseUnits } from 'viem'
import { useAccount } from 'wagmi'

import { useApproveERC20 } from '../hooks/useApproveERC20'
import { useDepositTransaction } from '../hooks/useDepositTransaction'
import { useSwitchToTokenChain } from '../hooks/useSwitchToTokenChain'
import type { IDepositWizardProperties } from '../interfaces'

export const SimpleDeposit: React.FunctionComponent<IDepositWizardProperties> = () => {
  const { chainId } = useAccount()
  const {
    depositAsset: asset,
    inputValue: amount,
    depositFromNetwork,
    vaultAddress,
    currentStep,
    approvalStatus,
    setCurrentStep,
    setIntermediateError,
    setNetworkSwitchStatus,
    setApprovalStatus,
    setTransactionStatus,
    transactionHash,
  } = useTxStore()

  const {
    status: switchStatus,
    error: switchError,
    switchChain,
  } = useSwitchToTokenChain({
    chainId: asset?.chain_id,
    onSuccessHandler: () => {
      if (approvalStatus === 'success') {
        setCurrentStep(3)
        return
      }

      if (currentStep === 1) {
        setCurrentStep(2)
      }
    },
  })

  const {
    approve,
    status: approveStatus,
    error: approveError,
  } = useApproveERC20({
    approveValue: parseUnits(amount, asset?.contract_decimals ?? 6).toString(),
    tokenAddress: asset?.contract_address as Address,
    transactionRequestTarget: vaultAddress,
    chainId: asset?.chain_id,
    onSuccessHandler: () => {
      if (currentStep === 2) {
        setCurrentStep(3)
      }
    },
  })

  const {
    deposit,
    status: _depositStatus,
    error: depositError,
  } = useDepositTransaction({
    address: asset?.contract_address as Address,
    amount: BigInt(parseUnits(amount, asset?.contract_decimals ?? 6)),
  })

  const depositStatus = useTransactionStatus(_depositStatus)

  const ActionButton: React.FC<{ className?: string }> = ({ className = '' }) => {
    switch (currentStep) {
      case 1: {
        console.info('🚀 ~ SimpleDeposit ~ currentStep:', 'switch to Arbitrum')
        return (
          <Button
            loading={switchStatus === 'pending'}
            disabled={switchStatus === 'confirm_in_wallet'}
            error={switchStatus === 'error'}
            type="button"
            onClick={switchChain}
            className={className}
          >
            {getButtonContent(
              switchStatus,
              `Switch to ${
                CHAIN_NAMES_BY_ID[asset?.chain_id as keyof typeof CHAIN_NAMES_BY_ID] ??
                'Unknown Chain'
              }`,
            )}
          </Button>
        )
      }
      case 2: {
        console.info('🚀 ~ SimpleDeposit ~ currentStep:', 'approve')
        return (
          <Button
            loading={approveStatus === 'pending'}
            type="button"
            disabled={approveStatus === 'confirm_in_wallet'}
            error={approveStatus === 'error'}
            onClick={approve}
            className={className}
          >
            {getButtonContent(approveStatus, `Approve ${asset?.contract_ticker_symbol}`)}
          </Button>
        )
      }
      case 3: {
        console.info('🚀 ~ SimpleDeposit ~ currentStep:', 'deposit')
        if (depositStatus === 'success') {
          return <SuccessButton className={className} />
        }
        return (
          <Button
            loading={depositStatus === 'pending'}
            disabled={depositStatus === 'confirm_in_wallet'}
            error={depositStatus === 'error'}
            type="button"
            onClick={deposit}
            className={className}
          >
            {depositStatus === 'error'
              ? 'Transaction failed'
              : getButtonContent(depositStatus, 'Deposit')}
          </Button>
        )
      }
      default: {
        throw new Error('unknown action type')
      }
    }
  }

  const TransactionAnimation = useTransactionAnimation()

  useEffect(() => {
    if (depositStatus === 'error') {
      setIntermediateError(depositError?.message ?? 'Unknown error')
    }

    if (approveStatus === 'error') {
      setIntermediateError(approveError?.message ?? 'Unknown error')
    }

    if (switchStatus === 'error') {
      setIntermediateError(switchError ?? 'Unknown error')
    }
  }, [
    depositStatus,
    approveStatus,
    switchStatus,
    setIntermediateError,
    depositError?.message,
    approveError?.message,
    switchError,
  ])

  useEffect(() => {
    setNetworkSwitchStatus(switchStatus)
    setApprovalStatus(approveStatus)
    setTransactionStatus(depositStatus)
  }, [
    depositStatus,
    approveStatus,
    switchStatus,
    setNetworkSwitchStatus,
    setApprovalStatus,
    setTransactionStatus,
  ])

  useEffect(() => {
    if (chainId !== depositFromNetwork) {
      setCurrentStep(1)
    }
  }, [chainId, depositFromNetwork, setCurrentStep])

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
          token: {
            symbol: asset?.contract_ticker_symbol ?? '',
            network: depositFromNetwork ?? 1,
          },
        }}
        receive={{
          label: 'You stake',
          value: amount,
          usdValue: amount,
          token: {
            symbol: asset?.contract_ticker_symbol ?? '',
            network: depositFromNetwork ?? 1,
          },
        }}
        success={{
          show: depositStatus === 'success',
          type: 'deposit',
          hash: transactionHash ?? '',
        }}
      />
      <div className="flex items-center justify-center gap-2.5 self-stretch px-4 py-3">
        <ActionButton className="w-full px-[1.875rem] py-4 text-base font-medium normal-case leading-6 hover:bg-main-80" />
      </div>
    </>
  )
}
