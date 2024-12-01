import { useProtocolMetrics } from '@api/maat-finance/useProtocolMetrics'
import { AmountInput } from '@components/amount-input/AmountInput'
import { VaultInfoBox } from '@components/box/VaultInfoBox'
import { Button } from '@components/ui/button'
import { useVaultAPY } from '@hooks/useVaultAPY'
import { cn } from '@utils/cn'
import {
  formatAmount,
  formatTokenBalance,
  formatValueWithPrecision,
} from '@utils/formatValue'
import BigNumber from 'bignumber.js'
import { useEffect, useMemo, useRef, useState } from 'react'
import { formatUnits } from 'viem'
import { useAccount } from 'wagmi'

import DollarInput from '../components/DollarInput.tsx'
import { SelectWithoutWalletPlaceholder } from '../SelectWithoutWalletPlaceholder'
import { useTxStore } from '../store/useTxStore'
import { SelectDepositAsset } from './SelectDepositAssetModal'
import { SelectVault } from './SelectVault'
import ZapFee from './zap-fee/ZapFee'

type InputType = 'usd' | 'token'

const calculateTokenValue = (usdValue: BigNumber, assetQuote: BigNumber): number => {
  if (
    assetQuote.isZero() ||
    assetQuote.isNaN() ||
    usdValue.isZero() ||
    usdValue.isNaN()
  ) {
    return 0
  }

  return +usdValue.div(assetQuote).toFixed(4)
}

const calculateUSDValue = (tokenValue: BigNumber, assetQuote: BigNumber): string => {
  if (
    assetQuote.isZero() ||
    assetQuote.isNaN() ||
    tokenValue.isZero() ||
    tokenValue.isNaN()
  ) {
    return '0.00'
  }

  return tokenValue.multipliedBy(assetQuote).toFixed(2)
}

export const DepositInput = () => {
  const { isConnected } = useAccount()

  const { bestUSDCAPy, bestUSDTAPy, isLoading: isStrategiesLoading } = useVaultAPY()

  const { setVault } = useTxStore()
  const vaultSet = useRef(false)

  useEffect(() => {
    if (!vaultSet.current && !isStrategiesLoading) {
      if (bestUSDCAPy !== undefined && bestUSDTAPy !== undefined) {
        if (Number(bestUSDCAPy) > Number(bestUSDTAPy)) {
          setVault('USDC')
        } else if (Number(bestUSDTAPy) > Number(bestUSDCAPy)) {
          setVault('USDT')
        }
      } else if (bestUSDCAPy === undefined) {
        setVault('USDT')
      } else if (bestUSDTAPy === undefined) {
        setVault('USDC')
      } else {
        setVault('USDT')
      }
      vaultSet.current = true
    }
  }, [bestUSDCAPy, bestUSDTAPy, setVault, isStrategiesLoading])

  const {
    depositAsset: asset,
    inputValue,
    inputValueInUSD,
    depositTotalInUSD,
    depositTotalAmount,
    vault,
    swapRoute,
    setInputValue,
    setCurrentModal,
    setInputValueInUSD,
  } = useTxStore()

  const { isLoading: isProtocolMetricsLoading, data: protocolMetrics } =
    useProtocolMetrics({})

  const usdcApy = protocolMetrics?.history?.USDC?.apy
  const usdtApy = protocolMetrics?.history?.USDT?.apy

  const yourYearlyEarnings = useMemo(() => {
    if (
      !depositTotalInUSD ||
      depositTotalInUSD === '0.00' ||
      isProtocolMetricsLoading ||
      !usdcApy ||
      !usdtApy
    )
      return 0

    const totalInUSD = BigNumber(depositTotalInUSD)

    if (vault === 'USDC') {
      return totalInUSD.div(100).multipliedBy(BigNumber(usdcApy))
    }
    return totalInUSD.div(100).multipliedBy(BigNumber(usdtApy))
  }, [depositTotalInUSD, isProtocolMetricsLoading, usdcApy, usdtApy, vault])

  const assetBalance = formatUnits(
    BigInt(asset?.balance?.toString() || '0'),
    asset?.contract_decimals || 6,
  )

  const prettyAssetBalance = formatValueWithPrecision(assetBalance, 5)

  const [error, setError] = useState('')

  useEffect(() => {
    const inputValueBN = BigNumber(+inputValue)
    const assetBalanceBN = BigNumber(assetBalance)

    if ((asset && assetBalanceBN.isZero()) || inputValueBN.isNaN()) {
      setInputValueInUSD('0.00')
      setError('Invalid input or balance')
      return
    }

    if (inputValueBN.isGreaterThan(assetBalanceBN)) {
      setError('Exceeds balance')
      return
    }

    if (inputValueInUSD && +inputValueInUSD < 1) {
      setError('Deposit amount cannot be less than 1$')
      return
    }

    setError('')
  }, [asset, assetBalance, inputValue, inputValueInUSD, setInputValueInUSD])

  const handleAction = (type: InputType, value: string) => {
    if (!value) {
      setInputValue('')
      setInputValueInUSD('')
      return
    }

    let assetQuoteBN = BigNumber(asset?.rate ?? 1)
    const numericValue = BigNumber(value)

    if (swapRoute) {
      assetQuoteBN = BigNumber(swapRoute?.action?.fromToken?.priceUSD || 1)
    }

    if (type === 'usd') {
      setInputValueInUSD(value) // Set the input value for USD type
      const tokenValue = calculateTokenValue(numericValue, assetQuoteBN) // Calculate token value based on the exchange rate
      setInputValue(tokenValue.toString()) // Set the input value in USD
    } else if (type === 'token') {
      setInputValue(value) // Set the input value for token type
      const usdValue = calculateUSDValue(numericValue, assetQuoteBN) // Calculate USD value based on the exchange rate
      setInputValueInUSD(usdValue.toString()) // Set the input value in USD
    }
  }

  return (
    <div>
      <div
        className={cn(
          'bg-input-default py-6 px-8 max-lg:px-3 border-y border-stroke-100',
          error && 'bg-input-error',
        )}
      >
        <span className="text-[0.875rem] font-medium leading-6 text-text-2100 opacity-50">
          You deposit
        </span>
        <div className="flex w-full items-center justify-between gap-2">
          {isConnected && asset ? (
            <AmountInput
              value={inputValue}
              error={error}
              decimals={18}
              onChange={(value) => handleAction('token', value)}
            />
          ) : (
            <p className="text-[1.5rem] font-medium leading-[3.25rem] tracking-[-0.015rem] text-text-20">
              Select the desired asset
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
            <div className="flex items-center gap-3">
              <p>
                <span className="ml-2 mr-[.19rem] text-text-2100">
                  {formatTokenBalance(asset.balance, asset.contract_decimals)}
                </span>
                <span className="text-text-260">{asset.contract_ticker_symbol}</span>
              </p>
              <button
                type="button"
                className="rounded-md border border-stroke-100 bg-white px-[0.56rem] text-[0.875rem] font-medium leading-[1.5625rem] text-text-2100"
                onClick={() => handleAction('token', prettyAssetBalance)}
              >
                Max
              </button>
            </div>
          </div>
        )}
        {error ? <p className="mt-3 text-lg text-red-100">{error}</p> : null}
      </div>
      <div className="flex w-full justify-between gap-4 px-4">
        <VaultInfoBox vaultName="USDC" apy={`${Math.trunc(bestUSDCAPy)}%`} />
        <VaultInfoBox vaultName="USDT" apy={`${Math.trunc(bestUSDTAPy)}%`} />
      </div>
      <div
        className={cn(
          'flex w-full flex-col items-center justify-between rounded-2xl bg-input-default p-6 max-lg:mt-2 max-lg:px-3',
          error && 'bg-input-error',
        )}
      >
        <div className="flex w-full items-center justify-between gap-2">
          {isConnected && asset ? (
            <AmountInput
              value={Number(depositTotalAmount).toFixed(2)}
              decimals={18}
              disabled
            />
          ) : (
            <p className="text-[1.5rem] font-medium leading-[3.25rem] tracking-[-0.015rem] text-text-20">
              Select the desired vault
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
      <ZapFee className="mt-4" />
    </div>
  )
}
