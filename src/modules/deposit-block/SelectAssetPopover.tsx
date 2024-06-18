import Close from '@assets/icons/close.svg'
import { Select } from '@components/select/Select'
import { TokenIconComponent } from '@components/token-icon'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { PopoverClose } from '@radix-ui/react-popover'
import { useState } from 'react'

import { useDepositStore } from './store/useDepositStore'

interface SelectAssetPopoverProperties {}

const vaults = [
  { token: 'USDT', apy: 34 },
  { token: 'USDC', apy: 31 },
]

export const SelectVault = (_props: SelectAssetPopoverProperties) => {
  const { vault, setVault } = useDepositStore()
  const [isOpened, setIsOpened] = useState(false)
  const onChange = (_vault: string) => {
    setVault(_vault)
    setIsOpened(false)
  }
  return (
    <Popover open={isOpened} onOpenChange={() => setIsOpened(!isOpened)}>
      <PopoverTrigger>
        <Select value={vault} symbol={vault} opened={isOpened} />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[34.75rem] text-text-100">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl uppercase">choose vault</h2>
          <PopoverClose>
            <Close />
          </PopoverClose>
        </div>
        <div className="mt-6 space-y-2">
          {vaults.map((item) => (
            <button
              type="button"
              key={item.token}
              className="flex w-full items-center justify-between rounded-xl border border-stroke px-4 py-[1.19rem] hover:bg-violet-4"
              onClick={() => onChange(item.token)}
            >
              <div className="flex items-center gap-3">
                <TokenIconComponent symbol={item.token} className="size-8" />
                <span className="text-[1.25rem]/[1.75rem] uppercase">{item.token}</span>
              </div>
              <div className="text-base font-bold text-gray-100">APY {item.apy}%</div>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
