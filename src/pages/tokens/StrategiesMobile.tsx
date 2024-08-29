import { useStrategies } from '@api/queries/useStrategies'
import Filter from '@assets/icons/filter.svg'
import type { StrategyStats } from '@codegen/graphql'
import { ArrowLink } from '@components/link/ArrowLink'
import { SectionTitle } from '@components/section/SectionTitle'
import { MobileFiltersDrawer } from '@components/select/MobileFiltersDrawer'
import {
  SkeletonStrategyMobileCard,
  StrategyMobileCard,
} from '@modules/strategies/StrategyMobileCard'
import { cn } from '@utils/cn'
import { useState } from 'react'

import type { StrategiesProperties } from './Strategies'

export const StrategiesMobile: React.FC<StrategiesProperties> = (props) => {
  const [isOpenFilters, setIsOpenFilters] = useState(false)
  const { mobileFilters: initialFilters, className } = props
  const [filters, setFilters] = useState(initialFilters.filters)
  const { data, loading, error } = useStrategies()
  const renderBody = () => {
    switch (true) {
      case loading:
      case !!error: {
        return (
          <>
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonStrategyMobileCard key={i} isLast={i === 9} />
            ))}
          </>
        )
      }
      default: {
        return (
          <>
            {(data?.strategyStats as StrategyStats[]).map((strategy, index, array) => (
              <StrategyMobileCard
                key={index}
                strategy={strategy}
                isLast={index === array.length - 1}
              />
            ))}
          </>
        )
      }
    }
  }
  return (
    <div {...props} className={cn('flex flex-col gap-6', className)}>
      <div className="flex items-center justify-between">
        <SectionTitle>Strategies</SectionTitle>
        <ArrowLink to="/strategies" />
      </div>
      <MobileFiltersDrawer
        resetFilters={() => {}}
        title="Filters"
        isOpen={isOpenFilters}
        onOpenChange={setIsOpenFilters}
        trigger={
          <button
            type="button"
            onClick={() => {
              setIsOpenFilters(true)
            }}
            className="flex size-10 items-center justify-center rounded-lg bg-cards"
          >
            <Filter className="size-6" />
          </button>
        }
      >
        <button
          type="button"
          onClick={() => {
            setIsOpenFilters(true)
          }}
          className="flex size-10 items-center justify-center rounded-lg bg-cards"
        >
          <Filter className="size-6" />
        </button>
      </MobileFiltersDrawer>
      <div className="rounded-3xl bg-cards px-5 py-6">{renderBody()}</div>
    </div>
  )
}
