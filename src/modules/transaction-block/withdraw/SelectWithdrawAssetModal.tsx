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
import { type ComponentProps, useState } from 'react'

import { VAULTS } from '../deposit/SelectVault'
import { useDepositStore } from '../store/useDepositStore'

interface SelectWithdrawAssetModalProperties extends ComponentProps<'div'> {}

export const SelectWithdrawAssetModal = (_props: SelectWithdrawAssetModalProperties) => {
  const { vault, setVault } = useDepositStore()
  const [opened, setOpened] = useState(false)
  const onChange = (_asset: string) => {
    setVault(_asset)
    setOpened(false)
  }
  return (
    <Dialog open={opened} onOpenChange={() => setOpened(!opened)}>
      <DialogTrigger>
        <Select
          value={vault}
          icon={<TokenIconComponent symbol={vault} className="size-[2.14288rem]" />}
        />
      </DialogTrigger>
      <DialogContent className="gap-6 text-text-100">
        <DialogHeader>
          <DialogTitle>Select asset</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          {VAULTS.map(({ token }) => (
            <button
              type="button"
              onClick={() => onChange(token)}
              className="flex w-full cursor-pointer items-center rounded-xl border border-stroke-100 px-4 py-3 hover:bg-input-default"
            >
              <TokenIconComponent symbol={token} className="size-8" />
              <div className="ml-3 flex flex-col items-start text-[1.25rem]/[1.75rem]">
                {token}
              </div>
              <div className="ml-auto flex flex-col items-end gap-1">
                <p className="text-base text-text-100">7,472.09 {token}</p>
                <p className="text-semi-base font-bold text-gray-80">$7,472.09</p>
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
