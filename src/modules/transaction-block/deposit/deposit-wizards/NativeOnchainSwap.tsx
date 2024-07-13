import { useGetSquidSwapRoute } from '@api/squid-router/useGetSquidSwapRoute'
import useSquidSDK from '@api/squid-router/useSquidSdk'
import { useSwap } from '@api/squid-router/useSwap'
import EmptyWalletSquare from '@assets/icons/empty-wallet-square.svg'
import ReceiveSquare from '@assets/icons/receive-square.svg'
import { Button } from '@components/ui/button'
import { useTxStore } from '@modules/transaction-block/store/useDepositStore'
import { cn } from '@utils/cn'
import { useMemo, useState } from 'react'
import { parseEther } from 'viem'

import { WizardStep } from '../components/WizardStep'
import { useSwitchToTokenChain } from '../hooks/useSwitchToTokenChain'
import type { IDepositWizardProperties } from '../interfaces'

export const NativeOnchainSwap: React.FunctionComponent<
  IDepositWizardProperties
> = ({}) => {
  const [currentStep, setCurrentStep] = useState(1)

  const { vault, inputValue: amount } = useTxStore()

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
      (token) => token.symbol?.toLowerCase() === vault.toLowerCase(),
    )
    return depositTokenAsset?.address!
  }, [squid?.tokens, vault])

  const { route, requestId } = useGetSquidSwapRoute({
    fromAmount: parseEther(amount).toString(),
    fromChain: '42161',
    fromToken: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    toChain: '42161',
    toToken: tokenAddrForVault,
    enableBoost: true,
  })
  console.log('🚀 ~ route:', route)

  const {
    swapTokens: swapAndDeposit,
    status: swapAndDepositStatus,
    error: swapAndDepositError,
  } = useSwap({
    route,
    requestId,
    onSuccessHandler: incrementStep,
  })

  const ActionButton = () => {
    switch (currentStep) {
      case 1: {
        console.info('��� ~ NAtiveOnChainSwap ~ currentStep:', 'switch to Arbitrum')
        return (
          <Button
            size="lg"
            type="button"
            onClick={switchChain}
            disabled={switchStatus === 'pending'}
          >
            {switchStatus === 'error' ? 'Try Again' : 'Switch to Arbitrum'}
          </Button>
        )
      }

      case 2: {
        console.info('��� ~ NAtiveOnChainSwap ~ currentStep:', 'deposit')
        return (
          <Button
            size="lg"
            type="button"
            onClick={swapAndDeposit}
            disabled={swapAndDepositStatus === 'pending'}
          >
            {swapAndDepositStatus === 'error' ? 'Try Again' : 'Switch to Arbitrum'}
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
          icon={<EmptyWalletSquare className={cn('size-8')} />}
          activeStep={currentStep === 1}
          title="Switch to Arbitrum"
          status={switchStatus}
        />
        <WizardStep
          icon={<ReceiveSquare className={cn('size-8')} />}
          activeStep={currentStep === 2}
          title="Deposit"
          status={swapAndDepositStatus}
          error={swapAndDepositError}
          showArrow
        />
      </div>
      {ActionButton()}
    </div>
  )
}
