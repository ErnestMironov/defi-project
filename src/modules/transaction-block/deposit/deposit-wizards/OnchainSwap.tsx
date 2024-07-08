import { useGetSquidSwapRoute } from '@api/squid-router/useGetSquidSwapRoute'
import useSquidSDK from '@api/squid-router/useSquidSdk'
import { useSwap } from '@api/squid-router/useSwap'
import ArrangeSquare from '@assets/icons/arrange-square.svg'
import EmptyWalletSquare from '@assets/icons/empty-wallet-square.svg'
import ReceiveSquare from '@assets/icons/receive-square.svg'
import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import { Button } from '@components/ui/button'
import { ARB_GATEWAY } from '@constants/contract-address'
import { useTxStore } from '@modules/transaction-block/store/useDepositStore'
import { cn } from '@utils/cn'
import { useMemo, useState } from 'react'
import { type Address, parseUnits } from 'viem'

import { WizardStep } from '../components/WizardStep'
import { useApproveERC20 } from '../hooks/useApproveERC20'
import { useDepositTransaction } from '../hooks/useDepositTransaction'
import { useSwitchToTokenChain } from '../hooks/useSwitchToTokenChain'
import type { IDepositWizardProperties } from '../interfaces'

export const OnchainSwap: React.FunctionComponent<IDepositWizardProperties> = ({
  successDepositHandler,
}) => {
  const [currentStep, setCurrentStep] = useState(1)

  const { depositAsset, vault, inputValue: amount } = useTxStore()

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
    fromAmount: parseUnits(amount, depositAsset?.contract_decimals ?? 6).toString(),
    fromChain: '42161',
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
    transactionRequestTarget: ARB_GATEWAY,
    onSuccessHandler: incrementStep,
  })
  console.log(
    '🚀 ~ amount, depositAsset?.contract_decimals:',
    amount,
    depositAsset?.contract_decimals,
  )

  const {
    approve: approveAfterSwap,
    status: approveStatusAfterSwap,
    error: approveErrorAfterSwap,
  } = useApproveERC20({
    approveValue: route?.estimate?.toAmount ?? '10',
    tokenAddress: tokenAddrForVault as Address,
    transactionRequestTarget: ARB_GATEWAY,
    onSuccessHandler: incrementStep,
  })

  const {
    swapTokens,
    status: swapStatus,
    error: swapError,
  } = useSwap({
    route,
    requestId,
    onSuccessHandler: incrementStep,
  })

  const { deposit, status: depositStatus } = useDepositTransaction({
    address: tokenAddrForVault?.toLowerCase() as Address,
    amount: BigInt(route?.estimate?.toAmount ?? 10_000),
  })

  const ActionButton = () => {
    switch (currentStep) {
      case 1: {
        console.info('��� ~ SimpleDeposit ~ currentStep:', 'switch to Arbitrum')
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
        console.info('��� ~ SimpleDeposit ~ currentStep:', 'approve')
        return (
          <Button
            size="lg"
            type="button"
            onClick={approveBeforeSwap}
            disabled={approveStatusBeforeSwap === 'pending'}
          >
            {swapStatus === 'error' ? 'Try Again' : 'Approve'}
          </Button>
        )
      }
      case 3: {
        console.info('��� ~ SimpleDeposit ~ currentStep:', 'approve')
        return (
          <Button
            size="lg"
            type="button"
            onClick={swapTokens}
            disabled={swapStatus === 'pending'}
          >
            {swapStatus === 'error' ? 'Try Again' : 'Swap'}
          </Button>
        )
      }
      case 4: {
        console.info('��� ~ SimpleDeposit ~ currentStep:', 'approve')
        return (
          <Button
            size="lg"
            type="button"
            onClick={approveAfterSwap}
            disabled={approveStatusAfterSwap === 'pending'}
          >
            {approveStatusAfterSwap === 'error' ? 'Try Again' : 'Approve'}
          </Button>
        )
      }
      case 5: {
        console.info('��� ~ SimpleDeposit ~ currentStep:', 'deposit')
        return (
          <Button
            size="lg"
            type="button"
            onClick={deposit}
            disabled={depositStatus === 'pending'}
          >
            {depositStatus === 'error' ? 'Try Again' : 'Deposit'}
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
          icon={<ArrangeSquare className={cn('size-8')} />}
          activeStep={currentStep === 3}
          title="Swap"
          status={swapStatus}
          showArrow
          error={swapError}
        />
        <WizardStep
          icon={
            <TokenWithNetwork
              symbol={vault.toLowerCase()}
              network="Arbitrum"
              width="2rem"
            />
          }
          activeStep={currentStep === 4}
          title="Approve"
          status={approveStatusAfterSwap}
          error={approveErrorAfterSwap?.message}
          showArrow
        />
        <WizardStep
          icon={<ReceiveSquare className={cn('size-8')} />}
          activeStep={currentStep === 5}
          title="Deposit"
          status={depositStatus}
          showArrow
        />
      </div>
      {ActionButton()}
    </div>
  )
}
