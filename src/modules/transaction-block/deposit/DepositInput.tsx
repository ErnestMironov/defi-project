import Wallet from '@assets/icons/wallet.svg'
import { AmountInput } from '@components/amount-input/AmountInput'
import { Button } from '@components/ui/button'
import { cn } from '@utils/cn'
import { formatTokenBalance } from '@utils/formatValue'
import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

import { useTxStore } from '../store/useDepositStore'
import { DepositReviewModal } from './DepositReviewModal'
import { SelectDepositAsset } from './SelectDepositAssetModal'
import { SelectVault } from './SelectVault'

export const DepositInput = () => {
  const { isConnected } = useAccount()

  const {
    depositAsset: asset,
    setCurrentModal,
    inputValue,
    setInputValue,
    inputValueInUSD,
    setInputValueInUSD,
  } = useTxStore()
  const assetBalance = BigNumber(asset?.balance?.toString() || '0')
    .div(10 ** (asset?.contract_decimals || 6))
    .toString()

  const [error, setError] = useState('')

  useEffect(() => {
    const inputValueBN = BigNumber(+inputValue)
    const assetQuoteBN = BigNumber(asset?.quote ?? 1)
    const assetBalanceBN = BigNumber(assetBalance)

    if (
      (asset && assetBalanceBN.isZero()) ||
      inputValueBN.isNaN() ||
      assetQuoteBN.isNaN()
    ) {
      setInputValueInUSD('0.00')
      setError('Invalid input or balance')
      return
    }

    const calculatedValueInUSD = inputValueBN
      .multipliedBy(assetQuoteBN.div(assetBalanceBN))
      .toFixed(3)

    setInputValueInUSD(calculatedValueInUSD)

    console.log(
      '🚀 ~ useEffect ~ BigNumber(calculatedValueInUSD).toNumber():',
      BigNumber(calculatedValueInUSD).toNumber(),
    )

    if (inputValueBN.isGreaterThan(assetBalanceBN)) {
      setError('Exceeds balance')
      return
    }

    if (
      BigNumber(calculatedValueInUSD).toNumber() < 1 &&
      BigNumber(calculatedValueInUSD).toNumber() !== BigNumber(0).toNumber()
    ) {
      setError('Deposit amount cannot be less than 1$')
      return
    }

    setError('')
  }, [asset?.quote, assetBalance, inputValue, setInputValueInUSD])

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
              <p className="text-lg text-gray-100 max-lg:text-xs">
                $ {inputValueInUSD || '0.00'}
              </p>
            )}
            <div className="flex items-center">
              <Wallet className="size-[1.375rem] overflow-visible max-lg:size-3" />
              <p className="ml-2 text-lg/[0] text-gray-100 max-lg:text-xs">
                {formatTokenBalance(asset.balance, asset.contract_decimals)}
              </p>
              <button
                type="button"
                className="ml-[0.62rem] font-bold uppercase text-main-100 max-lg:text-xs"
                onClick={() => setInputValue(assetBalance)}
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
              value={inputValueInUSD}
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
            <p className="text-lg text-gray-100 max-lg:text-xs">
              $ {inputValueInUSD || '0.00'}
            </p>
            {/* <div className="flex items-center">
              <p className="ml-2 text-lg/[0] text-gray-100 max-lg:text-xs">APY 34%</p>
            </div> */}
          </div>
        )}
      </div>
      {/* {isConnected && (
        <p className="mt-4 text-base text-text-80 max-lg:mt-2 max-lg:text-xs">
          1 USDT = 0.95723 USDC <span className="text-gray-100">($3,2382)</span>
        </p>
      )} */}
      {isConnected && (
        <Button
          size="lg"
          disabled={!inputValue || !!error}
          className="w-full max-lg:mt-6 lg:mt-10"
          onClick={() => setCurrentModal('review')}
        >
          Deposit
        </Button>
        // trigger={
        //   <DialogTrigger disabled={!inputValue || !!error} className="w-full">
        //   </DialogTrigger>
        // }
      )}
      <DepositReviewModal />
    </div>
  )
}
