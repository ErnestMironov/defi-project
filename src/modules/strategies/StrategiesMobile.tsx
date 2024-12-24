/* eslint-disable unicorn/no-useless-undefined */
import type { StrategiesParameters } from '@api/maat-finance/useStrategies'
import { useInfiniteStrategies } from '@api/maat-finance/useStrategies'
import Asset from '@assets/icons/asset.svg'
import Chain from '@assets/icons/chain.svg'
import Filter from '@assets/icons/filter.svg'
import Protocol from '@assets/icons/protocol.svg'
import { MobileCheckboxSelect } from '@components/select/MobileCheckboxSelect'
import {
  DrawerIconTrigger,
  MobileFiltersDrawer,
} from '@components/select/MobileFiltersDrawer'
import { MobileRadioSelect } from '@components/select/MobileRadioSelect'
import type { OptionType } from '@components/select/Select'
import { SearchInput } from '@components/text-input/SearchInput'
import { Loader } from '@components/ui/loader'
import {
  SELECT_CHAINS,
  SELECT_PROTOCOLS,
  SELECT_TOKENS,
  SORT_BY_APY,
  SORT_BY_TVL,
} from '@constants/select-constant'
import { StrategyMobileList } from '@modules/strategies/StrategyMobileList'
import { BaseContainer } from '@pages/analytics/components/BaseContainer'
import { cn } from '@utils/cn'
import { useMemo, useState } from 'react'
import { isAddress, isHash } from 'viem'

type StrategyFilters = 'tokens' | 'protocols' | 'chains'

interface StrategiesMobileProperties extends React.HTMLAttributes<HTMLDivElement> {
  filters?: StrategyFilters[]
  params?: StrategiesParameters
}

export const StrategiesMobile: React.FC<StrategiesMobileProperties> = (props) => {
  const { className, filters = ['tokens', 'protocols', 'chains'], params } = props
  const [search, setSearch] = useState('')
  const [selectedTokens, setSelectedTokens] = useState<OptionType[]>([])
  const [selectedProtocols, setSelectedProtocols] = useState<OptionType[]>([])
  const [selectedChains, setSelectedChains] = useState<OptionType[]>([])
  const [selectedSort, setSelectedSort] = useState<OptionType | undefined>()

  const currentSort: StrategiesParameters = useMemo(() => {
    switch (selectedSort?.value) {
      case 'Highest APY': {
        return { order_by: 'desc', sort: 'apy' }
      }
      case 'Lowest APY': {
        return { order_by: 'asc', sort: 'apy' }
      }
      case 'Highest TVL': {
        return { order_by: 'desc', sort: 'tvl' }
      }
      case 'Lowest TVL': {
        return { order_by: 'asc', sort: 'tvl' }
      }
      default: {
        return { order_by: 'desc', sort: 'apy' }
      }
    }
  }, [selectedSort])

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPlaceholderData,
  } = useInfiniteStrategies({
    chain: selectedChains.map((chain) => chain.value),
    protocol: selectedProtocols.map((protocol) => protocol.value),
    token: selectedTokens.map((token) => token.value),
    strategy_ids: search && isHash(search) ? [search] : undefined,
    strategy_addresses: search && isAddress(search) ? [search] : undefined,
    ...currentSort,
    ...params,
  })

  const renderFilters = (filter: StrategyFilters) => {
    switch (filter) {
      case 'tokens': {
        return (
          <MobileCheckboxSelect
            label="Tokens"
            className="[&_[cmdk-item]:first-child]:col-span-2"
            icon={<Asset />}
            value={selectedTokens}
            options={SELECT_TOKENS}
            placeholder="All Tokens"
            onChange={setSelectedTokens}
          />
        )
      }
      case 'protocols': {
        return (
          <MobileCheckboxSelect
            label="Protocols"
            icon={<Protocol />}
            value={selectedProtocols}
            options={SELECT_PROTOCOLS}
            placeholder="All Protocols"
            onChange={setSelectedProtocols}
          />
        )
      }
      case 'chains': {
        return (
          <MobileCheckboxSelect
            label="Chains"
            icon={<Chain />}
            value={selectedChains}
            options={SELECT_CHAINS}
            placeholder="All Chains"
            onChange={setSelectedChains}
          />
        )
      }
      default: {
        return null
      }
    }
  }

  return (
    <>
      <BaseContainer {...props} className={cn('overflow-hidden rounded-2xl', className)}>
        <div className="flex items-center gap-4 border-b border-stroke-100 pr-4">
          <div className="flex-1 border-r border-stroke-100">
            <SearchInput
              placeholder="Address / ID"
              classNames={{
                container: 'bg-cards-widget border-none py-[0.81rem] px-4',
                input: 'mx-2',
              }}
              value={search}
              onValueChange={setSearch}
            />
          </div>

          {/* Filters */}
          <MobileFiltersDrawer
            title="Filters"
            resetFilters={() => {
              setSelectedTokens([])
              setSelectedProtocols([])
              setSelectedChains([])
              setSelectedSort(undefined)
            }}
            trigger={
              <DrawerIconTrigger
                Icon={Filter}
                active={
                  selectedTokens.concat(selectedProtocols).concat(selectedChains).length >
                    0 || !!selectedSort
                }
              />
            }
          >
            <div>
              <h6 className="mb-3 text-sm text-text-2100">Sorting</h6>
              <BaseContainer className="rounded-2xl p-1">
                <MobileRadioSelect
                  options={SORT_BY_APY}
                  value={selectedSort}
                  onChange={setSelectedSort}
                />
                <MobileRadioSelect
                  options={SORT_BY_TVL}
                  value={selectedSort}
                  onChange={setSelectedSort}
                />
              </BaseContainer>
            </div>

            {filters.map((filter) => renderFilters(filter))}
          </MobileFiltersDrawer>
        </div>
        <StrategyMobileList
          strategies={data}
          loading={isLoading || isPlaceholderData}
          error={error}
        />
      </BaseContainer>
      {isFetchingNextPage && (
        <div className="mt-6 flex h-8 w-full items-center justify-center">
          <Loader />
        </div>
      )}
      {hasNextPage && !isLoading && (
        <button
          type="button"
          disabled={isFetchingNextPage}
          onClick={() => fetchNextPage()}
          className="mt-4 h-6 w-full text-sm text-text-50 underline"
        >
          See more
        </button>
      )}
    </>
  )
}
