import Wallet from '@assets/icons/wallet.svg'
import { AmountInput } from '@components/amount-input/AmountInput'
import { Button } from '@components/ui/button'
import { cn } from '@utils/cn'
import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

import { DoneModal } from '../DoneModal'
import { useDepositStore } from '../store/useDepositStore'
import { SelectWithdrawAssetModal } from './SelectWithdrawAssetModal'

const MOCK_MAX = 7472.09

export const WithdrawInput = () => {
  const { isConnected } = useAccount()

  const { withdrawNetwork } = useDepositStore()

  const [inputValue, setInputValue] = useState('')
  const { setStatus } = useDepositStore()
  const [error, setError] = useState('')
  useEffect(() => {
    if (BigNumber(inputValue).isGreaterThan(BigNumber(MOCK_MAX))) {
      setError('Exceeds balance')
      return
    }
    setError('')
  }, [inputValue])
  return (
    <>
      <div>
        <div
          className={cn(
            'rounded-2xl bg-input-default p-6 max-lg:px-3',
            error && 'bg-input-error',
          )}
        >
          <div className="flex w-full items-center justify-between">
            <AmountInput
              value={inputValue}
              error={error}
              decimals={18}
              onChange={(value) => setInputValue(value)}
              disabled={!isConnected}
            />

            <SelectWithdrawAssetModal />
          </div>
          <div className="mt-3 flex w-full items-center justify-between">
            {error ? (
              <p className="text-lg text-red-100 max-lg:text-xs">{error}</p>
            ) : (
              <p className="text-lg text-gray-100 max-lg:text-xs">$ 0.0</p>
            )}
            <div className="flex items-center">
              <Wallet className="size-[1.375rem] overflow-visible max-lg:size-3" />
              {isConnected ? (
                <>
                  <p className="ml-2 text-lg/[0] text-gray-100 max-lg:text-xs">
                    {BigNumber(MOCK_MAX).toFormat(2)}
                  </p>
                  <button
                    type="button"
                    className="ml-[0.62rem] font-bold uppercase text-main-100 max-lg:text-xs"
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
          <p className="mt-4 text-base text-text-80 max-lg:mt-2 max-lg:text-xs">
            1 USDT = 0.95723 USDC <span className="text-gray-100">($3,2382)</span>
          </p>
        )}
        {isConnected && (
          <Button
            size="lg"
            disabled={!inputValue || !!error}
            className="mt-10 w-full max-lg:mt-6"
            onClick={() => {
              setStatus('success')
              // setStatus('error')
            }}
          >
            Withdraw
          </Button>
        )}
      </div>
      <DoneModal txType="withdraw" network={withdrawNetwork} />
    </>
  )
}
