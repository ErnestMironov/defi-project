import Wallet from '@assets/icons/wallet.svg'
import { AmountInput } from '@components/amount-input/AmountInput'
import { ShadowBox } from '@components/box/ShadowBox'
import { AnimatedTabs } from '@components/tab/AnimatedTabs'
import { Button } from '@components/ui/button'
import { useDisclosure } from '@hooks/useDisclosure'
import { cn } from '@utils/cn'
import { BigNumber } from 'bignumber.js'
import clsx from 'clsx'
import { type ComponentProps, useEffect, useState } from 'react'

import { DepositReviewModal } from './DepositReviewModal'
import { SelectAsset } from './SelectAssetModal'
import { SelectVault } from './SelectAssetPopover'
import { useDepositStore } from './store/useDepositStore'

interface DepositBlockProperties extends ComponentProps<'div'> {}

const TABS = [
  { id: 'deposit', label: 'Deposit' },
  { id: 'withdraw', label: 'Withdraw' },
]

const MOCK_MAX = 7472.09

export const DepositBlock = (props: DepositBlockProperties) => {
  const { className, ...rest } = props

  const [isConnected, { toggle }] = useDisclosure(true)
  const [activeTab, setActiveTab] = useState(TABS[0].id)

  const { asset } = useDepositStore()

  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState('')
  useEffect(() => {
    if (BigNumber(inputValue).isGreaterThan(BigNumber(MOCK_MAX))) {
      setError('Exceeds balance')
      return
    }
    setError('')
  }, [inputValue])

  return (
    <ShadowBox
      className={clsx('flex w-full flex-col gap-9 px-6 py-8', className)}
      {...rest}
    >
      <AnimatedTabs
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={(value) => setActiveTab(value)}
      />
      <div>
        <div className={cn('rounded-2xl bg-violet-4 p-6', error && 'bg-error-card-40')}>
          <div className="flex w-full items-center justify-between">
            {isConnected ? (
              <AmountInput
                value={inputValue}
                error={error}
                decimals={18}
                onChange={(value) => setInputValue(value)}
                after="USDC"
              />
            ) : (
              <p className="text-md text-gray-100">Select the desired asset...</p>
            )}

            <SelectAsset />
          </div>
          {isConnected && asset && (
            <div className="mt-3 flex w-full items-center justify-between">
              {error ? (
                <p className="text-lg text-error">{error}</p>
              ) : (
                <p className="text-lg text-gray">$ 0.0</p>
              )}
              <div className="flex items-center">
                <Wallet className="size-[1.375rem] overflow-visible" />
                <p className="ml-2 text-lg/[0] text-gray">
                  {BigNumber(MOCK_MAX).toFormat(2)}
                </p>
                <button
                  type="button"
                  className="ml-[0.62rem] font-bold uppercase text-main"
                >
                  Max
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="mt-4 flex w-full flex-col items-center justify-between rounded-2xl bg-violet-4 p-6">
          <div className="flex w-full items-center justify-between">
            {isConnected ? (
              <AmountInput
                value={inputValue}
                error={error}
                decimals={18}
                onChange={(value) => setInputValue(value)}
              />
            ) : (
              <p className="text-md text-gray-100">Select the desired vault...</p>
            )}
            <SelectVault />
          </div>
          {isConnected && asset && (
            <div className="mt-3 flex w-full items-center justify-between">
              <p className="text-lg text-gray">$ 0.0</p>
              <div className="flex items-center">
                <p className="ml-2 text-lg/[0] text-gray">APY 34%</p>
              </div>
            </div>
          )}
        </div>
        {isConnected && (
          <p className="mt-4 text-base text-gray">
            1 USDT = 0.95723 USDC <span className="text-text-80">($3,2382)</span>
          </p>
        )}
      </div>
      <Button className="w-full" size="lg" onClick={toggle}>
        Connect wallet
      </Button>
      <DepositReviewModal trigger={<div>open review</div>} />
    </ShadowBox>
  )
}
