import EmptyWalletSquare from '@assets/icons/empty-wallet-square.svg'
import ReceiveSquare from '@assets/icons/receive-square.svg'
import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import { Button } from '@components/ui/button'
import { ARB_GATEWAY } from '@constants/contract-address'
import { useTxStore } from '@modules/transaction-block/store/useDepositStore'
import { cn } from '@utils/cn'
import { useState } from 'react'
import { type Address, parseUnits } from 'viem'

import { WizardStep } from '../components/WizardStep'
import { useApproveERC20 } from '../hooks/useApproveERC20'
import { useDepositTransaction } from '../hooks/useDepositTransaction'
import { useSwitchToTokenChain } from '../hooks/useSwitchToTokenChain'
import type { IDepositWizardProperties } from '../interfaces'

export const SimpleDeposit: React.FunctionComponent<IDepositWizardProperties> = ({}) => {
  const [currentStep, setCurrentStep] = useState(1)

  const { depositAsset: asset, inputValue: amount } = useTxStore()

  function incrementStep() {
    setCurrentStep((previousStep) => previousStep + 1)
  }

  const { status: switchStatus, switchChain } = useSwitchToTokenChain({
    chainId: 42_161, // Arb chain ID
    onSuccessHandler: incrementStep,
  })

  const { approve, status: approveStatus } = useApproveERC20({
    approveValue: parseUnits(amount, 6).toString(),
    tokenAddress: asset?.contract_address as Address,
    transactionRequestTarget: ARB_GATEWAY,
    onSuccessHandler: incrementStep,
  })

  const { deposit, status: depositStatus } = useDepositTransaction({
    address: asset?.contract_address as Address,
    amount: BigInt(parseUnits(amount, 6)),
  })

  const ActionButton = () => {
    switch (currentStep) {
      case 1: {
        console.info('��� ~ SimpleDeposit ~ currentStep:', 'switch to Arbitrum')
        return (
          <Button size="lg" type="button" onClick={switchChain}>
            Switch to Arbitrum
          </Button>
        )
      }
      case 2: {
        console.info('��� ~ SimpleDeposit ~ currentStep:', 'approve')
        return (
          <Button size="lg" type="button" onClick={approve}>
            Approve
          </Button>
        )
      }
      case 3: {
        console.info('��� ~ SimpleDeposit ~ currentStep:', 'deposit')
        return (
          <Button size="lg" type="button" onClick={deposit}>
            Deposit
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
              symbol={asset?.contract_ticker_symbol}
              network={asset?.chain_id}
              width="2rem"
            />
          }
          activeStep={currentStep === 2}
          title="Approve"
          status={approveStatus}
          showArrow
        />
        <WizardStep
          icon={<ReceiveSquare className={cn('size-8')} />}
          activeStep={currentStep === 3}
          title="Deposit"
          status={depositStatus}
          showArrow
        />
      </div>
      {ActionButton()}
    </div>
  )
}
