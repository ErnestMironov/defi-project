import { useStrategies } from '@api/queries/useStrategies'
import type { StrategyStats } from '@codegen/graphql'
import { Logo } from '@components/ui/logo'
import { cn } from '@utils/cn'

import type { StrategiesProperties } from './Strategies'
import { SkeletonStrategyMobileCard, StrategyMobileCard } from './StrategyMobileCard'

export const StrategiesMobile: React.FC<StrategiesProperties> = (props) => {
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
    <div {...props} className={cn('flex flex-col gap-6', props.className)}>
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-4 text-2xl uppercase">
          <Logo className="h-[1.625rem] w-[2.0625rem] overflow-visible" />
          Strategies
        </h2>
      </div>
      <div className="rounded-3xl bg-cards px-5 py-6">{renderBody()}</div>
    </div>
  )
}
