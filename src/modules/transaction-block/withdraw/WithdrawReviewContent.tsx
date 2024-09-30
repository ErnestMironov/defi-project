import WithdrawIcon from '@assets/icons/withdraw.svg'
import { TokenIconComponent } from '@components/token-icon'
import { Button } from '@components/ui/button'
import { CHAIN_NAMES_BY_ID } from '@constants/chains'
import BigNumber from 'bignumber.js'
import { useEffect, useMemo, useState } from 'react'
import { parseUnits } from 'viem'

import { TxReviewInfo } from '../components/TxReviewInfo'
import { WizardDropDown } from '../components/WizardDropDown'
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
    withdrawFromNetwork,
    withdrawToNetwork,
    setIntermediateError,
    setCurrentStep,
    setCurrentModal,
  } = useTxStore()

  const [isOpen, setIsOpen] = useState(false)

  const inputValueInMtToken = useMemo(() => {
    const parsedAmount = parseUnits(amount, mtToken?.decimals ?? 6)

    const inputValueBN = new BigNumber(parsedAmount.toString())
    const lpBalanceBN = new BigNumber(mtToken?.balance?.toString() ?? 0)
    const balanceBN = new BigNumber(mtToken?.stableBalance?.toString() ?? 0)

    if (
      inputValueBN.isZero() ||
      lpBalanceBN.isZero() ||
      balanceBN.isZero() ||
      inputValueBN.isNaN() ||
      lpBalanceBN.isNaN() ||
      balanceBN.isNaN()
    ) {
      return '0'
    }

    return inputValueBN.multipliedBy(lpBalanceBN).div(balanceBN).toFixed(0)
  }, [amount, mtToken?.balance, mtToken?.decimals, mtToken?.stableBalance])
  console.log('🚀 ~ inputValueInMtToken ~ inputValueInMtToken:', inputValueInMtToken)

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
    approveValue: inputValueInMtToken,
    tokenAddress: mtToken?.address,
    transactionRequestTarget: mtToken?.address,
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
  } = useWithdrawTransaction({
    amount: inputValueInMtToken,
  })

  const withdrawStatus = useTransactionStatus(currentWithdrawStatus)

  // Add this function to check if any status is pending
  const isAnyStatusPending = (): boolean => {
    return [switchStatus, approveStatus, withdrawStatus].includes('pending')
  }

  useEffect(() => {
    if (withdrawStatus === 'success') {
      setCurrentModal('done')
    }

    if (withdrawStatus === 'error') {
      setCurrentModal('error')
    }
  }, [setCurrentModal, withdrawStatus])

  useEffect(() => {
    if (approveError || withdrawError || switchStatus === 'error') {
      setIntermediateError(
        approveError?.message || withdrawError?.message || switchStatus,
      )
    }
  }, [approveError, withdrawError, switchStatus, setIntermediateError])
  const ActionButton = useMemo(() => {
    function handleTryAgain(callback: () => void) {
      setIntermediateError(null)
      callback()
    }

    switch (currentStep) {
      case 1: {
        return (
          <Button
            disabled={switchStatus === 'confirm_in_wallet'}
            size="lg"
            type="button"
            onClick={() => handleTryAgain(switchChain)}
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
            onClick={() => handleTryAgain(approve)}
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
            onClick={() => handleTryAgain(withdraw)}
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
    setIntermediateError,
    switchStatus,
    mtToken?.chainData?.chainId,
    mtToken?.symbol,
    switchChain,
    approveStatus,
    approve,
    withdrawStatus,
    withdraw,
  ])

  const isCrossChain = withdrawFromNetwork !== withdrawToNetwork

  const WithdrawInfo = () => {
    switch (isCrossChain) {
      case true: {
        return (
          <TxReviewInfo
            playAnimation={isAnyStatusPending()}
            items={[
              {
                label: 'Withdraw',
                value: amount,
                usdValue: withdrawAmountInUSD,
                tokenData: {
                  symbol: mtToken?.stable ?? '',
                  network: withdrawFromNetwork ?? 1,
                },
              },
              {
                label: 'Receive',
                value: amount,
                usdValue: withdrawAmountInUSD,
                tokenData: {
                  symbol: mtToken?.stable ?? '',
                  network: withdrawToNetwork ?? 1,
                },
              },
            ]}
          />
        )
      }
      case false: {
        return (
          <TxReviewInfo
            playAnimation={isAnyStatusPending()}
            items={[
              {
                label: 'Withdraw',
                value: amount,
                usdValue: withdrawAmountInUSD,
                tokenData: {
                  symbol: mtToken?.stable ?? '',
                  network: withdrawFromNetwork ?? 1,
                },
              },
            ]}
          />
        )
      }
      default: {
        throw new Error('unknown action type')
      }
    }
  }

  return (
    <div className="flex flex-col items-stretch gap-8">
      <div className="flex flex-col items-stretch gap-8 px-8">
        <WithdrawInfo />

        {ActionButton}
      </div>

      <div className="border-t border-stroke-100 px-8 pt-7">
        <WizardDropDown open={isOpen} setOpen={setIsOpen} activeStep={currentStep}>
          <WizardStep
            icon={
              <TokenIconComponent width="2.625rem" symbol={mtToken?.chainData?.chainId} />
            }
            title={`Switch network to ${
              CHAIN_NAMES_BY_ID[
                mtToken?.chainData?.chainId as keyof typeof CHAIN_NAMES_BY_ID
              ]
            }`}
            status={allStepsCompleted ? 'success' : switchStatus}
            stepNumber={1}
            maxStepNumber={3}
          />
          <WizardStep
            icon={<TokenIconComponent symbol={mtToken?.stable} width="2rem" />}
            title={`Approve ${mtToken?.stable.toUpperCase()} spending`}
            status={allStepsCompleted ? 'success' : approveStatus}
            stepNumber={2}
            maxStepNumber={3}
            isDDOpen={isOpen}
          />
          <WizardStep
            icon={<WithdrawIcon className="size-[2.625rem]" />}
            title={`Withdraw ${mtToken?.stable.toUpperCase()}`}
            status={withdrawStatus}
            stepNumber={3}
            maxStepNumber={3}
            isDDOpen={isOpen}
          />
        </WizardDropDown>
      </div>
    </div>
  )
}
