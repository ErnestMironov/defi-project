import ReceiveSquare from '@assets/icons/receive-square.svg'
import { TokenIconComponent } from '@components/token-icon'
import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import { Button } from '@components/ui/button'
import { CHAIN_NAMES_BY_ID } from '@constants/chains'
import { USDC_VAULT_ADDRESS, USDT_VAULT_ADDRESS } from '@constants/vaults'
import { WizardStep } from '@modules/transaction-block/components/WizardStep'
import { useTransactionStatus } from '@modules/transaction-block/hooks/useTransactionStatus'
import { useTxStore } from '@modules/transaction-block/store/useTxStore'
import { getButtonContent } from '@modules/transaction-block/utils/getButtonText'
import { cn } from '@utils/cn'
import { type Address, parseUnits } from 'viem'

import { InfoBlock } from '../components/InfoBlock'
import { useApproveERC20 } from '../hooks/useApproveERC20'
import { useDepositTransaction } from '../hooks/useDepositTransaction'
import { useSwitchToTokenChain } from '../hooks/useSwitchToTokenChain'
import type { IDepositWizardProperties } from '../interfaces'

export const SimpleDeposit: React.FunctionComponent<IDepositWizardProperties> = ({
  allStepsCompleted,
}) => {
  const {
    depositAsset: asset,
    inputValue: amount,
    vault,
    currentStep,
    setCurrentStep,
  } = useTxStore()

  const { status: switchStatus, switchChain } = useSwitchToTokenChain({
    chainId: asset?.chain_id,
    onSuccessHandler: () => {
      if (currentStep === 1) {
        setCurrentStep(2)
      }
    },
  })

  const vaultAddress = vault === 'USDC' ? USDC_VAULT_ADDRESS : USDT_VAULT_ADDRESS

  const { approve, status: approveStatus } = useApproveERC20({
    approveValue: parseUnits(amount, asset?.contract_decimals ?? 6).toString(),
    tokenAddress: asset?.contract_address as Address,
    transactionRequestTarget: vaultAddress,
    chainId: asset?.chain_id,
    onSuccessHandler: () => {
      if (currentStep === 2) {
        setCurrentStep(3)
      }
    },
  })

  const {
    deposit,
    status: _depositStatus,
    data: depositHash,
  } = useDepositTransaction({
    address: asset?.contract_address as Address,
    amount: BigInt(parseUnits(amount, asset?.contract_decimals ?? 6)),
  })

  const depositStatus = useTransactionStatus(_depositStatus)

  const ActionButton = () => {
    switch (currentStep) {
      case 1: {
        console.info('🚀 ~ SimpleDeposit ~ currentStep:', 'switch to Arbitrum')
        return (
          <Button
            disabled={switchStatus === 'confirm_in_wallet'}
            size="lg"
            type="button"
            onClick={switchChain}
          >
            {getButtonContent(
              switchStatus,
              `Switch to ${
                CHAIN_NAMES_BY_ID[asset?.chain_id as keyof typeof CHAIN_NAMES_BY_ID] ??
                'Unknown Chain'
              }`,
            )}
          </Button>
        )
      }
      case 2: {
        console.info('🚀 ~ SimpleDeposit ~ currentStep:', 'approve')
        return (
          <Button
            loading={approveStatus === 'pending'}
            size="lg"
            type="button"
            disabled={approveStatus === 'confirm_in_wallet'}
            onClick={approve}
          >
            {getButtonContent(approveStatus, `Approve ${asset?.contract_ticker_symbol}`)}
          </Button>
        )
      }
      case 3: {
        console.info('🚀 ~ SimpleDeposit ~ currentStep:', 'deposit')
        return (
          <Button
            loading={depositStatus === 'pending'}
            disabled={depositStatus === 'confirm_in_wallet'}
            size="lg"
            type="button"
            onClick={deposit}
          >
            {getButtonContent(depositStatus, 'Deposit')}
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
          icon={<TokenIconComponent width="2rem" symbol={asset?.chain_id} />}
          activeStep={currentStep === 1}
          title={`Switch to ${
            CHAIN_NAMES_BY_ID[asset?.chain_id as keyof typeof CHAIN_NAMES_BY_ID] ??
            'Unknown Chain'
          }`}
          status={allStepsCompleted ? 'success' : switchStatus}
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
          status={allStepsCompleted ? 'success' : approveStatus}
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
          <InfoBlock txHash={depositHash} className="mt-4" type="on_chain" />
        )}
      </div>
      {ActionButton()}
    </div>
  )
}
