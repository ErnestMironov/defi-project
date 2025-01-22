import { AmountInput } from '@components/amount-input/AmountInput'
import { Button } from '@components/ui/button'
import type { ChainType } from '@constants/chains.ts'
import { useAppKit } from '@reown/appkit/react'
import { cn } from '@utils/cn'
import { formatAmount, formatValueWithPrecision } from '@utils/formatValue.ts'
import { useEffect, useMemo, useState } from 'react'
import type { Address } from 'viem'
import { formatUnits, parseUnits } from 'viem'
import { useAccount } from 'wagmi'

import { SwappableInputs } from '../deposit/components/SwappableInputs'
import { useTxStore } from '../store/useTxStore'
import { useGetBurnedPoints } from './hooks/useGetBurnedPoints'
import { SelectWithdrawAssetModal } from './SelectWithdrawAssetModal'
import { SelectWithdrawNetworkModal } from './SelectWithdrawNetwork'
import { WithdrawPointsBurn } from './WithdrawPointsBurn'

export const WithdrawInput = () => {
  const { isConnected, address } = useAccount()
  const {
    withdrawInputValue: inputValue,
    setWithdrawInputValue: setInputValue,
    mtToken,
    setWithdrawAmount,
    setCurrentModal,
    withdrawInputValueInUSD: inputValueInUSD,
    withdrawToAnotherChain,
    setWithdrawInputValueInUSD: setInputValueInUSD,
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
      setValidationError('Withdraw amount cannot be less than 1$')
      return
    }

    if (+inputValue >= 1e15) {
      setValidationError('Amount is too large')
      setInputError('Amount is too large')
      return
    }

    setValidationError('')
    setInputError(null)
  }, [inputValueBN, inputValueInUSD, balanceBN, inputValue, setInputError])

  useEffect(() => {
    if (!withdrawToAnotherChain) {
      setWithdrawToNetwork(mtToken?.chainId as ChainType)
    }
  }, [withdrawToAnotherChain, mtToken?.chainId, setWithdrawToNetwork])

  const handleReview = () => {
    setCurrentModal('review')
  }

  const { data: burnedPoints } = useGetBurnedPoints({
    address: address as Address,
    withdrawAmount: Number(inputValueInUSD || 0),
  })

  const handleInputChange = (value: string) => {
    const cleanValue = value.replaceAll(/[^\d.]/g, '')
    const truncatedValue = cleanValue.slice(0, 18)

    const parts = truncatedValue.split('.')
    const formattedValue =
      parts.length > 1 ? `${parts[0]}.${parts.slice(1).join('')}` : truncatedValue

    setInputValue(formattedValue)
    setWithdrawAmount(formattedValue)

    if (!formattedValue) {
      setInputValueInUSD('')
      return
    }

    const formattedValueInUSD = formatAmount(formattedValue, {
      maximumFractionDigits: 2,
      minimumFractionDigits: formattedValue.includes('.') ? 2 : 0,
      useGrouping: true,
    })

    const numberValue = Number(formattedValue)
    setInputValueInUSD(
      Number.isNaN(numberValue)
        ? ''
        : formattedValueInUSD === 'N/A'
        ? ''
        : formattedValueInUSD,
    )
  }

  const prettyMaxBalance = formatValueWithPrecision(maxBalance, 5)

  const assetData = mtToken
    ? {
        ...mtToken,
        balance: BigInt(mtToken.stableBalance),
        contract_decimals: mtToken.decimals,
        contract_ticker_symbol: mtToken.symbol,
      }
    : undefined

  const disabledButtonState =
    !inputValue || !!validationError || inputValueInUSD === undefined || inputValue === ''

  return (
    <div>
      <div
        className={cn(
          'bg-input-default dark:bg-input-active py-6 px-8 max-lg:px-3 border-y border-stroke-100',
          validationError && 'bg-input-error',
          !isConnected && 'pointer-events-none opacity-50',
        )}
      >
        <span className="font-montreal text-[0.875rem] font-medium leading-6 text-text-2100/50">
          You withdraw
        </span>
        <div className="flex items-center justify-between gap-2 ">
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
              rightElement={<SelectWithdrawAssetModal />}
            />
          </div>
        </div>
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
              value={inputValue || ''}
              error={validationError}
              decimals={6}
              disabled
            />

            <SelectWithdrawNetworkModal />
          </div>
        </div>
      )}
      <div className="flex flex-col items-center justify-center py-3">
        {(Number(inputValue) > 0 || Number(inputValueInUSD) > 0) && !validationError && (
          <WithdrawPointsBurn
            pointsBurned={
              formatAmount(burnedPoints?.pointsToBurn || 0, {
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
              }) || '0'
            }
          />
        )}

        <div className="flex w-full flex-col items-center justify-center px-4 py-3">
          {isConnected ? (
            <Button
              size="lg"
              disabled={disabledButtonState}
              className={cn(
                'w-full rounded-2xl px-[1.88rem] py-4 text-base/6 normal-case hover:bg-main-80',
                validationError && '!bg-red-5 !text-red-100',
              )}
              onClick={handleReview}
            >
              {validationError || 'Withdraw'}
            </Button>
          ) : (
            <Button
              size="lg"
              className="w-full rounded-2xl px-[1.88rem] py-4 text-base/6 normal-case hover:bg-main-80"
              onClick={() => openConnectModal({ view: 'Connect' })}
            >
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
