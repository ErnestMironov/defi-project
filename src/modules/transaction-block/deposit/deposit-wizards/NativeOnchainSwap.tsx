import ReceiveSquare from '@assets/icons/receive-square.svg'
import { TokenIconComponent } from '@components/token-icon'
import { Button } from '@components/ui/button'
import { CHAIN_IDS_BY_NAME } from '@constants/chains'
import { WizardStep } from '@modules/transaction-block/components/WizardStep'
import { useTransactionStatus } from '@modules/transaction-block/hooks/useTransactionStatus'
import { useTxStore } from '@modules/transaction-block/store/useTxStore'
import { getButtonContent } from '@modules/transaction-block/utils/getButtonText'
import { cn } from '@utils/cn'

import { InfoBlock } from '../components/InfoBlock'
import { useSwap } from '../hooks/useSwap'
import { useSwitchToTokenChain } from '../hooks/useSwitchToTokenChain'
import type { IDepositWizardProperties } from '../interfaces'

export const NativeOnchainSwap: React.FunctionComponent<IDepositWizardProperties> = ({
  allStepsCompleted,
}) => {
  const { vault, currentStep, setCurrentStep, depositAsset } = useTxStore()

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
    depositHash,
  } = useSwap()

  const ActionButton = () => {
    switch (currentStep) {
      case 1: {
        return (
          <Button
            size="lg"
            type="button"
            onClick={switchChain}
            disabled={switchStatus === 'pending'}
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

  const swapAndDepositStatus = useTransactionStatus(_swapAndDepositStatus)

  return (
    <div className="flex flex-col items-stretch gap-10">
      <div className="flex flex-col gap-2">
        <WizardStep
          icon={<TokenIconComponent width="2rem" symbol={CHAIN_IDS_BY_NAME.Arbitrum} />}
          activeStep={currentStep === 1}
          title="Switch to Arbitrum"
          status={allStepsCompleted ? 'success' : switchStatus}
          error={switchError}
        />
        <WizardStep
          icon={<ReceiveSquare className={cn('size-8')} />}
          activeStep={currentStep === 2}
          title={`Deposit ${vault}`}
          status={swapAndDepositStatus}
          error={swapAndDepositError}
          showArrow
        />
        {depositHash && (
          <InfoBlock txHash={depositHash} className="mt-4" type="on_chain" />
        )}
      </div>
      {ActionButton()}
    </div>
  )
}
