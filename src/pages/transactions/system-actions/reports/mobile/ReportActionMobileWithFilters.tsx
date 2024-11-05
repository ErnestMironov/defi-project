import type { ChainParameters, TokenParameters } from '@api/maat-finance/types'
import type { ReportParameters } from '@api/maat-finance/useReports'
import { useInfiniteReports } from '@api/maat-finance/useReports'
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
import { SELECT_CHAINS, SELECT_TOKENS, SORT_BY_DATE } from '@constants/select-constant'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'
import { useMemo, useState } from 'react'

import { ReportActionMobileList } from './ReportActionMobileList'

type FilterType = 'tokens' | 'chains'

interface ReportActionMobileWithFiltersProperties extends ComponentProps<'div'> {
  filters?: FilterType[]
}

export const ReportActionMobileWithFilters = (
  props: ReportActionMobileWithFiltersProperties,
) => {
  const { className, filters = ['tokens', 'chains'] } = props

  const [search, setSearch] = useState('')
  const [selectedTokens, setSelectedTokens] = useState<OptionType[]>([])
  const [selectedChains, setSelectedChains] = useState<OptionType[]>([])

  const [selectedSort, setSelectedSort] = useState<OptionType | undefined>()

  const currentSort: ReportParameters = useMemo(() => {
    switch (selectedSort?.value) {
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
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPlaceholderData,
  } = useInfiniteReports({
    ...currentSort,
    token: selectedTokens.map((token) => token.value) as TokenParameters[],
    chain: selectedChains.map((chain) => chain.value) as ChainParameters[],
  })

  const renderFilters = (filter: FilterType) => {
    switch (filter) {
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
            setSelectedTokens([])
            setSelectedChains([])
          }}
          trigger={
            <DrawerIconTrigger
              Icon={Filter}
              active={selectedTokens.concat(selectedChains).length > 0}
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
            label="Created"
            options={SORT_BY_DATE}
            value={selectedSort}
            onChange={setSelectedSort}
          />
        </MobileFiltersDrawer>
      </div>
      <ReportActionMobileList
        className="mt-3"
        reportActions={data}
        loading={isLoading || isPlaceholderData}
        error={error}
      />
      {isFetchingNextPage && (
        <div className="flex items-center justify-center">
          <Loader className="mt-6" />
        </div>
      )}
      {hasNextPage && (
        <Button className="mt-6 h-[3.185rem]" size="lg" onClick={() => fetchNextPage()}>
          View more
        </Button>
      )}
    </div>
  )
}
