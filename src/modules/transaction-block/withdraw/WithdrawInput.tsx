import Wallet from '@assets/icons/wallet.svg'
import { AmountInput } from '@components/amount-input/AmountInput'
import { Button } from '@components/ui/button'
import { cn } from '@utils/cn'
import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'
import { formatUnits } from 'viem'
import { useAccount } from 'wagmi'

import { useTxStore } from '../store/useDepositStore'
import { useWithdrawTransaction } from './hooks/useWithdrawTransaction'
import { SelectWithdrawAssetModal } from './SelectWithdrawAssetModal'

export const WithdrawInput = () => {
  const { isConnected } = useAccount()
  const { inputValue, setInputValue, mtToken, setWithdrawAmount } = useTxStore()
  const {
    approve,
    isAllowed,
    isEnoughSharesToWithdraw,
    withdraw,
    loading: isPending,
  } = useWithdrawTransaction()

  const [validationError, setValidationError] = useState('')
  useEffect(() => {
    if (isEnoughSharesToWithdraw === false) {
      setValidationError('Exceeds balance')
      return
    }
    setValidationError('')
  }, [inputValue, isEnoughSharesToWithdraw])

  const maxBalance = formatUnits(BigInt(mtToken?.lpBalance), 6)
  console.log('🚀 ~ WithdrawInput ~ mtToken:', mtToken)

  // Calculate the input value in USD
  const inputValueBN = new BigNumber(inputValue || '0')
  const lpBalanceBN = new BigNumber(mtToken?.lpBalance || '0')
  const balanceBN = new BigNumber(mtToken?.balance || '0')

  const inputValueInUSD = inputValueBN.div(lpBalanceBN).multipliedBy(balanceBN).toFixed(2)

  useEffect(() => {
    if (!inputValueInUSD) return
    setWithdrawAmount(inputValueInUSD)
  }, [inputValueInUSD, setWithdrawAmount])

  useEffect(() => {
    if (+inputValueInUSD < 1) {
      setValidationError('Withdraw amount cannot be less than 1$')
    }
  }, [inputValueInUSD])

  return (
    <div>
      <div
        className={cn(
          'rounded-2xl bg-input-default p-6 max-lg:px-3',
          validationError && 'bg-input-error',
        )}
      >
        <div className="flex w-full items-center justify-between">
          <AmountInput
            value={inputValue}
            error={validationError}
            decimals={6}
            onChange={(value) => setInputValue(value)}
            disabled={!isConnected}
          />

          <SelectWithdrawAssetModal />
        </div>
        <div className="mt-3 flex w-full items-center justify-between">
          {validationError ? (
            <p className="text-lg text-red-100 max-lg:text-xs">{validationError}</p>
          ) : (
            <p className="text-lg text-gray-100 max-lg:text-xs">
              $ {inputValueInUSD || 0}
            </p>
          )}
          <div className="flex items-center">
            <Wallet className="size-[1.375rem] overflow-visible max-lg:size-3" />
            {isConnected ? (
              <>
                <p className="ml-2 text-lg/[0] text-gray-100 max-lg:text-xs">
                  {maxBalance}
                </p>
                <button
                  type="button"
                  className="ml-[0.62rem] font-bold uppercase text-main-100 max-lg:text-xs"
                  onClick={() => maxBalance && setInputValue(maxBalance)}
                >
                  Max
                </button>
              </>
            ) : (
              <span className="text-gray-100">--</span>
            )}
          </div>
        </div>
      </div>
      {isConnected &&
        (isAllowed ? (
          <Button
            loading={isPending}
            size="lg"
            disabled={!inputValue || !!validationError}
            className="mt-10 w-full max-lg:mt-6"
            onClick={withdraw}
          >
            Withdraw
          </Button>
        ) : (
          <Button
            loading={isPending}
            size="lg"
            disabled={!inputValue || !!validationError}
            className="mt-10 w-full max-lg:mt-6"
            onClick={approve}
          >
            Approve
          </Button>
        ))}
    </div>
  )
}
