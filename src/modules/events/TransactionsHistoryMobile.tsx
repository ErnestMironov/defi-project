import { useTxHistory } from '@api/queries/useTxHistory'
import Filter from '@assets/icons/filter.svg'
import Sort from '@assets/icons/mobile-sort.svg'
import { ArrowLink } from '@components/link/ArrowLink'
import { SectionTitle } from '@components/section/SectionTitle'
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
  MOBILE_SELECT_ACTIONS,
  MOBILE_SELECT_STATUSES,
  SELECT_CHAINS,
  SORT_BY_APY,
  SORT_BY_TVL,
} from '@constants/select-constant'
import { cn } from '@utils/cn'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import type { EventsProperties } from './Events'
import { TransactionsMobileList } from './TransactionsMobileList'

export const TransactionsHistoryMobile = (props: EventsProperties) => {
  const { withLink, className } = props
  const navigate = useNavigate()

  const [search, setSearch] = useState('')
  const [selectedActions, setSelectedActions] = useState<OptionType[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<OptionType[]>([])
  const [selectedChains, setSelectedChains] = useState<OptionType[]>([])
  const [selectedSortByAmount, setSelectedSortByAmount] = useState<
    OptionType | undefined
  >()
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

  return (
    <div {...props} className={cn('flex flex-col', className)}>
      <div className="flex items-center justify-between">
        <SectionTitle>Events</SectionTitle>
        {withLink && <ArrowLink to="/transactions" />}
      </div>
      <div className="mt-4 flex items-center gap-2">
        <SearchInput
          className="flex-1"
          placeholder="Tx Hash"
          classNames={{
            container: 'bg-cards border-none rounded-[0.5rem] py-[0.81rem] px-3',
            input: 'mx-2',
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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
          <MobileCheckboxSelect
            label="Actions"
            value={selectedActions}
            options={MOBILE_SELECT_ACTIONS}
            onChange={setSelectedActions}
          />
          <MobileCheckboxSelect
            label="Statuses"
            value={selectedStatuses}
            options={MOBILE_SELECT_STATUSES}
            onChange={setSelectedStatuses}
          />
          <DrawerMultiSelect
            label="Chains"
            value={selectedChains}
            options={SELECT_CHAINS}
            onChange={setSelectedChains}
            placeholder="All Chains"
          />
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
            options={SORT_BY_APY}
            value={selectedSortByAmount}
            onChange={setSelectedSortByAmount}
          />
          <MobileRadioSelect
            label="Created"
            options={SORT_BY_TVL}
            value={selectedSortByDate}
            onChange={setSelectedSortByDate}
          />
        </MobileFiltersDrawer>
      </div>
      <TransactionsMobileList
        className="mt-3"
        transactions={data}
        loading={loading}
        error={error}
      />
      <Button className="mt-6 h-[3.185rem]" size="lg">
        View more
      </Button>
    </div>
  )
}
