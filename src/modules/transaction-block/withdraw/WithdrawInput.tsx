import { AmountInput } from '@components/amount-input/AmountInput'
import { Button } from '@components/ui/button'
import type { ChainType } from '@constants/chains.ts'
import { cn } from '@utils/cn'
import { formatAmount, formatValueWithPrecision } from '@utils/formatValue.ts'
import { useEffect, useMemo, useState } from 'react'
import { formatUnits, parseUnits } from 'viem'
import { useAccount } from 'wagmi'

import DollarInput from '../components/DollarInput'
import { InputWrapper } from '../components/InputWrapper'
import { SwappableInputs } from '../deposit/components/SwappableInputs'
import { SelectWithoutWalletPlaceholder } from '../SelectWithoutWalletPlaceholder'
import { useTxStore } from '../store/useTxStore'
import { SelectWithdrawAssetModal } from './SelectWithdrawAssetModal'
import { SelectWithdrawNetworkModal } from './SelectWithdrawNetwork'

export const WithdrawInput = () => {
  const { isConnected } = useAccount()
  const {
    inputValue,
    setInputValue,
    mtToken,
    setWithdrawAmount,
    setCurrentModal,
    inputValueInUSD,
    withdrawToAnotherChain,
    setInputValueInUSD,
    setWithdrawToNetwork,
  } = useTxStore()

  const [validationError, setValidationError] = useState('')

  const maxBalance = mtToken?.stableBalance
    ? formatUnits(BigInt(mtToken?.stableBalance), mtToken?.decimals ?? 6)
    : '0'

  const inputValueBN = useMemo(
    () => parseUnits(inputValue, mtToken?.decimals ?? 6),
    [inputValue, mtToken?.decimals],
  )
  const balanceBN = useMemo(
    () => BigInt(mtToken?.stableBalance?.toString() || '0'),
    [mtToken?.stableBalance],
  )

  useEffect(() => {
    if (!inputValueInUSD || Number.isNaN(Number(inputValueInUSD))) {
      console.warn('Invalid inputValueInUSD:', inputValueInUSD)
      return
    }
    setWithdrawAmount(inputValueInUSD)
  }, [inputValueInUSD, setWithdrawAmount])

  useEffect(() => {
    if (inputValueBN > balanceBN) {
      return setValidationError('Exceeds balance')
    }

    if (+inputValueInUSD < 1 && +inputValueInUSD > 0) {
      return setValidationError('Withdraw amount cannot be less than 1$')
    }

    setValidationError('')
  }, [inputValueBN, inputValueInUSD, balanceBN])

  useEffect(() => {
    if (!withdrawToAnotherChain) {
      setWithdrawToNetwork(mtToken?.chainId as ChainType)
    }
  }, [withdrawToAnotherChain, mtToken?.chainId, setWithdrawToNetwork])

  const handleReview = () => {
    setCurrentModal('review')
  }

  const handleInputChange = (value: string) => {
    setInputValue(value)
    setWithdrawAmount(value)
    setInputValueInUSD(
      formatAmount(value, {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      }),
    )
  }

  const prettyMaxBalance = formatValueWithPrecision(maxBalance, 5)

  const assetData = mtToken
    ? {
        ...mtToken,
        balance: BigInt(mtToken.balance),
        contract_decimals: mtToken.decimals,
        contract_ticker_symbol: mtToken.symbol,
      }
    : undefined

  return (
    <div
      className={cn(
        'bg-input-default dark:bg-input-active py-6 px-8 max-lg:px-3 border-y border-stroke-100',
        validationError && 'bg-input-error',
      )}
    >
      <span className="font-aeonik text-[0.875rem] font-medium leading-6 text-text-2100 opacity-50">
        You withdraw
      </span>
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0 flex-1">
          <SwappableInputs
            tokenValue={inputValue}
            usdValue={inputValueInUSD}
            onTokenValueChange={(value) => handleInputChange(value)}
            onUsdValueChange={(value) => handleInputChange(value)}
            error={validationError}
            asset={assetData}
            onMaxClick={() => handleInputChange(prettyMaxBalance)}
            rightElement={
              isConnected ? (
                <SelectWithdrawAssetModal />
              ) : (
                <SelectWithoutWalletPlaceholder />
              )
            }
          />
        </div>
      </div>
      {validationError && <p className="mt-3 text-lg text-red-100">{validationError}</p>}

      {mtToken && withdrawToAnotherChain && (
        <InputWrapper
          title="You will receive "
          className="mt-3"
          validationError={validationError}
        >
          <div className="flex w-full items-center justify-between">
            <AmountInput
              value={inputValue}
              error={validationError}
              decimals={6}
              disabled
            />

            <SelectWithdrawNetworkModal />
          </div>
          <div className="mt-3 flex w-full items-center justify-between">
            <DollarInput disabled value={inputValueInUSD} error={!!validationError} />
          </div>
        </InputWrapper>
      )}

      {validationError && (
        <p className="mt-3 text-lg text-red-100 max-lg:text-xs">{validationError}</p>
      )}
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
