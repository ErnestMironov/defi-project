import ReceiveSquare from '@assets/icons/receive-square.svg'
import { TokenIconComponent } from '@components/token-icon'
import { Button } from '@components/ui/button'
import { CHAIN_IDS_BY_NAME } from '@constants/chains'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { WizardDropDown } from '@modules/transaction-block/components/WizardDropDown'
import { WizardStep } from '@modules/transaction-block/components/WizardStep'
import { useTransactionStatus } from '@modules/transaction-block/hooks/useTransactionStatus'
import { useTxStore } from '@modules/transaction-block/store/useTxStore'
import { getButtonContent } from '@modules/transaction-block/utils/getButtonText'
import { cn } from '@utils/cn'
import { useEffect, useState } from 'react'

import { InfoBlock } from '../components/InfoBlock'
import { useSwap } from '../hooks/useSwap'
import { useSwitchToTokenChain } from '../hooks/useSwitchToTokenChain'
import type { IDepositWizardProperties } from '../interfaces'

export const NativeOnchainSwap: React.FunctionComponent<IDepositWizardProperties> = ({
  allStepsCompleted,
}) => {
  const {
    vault,
    currentStep,
    setCurrentStep,
    depositAsset,
    setIntermediateError,
    setAnimationStatus,
  } = useTxStore()
  const [isOpen, setIsOpen] = useState(false)

  const { isBelowDesktop } = useDeviceWidth()

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
    depositHash,
    error: swapAndDepositError,
  } = useSwap()

  const ActionButton = () => {
    switch (currentStep) {
      case 1: {
        return (
          <Button
            size="lg"
            type="button"
            onClick={switchChain}
            loading={switchStatus === 'pending'}
            disabled={switchStatus === 'confirm_in_wallet'}
            className="rounded-2xl max-lg:py-6"
          >
            {getButtonContent(switchStatus, 'Switch to Arbitrum')}
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
            icon={<TokenIconComponent width="2rem" symbol={CHAIN_IDS_BY_NAME.Arbitrum} />}
            title="Switch to Arbitrum"
            status={allStepsCompleted ? 'success' : switchStatus}
          />
          <WizardStep
            icon={<ReceiveSquare className={cn('size-8')} />}
            title={`Deposit ${vault}`}
            status={swapAndDepositStatus}
            isDDOpen={isOpen}
          />
          {depositHash && (
            <InfoBlock txHash={depositHash} className="mt-4" type="on_chain" />
          )}
        </WizardDropDown>
      </div>
      {isBelowDesktop && <ActionButton />}
    </div>
  )
}
