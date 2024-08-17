import Wallet from '@assets/icons/wallet.svg'
import { AmountInput } from '@components/amount-input/AmountInput'
import { Button } from '@components/ui/button'
import { cn } from '@utils/cn'
import BigNumber from 'bignumber.js'
import { useEffect, useMemo, useState } from 'react'
import { formatUnits } from 'viem'
import { useAccount } from 'wagmi'

import { SelectWithoutWalletPlaceholder } from '../SelectWithoutWalletPlaceholder'
import { useTxStore } from '../store/useTxStore'
import { SelectWithdrawAssetModal } from './SelectWithdrawAssetModal'

export const WithdrawInput = () => {
  const { isConnected } = useAccount()
  const { inputValue, setInputValue, mtToken, setWithdrawAmount, setCurrentModal } =
    useTxStore()

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

  let inputValueInUSD = '0.00'
  if (!lpBalanceBN.isZero()) {
    inputValueInUSD = inputValueBN.div(lpBalanceBN).multipliedBy(balanceBN).toFixed(2)
  }

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

          {isConnected ? (
            <SelectWithdrawAssetModal />
          ) : (
            <SelectWithoutWalletPlaceholder />
          )}
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
                  className="ml-[0.62rem] font-bold uppercase text-main-100 transition-colors hover:text-main-50 max-lg:text-xs"
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
