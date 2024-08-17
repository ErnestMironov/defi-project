import { useGetSquidSwapRoute } from '@api/squid-router/useGetSquidSwapRoute'
import ReceiveSquare from '@assets/icons/receive-square.svg'
import { TokenIconComponent } from '@components/token-icon'
import { Button } from '@components/ui/button'
import { ARB_USDC, ARB_USDT } from '@constants/contract-address'
import { useTokenAsset } from '@hooks/useTokenAsset'
import { WizardStep } from '@modules/transaction-block/components/WizardStep'
import { useTxStore } from '@modules/transaction-block/store/useTxStore'
import { getButtonContent } from '@modules/transaction-block/utils/getButtonText'
import { cn } from '@utils/cn'
import { useMemo } from 'react'
import { type Address, parseUnits } from 'viem'

import { InfoBlock } from '../components/InfoBlock'
import { useSwap } from '../hooks/useSwap'
import { useSwitchToTokenChain } from '../hooks/useSwitchToTokenChain'
import type { IDepositWizardProperties } from '../interfaces'

export const NativeCrossChainSwap: React.FunctionComponent<
  IDepositWizardProperties
> = ({}) => {
  const {
    depositAsset,
    vault,
    inputValue: amount,
    setCurrentModal,
    currentStep,
    setCurrentStep,
  } = useTxStore()

  const depositAssetChain = useTokenAsset(depositAsset?.chain_id)

  const { status: switchToAssetChainStatus, switchChain: switchToAssetChain } =
    useSwitchToTokenChain({
      chainId: depositAssetChain?.chainId ?? 1,
      onSuccessHandler: () => setCurrentStep(currentStep + 1),
    })

  const tokenAddrForVault = useMemo(() => {
    return vault?.toLowerCase() === 'usdc' ? ARB_USDC : ARB_USDT
  }, [vault])

  const { route, requestId } = useGetSquidSwapRoute({
    fromAmount: parseUnits(amount, depositAsset?.contract_decimals ?? 6).toString(),
    fromChain: depositAssetChain?.chainId?.toString() ?? '1',
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

  const ActionButton = () => {
    switch (currentStep) {
      case 1: {
        return (
          <Button
            size="lg"
            type="button"
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
          icon={<TokenIconComponent width="2rem" symbol={depositAssetChain?.symbol} />}
          activeStep={currentStep === 1}
          title={`Switch to ${depositAssetChain?.name}`}
          status={switchToAssetChainStatus}
        />
        <WizardStep
          icon={<ReceiveSquare className={cn('size-8')} />}
          activeStep={currentStep === 2}
          error={swapAndDepositError}
          title={`Deposit ${vault}`}
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
