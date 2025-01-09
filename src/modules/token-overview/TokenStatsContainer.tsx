import Chevron from '@assets/icons/arrow-up.svg'
import { IconWithLabelComponent, TokenIconComponent } from '@components/token-icon'
import { Skeleton } from '@components/ui/skeleton'
import { TokenVaultsPopover } from '@modules/token-vaults-popover/TokenVaultsPopover'
import { BaseContainer } from '@pages/analytics/components/BaseContainer'
import { cn } from '@utils/cn'
import { formatAmount } from '@utils/formatValue'
import type { ComponentProps } from 'react'

export interface TokenStatsContainerProperties extends ComponentProps<'div'> {
  color: string
  tokenName: string
  apy?: number
  tvl?: number
  rebalancingVolume?: number
  loading?: boolean
  error?: any
  loadingVolume?: boolean
  errorVolume?: any
  stakersCount?: number
}

export const TokenStatsContainer = (props: TokenStatsContainerProperties) => {
  const {
    className,
    apy,
    tvl,
    rebalancingVolume,
    tokenName,
    loading,
    loadingVolume,
    stakersCount,
    ...rest
  } = props

  if (loading) {
    return <SkeletonTokenStatsContainer {...props} />
  }
  return (
    <BaseContainer className={cn('divide-y divide-stroke-100', className)} {...rest}>
      <div className="flex items-center justify-between px-8 py-3 text-[0.875rem]/[1.5rem] font-medium max-lg:px-4">
        <IconWithLabelComponent symbol={tokenName} className="font-aeonik" />
        <TokenVaultsPopover symbol={tokenName} />
      </div>
      <div
        className={cn(
          className,
          'grid grid-cols-4 max-lg:grid-cols-2 w-full *:p-8 max-lg:*:p-4 [&_p]:text-2.5xl max-lg:[&_p]:text-[1.25rem]/[1.5rem] max-lg:[&_h6]:text-[0.8125rem]/[1.5rem] [&_h6]:text-sm [&_h6]:text-text-2100 *:space-y-[0.38rem]',
        )}
        {...rest}
      >
        <div>
          <p>{formatAmount(stakersCount ?? 0)}</p>
          <div className="flex items-center gap-[0.38rem]">
            <h6>Unique Users</h6>
          </div>
        </div>
        <div>
          <p>
            {apy &&
              formatAmount(apy.toString(), {
                maximumFractionDigits: 2,
              })}
            <span className="text-text-60">%</span>
          </p>
          <div className="flex items-center gap-[0.38rem]">
            <h6 className="uppercase">Apy</h6>
          </div>
        </div>
        <div>
          <p>
            <span className="text-text-60">$</span>
            {tvl && formatAmount(tvl, { notation: 'compact', minimumFractionDigits: 2 })}
          </p>
          <div className="flex items-center gap-[0.38rem]">
            <h6 className="uppercase">tvl</h6>
          </div>
        </div>
        <div>
          {loadingVolume ? (
            <Skeleton className="h-8 w-[9.1rem]" />
          ) : (
            <p>
              <span className="text-text-60">$</span>
              {rebalancingVolume &&
                formatAmount(rebalancingVolume, {
                  notation: 'compact',
                  minimumFractionDigits: 2,
                })}
            </p>
          )}
          <div className="flex items-center gap-[0.38rem]">
            <h6 className="whitespace-nowrap">Rebalancing volume</h6>
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
      <div className="flex items-center justify-between px-8 py-3 text-[0.875rem]/[1.5rem] font-medium max-lg:px-4">
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
          'grid grid-cols-4 max-lg:grid-cols-2 w-full *:p-8 max-lg:*:p-4 [&_p]:text-2.5xl max-lg:[&_p]:text-[1.25rem]/[1.5rem] max-lg:[&_h6]:text-[0.8125rem]/[1.5rem] [&_h6]:text-sm [&_h6]:text-text-2100 *:space-y-[0.38rem]',
        )}
        {...rest}
      >
        <div>
          <Skeleton className="h-8 w-[9.1rem] max-lg:h-6" />
          <div className="flex items-center gap-[0.38rem]">
            <h6>Unique Users</h6>
          </div>
        </div>
        <div>
          <Skeleton className="h-8 w-[9.1rem] max-lg:h-6" />
          <div className="flex items-center gap-[0.38rem]">
            <h6 className="uppercase">Apy</h6>
          </div>
        </div>
        <div>
          <Skeleton className="h-8 w-[9.1rem] max-lg:h-6" />
          <div className="flex items-center gap-[0.38rem]">
            <h6 className="uppercase">tvl</h6>
          </div>
        </div>
        <div>
          <Skeleton className="h-8 w-[9.1rem] max-lg:h-6" />
          <div className="flex items-center gap-[0.38rem]">
            <h6 className="whitespace-nowrap">Rebalancing volume</h6>
          </div>
        </div>
      </div>
    </BaseContainer>
  )
}
