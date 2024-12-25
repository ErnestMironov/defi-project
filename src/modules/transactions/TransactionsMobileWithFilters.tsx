import type { StatusType } from '@api/maat-finance/types'
import type { EventsParameters } from '@api/maat-finance/useEvents'
import { useInfiniteEvents } from '@api/maat-finance/useEvents'
import ActionIcon from '@assets/icons/action.svg'
import AssetIcon from '@assets/icons/asset.svg'
import ChainIcon from '@assets/icons/chain.svg'
import Filter from '@assets/icons/filter.svg'
import StatusIcon from '@assets/icons/status.svg'
import { MobileCheckboxSelect } from '@components/select/MobileCheckboxSelect'
import {
  DrawerIconTrigger,
  MobileFiltersDrawer,
} from '@components/select/MobileFiltersDrawer'
import { MobileRadioSelect } from '@components/select/MobileRadioSelect'
import type { OptionType } from '@components/select/Select'
import { SearchInput } from '@components/text-input/SearchInput'
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
import { BaseContainer } from '@pages/analytics/components/BaseContainer'
import { cn } from '@utils/cn'
import { isHashOrAddress } from '@utils/hash-or-address'
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
      hash_or_address: isHashOrAddress(search) ? [search as string] : undefined,
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
  }, [currentSort, parameters, selectedActions, selectedChains, selectedStatuses, search])

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
            icon={<ActionIcon />}
            placeholder="All Actions"
          />
        )
      }
      case 'tokens': {
        return (
          <MobileCheckboxSelect
            className="[&_[cmdk-item]:first-child]:col-span-2"
            label="Tokens"
            value={selectedTokens}
            options={SELECT_TOKENS}
            onChange={setSelectedTokens}
            placeholder="All Tokens"
            icon={<AssetIcon />}
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
            placeholder="All Statuses"
            icon={<StatusIcon />}
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
            placeholder="All Chains"
            icon={<ChainIcon />}
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
      <div
        {...props}
        className={cn('flex flex-col bg-cards-widget  rounded-b-3xl', className)}
      >
        <div className=" flex items-center gap-4  border-b border-stroke-100 pr-4">
          <div className="flex-1 border-r border-stroke-100">
            <SearchInput
              className="flex-1"
              placeholder="Tx Hash"
              classNames={{
                container: 'rounded-tl-3xl  py-[0.81rem] px-4',
                input: 'mx-2',
              }}
              value={search}
              onValueChange={setSearch}
            />
          </div>
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
                  selectedActions.concat(selectedStatuses).concat(selectedChains).length >
                  0
                }
              />
            }
            className="shadow-test"
          >
            {/* Sort */}
            <div>
              <h6 className="mb-3 text-sm text-text-2100">Sorting</h6>
              <BaseContainer className="rounded-2xl p-1">
                <MobileRadioSelect
                  options={SORT_BY_AMOUNT}
                  value={selectedSort}
                  onChange={setSelectedSort}
                />
                <MobileRadioSelect
                  options={SORT_BY_DATE}
                  value={selectedSort}
                  onChange={setSelectedSort}
                />
              </BaseContainer>
            </div>
            {/* Filters */}
            {filters.map((filter) => (
              <Fragment key={filter}>{renderFilters(filter)}</Fragment>
            ))}
          </MobileFiltersDrawer>
        </div>
        <TransactionsMobileList
          events={data}
          loading={isLoading || isPlaceholderData}
          error={error}
        />
        <div className="absolute inset-x-0 -bottom-10">
          {isFetchingNextPage && (
            <div className="flex h-8 w-full items-center justify-center">
              <Loader />
            </div>
          )}
        </div>
      </div>
      {hasNextPage && !isLoading && !isFetchingNextPage && (
        <button
          type="button"
          onClick={() => fetchNextPage()}
          className="my-2 h-6 w-full text-sm text-text-50 underline"
        >
          See more
        </button>
      )}
    </>
  )
}
