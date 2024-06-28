/* eslint-disable @typescript-eslint/no-shadow */
import { Select } from '@components/select/Select'
import { TokenIconComponent } from '@components/token-icon'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog'
import { formatAmountValue } from '@utils/formatValue'
import BigNumber from 'bignumber.js'
import { type ComponentProps, useState } from 'react'

import type { Vault } from '../deposit/SelectVault'
import { VAULTS } from '../deposit/SelectVault'
import { useTxStore } from '../store/useDepositStore'
import { useVaultBalance, VAULT_ADDRESSES } from './hooks/useVaultBalance'

interface SelectWithdrawAssetModalProperties extends ComponentProps<'div'> {}

export const SelectWithdrawAssetModal = (_props: SelectWithdrawAssetModalProperties) => {
  const { vault, setVault } = useTxStore()
  const [opened, setOpened] = useState(false)

  const { tokenBalance: tokenBalanceUsdc } = useVaultBalance(VAULT_ADDRESSES.USDC)
  const { tokenBalance: tokenBalanceUsdt } = useVaultBalance(VAULT_ADDRESSES.USDT)
  const tokenBalanceUsdcUsd = formatAmountValue(
    BigNumber((tokenBalanceUsdc as any) || 0)
      .div(10 ** 6)
      .toString(),
  )
  const tokenBalanceUsdtUsd = formatAmountValue(
    BigNumber((tokenBalanceUsdt as any) || 0)
      .div(10 ** 6)
      .toString(),
  )

  const onChange = (_asset: Vault) => {
    setVault(_asset)
    setOpened(false)
  }
  return (
    <Dialog open={opened} onOpenChange={() => setOpened(!opened)}>
      <DialogTrigger>
        <Select
          value={vault}
          icon={
            <TokenIconComponent
              symbol={vault}
              className="size-[2.14288rem] max-lg:size-[1.125rem]"
            />
          }
        />
      </DialogTrigger>
      <DialogContent className="gap-6 text-text">
        <DialogHeader>
          <DialogTitle>Select asset</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          {VAULTS.map((vault) => {
            const value = vault === 'USDC' ? tokenBalanceUsdcUsd : tokenBalanceUsdtUsd
            return (
              <button
                type="button"
                onClick={() => onChange(vault)}
                className="flex w-full cursor-pointer items-center rounded-xl border border-stroke-100 px-4 py-3 hover:bg-input-default"
              >
                <TokenIconComponent symbol={vault} className="size-8" />
                <div className="ml-3 flex flex-col items-start text-[1.25rem]/[1.75rem]">
                  {vault}
                </div>
                <div className="ml-auto flex flex-col items-end gap-1">
                  <p className="text-base text-text">
                    {value} {vault}
                  </p>
                  <p className="text-semi-base font-bold text-gray-80">${value}</p>
                </div>
              </button>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}
