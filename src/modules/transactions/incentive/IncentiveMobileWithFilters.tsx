import type { ChainParameters, TokenParameters } from '@api/maat-finance/types'
import type { IncentiveParameters } from '@api/queries/useIncentives'
import { useInfiniteIncentives } from '@api/queries/useIncentives'
import Filter from '@assets/icons/filter.svg'
import Sort from '@assets/icons/mobile-sort.svg'
import { MobileCheckboxSelect } from '@components/select/MobileCheckboxSelect'
import {
  DrawerIconTrigger,
  MobileFiltersDrawer,
} from '@components/select/MobileFiltersDrawer'
import { MobileRadioSelect } from '@components/select/MobileRadioSelect'
import type { OptionType } from '@components/select/Select'
import { SearchInput } from '@components/text-input/SearchInput'
import { Button } from '@components/ui/button'
import { Loader } from '@components/ui/loader'
import {
  SELECT_CHAINS,
  SELECT_INCENTIVES_ACTIONS,
  SELECT_TOKENS,
  SORT_BY_AMOUNT,
  SORT_BY_DATE,
} from '@constants/select-constant'
import { cn } from '@utils/cn'
import { isHashOrAddress } from '@utils/hash-or-address'
import type { ComponentProps } from 'react'
import { useMemo, useState } from 'react'

import { IncentiveMobileList } from './IncentiveMobileList'

type FilterType = 'actions' | 'tokens' | 'chains'

interface IncentiveMobileWithFiltersProperties extends ComponentProps<'div'> {
  filters?: FilterType[]
}

export const IncentiveMobileWithFilters = (
  props: IncentiveMobileWithFiltersProperties,
) => {
  const { className, filters = ['actions', 'tokens', 'chains'] } = props

  const [search, setSearch] = useState('')
  const [selectedActions, setSelectedActions] = useState<OptionType[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<OptionType[]>([])
  const [selectedChains, setSelectedChains] = useState<OptionType[]>([])
  const [selectedTokens, setSelectedTokens] = useState<OptionType[]>([])

  const [selectedSort, setSelectedSort] = useState<OptionType | undefined>()

  const currentSort: IncentiveParameters = useMemo(() => {
    switch (selectedSort?.value) {
      case 'Highest Amount': {
        return { order_by: 'desc', sort: 'amount' }
      }
      case 'Lowest Amount': {
        return { order_by: 'asc', sort: 'amount' }
      }
      case 'Created earlier': {
        return { order_by: 'desc', sort: 'creation_time' }
      }
      case 'Created later': {
        return { order_by: 'asc', sort: 'creation_time' }
      }
      default: {
        return { order_by: 'desc', sort: 'creation_time' }
      }
    }
  }, [selectedSort])
  const {
    data,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isPlaceholderData,
  } = useInfiniteIncentives({
    limit: 100,
    hash: isHashOrAddress(search) ? search : undefined,
    actions_type: selectedActions.map((action) => action.value) as string[],
    token: selectedTokens.map((token) => token.value) as TokenParameters[],
    chain: selectedChains.map((chain) => chain.value) as ChainParameters[],
    ...currentSort,
  })

  const renderFilters = (filter: FilterType) => {
    switch (filter) {
      case 'actions': {
        return (
          <MobileCheckboxSelect
            label="Actions"
            value={selectedActions}
            options={SELECT_INCENTIVES_ACTIONS}
            onChange={setSelectedActions}
          />
        )
      }
      case 'tokens': {
        return (
          <MobileCheckboxSelect
            label="Tokens"
            value={selectedTokens}
            options={SELECT_TOKENS}
            onChange={setSelectedTokens}
          />
        )
      }
      case 'chains': {
        return (
          <MobileCheckboxSelect
            label="Chains"
            value={selectedChains}
            options={SELECT_CHAINS}
            onChange={setSelectedChains}
            // placeholder="All Chains"
          />
        )
      }
      default: {
        return null
      }
    }
  }

  return (
    <div {...props} className={cn('flex flex-col', className)}>
      <div className="flex items-center gap-2">
        <SearchInput
          className="flex-1"
          placeholder="Tx Hash"
          classNames={{
            container: 'bg-cards border-none rounded-[0.5rem] py-[0.81rem] px-3',
            input: 'mx-2',
          }}
          value={search}
          onValueChange={setSearch}
        />
        {/* Filters */}
        <MobileFiltersDrawer
          title="Filters"
          resetFilters={() => {
            setSelectedActions([])
            setSelectedStatuses([])
            setSelectedChains([])
          }}
          trigger={
            <DrawerIconTrigger
              Icon={Filter}
              active={
                selectedActions.concat(selectedStatuses).concat(selectedChains).length > 0
              }
            />
          }
        >
          {filters.map((filter) => renderFilters(filter))}
        </MobileFiltersDrawer>
        {/* Sort */}
        <MobileFiltersDrawer
          title="Sorting"
          closeOnReset
          resetFilters={() => {
            setSelectedSort(undefined)
          }}
          trigger={<DrawerIconTrigger Icon={Sort} active={!!selectedSort} />}
        >
          <MobileRadioSelect
            label="Amount"
            options={SORT_BY_AMOUNT}
            value={selectedSort}
            onChange={setSelectedSort}
          />
          <MobileRadioSelect
            label="Created"
            options={SORT_BY_DATE}
            value={selectedSort}
            onChange={setSelectedSort}
          />
        </MobileFiltersDrawer>
      </div>
      <IncentiveMobileList
        className="mt-3"
        incentives={data}
        loading={isLoading || isPlaceholderData}
        error={error}
      />
      {isFetchingNextPage && (
        <div className="mt-6 flex h-8 w-full items-center justify-center">
          <Loader />
        </div>
      )}
      {hasNextPage && !isLoading && (
        <Button
          disabled={isFetchingNextPage}
          onClick={() => fetchNextPage()}
          className="mt-6 h-[3.185rem]"
          size="lg"
        >
          View more
        </Button>
      )}
    </div>
  )
}
