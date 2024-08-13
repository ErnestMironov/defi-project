import { useGetSquidSwapRoute } from '@api/squid-router/useGetSquidSwapRoute'
import useSquidSDK from '@api/squid-router/useSquidSdk'
import ReceiveSquare from '@assets/icons/receive-square.svg'
import { TokenIconComponent } from '@components/token-icon'
import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import { Button } from '@components/ui/button'
import { CHAIN_IDS_BY_NAME } from '@constants/chains'
import { useTxStore } from '@modules/transaction-block/store/useDepositStore'
import { getButtonContent } from '@modules/transaction-block/utils/getButtonText'
import { cn } from '@utils/cn'
import { useMemo, useState } from 'react'
import { type Address, parseUnits } from 'viem'

import { InfoBlock } from '../components/InfoBlock'
import { WizardStep } from '@modules/transaction-block/components/WizardStep'
import { useApproveERC20 } from '../hooks/useApproveERC20'
import { useSwap } from '../hooks/useSwap'
import { useSwitchToTokenChain } from '../hooks/useSwitchToTokenChain'
import type { IDepositWizardProperties } from '../interfaces'

export const OnchainSwap: React.FunctionComponent<IDepositWizardProperties> = ({}) => {
  const [currentStep, setCurrentStep] = useState(1)

  const { depositAsset, vault, inputValue: amount, setCurrentModal } = useTxStore()

  function incrementStep() {
    setCurrentStep((previousStep) => previousStep + 1)
  }

  const { status: switchStatus, switchChain } = useSwitchToTokenChain({
    chainId: 42_161, // Arb chain ID
    onSuccessHandler: incrementStep,
  })

  const { squid } = useSquidSDK()

  const tokenAddrForVault = useMemo(() => {
    const depositTokenAsset = squid?.tokens.find(
      (token) => token.symbol?.toLowerCase() === vault?.toLowerCase(),
    )
    return depositTokenAsset?.address!
  }, [squid?.tokens, vault])

  const { route, requestId } = useGetSquidSwapRoute({
    fromAmount: parseUnits(amount, depositAsset?.contract_decimals ?? 6).toString(),
    fromChain: '42161',
    fromToken: depositAsset?.contract_address as Address,
    toChain: '42161',
    toToken: tokenAddrForVault,
    enableBoost: true,
  })

  const {
    swapTokens: swapAndDeposit,
    status: swapAndDepositStatus,
    error: swapAndDepositError,
    depositHash,
  } = useSwap({
    route,
    requestId,
    onSuccessHandler: () => {
      setCurrentModal('done')
    },
  })

  const {
    approve: approveBeforeSwap,
    status: approveStatusBeforeSwap,
    error: approveErrorBeforeSwap,
  } = useApproveERC20({
    approveValue: parseUnits(amount, depositAsset?.contract_decimals ?? 6).toString(),
    tokenAddress: depositAsset?.contract_address as Address,
    transactionRequestTarget: route?.transactionRequest?.target,
    onSuccessHandler: incrementStep,
  })

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
          activeStep={currentStep === 1}
          title="Switch to Arbitrum"
          status={switchStatus}
        />
        <WizardStep
          icon={
            <TokenWithNetwork
              symbol={depositAsset?.contract_ticker_symbol}
              network="Arbitrum"
              width="2rem"
            />
          }
          activeStep={currentStep === 2}
          title="Approve"
          status={approveStatusBeforeSwap}
          showArrow
          error={approveErrorBeforeSwap?.message}
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
          <InfoBlock txHash={depositHash} className="mt-4" type="onChain" />
        )}
      </div>
      {ActionButton()}
    </div>
  )
}
