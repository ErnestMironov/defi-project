import { useProtocolMetrics } from '@api/maat-finance/useProtocolMetrics'
import { AmountInput } from '@components/amount-input/AmountInput'
import { VaultInfoBox } from '@components/box/VaultInfoBox'
import { Button } from '@components/ui/button'
import { useVaultAPY } from '@hooks/useVaultAPY'
import { cn } from '@utils/cn'
import { formatAmount, formatValueWithPrecision } from '@utils/formatValue'
import BigNumber from 'bignumber.js'
import { useEffect, useMemo, useRef, useState } from 'react'
import { formatUnits } from 'viem'
import { useAccount } from 'wagmi'

import DollarInput from '../components/DollarInput'
import { SelectWithoutWalletPlaceholder } from '../SelectWithoutWalletPlaceholder'
import { useTxStore } from '../store/useTxStore'
import { SwappableInputs } from './components/SwappableInputs'
import { SelectDepositAsset } from './SelectDepositAssetModal'
import { SelectVault } from './SelectVault'
import ZapFee from './zap-fee/ZapFee'

type InputType = 'usd' | 'token'

// Constants
const MIN_DEPOSIT_USD = 1

// Utility functions
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
    setVault,
  } = useTxStore()

  // Vault selection logic
  const vaultSet = useRef(false)
  useEffect(() => {
    if (!vaultSet.current && !isStrategiesLoading) {
      if (bestUSDCAPy !== undefined && bestUSDTAPy !== undefined) {
        setVault(Number(bestUSDCAPy) > Number(bestUSDTAPy) ? 'USDC' : 'USDT')
      } else {
        setVault(bestUSDCAPy === undefined ? 'USDT' : 'USDC')
      }
      vaultSet.current = true
    }
  }, [bestUSDCAPy, bestUSDTAPy, setVault, isStrategiesLoading])

  // Protocol metrics and APY calculation
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
    ) {
      return 0
    }

    const totalInUSD = BigNumber(depositTotalInUSD)
    const apy = vault === 'USDC' ? usdcApy : usdtApy
    return totalInUSD.div(100).multipliedBy(BigNumber(apy))
  }, [depositTotalInUSD, isProtocolMetricsLoading, usdcApy, usdtApy, vault])

  // Asset balance handling
  const assetBalance = formatUnits(
    BigInt(asset?.balance?.toString() || '0'),
    asset?.contract_decimals || 6,
  )
  const prettyAssetBalance = formatValueWithPrecision(assetBalance, 5)

  // Input validation
  const validateInput = (
    inputValueBN: BigNumber,
    assetBalanceBN: BigNumber,
  ): string | null => {
    if ((asset && assetBalanceBN.isZero()) || inputValueBN.isNaN()) {
      return 'Invalid input or balance'
    }
    if (inputValueBN.isGreaterThan(assetBalanceBN)) {
      return 'Exceeds balance'
    }
    if (inputValueInUSD && +inputValueInUSD < MIN_DEPOSIT_USD) {
      return 'Deposit amount cannot be less than 1$'
    }
    return null
  }

  const [error, setError] = useState('')

  useEffect(() => {
    const inputValueBN = BigNumber(+inputValue)
    const assetBalanceBN = BigNumber(assetBalance)
    const validationError = validateInput(inputValueBN, assetBalanceBN)

    if (validationError) {
      setError(validationError)
      return
    }

    setError('')
  }, [asset, assetBalance, inputValue, inputValueInUSD])

  // Input handling
  const handleAction = (type: InputType, value: string) => {
    if (!value) {
      setInputValue('')
      setInputValueInUSD('')
      return
    }

    const assetQuoteBN = BigNumber(
      swapRoute?.action?.fromToken?.priceUSD || asset?.rate || 1,
    )
    const numericValue = BigNumber(value)

    if (type === 'usd') {
      setInputValueInUSD(value)
      setInputValue(calculateTokenValue(numericValue, assetQuoteBN).toString())
    } else {
      setInputValue(value)
      setInputValueInUSD(calculateUSDValue(numericValue, assetQuoteBN))
    }
  }

  return (
    <div>
      {/* Deposit Input Section */}
      <div
        className={cn(
          'bg-input-default py-6 px-8 max-lg:px-3 border-y border-stroke-100',
          error && 'bg-input-error',
        )}
      >
        <span className="text-[0.875rem] font-medium leading-6 text-text-2100 opacity-50">
          You deposit
        </span>
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            <SwappableInputs
              tokenValue={inputValue}
              usdValue={inputValueInUSD}
              onTokenValueChange={(value) => handleAction('token', value)}
              onUsdValueChange={(value) => handleAction('usd', value)}
              error={error}
              asset={asset ? { ...asset, balance: BigInt(asset.balance) } : undefined}
              onMaxClick={() => handleAction('token', prettyAssetBalance)}
              rightElement={
                isConnected ? <SelectDepositAsset /> : <SelectWithoutWalletPlaceholder />
              }
            />
          </div>
        </div>
        {error && <p className="mt-3 text-lg text-red-100">{error}</p>}
      </div>

      {/* Vault Selection Section */}
      <div className="flex w-full justify-between gap-4 px-4">
        <VaultInfoBox vaultName="USDC" apy={`${Math.trunc(bestUSDCAPy)}%`} />
        <VaultInfoBox vaultName="USDT" apy={`${Math.trunc(bestUSDTAPy)}%`} />
      </div>

      {/* Deposit Details Section */}
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

      {/* Action Button */}
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
