/* eslint-disable unicorn/no-useless-undefined */
import { useInfiniteStrategies } from '@api/queries/useStrategies'
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
import { Loader } from '@components/ui/loader'
import {
  SELECT_CHAINS,
  SELECT_PROTOCOLS,
  SELECT_TOKENS,
  SORT_BY_APY,
  SORT_BY_TVL,
} from '@constants/select-constant'
import { StrategyMobileList } from '@modules/strategies/StrategyMobileList'
import { cn } from '@utils/cn'
import { useState } from 'react'

type StrategyFilters = 'tokens' | 'protocols' | 'chains'

interface StrategiesMobileProperties extends React.HTMLAttributes<HTMLDivElement> {
  withLink?: boolean
  filters?: StrategyFilters[]
}

export const StrategiesMobile: React.FC<StrategiesMobileProperties> = (props) => {
  const {
    className,
    withLink = true,
    filters = ['tokens', 'protocols', 'chains'],
  } = props
  const [search, setSearch] = useState('')
  const [selectedTokens, setSelectedTokens] = useState<OptionType[]>([])
  const [selectedProtocols, setSelectedProtocols] = useState<OptionType[]>([])
  const [selectedChains, setSelectedChains] = useState<OptionType[]>([])
  const [selectedSortByApy, setSelectedSortByApy] = useState<OptionType | undefined>()
  const [selectedSortByTvl, setSelectedSortByTvl] = useState<OptionType | undefined>()

  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteStrategies({})

  const renderFilters = (filter: StrategyFilters) => {
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
      case 'protocols': {
        return (
          <DrawerMultiSelect
            label="Protocols"
            value={selectedProtocols}
            options={SELECT_PROTOCOLS}
            onChange={setSelectedProtocols}
            placeholder="All Protocols"
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
      <div className="flex items-center justify-between">
        <SectionTitle>Strategies</SectionTitle>
        {withLink && <ArrowLink to="/strategies" />}
      </div>
      <div className="mt-4 flex items-center gap-2">
        <SearchInput
          className="flex-1"
          placeholder="Name / Address / ID "
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
            setSelectedProtocols([])
            setSelectedChains([])
          }}
          trigger={
            <DrawerIconTrigger
              Icon={Filter}
              active={
                selectedTokens.concat(selectedProtocols).concat(selectedChains).length > 0
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
            setSelectedSortByApy(undefined)
            setSelectedSortByTvl(undefined)
          }}
          trigger={
            <DrawerIconTrigger
              Icon={Sort}
              active={!!selectedSortByApy || !!selectedSortByTvl}
            />
          }
        >
          <MobileRadioSelect
            label="APY"
            options={SORT_BY_APY}
            value={selectedSortByApy}
            onChange={setSelectedSortByApy}
          />
          <MobileRadioSelect
            label="TVL"
            options={SORT_BY_TVL}
            value={selectedSortByTvl}
            onChange={setSelectedSortByTvl}
          />
        </MobileFiltersDrawer>
      </div>
      <StrategyMobileList
        className="mt-3"
        strategies={data}
        loading={isLoading}
        error={error}
      />
      {isFetchingNextPage && (
        <div className="flex h-8 w-full items-center justify-center">
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
