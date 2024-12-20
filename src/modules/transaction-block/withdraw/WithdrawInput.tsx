import { AmountInput } from '@components/amount-input/AmountInput'
import { Button } from '@components/ui/button'
import type { ChainType } from '@constants/chains.ts'
import { useAppKit } from '@reown/appkit/react'
import { cn } from '@utils/cn'
import { formatAmount, formatValueWithPrecision } from '@utils/formatValue.ts'
import { useEffect, useMemo, useState } from 'react'
import { formatUnits, parseUnits } from 'viem'
import { useAccount } from 'wagmi'

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
    setInputError,
    setWithdrawToNetwork,
  } = useTxStore()

  const [validationError, setValidationError] = useState('')

  const { open: openConnectModal } = useAppKit()

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
      setValidationError('Exceeds balance')
      setInputError('Exceeds balance')
      return
    }

    if (+inputValueInUSD < 1 && +inputValueInUSD > 0) {
      return setValidationError('Withdraw amount cannot be less than 1$')
    }

    setValidationError('')
    setInputError(null)
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
    <div>
      <div
        className={cn(
          'bg-input-default dark:bg-input-active py-6 px-8 max-lg:px-3 border-y border-stroke-100',
          validationError && 'bg-input-error',
        )}
      >
        <span className="font-montreal text-[0.875rem] font-medium leading-6 text-text-2100/50">
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
              tokenLabel={assetData?.stable}
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
        {validationError && (
          <p className="mt-3 text-lg text-red-100">{validationError}</p>
        )}
      </div>
      {mtToken && withdrawToAnotherChain && (
        <div
          className={cn(
            'bg-white dark:bg-input-active py-6 px-8 max-lg:px-3',
            validationError && 'bg-input-error',
          )}
        >
          <span className="font-montreal text-[0.875rem] font-medium leading-6 text-text-2100/50">
            You receive
          </span>
          <div className="flex w-full items-center justify-between">
            <AmountInput
              value={inputValue}
              error={validationError}
              decimals={6}
              disabled
            />

            <SelectWithdrawNetworkModal />
          </div>
        </div>
      )}
      <div className="flex flex-col items-center justify-center px-4 py-3">
        {isConnected ? (
          <Button
            size="lg"
            disabled={!inputValue || !!validationError}
            className="w-full rounded-2xl px-[1.88rem] py-4 text-base/6 normal-case"
            onClick={handleReview}
          >
            Withdraw
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
    </div>
  )
}
