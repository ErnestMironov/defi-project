import Wallet from '@assets/icons/wallet.svg'
import { AmountInput } from '@components/amount-input/AmountInput'
import { Button } from '@components/ui/button'
import { cn } from '@utils/cn'
import BigNumber from 'bignumber.js'
import { useEffect, useMemo, useState } from 'react'
import { formatUnits } from 'viem'
import { useAccount } from 'wagmi'

import DollarInput from '../components/DollarInput.tsx'
import { SelectWithoutWalletPlaceholder } from '../SelectWithoutWalletPlaceholder'
import { useTxStore } from '../store/useTxStore'
import { SelectWithdrawAssetModal } from './SelectWithdrawAssetModal'

type InputType = 'usd' | 'token'

function isValidInput(
  value: BigNumber,
  lpBalance: BigNumber,
  balance: BigNumber,
): boolean {
  return (
    !value.isZero() &&
    !lpBalance.isZero() &&
    !balance.isZero() &&
    !value.isNaN() &&
    !lpBalance.isNaN() &&
    !balance.isNaN()
  )
}

function calculateTokenValue(
  numericValue: BigNumber,
  lpBalanceBN: BigNumber,
  balanceBN: BigNumber,
): string {
  return isValidInput(numericValue, lpBalanceBN, balanceBN)
    ? numericValue.multipliedBy(lpBalanceBN).div(balanceBN).toString()
    : '0'
}

function calculateUSDValue(
  numericValue: BigNumber,
  lpBalanceBN: BigNumber,
  balanceBN: BigNumber,
): string {
  return isValidInput(numericValue, lpBalanceBN, balanceBN)
    ? numericValue.multipliedBy(balanceBN).div(lpBalanceBN).toFixed(2)
    : '0'
}

export const WithdrawInput = () => {
  const { isConnected } = useAccount()
  const {
    inputValue,
    setInputValue,
    mtToken,
    setWithdrawAmount,
    setCurrentModal,
    inputValueInUSD,
    setInputValueInUSD,
  } = useTxStore()

  const [validationError, setValidationError] = useState('')

  const maxBalance = mtToken?.lpBalance ? formatUnits(BigInt(mtToken?.lpBalance), 6) : 0

  const inputValueBN = useMemo(() => new BigNumber(inputValue || '0'), [inputValue])
  const lpBalanceBN = useMemo(
    () => new BigNumber(mtToken?.lpBalance || '0'),
    [mtToken?.lpBalance],
  )
  const balanceBN = useMemo(
    () => new BigNumber(mtToken?.balance || '0'),
    [mtToken?.balance],
  )

  useEffect(() => {
    if (!inputValueInUSD || Number.isNaN(Number(inputValueInUSD))) {
      console.warn('Invalid inputValueInUSD:', inputValueInUSD)
      return
    }
    setWithdrawAmount(inputValueInUSD)
  }, [inputValueInUSD, setWithdrawAmount])

  useEffect(() => {
    if (inputValueBN.isGreaterThan(lpBalanceBN)) {
      setValidationError('Exceeds balance')
    } else if (+inputValueInUSD < 1 && +inputValueInUSD > 0) {
      setValidationError('Withdraw amount cannot be less than 1$')
    } else {
      setValidationError('')
    }
  }, [inputValueBN, lpBalanceBN, inputValueInUSD])

  const handleReview = () => {
    setCurrentModal('review')
  }

  const handleAction = (type: InputType, value: string) => {
    const numericValue = BigNumber(value)

    if (type === 'usd') {
      const tokenValue = calculateTokenValue(numericValue, lpBalanceBN, balanceBN)
      setInputValueInUSD(value)
      setInputValue(tokenValue)
    } else if (type === 'token') {
      const usdValue = calculateUSDValue(numericValue, lpBalanceBN, balanceBN)
      setInputValue(value)
      setInputValueInUSD(usdValue.toString())
    }
  }

  return (
    <div>
      <div
        className={cn(
          'rounded-2xl bg-input-default p-6 max-lg:px-3',
          validationError && 'bg-input-error',
        )}
      >
        <div className="flex w-full items-center justify-between">
          {mtToken ? (
            <AmountInput
              value={inputValue}
              error={validationError}
              decimals={6}
              onChange={(value) => handleAction('token', value)}
              disabled={!isConnected || !mtToken}
            />
          ) : (
            <p className="text-md text-gray-100 max-lg:text-sm">
              Select the desired asset...
            </p>
          )}

          {isConnected ? (
            <SelectWithdrawAssetModal />
          ) : (
            <SelectWithoutWalletPlaceholder />
          )}
        </div>
        <div className="mt-3 flex w-full items-center justify-between">
          {mtToken ? (
            <DollarInput
              disabled={!mtToken || !isConnected}
              value={inputValueInUSD}
              onValueChange={(value) => handleAction('usd', value)}
              error={!!validationError}
            />
          ) : null}

          {isConnected && mtToken ? (
            <div className="flex items-center">
              <Wallet className="size-[1.375rem] overflow-visible max-lg:size-3" />
              <p className="ml-2 text-lg/[0] text-gray-100 max-lg:text-xs">
                {maxBalance}
              </p>
              <button
                type="button"
                className="ml-[0.62rem] font-bold uppercase text-main-100 transition-colors hover:text-main-50 max-lg:text-xs"
                onClick={() => maxBalance && setInputValue(maxBalance)}
              >
                Max
              </button>
            </div>
          ) : null}
        </div>
        {validationError && (
          <p className="mt-3 text-lg text-red-100 max-lg:text-xs">{validationError}</p>
        )}
      </div>
      {isConnected && (
        <Button
          size="lg"
          disabled={!inputValue || !!validationError}
          className="mt-10 w-full max-lg:mt-6"
          onClick={handleReview}
        >
          Withdraw
        </Button>
      )}
    </div>
  )
}
