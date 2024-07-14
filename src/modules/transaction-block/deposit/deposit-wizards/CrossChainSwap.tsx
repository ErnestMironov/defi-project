import { useGetSquidSwapRoute } from '@api/squid-router/useGetSquidSwapRoute'
import useSquidSDK from '@api/squid-router/useSquidSdk'
import { useSwap } from '@api/squid-router/useSwap'
import EmptyWalletSquare from '@assets/icons/empty-wallet-square.svg'
import ReceiveSquare from '@assets/icons/receive-square.svg'
import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import { Button } from '@components/ui/button'
import { useTokenAsset } from '@hooks/useTokenAsset'
import { useTxStore } from '@modules/transaction-block/store/useDepositStore'
import { cn } from '@utils/cn'
import { useMemo, useState } from 'react'
import { type Address, parseUnits } from 'viem'

import { WizardStep } from '../components/WizardStep'
import { useApproveERC20 } from '../hooks/useApproveERC20'
import { useSwitchToTokenChain } from '../hooks/useSwitchToTokenChain'
import type { IDepositWizardProperties } from '../interfaces'

export const CrossChainSwap: React.FunctionComponent<IDepositWizardProperties> = ({}) => {
  const [currentStep, setCurrentStep] = useState(1)

  const {
    depositAsset,
    vault,
    inputValue: amount,
    setDepositAmount,
    setCurrentModal,
  } = useTxStore()

  function incrementStep() {
    setCurrentStep((previousStep) => previousStep + 1)
  }

  const depositAssetChain = useTokenAsset(depositAsset?.chain_id)

  const { status: switchToAssetChainStatus, switchChain: switchToAssetChain } =
    useSwitchToTokenChain({
      chainId: depositAssetChain?.chainId ?? 1, // Arb chain ID
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
    fromAmount: parseUnits(amount, depositAsset?.contract_decimals ?? 6).toString(),
    fromChain: depositAssetChain?.chainId?.toString() ?? '1',
    fromToken: depositAsset?.contract_address as Address,
    toChain: '42161',
    toToken: tokenAddrForVault,
    enableBoost: true,
  })
  console.log('🚀 ~ route:', route)
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

  const {
    swapTokens: swapAndDeposit,
    status: swapAndDepositStatus,
    error: swapAndDepositError,
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
          '��� ~ CrossChainSwap ~ currentStep:',
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
        console.info('��� ~ CrossChainSwap ~ currentStep:', 'approve')
        return (
          <Button
            size="lg"
            type="button"
            onClick={approveBeforeSwap}
            disabled={approveStatusBeforeSwap === 'pending'}
          >
            {approveStatusBeforeSwap === 'error' ? 'Try Again' : 'Approve'}
          </Button>
        )
      }
      case 3: {
        console.info('��� ~ CrossChainSwap ~ currentStep:', 'deposit')
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
          icon={
            <TokenWithNetwork
              symbol={depositAsset?.contract_ticker_symbol}
              network={depositAssetChain?.symbol}
              width="2rem"
            />
          }
          activeStep={currentStep === 2}
          title="Approve"
          status={approveStatusBeforeSwap}
          error={approveErrorBeforeSwap?.message}
          showArrow
        />
        <WizardStep
          icon={<ReceiveSquare className={cn('size-8')} />}
          activeStep={currentStep === 3}
          title="Deposit"
          error={swapAndDepositError}
          status={swapAndDepositStatus}
          showArrow
        />
      </div>
      {ActionButton()}
    </div>
  )
}
