import { useInfiniteEvents } from '@api/queries/useEvents'
import Filter from '@assets/icons/filter.svg'
import Sort from '@assets/icons/mobile-sort.svg'
import { DrawerMultiSelect } from '@components/select/DrawerMultiSelect'
import { MobileCheckboxSelect } from '@components/select/MobileCheckboxSelect'
import {
  DrawerIconTrigger,
  MobileFiltersDrawer,
} from '@components/select/MobileFiltersDrawer'
import { MobileRadioSelect } from '@components/select/MobileRadioSelect'
import type { OptionType } from '@components/select/Select'
import { SearchInput } from '@components/text-input/SearchInput'
import { Button } from '@components/ui/button'
import {
  SELECT_CHAINS,
  SELECT_INCENTIVES_ACTIONS,
  SELECT_INCENTIVES_FROM,
  SORT_BY_AMOUNT,
  SORT_BY_DATE,
} from '@constants/select-constant'
import { cn } from '@utils/cn'
import { Loader } from 'lucide-react'
import type { ComponentProps } from 'react'
import { useState } from 'react'

import { IncentiveMobileList } from './IncentiveMobileList'

type FilterType = 'actions' | 'from' | 'chains'

interface IncentiveMobileWithFiltersProperties extends ComponentProps<'div'> {
  filters?: FilterType[]
}

export const IncentiveMobileWithFilters = (
  props: IncentiveMobileWithFiltersProperties,
) => {
  const { className, filters = ['actions', 'from', 'chains'] } = props

  const [search, setSearch] = useState('')
  const [selectedActions, setSelectedActions] = useState<OptionType[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<OptionType[]>([])
  const [selectedChains, setSelectedChains] = useState<OptionType[]>([])
  const [selectedSortByAmount, setSelectedSortByAmount] = useState<
    OptionType | undefined
  >()
  const [selectedSortByDate, setSelectedSortByDate] = useState<OptionType | undefined>()

  const { data, isLoading, error, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteEvents({
      action_type: 'incentives',
      limit: 100,
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
      case 'from': {
        return (
          <MobileCheckboxSelect
            label="From"
            value={selectedStatuses}
            options={SELECT_INCENTIVES_FROM}
            onChange={setSelectedStatuses}
          />
        )
      }
      case 'chains': {
        return (
          <DrawerMultiSelect
            label="Chains"
            value={selectedChains}
            options={SELECT_CHAINS}
            onChange={setSelectedChains}
            placeholder="All Chains"
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
            setSelectedSortByAmount(undefined)
            setSelectedSortByDate(undefined)
          }}
          trigger={
            <DrawerIconTrigger
              Icon={Sort}
              active={!!selectedSortByAmount || !!selectedSortByDate}
            />
          }
        >
          <MobileRadioSelect
            label="Amount"
            options={SORT_BY_AMOUNT}
            value={selectedSortByAmount}
            onChange={setSelectedSortByAmount}
          />
          <MobileRadioSelect
            label="Created"
            options={SORT_BY_DATE}
            value={selectedSortByDate}
            onChange={setSelectedSortByDate}
          />
        </MobileFiltersDrawer>
      </div>
      <IncentiveMobileList
        className="mt-3"
        incentives={data as any}
        loading={isLoading}
        error={error}
      />
      {isFetchingNextPage && (
        <div className="mt-3 flex h-8 w-full animate-spin items-center justify-center">
          <Loader size="xs" />
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
