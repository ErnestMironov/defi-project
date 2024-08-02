import ReceiveSquare from '@assets/icons/receive-square.svg'
import { TokenIconComponent } from '@components/token-icon'
import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import { Button } from '@components/ui/button'
import { CHAIN_IDS_BY_NAME } from '@constants/chains'
import { ARB_GATEWAY } from '@constants/contract-address'
import { useTxStore } from '@modules/transaction-block/store/useDepositStore'
import { cn } from '@utils/cn'
import { useState } from 'react'
import { type Address, parseUnits } from 'viem'

import { InfoBlock } from '../components/InfoBlock'
import { WizardStep } from '../components/WizardStep'
import { useApproveERC20 } from '../hooks/useApproveERC20'
import { useDepositTransaction } from '../hooks/useDepositTransaction'
import { useSwitchToTokenChain } from '../hooks/useSwitchToTokenChain'
import type { IDepositWizardProperties } from '../interfaces'

export const SimpleDeposit: React.FunctionComponent<IDepositWizardProperties> = ({}) => {
  const [currentStep, setCurrentStep] = useState(1)

  const { depositAsset: asset, inputValue: amount, vault } = useTxStore()

  function incrementStep() {
    setCurrentStep((previousStep) => previousStep + 1)
  }

  const { status: switchStatus, switchChain } = useSwitchToTokenChain({
    chainId: 42_161, // Arb chain ID
    onSuccessHandler: incrementStep,
  })
  console.log('🚀 ~ switchStatus:', switchStatus)

  const { approve, status: approveStatus } = useApproveERC20({
    approveValue: parseUnits(amount, 6).toString(),
    tokenAddress: asset?.contract_address as Address,
    transactionRequestTarget: ARB_GATEWAY,
    onSuccessHandler: incrementStep,
  })

  const {
    deposit,
    status: depositStatus,
    data: depositHash,
  } = useDepositTransaction({
    address: asset?.contract_address as Address,
    amount: BigInt(parseUnits(amount, 6)),
  })

  const ActionButton = () => {
    switch (currentStep) {
      case 1: {
        console.info('��� ~ SimpleDeposit ~ currentStep:', 'switch to Arbitrum')
        return (
          <Button
            disabled={switchStatus === 'confirm_in_wallet'}
            size="lg"
            type="button"
            onClick={switchChain}
          >
            {switchStatus === 'confirm_in_wallet'
              ? 'Confirm in wallet'
              : 'Switch to Arbitrum'}
          </Button>
        )
      }
      case 2: {
        console.info('��� ~ SimpleDeposit ~ currentStep:', 'approve')
        return (
          <Button
            loading={approveStatus === 'pending'}
            size="lg"
            type="button"
            disabled={approveStatus === 'confirm_in_wallet'}
            onClick={approve}
          >
            {approveStatus === 'confirm_in_wallet' ? 'Confirm in wallet' : 'Approve'}
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
          icon={<TokenIconComponent width="2rem" symbol={CHAIN_IDS_BY_NAME.Arbitrum} />}
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
          title={`Deposit ${vault}`}
          status={depositStatus}
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
