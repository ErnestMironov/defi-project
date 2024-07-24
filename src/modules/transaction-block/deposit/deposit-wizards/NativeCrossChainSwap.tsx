import { useGetSquidSwapRoute } from '@api/squid-router/useGetSquidSwapRoute'
import EmptyWalletSquare from '@assets/icons/empty-wallet-square.svg'
import ReceiveSquare from '@assets/icons/receive-square.svg'
import { Button } from '@components/ui/button'
import { ARB_USDC, ARB_USDT } from '@constants/contract-address'
import { useTokenAsset } from '@hooks/useTokenAsset'
import { useTxStore } from '@modules/transaction-block/store/useDepositStore'
import { cn } from '@utils/cn'
import { useMemo, useState } from 'react'
import { type Address, parseUnits } from 'viem'

import { InfoBlock } from '../components/InfoBlock'
import { WizardStep } from '../components/WizardStep'
import { useSwap } from '../hooks/useSwap'
import { useSwitchToTokenChain } from '../hooks/useSwitchToTokenChain'
import type { IDepositWizardProperties } from '../interfaces'

export const NativeCrossChainSwap: React.FunctionComponent<
  IDepositWizardProperties
> = ({}) => {
  const [currentStep, setCurrentStep] = useState(1)

  const { depositAsset, vault, inputValue: amount, setCurrentModal } = useTxStore()

  function incrementStep() {
    setCurrentStep((previousStep) => previousStep + 1)
  }

  const depositAssetChain = useTokenAsset(depositAsset?.chain_id)

  const { status: switchToAssetChainStatus, switchChain: switchToAssetChain } =
    useSwitchToTokenChain({
      chainId: depositAssetChain?.chainId ?? 1, // Arb chain ID
      onSuccessHandler: incrementStep,
    })

  const tokenAddrForVault = useMemo(() => {
    return vault?.toLowerCase() === 'usdc' ? ARB_USDC : ARB_USDT
  }, [vault])
  console.log('🚀 ~ tokenAddrForVault ~ tokenAddrForVault:', tokenAddrForVault)

  const { route, requestId } = useGetSquidSwapRoute({
    fromAmount: parseUnits(amount, depositAsset?.contract_decimals ?? 6).toString(),
    fromChain: depositAssetChain?.chainId?.toString() ?? '1',
    fromToken: depositAsset?.contract_address as Address,
    toChain: '42161',
    toToken: tokenAddrForVault,
    enableBoost: true,
  })
  console.log('🚀 ~ route:', route)

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

  const ActionButton = () => {
    switch (currentStep) {
      case 1: {
        console.info(
          '��� ~ NativeCrossChainSwap ~ currentStep:',
          `Switch to ${depositAssetChain?.name}`,
        )
        return (
          <Button
            size="lg"
            type="button"
            onClick={switchToAssetChain}
            disabled={switchToAssetChainStatus === 'pending'}
          >
            {switchToAssetChainStatus === 'error'
              ? 'Try Again'
              : `Switch to ${depositAssetChain?.name}`}
          </Button>
        )
      }
      case 2: {
        console.info('��� ~ NativeCrossChainSwap ~ currentStep:', 'deposit')
        return (
          <Button
            size="lg"
            type="button"
            onClick={swapAndDeposit}
            disabled={swapAndDepositStatus === 'pending'}
          >
            {swapAndDepositStatus === 'error' ? 'Try Again' : 'Deposit'}
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
          title={`Switch to ${depositAssetChain?.name}`}
          status={switchToAssetChainStatus}
        />
        <WizardStep
          icon={<ReceiveSquare className={cn('size-8')} />}
          activeStep={currentStep === 2}
          error={swapAndDepositError}
          title="Deposit"
          status={swapAndDepositStatus}
          showArrow
        />
        {depositHash && (
          <InfoBlock txHash={depositHash} className="mt-4" type="crossChain" />
        )}
      </div>
      {ActionButton()}
    </div>
  )
}
