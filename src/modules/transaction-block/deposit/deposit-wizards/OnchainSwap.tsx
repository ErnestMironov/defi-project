import ReceiveSquare from '@assets/icons/receive-square.svg'
import { TokenIconComponent } from '@components/token-icon'
import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import { Button } from '@components/ui/button'
import { CHAIN_IDS_BY_NAME } from '@constants/chains'
import { WizardStep } from '@modules/transaction-block/components/WizardStep'
import { useTransactionStatus } from '@modules/transaction-block/hooks/useTransactionStatus'
import { useTxStore } from '@modules/transaction-block/store/useTxStore'
import { getButtonContent } from '@modules/transaction-block/utils/getButtonText'
import { cn } from '@utils/cn'
import { useState } from 'react'
import { type Address, parseUnits } from 'viem'

import { InfoBlock } from '../components/InfoBlock'
import { useApproveERC20 } from '../hooks/useApproveERC20'
import { useSwap } from '../hooks/useSwap'
import { useSwitchToTokenChain } from '../hooks/useSwitchToTokenChain'
import type { IDepositWizardProperties } from '../interfaces'

export const OnchainSwap: React.FunctionComponent<IDepositWizardProperties> = ({
  allStepsCompleted,
}) => {
  const [currentStep, setCurrentStep] = useState(1)

  const { depositAsset, vault, inputValue: amount, squidRoute } = useTxStore()

  const { status: switchStatus, switchChain } = useSwitchToTokenChain({
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
    error: approveErrorBeforeSwap,
  } = useApproveERC20({
    approveValue: parseUnits(amount, depositAsset?.contract_decimals ?? 6).toString(),
    tokenAddress: depositAsset?.contract_address as Address,
    transactionRequestTarget: squidRoute?.transactionRequest?.target,
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
    depositHash,
  } = useSwap()

  const swapAndDepositStatus = useTransactionStatus(_swapAndDepositStatus)

  const ActionButton = () => {
    switch (currentStep) {
      case 1: {
        console.info('��� ~ OnChainDeposit ~ currentStep:', 'switch to Arbitrum')
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
        console.info('��� ~ OnChainDeposit ~ currentStep:', 'approve')
        return (
          <Button
            size="lg"
            type="button"
            onClick={approveBeforeSwap}
            disabled={approveStatusBeforeSwap === 'pending'}
          >
            {getButtonContent(
              approveStatusBeforeSwap,
              `Approve ${depositAsset?.contract_ticker_symbol}`,
            )}
          </Button>
        )
      }
      case 3: {
        console.info('��� ~ OnChainDeposit ~ currentStep:', 'deposit')
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

  return (
    <div className="flex flex-col items-stretch gap-10">
      <div className="flex flex-col gap-2">
        <WizardStep
          icon={<TokenIconComponent width="2rem" symbol={CHAIN_IDS_BY_NAME.Arbitrum} />}
          title="Switch to Arbitrum"
          status={allStepsCompleted ? 'success' : switchStatus}
        />
        <WizardStep
          icon={
            <TokenWithNetwork
              symbol={depositAsset?.contract_ticker_symbol}
              network="Arbitrum"
              width="2rem"
            />
          }
          title="Approve"
          status={allStepsCompleted ? 'success' : approveStatusBeforeSwap}
          showChain
          error={approveErrorBeforeSwap?.message}
        />
        <WizardStep
          icon={<ReceiveSquare className={cn('size-8')} />}
          title={`Deposit ${vault}`}
          status={swapAndDepositStatus}
          error={swapAndDepositError}
          showChain
        />
        {depositHash && (
          <InfoBlock txHash={depositHash} className="mt-4" type="on_chain" />
        )}
      </div>
      {ActionButton()}
    </div>
  )
}
