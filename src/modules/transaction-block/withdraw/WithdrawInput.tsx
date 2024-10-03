import Wallet from '@assets/icons/wallet.svg'
import { AmountInput } from '@components/amount-input/AmountInput'
import { Button } from '@components/ui/button'
import { Switch } from '@components/ui/switch.tsx'
import type { ChainType } from '@constants/chains.ts'
import { cn } from '@utils/cn'
import { formatAmount } from '@utils/formatValue.ts'
import type { HTMLAttributes, ReactNode } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { formatUnits, parseUnits } from 'viem'
import { useAccount } from 'wagmi'

import DollarInput from '../components/DollarInput.tsx'
import { SelectWithoutWalletPlaceholder } from '../SelectWithoutWalletPlaceholder'
import { useTxStore } from '../store/useTxStore'
import { SelectWithdrawAssetModal } from './SelectWithdrawAssetModal'
import { SelectWithdrawNetworkModal } from './SelectWithdrawNetwork.tsx'

interface InputWrapperProperties extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  validationError: string
  title?: string
}

export const InputWrapper = ({
  children,
  validationError,
  title,
  className,
}: InputWrapperProperties) => {
  return (
    <div
      className={cn(
        'rounded-2xl bg-input-default p-6 max-lg:px-3 flex flex-col gap-3',
        validationError && 'bg-input-error',
        className,
      )}
    >
      {title && <h3 className="text-[1.125rem] leading-[120%] text-gray-100">{title}</h3>}
      {children}
    </div>
  )
}

export const WithdrawInput = () => {
  const { isConnected } = useAccount()
  const {
    inputValue,
    setInputValue,
    mtToken,
    setWithdrawAmount,
    setCurrentModal,
    inputValueInUSD,
    setInputValueInUSD,
    setWithdrawToNetwork,
  } = useTxStore()

  const [withdrawToAnotherChain, setWithdrawToAnotherChain] = useState(false)

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

  return (
    <div>
      <InputWrapper
        title={mtToken ? 'You withdraw' : undefined}
        validationError={validationError}
      >
        <div className="flex w-full items-center justify-between gap-2">
          {mtToken ? (
            <AmountInput
              value={inputValue}
              error={validationError}
              decimals={6}
              onChange={handleInputChange}
              disabled={!isConnected || !mtToken}
            />
          ) : (
            <p className="text-md text-gray-100 max-lg:text-sm">
              Select the desired asset...
            </p>
          )}

          {isConnected ? (
            <SelectWithdrawAssetModal />
          ) : (
            <SelectWithoutWalletPlaceholder />
          )}
        </div>
        {mtToken ? (
          <div className="flex w-full items-center justify-between">
            <DollarInput disabled value={inputValueInUSD} error={!!validationError} />

            <div className="flex items-center">
              <Wallet className="size-[1.375rem] overflow-visible max-lg:size-3" />
              <p className="ml-2 text-lg/[0] text-gray-100 max-lg:text-xs">
                {Number(maxBalance).toFixed(6)}
              </p>
              <button
                type="button"
                className="ml-[0.62rem] font-bold uppercase text-main-100 transition-colors hover:text-main-50 max-lg:text-xs"
                onClick={() => maxBalance && handleInputChange(maxBalance)}
              >
                Max
              </button>
            </div>
          </div>
        ) : null}
      </InputWrapper>

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

      {mtToken && (
        <div className="mt-3 flex items-start justify-between self-stretch rounded-2xl border border-stroke-100 p-6">
          <span className="leading-[120%] text-text-80 lg:text-[1.1875rem]">
            Withdraw to another chain
          </span>
          <Switch
            checked={withdrawToAnotherChain}
            onCheckedChange={setWithdrawToAnotherChain}
          />
        </div>
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
