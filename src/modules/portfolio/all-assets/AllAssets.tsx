import Filter from '@assets/icons/filter.svg'
import { MobileCheckboxSelect } from '@components/select/MobileCheckboxSelect'
import {
  DrawerIconTrigger,
  MobileFiltersDrawer,
} from '@components/select/MobileFiltersDrawer'
import type { OptionType } from '@components/select/Select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { SELECT_CHAINS_FOR_PORTFOLIO } from '@constants/select-constant'
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

  const renderTokens = () => {
    return (
      <div className="">
        {/* <DustTooltip usdValue={potentialUsdProfit} /> */}
        <div className="mt-4">
          <div className="h-auto w-full rounded-xl bg-light-blue-15 px-4 py-2 text-center text-white">
            <span className="text-base text-main-100 opacity-70">Yield Potential</span>{' '}
            <span className="text-base text-main-100">
              ${potentialUsdProfit}
              /year
            </span>
          </div>
        </div>
        <div
          className={cn('-mr-2 mt-6 flex flex-col gap-6 overflow-auto pr-2 all-assets')}
        >
          {tokens.map((token, i) => (
            <AssetItem key={i} token={token} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={cn('', className)} {...rest}>
      {isLoading ? (
        <div className="flex flex-col gap-6 overflow-auto">
          {Array.from({ length: 4 }).map((_, i) => (
            <AssetItemSkeleton key={i} />
          ))}
        </div>
      ) : tokens?.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="">
          {/* <MultiSelect
        id="all-assets-chains"
        align="end"
        className="w-fit max-lg:hidden"
        classNames={{
          content: 'rounded-[1rem] text-sm w-full border border-gray-20',
          trigger:
            'h-[2.125rem] w-fit text-sm [box-shadow:0px_2px_1px_0px_rgba(135,_99,_243,_0.12)] rounded-xl',
        }}
        options={SELECT_CHAINS_FOR_PORTFOLIO}
        value={chains}
        onChange={(value) => setChains(value)}
        placeholder="All Chains"
        variant="color2"
      />  */}

          <Tabs defaultValue="tokens" className="">
            <TabsList className="w-full justify-start gap-4 border-b">
              <TabsTrigger
                variant="unstyled"
                value="tokens"
                className="py-4 text-md data-[state='active']:border-b-2 data-[state='active']:border-b-main-100 data-[state='active']:text-main-100"
              >
                Tokens
              </TabsTrigger>
              <TabsTrigger
                value="activity"
                variant="unstyled"
                className="py-4 text-md data-[state='active']:border-b-2 data-[state='active']:border-b-main-100 data-[state='active']:text-main-100"
              >
                Chains
              </TabsTrigger>
            </TabsList>
            <TabsContent value="tokens">{renderTokens()}</TabsContent>
            {/* <TabsContent value="activity">
          <UserActivity />
        </TabsContent> */}
          </Tabs>
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
              options={SELECT_CHAINS_FOR_PORTFOLIO}
              onChange={setChains}
            />
          </MobileFiltersDrawer>
        </div>
      )}
    </div>
  )
}
