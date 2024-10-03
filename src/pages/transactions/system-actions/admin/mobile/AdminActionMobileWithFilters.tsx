import type { AdminActionType } from '@api/maat-finance/types'
import type { AdminActionsParameters } from '@api/queries/useAdminActions'
import { useInfiniteAdminActions } from '@api/queries/useAdminActions'
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
  SELECT_ADMIN_ACTION_TYPES,
  SELECT_CHAINS,
  SORT_BY_DATE,
} from '@constants/select-constant'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'
import { Fragment, useMemo, useState } from 'react'

import { AdminActionMobileList } from './AdminActionMobileList'

type FilterType = 'actions' | 'chains'

interface AdminActionMobileWithFiltersProperties extends ComponentProps<'div'> {
  filters?: FilterType[]
}

export const AdminActionMobileWithFilters = (
  props: AdminActionMobileWithFiltersProperties,
) => {
  const { className, filters = ['actions', 'chains'] } = props

  const [search, setSearch] = useState('')
  const [selectedActions, setSelectedActions] = useState<OptionType[]>([])
  const [selectedChains, setSelectedChains] = useState<OptionType[]>([])
  const [selectedSort, setSelectedSort] = useState<OptionType | undefined>()

  const currentSort: AdminActionsParameters = useMemo(() => {
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
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isPlaceholderData,
  } = useInfiniteAdminActions({
    action_type: selectedActions.map((a) => a.value) as AdminActionType[],
    chain: selectedChains.map((c) => c.value) as string[],
    ...currentSort,
  })

  const renderFilters = (filter: FilterType) => {
    switch (filter) {
      case 'actions': {
        return (
          <MobileCheckboxSelect
            label="Functions"
            value={selectedActions}
            options={SELECT_ADMIN_ACTION_TYPES}
            onChange={setSelectedActions}
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
            setSelectedChains([])
            setSelectedSort(undefined)
          }}
          trigger={
            <DrawerIconTrigger
              Icon={Filter}
              active={selectedActions.concat(selectedChains).length > 0}
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
            label="Created"
            options={SORT_BY_DATE}
            value={selectedSort}
            onChange={setSelectedSort}
          />
        </MobileFiltersDrawer>
      </div>
      <AdminActionMobileList
        className="mt-3"
        adminActions={data}
        loading={isLoading || !!error || isPlaceholderData}
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
