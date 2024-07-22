import { TOKEN_VAULT } from '@abi/token-vault'
import Wallet from '@assets/icons/wallet.svg'
import { AmountInput } from '@components/amount-input/AmountInput'
import { Button } from '@components/ui/button'
import { cn } from '@utils/cn'
import { formatAmountValue } from '@utils/formatValue'
import { useEffect, useState } from 'react'
import { formatUnits, parseUnits } from 'viem'
import { useAccount, useReadContract } from 'wagmi'

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

  const { data: _balanceInUsd } = useReadContract({
    abi: TOKEN_VAULT,
    address: mtToken?.mtAddress,
    args: [parseUnits(inputValue, 6)],
    functionName: 'previewRedeem',
    query: {
      enabled: !!mtToken && !!inputValue,
    },
  })
  console.log('🚀 ~ WithdrawInput ~ balanceInUsd:', _balanceInUsd)

  const [validationError, setValidationError] = useState('')
  useEffect(() => {
    if (isEnoughSharesToWithdraw === false) {
      setValidationError('Exceeds balance')
      return
    }
    setValidationError('')
  }, [inputValue, isEnoughSharesToWithdraw])

  const maxBalance = formatUnits(BigInt(mtToken?.lpBalance), 6)

  const balanceInUsd = formatAmountValue(
    formatUnits((_balanceInUsd ?? 0n) as bigint, 6),
    2,
  )

  useEffect(() => {
    if (!balanceInUsd) return
    setWithdrawAmount(balanceInUsd)
  }, [balanceInUsd, setWithdrawAmount])

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
            <p className="text-lg text-gray-100 max-lg:text-xs">$ {balanceInUsd || 0}</p>
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
      {/* {isConnected && (
        <p className="mt-4 text-base text-text-80 max-lg:mt-2 max-lg:text-xs">
          1 USDT = 0.95723 USDC <span className="text-gray-100">($3,2382)</span>
        </p>
      )} */}
      {isConnected &&
        (isAllowed ? (
          <Button
            size="lg"
            disabled={!inputValue || !!validationError || isPending}
            className="mt-10 w-full max-lg:mt-6"
            onClick={withdraw}
          >
            Withdraw
          </Button>
        ) : (
          <Button
            size="lg"
            disabled={!inputValue || !!validationError || isPending}
            className="mt-10 w-full max-lg:mt-6"
            onClick={approve}
          >
            Approve
          </Button>
        ))}
    </div>
  )
}
