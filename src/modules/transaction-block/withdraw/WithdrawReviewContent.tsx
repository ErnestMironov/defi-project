import ReceiveSquare from '@assets/icons/receive-square.svg'
import { TokenIconComponent } from '@components/token-icon'
import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import { Button } from '@components/ui/button'
import { CHAIN_NAMES_BY_ID } from '@constants/chains'
import { parseFloatLocale } from '@utils/formatValue'
import { useEffect, useMemo } from 'react'
import { parseUnits } from 'viem'

import { WizardStep } from '../components/WizardStep'
import { useApproveERC20 } from '../deposit/hooks/useApproveERC20'
import { useSwitchToTokenChain } from '../deposit/hooks/useSwitchToTokenChain'
import { useTransactionStatus } from '../hooks/useTransactionStatus'
import { useTxStore } from '../store/useTxStore'
import { getButtonContent } from '../utils/getButtonText'
import { useWithdrawTransaction } from './hooks/useWithdrawTransaction'

export const WithdrawReviewContent = ({
  allStepsCompleted,
}: {
  allStepsCompleted?: boolean
}) => {
  const {
    inputValue: amount,
    withdrawAmount: withdrawAmountInUSD,
    mtToken,
    currentStep,
    setCurrentStep,
    setCurrentModal,
  } = useTxStore()

  const { status: switchStatus, switchChain } = useSwitchToTokenChain({
    chainId: mtToken?.chainData?.chainId ?? 1,
    onSuccessHandler: () => {
      if (currentStep <= 1) {
        setCurrentStep(2)
      }
    },
  })

  const {
    approve,
    status: approveStatus,
    error: approveError,
  } = useApproveERC20({
    approveValue: parseUnits(amount, 6).toString(),
    tokenAddress: mtToken?.mtAddress,
    transactionRequestTarget: mtToken?.mtAddress,
    chainId: mtToken?.chainData?.chainId,
    onSuccessHandler: () => {
      if (currentStep === 2) {
        setCurrentStep(3)
      }
    },
  })

  const {
    withdraw,
    status: currentWithdrawStatus,
    error: withdrawError,
  } = useWithdrawTransaction()

  const withdrawStatus = useTransactionStatus(currentWithdrawStatus)

  useEffect(() => {
    if (withdrawStatus === 'success') {
      setCurrentModal('done')
    }
  }, [setCurrentModal, withdrawStatus])

  const ActionButton = useMemo(() => {
    switch (currentStep) {
      case 1: {
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
                CHAIN_NAMES_BY_ID[
                  mtToken?.chainData?.chainId as keyof typeof CHAIN_NAMES_BY_ID
                ]
              }`,
            )}
          </Button>
        )
      }
      case 2: {
        return (
          <Button
            loading={approveStatus === 'pending'}
            size="lg"
            type="button"
            disabled={approveStatus === 'confirm_in_wallet'}
            onClick={approve}
          >
            {getButtonContent(approveStatus, `Approve ${mtToken?.symbol}`)}
          </Button>
        )
      }
      case 3: {
        return (
          <Button
            loading={withdrawStatus === 'pending'}
            size="lg"
            type="button"
            disabled={withdrawStatus === 'pending' || withdrawStatus === 'success'}
            onClick={withdraw}
          >
            {getButtonContent(withdrawStatus, 'Withdraw')}
          </Button>
        )
      }
      default: {
        throw new Error('unknown action type')
      }
    }
  }, [
    currentStep,
    switchStatus,
    approveStatus,
    withdrawStatus,
    mtToken,
    switchChain,
    approve,
    withdraw,
  ])

  return (
    <div className="flex flex-col items-stretch gap-10">
      <div className="flex w-full flex-col items-start gap-2 self-stretch rounded-2xl border border-stroke-100 p-6 text-[1.125rem]">
        <div className="flex w-full items-center justify-between">
          <span className="text-text-80">You withdraw</span>
          <div className="flex items-center gap-2">
            <TokenWithNetwork
              symbol={mtToken?.symbol}
              network={mtToken?.chainData?.chainId}
              position="bottom-right"
              width="2.14288rem"
            />
            <span>
              {amount} {mtToken?.symbol}
            </span>
          </div>
        </div>
        <p className="self-end text-base text-gray-100">
          $ {parseFloatLocale(withdrawAmountInUSD)}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <WizardStep
          icon={<TokenIconComponent width="2rem" symbol={mtToken?.chainData?.chainId} />}
          activeStep={currentStep === 1}
          title={`Switch network to ${
            CHAIN_NAMES_BY_ID[
              mtToken?.chainData?.chainId as keyof typeof CHAIN_NAMES_BY_ID
            ]
          }`}
          status={allStepsCompleted ? 'success' : switchStatus}
        />                                                                
        <WizardStep
          icon={
            <TokenWithNetwork
              symbol={mtToken?.symbol}
              network={mtToken?.chainData?.chainId}
              width="2rem"
            />
          }
          activeStep={currentStep === 2}
          title={`Approve ${mtToken?.symbol} spending`}
          status={allStepsCompleted ? 'success' : approveStatus}
          error={approveError?.message}
          showArrow
        />
        <WizardStep
          icon={<ReceiveSquare className="size-8" />}
          activeStep={currentStep === 3}
          title={`Withdraw ${mtToken?.symbol}`}
          status={withdrawStatus}
          error={withdrawError?.message}
          showArrow
        />
      </div>
      {ActionButton}
    </div>
  )
}
