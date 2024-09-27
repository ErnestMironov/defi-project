import WithdrawIcon from '@assets/icons/withdraw.svg'
import Scales from '@assets/lottie/MAAT_Scales.json'
import { TokenIconComponent } from '@components/token-icon'
import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import { Button } from '@components/ui/button'
import { CHAIN_NAMES_BY_ID } from '@constants/chains'
import { formatAmount, parseFloatLocale } from '@utils/formatValue'
import BigNumber from 'bignumber.js'
import Lottie from 'lottie-react'
import { useEffect, useMemo, useState } from 'react'
import { parseUnits } from 'viem'

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

  const isCrossChain = withdrawFromNetwork !== withdrawToNetwork

  return (
    <div className="flex flex-col items-stretch gap-8">
      <div className="flex flex-col items-stretch gap-8 px-8">
        <Lottie
          animationData={Scales}
          loop={isAnyStatusPending()}
          autoplay={isAnyStatusPending()}
          className="aspect-square h-28 self-center"
        />

        <div className="flex items-center gap-2 self-center text-[1.125rem] ">
          <TokenWithNetwork
            symbol={mtToken?.stable}
            network={withdrawFromNetwork}
            position="bottom-right"
            width="1.5rem"
          />
          <span>
            {formatAmount(amount, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{' '}
            {mtToken?.stable.toUpperCase()}
          </span>
          <p className="text-gray-100">$ {parseFloatLocale(withdrawAmountInUSD)}</p>
        </div>

        {isCrossChain && (
          <>
            <div className="h-px w-full bg-stroke-100" />
            <div className="flex w-full flex-col items-start gap-2 self-stretch">
              <div className="flex w-full items-center justify-between">
                <span className="text-text-80">You will receive </span>
                <div className="flex items-center gap-2">
                  <TokenWithNetwork
                    symbol={mtToken?.stable}
                    network={withdrawToNetwork}
                    position="bottom-right"
                    width="2.14288rem"
                  />
                  <span>
                    {amount} {mtToken?.stable.toUpperCase()}
                  </span>
                </div>
              </div>
              <p className="self-end text-base text-gray-100">
                $ {parseFloatLocale(withdrawAmountInUSD)}
              </p>
            </div>
          </>
        )}

        {ActionButton}
      </div>

      <div className="border-t border-stroke-100 px-8 pt-8">
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
            error={approveError?.message}
            showChain={isOpen}
            stepNumber={2}
            maxStepNumber={3}
          />
          <WizardStep
            icon={<WithdrawIcon className="size-[2.625rem]" />}
            title={`Withdraw ${mtToken?.stable.toUpperCase()}`}
            status={withdrawStatus}
            error={withdrawError?.message}
            showChain={isOpen}
            stepNumber={3}
            maxStepNumber={3}
          />
        </WizardDropDown>
      </div>
    </div>
  )
}
