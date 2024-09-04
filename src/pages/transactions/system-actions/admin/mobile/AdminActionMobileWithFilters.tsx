import { useTxHistory } from '@api/queries/useTxHistory'
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
  SELECT_ADMIN_FROM,
  SELECT_ADMIN_FUNCTIONS,
  SELECT_CHAINS,
  SORT_BY_DATE,
} from '@constants/select-constant'
import { usePages } from '@hooks/common/usePages'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'
import { useState } from 'react'

import { AdminActionMobileList } from './AdminActionMobileList'

type FilterType = 'functions' | 'chains' | 'admin-action-from'

interface AdminActionMobileWithFiltersProperties extends ComponentProps<'div'> {
  filters?: FilterType[]
}

export const AdminActionMobileWithFilters = (
  props: AdminActionMobileWithFiltersProperties,
) => {
  const { className, filters = ['functions', 'chains', 'admin-action-from'] } = props

  const [search, setSearch] = useState('')
  const [selectedFunctions, setSelectedFunctions] = useState<OptionType[]>([])
  const [selectedChains, setSelectedChains] = useState<OptionType[]>([])
  const [selectedAdminFrom, setSelectedAdminFrom] = useState<OptionType[]>([])
  const [selectedSortByDate, setSelectedSortByDate] = useState<OptionType | undefined>()

  const { page, size } = usePages()
  // TODO: replace with useEvents
  const { data, loading, error } = useTxHistory({
    perPage: size,
    page,
  })

  const renderFilters = (filter: FilterType) => {
    switch (filter) {
      case 'functions': {
        return (
          <MobileCheckboxSelect
            label="Functions"
            value={selectedFunctions}
            options={SELECT_ADMIN_FUNCTIONS}
            onChange={setSelectedFunctions}
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
      case 'admin-action-from': {
        return (
          <MobileCheckboxSelect
            label="From"
            value={selectedAdminFrom}
            options={SELECT_ADMIN_FROM}
            onChange={setSelectedAdminFrom}
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
            setSelectedFunctions([])
            setSelectedAdminFrom([])
            setSelectedChains([])
          }}
          trigger={
            <DrawerIconTrigger
              Icon={Filter}
              active={
                selectedFunctions.concat(selectedAdminFrom).concat(selectedChains)
                  .length > 0
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
            setSelectedSortByDate(undefined)
          }}
          trigger={<DrawerIconTrigger Icon={Sort} active={!!selectedSortByDate} />}
        >
          <MobileRadioSelect
            label="Created"
            options={SORT_BY_DATE}
            value={selectedSortByDate}
            onChange={setSelectedSortByDate}
          />
        </MobileFiltersDrawer>
      </div>
      <AdminActionMobileList
        className="mt-3"
        adminActions={data}
        loading={loading}
        error={error}
      />
      <Button className="mt-6 h-[3.185rem]" size="lg">
        View more
      </Button>
    </div>
  )
}
