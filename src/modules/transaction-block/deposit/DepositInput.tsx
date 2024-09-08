import Wallet from '@assets/icons/wallet.svg'
import { AmountInput } from '@components/amount-input/AmountInput'
import { Button } from '@components/ui/button'
import { cn } from '@utils/cn'
import {
  formatAmount,
  formatTokenBalance,
  formatValueWithPrecision,
} from '@utils/formatValue'
import BigNumber from 'bignumber.js'
import { useEffect, useMemo, useState } from 'react'
import { formatUnits } from 'viem'
import { useAccount } from 'wagmi'

import DollarInput from '../components/DollarInput.tsx'
import { SelectWithoutWalletPlaceholder } from '../SelectWithoutWalletPlaceholder'
import { useTxStore } from '../store/useTxStore.ts'
import { useTokenApy } from './hooks/useTokenApy.ts'
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
    depositTotalAmount,
    isTxZAP,
    vault,
    squidRoute,
    setInputValue,
    setCurrentModal,
    setInputValueInUSD,
  } = useTxStore()

  const { usdcApy, usdtApy, loading } = useTokenApy()

  const yourYearlyEarnings = useMemo(() => {
    if (
      !depositTotalInUSD ||
      depositTotalInUSD === '0.00' ||
      loading ||
      !usdcApy ||
      !usdtApy
    )
      return 0

    const totalInUSD = BigNumber(depositTotalInUSD)

    if (vault === 'USDC') {
      return totalInUSD.div(100).multipliedBy(BigNumber(usdcApy))
    }
    return totalInUSD.div(100).multipliedBy(BigNumber(usdtApy))
  }, [depositTotalInUSD, loading, usdcApy, usdtApy, vault])

  const assetBalance = BigNumber(asset?.balance?.toString() || '0')
    .div(10 ** (asset?.contract_decimals || 6))
    .toString()

  const prettyAssetBalance = formatValueWithPrecision(assetBalance, 8)

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
    if (!value) {
      setInputValue('')
      setInputValueInUSD('')
      return
    }

    let assetBalanceBN = BigNumber(assetBalance)
    let assetQuoteBN = BigNumber(asset?.quote ?? 1)
    const numericValue = BigNumber(value)

    if (squidRoute) {
      assetBalanceBN = BigNumber(
        formatUnits(
          BigInt(squidRoute?.estimate?.fromAmount || '0'),
          squidRoute.estimate.fromToken.decimals,
        ),
      )
      console.log(
        '🚀 ~ handleAction ~ squidRoute.params.fromToken.decimals,:',
        squidRoute.estimate.fromToken.decimals,
      )

      console.log(
        '🚀 ~ handleAction ~ squidRoute?.estimate?.fromAmount:',
        squidRoute?.estimate?.fromAmount,
      )
      console.log(
        '🚀 ~ handleAction ~ squidRoute?.estimate?.fromAmount:',
        formatUnits(
          BigInt(squidRoute?.estimate?.fromAmount || '0'),
          squidRoute.estimate.fromToken.decimals,
        ),
      )
      assetQuoteBN = BigNumber(squidRoute?.estimate?.fromAmountUSD || '0')
      console.log(
        '🚀 ~ handleAction ~ squidRoute?.estimate?.fromAmountUSD:',
        squidRoute?.estimate?.fromAmountUSD,
      )
    }

    if (type === 'usd') {
      setInputValueInUSD(value) // Set the input value for USD type
      const tokenValue = calculateTokenValue(numericValue, assetQuoteBN, assetBalanceBN) // Calculate token value based on the exchange rate
      setInputValue(tokenValue.toString()) // Set the input value in USD
    } else if (type === 'token') {
      setInputValue(value) // Set the input value for token type
      const usdValue = calculateUSDValue(numericValue, assetQuoteBN, assetBalanceBN) // Calculate USD value based on the exchange rate
      console.log('🚀 ~ handleAction ~ usdValue:', usdValue)
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
            <AmountInput
              value={Number(depositTotalAmount).toFixed(2)}
              decimals={18}
              disabled
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
            <DollarInput
              value={formatAmount(depositTotalInUSD, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              disabled
            />
            {yourYearlyEarnings ? (
              <p className="text-[0.8125rem] leading-[120%] text-gray-100 lg:text-[1.125rem]">
                + $
                {formatAmount(yourYearlyEarnings.toString(), {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{' '}
                over 1 year
              </p>
            ) : null}
          </div>
        )}
      </div>

      {inputValue && isTxZAP ? <ZapFee className="mt-4" /> : null}

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
