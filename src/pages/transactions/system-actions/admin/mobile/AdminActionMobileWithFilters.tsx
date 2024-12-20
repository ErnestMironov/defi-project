import type { AdminActionType } from '@api/maat-finance/types'
import type { AdminActionsParameters } from '@api/maat-finance/useAdminActions'
import { useInfiniteAdminActions } from '@api/maat-finance/useAdminActions'
import ChainIcon from '@assets/icons/chain.svg'
import Filter from '@assets/icons/filter.svg'
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
  SELECT_ADMIN_ACTION_TYPES,
  SELECT_CHAINS,
  SORT_BY_DATE,
} from '@constants/select-constant'
import { BaseContainer } from '@pages/analytics/components/BaseContainer'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'
import { Fragment, useMemo, useState } from 'react'
import { isHash } from 'viem'

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
    hash: isHash(search) ? search : undefined,
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
            placeholder="All Functions"
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
    <div {...props} className={cn('flex flex-col', className)}>
      <div className="flex items-center gap-4 border-b border-stroke-100 pr-4">
        <div className="flex-1 border-r border-stroke-100">
          <SearchInput
            className="flex-1"
            placeholder="Tx Hash"
            classNames={{
              container: 'bg-input-default border-none py-[0.81rem] px-4',
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
          <div>
            <h6 className="mb-3 text-sm text-text-2100">Sorting</h6>
            <BaseContainer className="rounded-2xl p-1">
              <MobileRadioSelect
                options={SORT_BY_DATE}
                value={selectedSort}
                onChange={setSelectedSort}
              />
            </BaseContainer>
          </div>
          {filters.map((filter) => (
            <Fragment key={filter}>{renderFilters(filter)}</Fragment>
          ))}
        </MobileFiltersDrawer>
      </div>
      <AdminActionMobileList
        adminActions={data}
        loading={isLoading || !!error || isPlaceholderData}
        error={error}
      />
      <div className="absolute inset-x-0 -bottom-10">
        {isFetchingNextPage && (
          <div className="flex h-8 w-full items-center justify-center">
            <Loader />
          </div>
        )}
        {hasNextPage && !isLoading && !isFetchingNextPage && (
          <button
            type="button"
            onClick={() => fetchNextPage()}
            className="mt-4 h-6 w-full text-sm text-text-50 underline"
          >
            See more
          </button>
        )}
      </div>
    </div>
  )
}
