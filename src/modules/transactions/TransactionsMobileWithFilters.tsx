import type { StatusType } from '@api/maat-finance/types'
import type { EventsParameters } from '@api/queries/useEvents'
import { useInfiniteEvents } from '@api/queries/useEvents'
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
import type { ANALYTICS_PAGE_EVENT_ACTION_TYPE } from '@constants/action-type'
import type { CHAIN_IDS_BY_BACKEND_NAMES } from '@constants/chains'
import {
  SELECT_CHAINS,
  SELECT_LAST_EVENT_ACTIONS,
  SELECT_STATUSES,
  SELECT_TOKENS,
  SORT_BY_AMOUNT,
  SORT_BY_DATE,
} from '@constants/select-constant'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'
import { Fragment, useMemo, useState } from 'react'

import { TransactionsMobileList } from './TransactionsMobileList'

type FilterType =
  | 'actions'
  | 'statuses'
  | 'tokens'
  | 'chains'
  | 'sortByAmount'
  | 'sortByDate'

interface TransactionsMobileWithFiltersProperties extends ComponentProps<'div'> {
  filters?: FilterType[]
  parameters?: EventsParameters
}

export const TransactionsMobileWithFilters = (
  props: TransactionsMobileWithFiltersProperties,
) => {
  const {
    className,
    filters = ['actions', 'statuses', 'chains'],
    parameters = {},
  } = props

  const [search, setSearch] = useState('')
  const [selectedActions, setSelectedActions] = useState<OptionType[]>([])
  const [selectedTokens, setSelectedTokens] = useState<OptionType[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<OptionType[]>([])
  const [selectedChains, setSelectedChains] = useState<OptionType[]>([])
  const [selectedSort, setSelectedSort] = useState<OptionType | undefined>()

  const currentSort: EventsParameters = useMemo(() => {
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
  const eventsParameters = useMemo(() => {
    const baseParameters: EventsParameters = {
      size: 10,
      ...parameters,
      ...currentSort,
    }
    if (selectedActions.length > 0) {
      baseParameters.actions_type = selectedActions.map(
        (action) => action.value as keyof typeof ANALYTICS_PAGE_EVENT_ACTION_TYPE,
      )
    }
    if (selectedChains.length > 0) {
      baseParameters.chain = selectedChains.map(
        (chain) => chain.value as keyof typeof CHAIN_IDS_BY_BACKEND_NAMES,
      )
    }
    if (selectedStatuses.length > 0) {
      baseParameters.status = selectedStatuses.map((status) => status.value as StatusType)
    }
    return baseParameters
  }, [currentSort, parameters, selectedActions, selectedChains, selectedStatuses])

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isPlaceholderData,
  } = useInfiniteEvents(eventsParameters)

  const renderFilters = (filter: FilterType) => {
    switch (filter) {
      case 'actions': {
        return (
          <MobileCheckboxSelect
            label="Actions"
            value={selectedActions}
            options={SELECT_LAST_EVENT_ACTIONS}
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

      case 'statuses': {
        return (
          <MobileCheckboxSelect
            label="Statuses"
            value={selectedStatuses}
            options={SELECT_STATUSES}
            onChange={setSelectedStatuses}
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
          {filters.map((filter) => (
            <Fragment key={filter}>{renderFilters(filter)}</Fragment>
          ))}
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
      <TransactionsMobileList
        className="mt-3"
        events={data}
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
