import { useGetSquidSwapRoute } from '@api/squid-router/useGetSquidSwapRoute'
import useSquidSDK from '@api/squid-router/useSquidSdk'
import ReceiveSquare from '@assets/icons/receive-square.svg'
import { TokenIconComponent } from '@components/token-icon'
import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import { Button } from '@components/ui/button'
import { useTokenAsset } from '@hooks/useTokenAsset'
import { WizardStep } from '@modules/transaction-block/components/WizardStep'
import { useTxStore } from '@modules/transaction-block/store/useTxStore'
import { getButtonContent } from '@modules/transaction-block/utils/getButtonText'
import { cn } from '@utils/cn'
import { useMemo } from 'react'
import { type Address, parseUnits } from 'viem'

import { InfoBlock } from '../components/InfoBlock'
import { useApproveERC20 } from '../hooks/useApproveERC20'
import { useSwap } from '../hooks/useSwap'
import { useSwitchToTokenChain } from '../hooks/useSwitchToTokenChain'
import type { IDepositWizardProperties } from '../interfaces'

export const CrossChainSwap: React.FunctionComponent<IDepositWizardProperties> = ({
  allStepsCompleted,
}) => {
  const {
    depositAsset,
    vault,
    inputValue: amount,
    setCurrentModal,
    currentStep,
    setCurrentStep,
  } = useTxStore()

  function incrementStep() {
    setCurrentStep(currentStep + 1)
  }

  const depositAssetChain = useTokenAsset(depositAsset?.chain_id)

  const { status: switchToAssetChainStatus, switchChain: switchToAssetChain } =
    useSwitchToTokenChain({
      chainId: depositAssetChain?.chainId ?? 1,
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
    fromChain: depositAssetChain?.chainId?.toString() ?? '1',
    fromToken: depositAsset?.contract_address as Address,
    toChain: '42161',
    toToken: tokenAddrForVault,
    enableBoost: true,
  })

  const {
    approve,
    status: approveStatus,
    error: approveError,
  } = useApproveERC20({
    approveValue: parseUnits(amount, depositAsset?.contract_decimals ?? 6).toString(),
    tokenAddress: depositAsset?.contract_address as Address,
    transactionRequestTarget: route?.transactionRequest?.target,
    chainId: depositAssetChain?.chainId,
    onSuccessHandler: incrementStep,
  })

  console.log('approve status', approveStatus)

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
            onClick={() => {
              switchToAssetChain()
            }}
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
            onClick={approve}
            disabled={approveStatus === 'pending'}
          >
            {getButtonContent(
              approveStatus,
              `Approve ${depositAsset?.contract_ticker_symbol}`,
            )}
          </Button>
        )
      }
      case 3: {
        return (
          <Button
            size="lg"
            type="button"
            onClick={swapAndDeposit}
            disabled={swapAndDepositStatus === 'pending'}
          >
            {getButtonContent(swapAndDepositStatus, `Deposit ${vault}`)}
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
          status={allStepsCompleted ? 'success' : switchToAssetChainStatus}
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
          status={allStepsCompleted ? 'success' : approveStatus}
          error={approveError?.message}
          showArrow
        />
        <WizardStep
          icon={<ReceiveSquare className={cn('size-8')} />}
          activeStep={currentStep === 3}
          title={`Deposit ${vault}`}
          error={swapAndDepositError}
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
