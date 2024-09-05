import Wallet from '@assets/icons/wallet.svg'
import { AmountInput } from '@components/amount-input/AmountInput'
import { Button } from '@components/ui/button'
import { cn } from '@utils/cn'
import { formatTokenBalance } from '@utils/formatValue'
import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

import DollarInput from '../components/DollarInput.tsx'
import { SelectWithoutWalletPlaceholder } from '../SelectWithoutWalletPlaceholder'
import { useTxStore } from '../store/useTxStore.ts'
import { SelectDepositAsset } from './SelectDepositAssetModal'
import { SelectVault } from './SelectVault'
import ZapFee from './zap-fee/ZapFee'

type InputType = 'usd' | 'token'

const calculateTokenValue = (
  usdValue: BigNumber,
  assetQuote: BigNumber,
  _assetBalance: BigNumber,
): number => {
  if (
    assetQuote.isZero() ||
    assetQuote.isNaN() ||
    usdValue.isZero() ||
    usdValue.isNaN()
  ) {
    return 0
  }

  return +usdValue.multipliedBy(_assetBalance.div(assetQuote)).toFixed(4)
}

const calculateUSDValue = (
  tokenValue: BigNumber,
  assetQuote: BigNumber,
  _assetBalance: BigNumber,
): string => {
  if (
    assetQuote.isZero() ||
    assetQuote.isNaN() ||
    tokenValue.isZero() ||
    tokenValue.isNaN()
  ) {
    return '0.00'
  }

  return tokenValue.multipliedBy(assetQuote.div(_assetBalance)).toFixed(2)
}

export const DepositInput = () => {
  const { isConnected } = useAccount()

  const {
    depositAsset: asset,
    inputValue,
    inputValueInUSD,
    depositTotalInUSD,
    setInputValue,
    setCurrentModal,
    setInputValueInUSD,
  } = useTxStore()
  const assetBalance = BigNumber(asset?.balance?.toString() || '0')
    .div(10 ** (asset?.contract_decimals || 6))
    .toString()

  const prettyAssetBalance = Number(assetBalance).toFixed(4)

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

    if (inputValueBN.isGreaterThan(assetBalanceBN)) {
      setError('Exceeds balance')
      return
    }

    if (inputValueInUSD && +inputValueInUSD !== 0 && +inputValueInUSD < 1) {
      setError('Deposit amount cannot be less than 1$')
      return
    }

    setError('')
  }, [asset, asset?.quote, assetBalance, inputValue, inputValueInUSD, setInputValueInUSD])

  const handleAction = (type: InputType, value: string) => {
    console.log('handleAction', type, value)

    if (!value) {
      setInputValue('')
      setInputValueInUSD('')
      return
    }

    const assetBalanceBN = BigNumber(assetBalance)
    const assetQuoteBN = BigNumber(asset?.quote ?? 1)
    const numericValue = BigNumber(value)

    if (type === 'usd') {
      setInputValueInUSD(value) // Set the input value for USD type
      const tokenValue = calculateTokenValue(numericValue, assetQuoteBN, assetBalanceBN) // Calculate token value based on the exchange rate
      setInputValue(tokenValue.toString()) // Set the input value in USD
    } else if (type === 'token') {
      setInputValue(value) // Set the input value for token type
      const usdValue = calculateUSDValue(numericValue, assetQuoteBN, assetBalanceBN) // Calculate USD value based on the exchange rate
      setInputValueInUSD(usdValue.toString()) // Set the input value in USD
    }
  }

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
              onChange={(value) => handleAction('token', value)}
            />
          ) : (
            <p className="text-md text-gray-100 max-lg:text-sm">
              Select the desired asset...
            </p>
          )}

          {isConnected ? <SelectDepositAsset /> : <SelectWithoutWalletPlaceholder />}
        </div>
        {isConnected && asset && (
          <div className="mt-3 flex w-full items-center justify-between">
            <DollarInput
              value={inputValueInUSD}
              onValueChange={(value) => handleAction('usd', value)}
              error={!!error}
            />
            <div className="flex items-center">
              <Wallet className="size-[1.375rem] overflow-visible max-lg:size-3" />
              <p className="ml-2 text-lg/[0] text-gray-100 max-lg:text-xs">
                {formatTokenBalance(asset.balance, asset.contract_decimals)}
              </p>
              <button
                type="button"
                className="ml-[0.62rem] font-bold uppercase text-main-100 transition-colors hover:text-main-50 max-lg:text-xs"
                onClick={() => handleAction('token', prettyAssetBalance)}
              >
                Max
              </button>
            </div>
          </div>
        )}
        {error ? <p className="mt-3 text-lg text-red-100">{error}</p> : null}
      </div>
      <div
        className={cn(
          'mt-4 flex w-full flex-col items-center justify-between rounded-2xl bg-input-default p-6 max-lg:mt-2 max-lg:px-3',
          error && 'bg-input-error',
        )}
      >
        <div className="flex w-full items-center justify-between">
          {isConnected && asset ? (
            <AmountInput value={depositTotalInUSD} decimals={18} disabled />
          ) : (
            <p className="text-md text-gray-100 max-lg:text-sm">
              Select the desired vault...
            </p>
          )}
          <SelectVault />
        </div>
        {isConnected && asset && (
          <div className="mt-3 flex w-full items-center justify-between">
            <DollarInput value={depositTotalInUSD} disabled />
            <p className="text-[1.125rem] leading-[120%] text-gray-100">
              + $0.0 over 1 year
            </p>
          </div>
        )}
      </div>

      {inputValue && <ZapFee className="mt-4" />}

      {isConnected && (
        <Button
          size="lg"
          disabled={!inputValue || !!error}
          className="w-full max-lg:mt-6 lg:mt-10"
          onClick={() => setCurrentModal('review')}
        >
          {inputValue && +inputValue > 0 ? 'Deposit' : 'Enter the amount'}
        </Button>
      )}
    </div>
  )
}
