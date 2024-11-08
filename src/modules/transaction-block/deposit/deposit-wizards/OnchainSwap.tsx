import DepositIcon from '@assets/icons/deposit.svg'
import { TokenIconComponent } from '@components/token-icon'
import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import { Button } from '@components/ui/button'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
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

export const OnchainSwap: React.FunctionComponent<IDepositWizardProperties> = ({
  allStepsCompleted,
}) => {
  const [currentStep, setCurrentStep] = useState(1)

  const { isBelowDesktop } = useDeviceWidth()

  const {
    depositAsset,
    vault,
    inputValue: amount,
    swapRoute,
    setIntermediateError,
    setAnimationStatus,
  } = useTxStore()

  const depositAssetChain = useTokenAsset(depositAsset?.chain_id)

  const [isOpen, setIsOpen] = useState(false)

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

  const ActionButton = () => {
    switch (currentStep) {
      case 1: {
        console.info(' ~ OnChainDeposit ~ currentStep:', 'switch to Arbitrum')
        return (
          <Button
            size="lg"
            type="button"
            onClick={switchChain}
            className="rounded-2xl max-lg:py-6"
            loading={switchStatus === 'pending'}
            disabled={switchStatus === 'confirm_in_wallet'}
          >
            {getButtonContent(switchStatus, 'Switch to Arbitrum')}
          </Button>
        )
      }
      case 2: {
        console.info(' ~ OnChainDeposit ~ currentStep:', 'approve')
        return (
          <Button
            size="lg"
            type="button"
            className="rounded-2xl max-lg:py-6"
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
            className="rounded-2xl max-lg:py-6"
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

  return (
    <div className="flex flex-col items-stretch gap-6 lg:gap-8">
      {!isBelowDesktop && (
        <div className="flex w-full flex-col items-stretch px-8">
          <ActionButton />
        </div>
      )}
      <div className="border-stroke-100 lg:border-t lg:px-8 lg:pt-7">
        <WizardDropDown open={isOpen} setOpen={setIsOpen} activeStep={currentStep}>
          <WizardStep
            icon={
              <TokenIconComponent width="2.625rem" symbol={depositAssetChain?.symbol} />
            }
            title={`Switch to ${depositAssetChain?.name}`}
            status={allStepsCompleted ? 'success' : switchStatus}
          />
          <WizardStep
            icon={
              <TokenWithNetwork
                symbol={depositAsset?.contract_ticker_symbol}
                network={depositAsset?.chain_id}
                width="2rem"
              />
            }
            title="Approve"
            status={allStepsCompleted ? 'success' : approveStatusBeforeSwap}
            isDDOpen={isOpen}
          />
          <WizardStep
            icon={<DepositIcon className={cn('size-8')} />}
            title={`Deposit ${vault}`}
            status={swapAndDepositStatus}
            isDDOpen={isOpen}
          />
        </WizardDropDown>
      </div>
      {isBelowDesktop && <ActionButton />}
    </div>
  )
}
