import ReceiveSquare from '@assets/icons/receive-square.svg'
import { TokenIconComponent } from '@components/token-icon'
import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import { Button } from '@components/ui/button'
import { useTokenAsset } from '@hooks/common/useTokenAsset'
import { WizardDropDown } from '@modules/transaction-block/components/WizardDropDown'
import { WizardStep } from '@modules/transaction-block/components/WizardStep'
import { useTransactionStatus } from '@modules/transaction-block/hooks/useTransactionStatus'
import { useTxStore } from '@modules/transaction-block/store/useTxStore'
import { getButtonContent } from '@modules/transaction-block/utils/getButtonText'
import { cn } from '@utils/cn'
import { useEffect, useState } from 'react'
import { type Address, parseUnits } from 'viem'

import { useApproveERC20 } from '../hooks/useApproveERC20'
import { useSwap } from '../hooks/useSwap'
import { useSwitchToTokenChain } from '../hooks/useSwitchToTokenChain'
import type { IDepositWizardProperties } from '../interfaces'

export const CrossChainSwap: React.FunctionComponent<IDepositWizardProperties> = ({
  allStepsCompleted,
}) => {
  const {
    depositAsset,
    vault,
    inputValue: amount,
    currentStep,
    setCurrentStep,
    squidRoute,
    setIntermediateError,
  } = useTxStore()

  const [isOpen, setIsOpen] = useState(false)

  const depositAssetChain = useTokenAsset(depositAsset?.chain_id)

  const {
    status: switchToAssetChainStatus,
    switchChain: switchToAssetChain,
    error: switchError,
  } = useSwitchToTokenChain({
    chainId: depositAssetChain?.chainId ?? 1,
    onSuccessHandler: () => {
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
    approveValue: parseUnits(amount, depositAsset?.contract_decimals ?? 6).toString(),
    tokenAddress: depositAsset?.contract_address as Address,
    transactionRequestTarget: squidRoute?.transactionRequest?.target,
    chainId: depositAssetChain?.chainId,
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

  const ActionButton = () => {
    switch (currentStep) {
      case 1: {
        return (
          <Button
            size="lg"
            type="button"
            onClick={() => {
              switchToAssetChain()
            }}
            disabled={switchToAssetChainStatus === 'pending'}
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
            onClick={approve}
            disabled={approveStatus === 'pending'}
          >
            {getButtonContent(
              approveStatus,
              `Approve ${depositAsset?.contract_ticker_symbol}`,
            )}
          </Button>
        )
      }
      case 3: {
        return (
          <Button
            size="lg"
            type="button"
            onClick={swapAndDeposit}
            disabled={swapAndDepositStatus === 'pending'}
          >
            {getButtonContent(swapAndDepositStatus, `Deposit ${vault}`)}
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

    if (approveStatus === 'error') {
      setIntermediateError(approveError?.message ?? 'Unknown error')
    }

    if (switchToAssetChainStatus === 'error') {
      setIntermediateError(switchError ?? 'Unknown error')
    }
  }, [
    swapAndDepositStatus,
    setIntermediateError,
    swapAndDepositError,
    approveStatus,
    approveError?.message,
    switchToAssetChainStatus,
    switchError,
  ])

  return (
    <div className="flex flex-col items-stretch gap-7">
      <div className="flex flex-col items-stretch gap-2 px-8">{ActionButton()}</div>
      <div className="border-t border-stroke-100 px-8 pt-7">
        <WizardDropDown open={isOpen} setOpen={setIsOpen} activeStep={currentStep}>
          <WizardStep
            icon={<TokenIconComponent width="2rem" symbol={depositAssetChain?.symbol} />}
            title={`Switch to ${depositAssetChain?.name}`}
            status={allStepsCompleted ? 'success' : switchToAssetChainStatus}
          />
          <WizardStep
            icon={
              <TokenWithNetwork
                symbol={depositAsset?.contract_ticker_symbol}
                network={depositAssetChain?.symbol}
                width="2rem"
              />
            }
            title="Approve"
            status={allStepsCompleted ? 'success' : approveStatus}
            isDDOpen={isOpen}
          />
          <WizardStep
            icon={<ReceiveSquare className={cn('size-8')} />}
            title={`Deposit ${vault}`}
            status={swapAndDepositStatus}
            isDDOpen={isOpen}
          />
        </WizardDropDown>
      </div>
    </div>
  )
}
