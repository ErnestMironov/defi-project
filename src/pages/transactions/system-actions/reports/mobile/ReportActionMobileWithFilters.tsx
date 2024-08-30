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
  SELECT_TOKENS,
  SELECT_CHAINS,
  SELECT_PPS,
  SORT_BY_DATE,
} from '@constants/select-constant'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ReportActionMobileList } from './ReportActionMobileList'

type FilterType = 'tokens' | 'pps' | 'chains'

interface ReportActionMobileWithFiltersProperties extends ComponentProps<'div'> {
  filters?: FilterType[]
}

export const ReportActionMobileWithFilters = (
  props: ReportActionMobileWithFiltersProperties,
) => {
  const { className, filters = ['tokens', 'pps', 'chains'] } = props
  const navigate = useNavigate()

  const [search, setSearch] = useState('')
  const [selectedTokens, setSelectedTokens] = useState<OptionType[]>([])
  const [selectedChains, setSelectedChains] = useState<OptionType[]>([])
  const [selectedPPS, setSelectedPPS] = useState<OptionType[]>([])
  const [selectedSortByDate, setSelectedSortByDate] = useState<OptionType | undefined>()

  const [currentPage, setCurrentPage] = useState(1)
  const { data, loading, error, pageInfo, fetchMore, totalCount } = useTxHistory({
    perPage: 10,
    page: currentPage,
  })
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const onViewMoreClick = async () => {
    setIsLoadingMore(true)
    await fetchMore({
      variables: {
        after: pageInfo?.endCursor,
      },
    })
    setIsLoadingMore(false)
  }

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
      case 'pps': {
        return (
          <MobileCheckboxSelect
            label="PPS"
            value={selectedPPS}
            options={SELECT_PPS}
            onChange={setSelectedPPS}
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
            setSelectedTokens([])
            setSelectedPPS([])
            setSelectedChains([])
          }}
          trigger={
            <DrawerIconTrigger
              Icon={Filter}
              active={
                selectedTokens.concat(selectedPPS).concat(selectedChains).length > 0
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
      <ReportActionMobileList
        className="mt-3"
        reportActions={data}
        loading={loading}
        error={error}
      />
      <Button className="mt-6 h-[3.185rem]" size="lg">
        View more
      </Button>
    </div>
  )
}
