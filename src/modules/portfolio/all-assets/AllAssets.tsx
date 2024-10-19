import Filter from '@assets/icons/filter.svg'
import { MobileCheckboxSelect } from '@components/select/MobileCheckboxSelect'
import {
  DrawerIconTrigger,
  MobileFiltersDrawer,
} from '@components/select/MobileFiltersDrawer'
import { MultiSelect } from '@components/select/MultiSelect'
import type { OptionType } from '@components/select/Select'
import { DustTooltip } from '@components/tooltip/DustTooltip'
import { SELECT_CHAINS } from '@constants/select-constant'
import { cn } from '@utils/cn'
import { type ComponentProps, useState } from 'react'

import { AssetItem, AssetItemSkeleton } from './AssetItem'
import { EmptyState } from './EmptyState'
import { useAllAssets } from './useAllAssets'

interface AllAssetsProperties extends ComponentProps<'div'> {}

export const AllAssets = (props: AllAssetsProperties) => {
  const { className, ...rest } = props
  const [chains, setChains] = useState<OptionType[]>([])
  const { tokens, isLoading, potentialUsdProfit } = useAllAssets(chains)

  const renderBody = () => {
    switch (true) {
      case isLoading: {
        return (
          <div className="mt-6 flex flex-col gap-6 overflow-auto">
            {Array.from({ length: 4 }).map((_, i) => (
              <AssetItemSkeleton key={i} />
            ))}
          </div>
        )
      }
      case tokens.length === 0: {
        return <EmptyState />
      }
      default: {
        return (
          <div className="mt-6">
            <DustTooltip usdValue={potentialUsdProfit} />
            <div className={cn('-mr-2 mt-6 flex flex-col gap-6 overflow-auto pr-2')}>
              {tokens.map((token, i) => (
                <AssetItem key={i} token={token} />
              ))}
            </div>
          </div>
        )
      }
    }
  }

  return (
    <div className={cn('', className)} {...rest}>
      <div className="flex items-center justify-between">
        <h6 className="whitespace-nowrap text-lg text-text">All assets</h6>
        <MultiSelect
          align="end"
          className="w-fit max-lg:hidden"
          classNames={{
            content: 'rounded-[1rem] text-sm w-full border border-gray-20',
            trigger:
              'h-[2.125rem] w-fit text-sm [box-shadow:0px_2px_1px_0px_rgba(135,_99,_243,_0.12)] rounded-xl',
          }}
          options={SELECT_CHAINS}
          value={chains}
          onChange={(value) => setChains(value)}
          placeholder="All Chains"
          variant="color2"
        />
        <MobileFiltersDrawer
          className="lg:hidden"
          title="Filters"
          resetFilters={() => {
            setChains([])
          }}
          trigger={<DrawerIconTrigger Icon={Filter} active={chains.length > 0} />}
        >
          <MobileCheckboxSelect
            label="Chains"
            value={chains}
            options={SELECT_CHAINS}
            onChange={setChains}
          />
        </MobileFiltersDrawer>
      </div>
      {renderBody()}
    </div>
  )
}
