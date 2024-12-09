import Chevron from '@assets/icons/arrow-up.svg'
import { IconWithLabelComponent, TokenIconComponent } from '@components/token-icon'
import { Skeleton } from '@components/ui/skeleton'
import { TokenVaultsPopover } from '@modules/token-vaults-popover/TokenVaultsPopover'
import { BaseContainer } from '@pages/analytics/components/BaseContainer'
import { cn } from '@utils/cn'
import { formatAmount } from '@utils/formatValue'

import type { TokenStatsContainerProperties } from './TokenStatsContainer'

const Info = () => {
  return (
    <div className="w-fit rounded border border-stroke-100 px-[0.44rem] py-[0.12rem] text-center text-[0.6875rem]/[1rem] text-text-1100">
      <span>?</span>
    </div>
  )
}

export const TokenStatsContainerDesktop = (props: TokenStatsContainerProperties) => {
  const {
    className,
    apy,
    tvl,
    rebalancingVolume,
    tokenName,
    loading,
    loadingVolume,
    ...rest
  } = props

  if (loading) {
    return <SkeletonTokenStatsContainer {...props} />
  }
  return (
    <BaseContainer className={cn('divide-y divide-stroke-100', className)} {...rest}>
      <div className="flex items-center justify-between px-8 py-3 text-[0.875rem]/[1.5rem] font-medium">
        <IconWithLabelComponent symbol={tokenName} className="font-aeonik" />
        <TokenVaultsPopover symbol={tokenName} />
      </div>
      <div
        className={cn(
          className,
          'grid grid-cols-4 w-full *:p-8 [&_p]:text-2.5xl [&_h6]:text-sm [&_h6]:text-text-2100 *:space-y-[0.38rem]',
        )}
        {...rest}
      >
        <div>
          <p>{formatAmount(12_567)}</p>
          <div className="flex items-center gap-[0.38rem]">
            <h6>Unique Users</h6>
            <Info />
          </div>
        </div>
        <div>
          <p>
            {apy &&
              formatAmount(apy.toString(), {
                maximumFractionDigits: 2,
              })}
            <span className="text-text-270">%</span>
          </p>
          <div className="flex items-center gap-[0.38rem]">
            <h6 className="uppercase">Apy</h6>
            <Info />
          </div>
        </div>
        <div>
          <p>
            <span className="text-text-270">$</span>
            {tvl && formatAmount(tvl, { notation: 'compact', minimumFractionDigits: 2 })}
          </p>
          <div className="flex items-center gap-[0.38rem]">
            <h6 className="uppercase">tvl</h6>
            <Info />
          </div>
        </div>
        <div>
          {loadingVolume ? (
            <Skeleton className="h-8 w-[9.1rem]" />
          ) : (
            <p>
              <span className="text-text-270">$</span>
              {rebalancingVolume &&
                formatAmount(rebalancingVolume, {
                  notation: 'compact',
                  minimumFractionDigits: 2,
                })}
            </p>
          )}
          <div className="flex items-center gap-[0.38rem]">
            <h6 className="whitespace-nowrap">Rebalancing volume</h6>
            <Info />
          </div>
        </div>
      </div>
    </BaseContainer>
  )
}

const SkeletonTokenStatsContainer = (
  _props: Omit<TokenStatsContainerProperties, 'color'>,
) => {
  const { className, tokenName, loadingVolume, ...rest } = _props
  return (
    <BaseContainer className={cn('divide-y divide-stroke-100', className)} {...rest}>
      <div className="flex items-center justify-between px-8 py-3 text-[0.875rem]/[1.5rem] font-medium">
        <div className="flex items-center gap-[0.38rem]">
          <TokenIconComponent symbol={tokenName} className="size-4" />
          {tokenName}
        </div>
        <p className="flex items-center gap-1 px-[0.38rem] py-1 text-text-2100">
          Contracts <Chevron className="size-4" />
        </p>
      </div>
      <div
        className={cn(
          className,
          'grid grid-cols-4 w-full *:p-8 [&_p]:text-2.5xl [&_h6]:text-sm [&_h6]:text-text-2100 *:space-y-[0.38rem]',
        )}
        {...rest}
      >
        <div>
          <Skeleton className="h-8 w-[9.1rem]" />
          <div className="flex items-center gap-[0.38rem]">
            <h6>Unique Users</h6>
            <Info />
          </div>
        </div>
        <div>
          <Skeleton className="h-8 w-[9.1rem]" />
          <div className="flex items-center gap-[0.38rem]">
            <h6 className="uppercase">Apy</h6>
            <Info />
          </div>
        </div>
        <div>
          <Skeleton className="h-8 w-[9.1rem]" />
          <div className="flex items-center gap-[0.38rem]">
            <h6 className="uppercase">tvl</h6>
            <Info />
          </div>
        </div>
        <div>
          <Skeleton className="h-8 w-[9.1rem]" />
          <div className="flex items-center gap-[0.38rem]">
            <h6 className="whitespace-nowrap">Rebalancing volume</h6>
            <Info />
          </div>
        </div>
      </div>
    </BaseContainer>
  )
}
