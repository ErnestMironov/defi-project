import DepositIcon from '@assets/icons/deposit.svg'
import { TokenIconComponent } from '@components/token-icon'
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

import { useSwap } from '../hooks/useSwap'
import { useSwitchToTokenChain } from '../hooks/useSwitchToTokenChain'
import type { IDepositWizardProperties } from '../interfaces'

export const NativeCrossChainSwap: React.FunctionComponent<IDepositWizardProperties> = ({
  allStepsCompleted,
}) => {
  const { depositAsset, vault, currentStep, setCurrentStep, setIntermediateError } =
    useTxStore()

  const { isBelowDesktop } = useDeviceWidth()

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

  const ActionButton = () => {
    switch (currentStep) {
      case 1: {
        return (
          <Button
            size="lg"
            type="button"
            className="rounded-2xl max-lg:py-6"
            onClick={switchToAssetChain}
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
            className="rounded-2xl max-lg:py-6"
            onClick={swapAndDeposit}
            disabled={swapAndDepositStatus === 'pending'}
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

  return (
    <div className="flex flex-col items-stretch gap-6 lg:gap-8">
      {!isBelowDesktop && (
        <div className="flex flex-col items-stretch gap-2 px-8">
          <ActionButton />
        </div>
      )}
      <div className="border-stroke-100 lg:border-t lg:px-8 lg:pt-7">
        <WizardDropDown open={isOpen} setOpen={setIsOpen} activeStep={currentStep}>
          <WizardStep
            icon={<TokenIconComponent width="2rem" symbol={depositAssetChain?.symbol} />}
            title={`Switch to ${depositAssetChain?.name}`}
            status={allStepsCompleted ? 'success' : switchToAssetChainStatus}
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
