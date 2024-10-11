import Close from '@assets/icons/close.svg'
import { ChoiceBox } from '@components/box/ChoiceBox'
import { ShadowBox } from '@components/box/ShadowBox'
import { TokenIconComponent } from '@components/token-icon'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import type { ChainType } from '@constants/chains'
import { VAULTS } from '@constants/vaults'
import { PopoverClose } from '@radix-ui/react-popover'
import { cn } from '@utils/cn'
import { useCallback, useEffect, useMemo, useState } from 'react'

import type { Vault } from '../store/useTxStore'
import { useTxStore } from '../store/useTxStore'
import { filterVaultsByChain } from '../utils/filterChainsByVault'

interface SelectAssetPopoverProperties {}

export const SelectVault = (_props: SelectAssetPopoverProperties) => {
  const { vault, setVault, depositToNetwork } = useTxStore()
  const [isOpened, setIsOpened] = useState(false)

  const onChange = useCallback(
    (_vault: Vault) => {
      setVault(_vault)
      setIsOpened(false)
    },
    [setVault],
  )

  const filteredVaults = useMemo(
    () => filterVaultsByChain(depositToNetwork as ChainType, [...VAULTS]),
    [depositToNetwork],
  )

  useEffect(() => {
    if (filteredVaults.length === 1) {
      onChange(filteredVaults[0])
    }
  }, [filteredVaults, onChange])

  const handleOpenChange = useCallback(() => {
    if (depositToNetwork) {
      setIsOpened(!isOpened)
    }
  }, [depositToNetwork, isOpened])

  if (!vault) {
    return (
      <ShadowBox
        className={cn(
          'flex cursor-pointer items-center justify-center gap-3 rounded-full px-7 text-md transition-shadow hover:shadow-shadow--hover dark:hover:shadow-dark-shadow--hover max-lg:gap-2 max-lg:px-4 max-lg:py-3 max-lg:text-base lg:min-h-14 min-w-[10.5rem]',
        )}
      >
        <div className="size-6 animate-pulse rounded-full border border-stroke-100" />
      </ShadowBox>
    )
  }

  return (
    <Popover open={isOpened} onOpenChange={handleOpenChange}>
      <PopoverTrigger>
        <ChoiceBox
          disabled={!depositToNetwork || filteredVaults.length <= 1}
          className="min-w-[10.5rem]"
          value={vault}
          symbol={vault}
          opened={isOpened}
        />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[34.75rem] text-text max-lg:w-screen">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl uppercase">choose vault</h2>
          <PopoverClose>
            <Close />
          </PopoverClose>
        </div>
        <div className="mt-6 space-y-2">
          {filteredVaults.map((_vault) => (
            <button
              type="button"
              key={_vault}
              className="flex w-full items-center justify-between rounded-xl border border-stroke-100 px-4 py-[1.19rem] hover:bg-input-default"
              onClick={() => onChange(_vault)}
            >
              <div className="flex items-center gap-3">
                <TokenIconComponent symbol={_vault} className="size-8" />
                <span className="text-[1.25rem]/[1.75rem] uppercase">{_vault}</span>
              </div>
              {/* <div className="text-base font-bold text-gray-100">APY {12}%</div> */}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
