import DepositIcon from '@assets/icons/deposit.svg'
import { TokenIconComponent } from '@components/token-icon'
import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import { Button } from '@components/ui/button'
import { CHAIN_NAMES_BY_ID } from '@constants/chains'
import { USDC_VAULT_ADDRESS, USDT_VAULT_ADDRESS } from '@constants/vaults'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { WizardDropDown } from '@modules/transaction-block/components/WizardDropDown'
import { WizardStep } from '@modules/transaction-block/components/WizardStep'
import { useTransactionStatus } from '@modules/transaction-block/hooks/useTransactionStatus'
import { useTxStore } from '@modules/transaction-block/store/useTxStore'
import { getButtonContent } from '@modules/transaction-block/utils/getButtonText'
import { cn } from '@utils/cn'
import { useEffect, useState } from 'react'
import { type Address, parseUnits } from 'viem'

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
    setIntermediateError,
  } = useTxStore()

  const [isOpen, setIsOpen] = useState(false)

  const { isBelowDesktop } = useDeviceWidth()

  const {
    status: switchStatus,
    error: switchError,
    switchChain,
  } = useSwitchToTokenChain({
    chainId: asset?.chain_id,
    onSuccessHandler: () => {
      if (currentStep === 1) {
        setCurrentStep(2)
      }
    },
  })

  const vaultAddress = vault === 'USDC' ? USDC_VAULT_ADDRESS : USDT_VAULT_ADDRESS

  const {
    approve,
    status: approveStatus,
    error: approveError,
  } = useApproveERC20({
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
    error: depositError,
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
            className="rounded-2xl max-lg:py-6"
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
            className="rounded-2xl max-lg:py-6"
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
            className="rounded-2xl max-lg:py-6"
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

  useEffect(() => {
    if (depositStatus === 'error') {
      setIntermediateError(depositError?.message ?? 'Unknown error')
    }

    if (approveStatus === 'error') {
      setIntermediateError(approveError?.message ?? 'Unknown error')
    }

    if (switchStatus === 'error') {
      setIntermediateError(switchError ?? 'Unknown error')
    }
  }, [
    depositStatus,
    approveStatus,
    switchStatus,
    setIntermediateError,
    depositError?.message,
    approveError?.message,
    switchError,
  ])

  return (
    <div className="flex flex-col items-stretch gap-6 lg:gap-8">
      {!isBelowDesktop && (
        <div className="flex w-full flex-col items-stretch px-8">
          <ActionButton />
        </div>
      )}
      <div className="border-stroke-100 lg:border-t lg:px-8 lg:pt-7">
        <WizardDropDown open={isOpen} setOpen={setIsOpen} activeStep={currentStep}>
          <WizardStep
            icon={<TokenIconComponent width="2.625rem" symbol={asset?.chain_id} />}
            title={`Switch to ${
              CHAIN_NAMES_BY_ID[asset?.chain_id as keyof typeof CHAIN_NAMES_BY_ID] ??
              'Unknown Chain'
            }`}
            status={allStepsCompleted ? 'success' : switchStatus}
            stepNumber={1}
            maxStepNumber={3}
          />
          <WizardStep
            icon={
              <TokenWithNetwork
                symbol={asset?.contract_ticker_symbol}
                network={asset?.chain_id}
                width="2rem"
              />
            }
            title="Approve"
            status={allStepsCompleted ? 'success' : approveStatus}
            isDDOpen={isOpen}
            stepNumber={2}
            maxStepNumber={3}
          />
          <WizardStep
            icon={<DepositIcon className={cn('size-8')} />}
            title={`Deposit ${vault}`}
            status={depositStatus}
            isDDOpen={isOpen}
            stepNumber={3}
            maxStepNumber={3}
          />
        </WizardDropDown>
      </div>
      {isBelowDesktop && <ActionButton />}
    </div>
  )
}
