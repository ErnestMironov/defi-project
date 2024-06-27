import Wallet from '@assets/icons/wallet.svg'
import { AmountInput } from '@components/amount-input/AmountInput'
import { Button } from '@components/ui/button'
import { DialogTrigger } from '@components/ui/dialog'
import { cn } from '@utils/cn'
import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

import { useDepositStore } from '../store/useDepositStore'
import { DepositReviewModal } from './DepositReviewModal'
import { SelectDepositAsset } from './SelectDepositAssetModal'
import { SelectVault } from './SelectVault'

const MOCK_MAX = 7472.09

export const DepositInput = () => {
  const { isConnected } = useAccount()

  const { depositAsset: asset } = useDepositStore()

  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState('')
  useEffect(() => {
    if (BigNumber(inputValue).isGreaterThan(BigNumber(MOCK_MAX))) {
      setError('Exceeds balance')
      return
    }
    setError('')
  }, [inputValue])
  return (
    <div>
      <div
        className={cn(
          'rounded-2xl bg-input-default p-6 max-lg:px-3',
          error && 'bg-input-error',
        )}
      >
        <div className="flex w-full items-center justify-between">
          {isConnected && asset ? (
            <AmountInput
              value={inputValue}
              error={error}
              decimals={18}
              onChange={(value) => setInputValue(value)}
            />
          ) : (
            <p className="text-md text-gray-100 max-lg:text-sm">
              Select the desired asset...
            </p>
          )}

          <SelectDepositAsset />
        </div>
        {isConnected && asset && (
          <div className="mt-3 flex w-full items-center justify-between">
            {error ? (
              <p className="text-lg text-red-100">{error}</p>
            ) : (
              <p className="text-lg text-gray-100 max-lg:text-xs">$ 0.0</p>
            )}
            <div className="flex items-center">
              <Wallet className="size-[1.375rem] overflow-visible max-lg:size-3" />
              <p className="ml-2 text-lg/[0] text-gray-100 max-lg:text-xs">
                {BigNumber(MOCK_MAX).toFormat(2)}
              </p>
              <button
                type="button"
                className="ml-[0.62rem] font-bold uppercase text-main-100 max-lg:text-xs"
              >
                Max
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 flex w-full flex-col items-center justify-between rounded-2xl bg-input-default p-6 max-lg:mt-2 max-lg:px-3">
        <div className="flex w-full items-center justify-between">
          {isConnected && asset ? (
            <AmountInput
              value={inputValue}
              decimals={18}
              onChange={(value) => setInputValue(value)}
            />
          ) : (
            <p className="text-md text-gray-100 max-lg:text-sm">
              Select the desired vault...
            </p>
          )}
          <SelectVault />
        </div>
        {isConnected && asset && (
          <div className="mt-3 flex w-full items-center justify-between">
            <p className="text-lg text-gray-100 max-lg:text-xs">$ 0.0</p>
            <div className="flex items-center">
              <p className="ml-2 text-lg/[0] text-gray-100 max-lg:text-xs">APY 34%</p>
            </div>
          </div>
        )}
      </div>
      {isConnected && (
        <p className="mt-4 text-base text-text-80 max-lg:mt-2 max-lg:text-xs">
          1 USDT = 0.95723 USDC <span className="text-gray-100">($3,2382)</span>
        </p>
      )}
      {isConnected && (
        <DepositReviewModal
          trigger={
            <DialogTrigger disabled={!inputValue || !!error} className="w-full">
              <Button
                size="lg"
                disabled={!inputValue || !!error}
                className="w-full max-lg:mt-6 lg:mt-10"
              >
                Deposit
              </Button>
            </DialogTrigger>
          }
        />
      )}
    </div>
  )
}
