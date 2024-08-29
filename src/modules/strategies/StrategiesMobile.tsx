import { useStrategies } from '@api/queries/useStrategies'
import Filter from '@assets/icons/filter.svg'
import type { StrategyStats } from '@codegen/graphql'
import { ArrowLink } from '@components/link/ArrowLink'
import { SectionTitle } from '@components/section/SectionTitle'
import { DrawerMultiSelect } from '@components/select/DrawerMultiSelect'
import {
  DrawerIconTrigger,
  MobileFiltersDrawer,
} from '@components/select/MobileFiltersDrawer'
import { SELECT_PROTOCOLS } from '@constants/select-constant'
import { cn } from '@utils/cn'
import { useState } from 'react'

import type { StrategiesProperties } from './Strategies'
import { StrategyMobileList } from './StrategyMobileList'

export const StrategiesMobile: React.FC<StrategiesProperties> = (props) => {
  const [isOpenFilters, setIsOpenFilters] = useState(false)
  const { mobileFilters: initialFilters, className } = props
  const [filters, setFilters] = useState(initialFilters.filters)
  const { data, loading, error } = useStrategies()

  return (
    <div {...props} className={cn('flex flex-col gap-6', className)}>
      <div className="flex items-center justify-between">
        <SectionTitle>Strategies</SectionTitle>
        <ArrowLink to="/strategies" />
      </div>
      {/* TODO: Add reset filters */}
      <MobileFiltersDrawer
        resetFilters={() => {}}
        title="Filters"
        trigger={<DrawerIconTrigger Icon={Filter} active={isOpenFilters} />}
      >
        <DrawerMultiSelect
          options={SELECT_PROTOCOLS}
          onChange={() => {}}
          value={[]}
          label="Protocol"
          placeholder="All Protocols"
        />
      </MobileFiltersDrawer>
      <StrategyMobileList
        strategies={data?.strategyStats as StrategyStats[]}
        loading={loading}
        error={error}
      />
    </div>
  )
}
