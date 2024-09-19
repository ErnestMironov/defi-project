import type { EventsParameters } from '@api/queries/useEvents'
import { useInfiniteEvents } from '@api/queries/useEvents'
import type { OptionType } from '@components/select/Select'
import { Button } from '@components/ui/button'
import { Loader } from '@components/ui/loader'
import type { LAST_EVENT_ACTION_TYPE } from '@constants/action-type'
import type { CHAIN_IDS_BY_BACKEND_NAMES } from '@constants/chains'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'
import { useMemo, useState } from 'react'

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
  const { className, parameters = {} } = props

  const [selectedActions] = useState<OptionType[]>([])
  const [selectedChains] = useState<OptionType[]>([])
  const [selectedSort] = useState<OptionType | undefined>()

  const currentSort: EventsParameters = useMemo(() => {
    switch (selectedSort?.value) {
      case 'Highest Amount': {
        return { orderBy: 'desc', sort: 'amount' }
      }
      case 'Lowest Amount': {
        return { orderBy: 'asc', sort: 'amount' }
      }
      case 'Created earlier': {
        return { orderBy: 'desc', sort: 'creation_time' }
      }
      case 'Created later': {
        return { orderBy: 'asc', sort: 'creation_time' }
      }
      default: {
        return { orderBy: 'desc', sort: 'creation_time' }
      }
    }
  }, [selectedSort])
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isPlaceholderData,
  } = useInfiniteEvents({
    ...parameters,
    ...currentSort,
    chain: selectedChains.map(
      (chain) => chain.value as keyof typeof CHAIN_IDS_BY_BACKEND_NAMES,
    ),
    action_type: selectedActions.map(
      (action) => action.value,
    ) as (keyof typeof LAST_EVENT_ACTION_TYPE)[],
  })

  return (
    <div {...props} className={cn('flex flex-col', className)}>
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
