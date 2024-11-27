import { Skeleton } from '@components/ui/skeleton'
import { BaseContainer } from '@pages/analytics/components/BaseContainer'
import { cn } from '@utils/cn'
import { formatPercentValue, formatUsdValue } from '@utils/formatValue'

import type { TokenStatsContainerProperties } from './TokenStatsContainer'

export const TokenStatsContainerMobile = (props: TokenStatsContainerProperties) => {
  const { className, apy, tvl, rebalancingVolume, tokenName, loading, loadingVolume } =
    props
  if (loading) {
    return <SkeletonTokenStatsContainerMobile {...props} />
  }
  return (
    <div className={cn('hide-scrollbar overflow-auto w-screen px-4 pb-1', className)}>
      <BaseContainer
        className={cn(
          'flex flex-col gap-[0.62rem] w-full max-sm:min-w-[30.75rem] rounded-[1rem] px-5 py-4',
        )}
      >
        <div className="[&_p]:text-text flex items-center space-x-6 *:flex *:flex-col *:justify-center *:space-y-1 sm:w-full [&>*]:h-14 [&_h6]:whitespace-nowrap [&_h6]:text-[0.75rem]/[0.9rem] [&_h6]:text-gray-100 [&_p]:text-[1.5rem]/[1.8rem]">
          <div className="sm:flex-1">
            <h6>{tokenName} Apy</h6>
            <p>
              {formatPercentValue(apy, {
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          <div className="h-full w-px bg-stroke-100" />
          <div className="sm:flex-1">
            <h6>{tokenName} tvl</h6>
            <p>
              {tvl &&
                formatUsdValue(tvl, { notation: 'compact', minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="h-full w-px bg-stroke-100" />
          <div className="sm:flex-1">
            <h6>Rebalancing volume</h6>
            {loadingVolume ? (
              <Skeleton className="h-6 w-[9.1rem]" />
            ) : (
              <p>
                {rebalancingVolume &&
                  formatUsdValue(rebalancingVolume, {
                    notation: 'compact',
                    minimumFractionDigits: 2,
                  })}
              </p>
            )}
          </div>
        </div>
      </BaseContainer>
    </div>
  )
}

const SkeletonTokenStatsContainerMobile = (
  _props: Omit<TokenStatsContainerProperties, 'color'>,
) => {
  const { className, tokenName } = _props
  return (
    <div className={cn('hide-scrollbar overflow-auto w-screen px-4 pb-1', className)}>
      <BaseContainer
        className={cn(
          'flex flex-col gap-[0.62rem] sm:w-full w-fit rounded-[1rem] px-5 py-4',
        )}
      >
        <div className="[&_p]:text-text flex items-center space-x-6 *:flex *:flex-col *:justify-center *:space-y-1 sm:w-full [&>*]:h-14 [&_h6]:whitespace-nowrap [&_h6]:text-[0.75rem]/[0.9rem] [&_h6]:text-gray-100 [&_p]:text-[1.5rem]/[1.8rem]">
          <div className="sm:flex-1">
            <h6>{tokenName} Apy</h6>
            <Skeleton className="h-6 w-28" />
          </div>
          <div className="h-full w-px bg-stroke-100" />
          <div className="sm:flex-1">
            <h6>{tokenName} tvl</h6>
            <Skeleton className="h-6 w-28" />
          </div>
          <div className="h-full w-px bg-stroke-100" />
          <div className="sm:flex-1">
            <h6>Rebalancing volume</h6>
            <Skeleton className="h-6 w-28" />
          </div>
        </div>
      </BaseContainer>
    </div>
  )
}
