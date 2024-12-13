import { AmountInput } from '@components/amount-input/AmountInput'
import { ChoiceBox } from '@components/box/ChoiceBox'
import { Button } from '@components/ui/button'
import { useVaultAPY } from '@hooks/useVaultAPY'
import { useAppKit } from '@reown/appkit/react'
import { cn } from '@utils/cn'
import { formatValueWithPrecision } from '@utils/formatValue'
import BigNumber from 'bignumber.js'
import { useEffect, useRef, useState } from 'react'
import { formatUnits } from 'viem'
import { useAccount } from 'wagmi'

import { SelectWithoutWalletPlaceholder } from '../SelectWithoutWalletPlaceholder'
import { useTxStore } from '../store/useTxStore'
import { SwappableInputs } from './components/SwappableInputs'
import { VaultSelection } from './components/VaultSelection'
import { SelectDepositAsset } from './SelectDepositAssetModal'
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
  const { bestUSDCApy, bestUSDTApy, isLoading: isStrategiesLoading } = useVaultAPY()
  const {
    depositAsset: asset,
    inputValue,
    inputValueInUSD,
    depositTotalAmount,
    vault,
    swapRoute,
    setInputValue,
    setCurrentModal,
    setInputValueInUSD,
    setVault,
  } = useTxStore()

  const { open: openConnectModal } = useAppKit()

  // Vault selection logic
  const vaultSet = useRef(false)
  useEffect(() => {
    if (!vaultSet.current && !isStrategiesLoading) {
      if (bestUSDCApy !== undefined && bestUSDTApy !== undefined) {
        setVault(Number(bestUSDCApy) > Number(bestUSDTApy) ? 'USDC' : 'USDT')
      } else {
        setVault(bestUSDCApy === undefined ? 'USDT' : 'USDC')
      }
      vaultSet.current = true
    }
  }, [bestUSDCApy, bestUSDTApy, setVault, isStrategiesLoading])

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
          'bg-input-default dark:bg-input-active py-6 px-8 max-lg:px-3 border-y border-stroke-100',
          error && 'bg-input-error',
        )}
      >
        <span className="font-aeonik text-[0.875rem] font-medium leading-6 text-text-2100 opacity-50">
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

      <VaultSelection />

      {/* Deposit Details Section */}
      <div
        className={cn(
          'flex w-full flex-col items-start justify-between py-6 px-8 max-lg:mt-2 max-lg:px-3 border border-stroke-100',
          error && 'bg-input-error',
        )}
      >
        <span className="text-[0.875rem] font-medium leading-6 text-text-2100 opacity-50">
          You stake
        </span>
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
          <ChoiceBox
            disabled
            value={`${vault} Vault`}
            symbol={vault}
            className="overflow-visible px-4"
          />
        </div>
      </div>

      {/* Action Button */}
      <div className="flex flex-col items-center justify-center px-4 py-3">
        {isConnected ? (
          <Button
            size="lg"
            disabled={!inputValue || !!error}
            className="w-full rounded-2xl px-[1.88rem] py-4 text-base/6 normal-case"
            onClick={() => setCurrentModal('review')}
          >
            {inputValue && +inputValue > 0 ? 'Deposit' : 'Enter the amount'}
          </Button>
        ) : (
          <Button
            size="lg"
            className="w-full rounded-2xl px-[1.88rem] py-4 text-base/6 normal-case"
            onClick={() => openConnectModal({ view: 'Connect' })}
          >
            Connect Wallet
          </Button>
        )}
      </div>
      <ZapFee />
    </div>
  )
}
