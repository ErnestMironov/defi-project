import Arrow from '@assets/icons/curve-arrow-down.svg'
import { Skeleton } from '@components/ui/skeleton'
import { BaseContainer } from '@pages/analytics/components/BaseContainer'
import { ROUTES } from '@routes/routes'
import { cn } from '@utils/cn'
import { formatPercentValue, formatUsdValue } from '@utils/formatValue'
import { formatUnits } from 'ethers'
import { Link } from 'react-router-dom'

import type { TokenStatsContainerProperties } from './TokenStatsContainer'

export const TokenStatsContainerDesktop = (props: TokenStatsContainerProperties) => {
  const {
    className,
    color,
    apy,
    tvl,
    rebalancingVolume,
    img,
    imageClassName,
    tokenName,
    withLink = true,
    loading,
    error,
    ...rest
  } = props

  if (loading) {
    return <SkeletonTokenStatsContainer {...props} />
  }
  return (
    <div
      className={cn(
        className,
        'grid w-full grid-cols-[repeat(2,1fr)_1.8fr] gap-2 *:h-[11.875rem] *:space-y-2 [&>div:first-child]:rounded-l-3xl [&>div:last-child]:rounded-r-3xl',
      )}
      {...rest}
    >
      <BaseContainer>
        <h6>{tokenName} Apy</h6>

        <p className="text-3xl">
          {formatPercentValue(apy, {
            maximumFractionDigits: 2,
          })}
          {/* <span className="ml-2 align-top text-xl/[1.375rem]" style={{ color }}>
            {formatPercentValue('27', {
              maximumFractionDigits: 0,
              signDisplay: 'exceptZero',
            })}
          </span> */}
        </p>
      </BaseContainer>
      <BaseContainer>
        <h6>{tokenName} tvl</h6>
        <p className="text-3xl">
          {tvl && formatUsdValue(tvl, { notation: 'compact', minimumFractionDigits: 2 })}
          {/* <span className="ml-2 align-top text-xl/[1.375rem]" style={{ color }}>
            {formatPercentValue('27', {
              maximumFractionDigits: 0,
              signDisplay: 'exceptZero',
            })}
          </span> */}
        </p>
      </BaseContainer>
      <BaseContainer>
        <h6>Rebalancing volume</h6>
        <p className="text-3xl">
          {rebalancingVolume &&
            formatUsdValue(formatUnits(BigInt(rebalancingVolume), 6), {
              notation: 'compact',
              minimumFractionDigits: 2,
            })}
        </p>
        {withLink && (
          <Link
            to={`${ROUTES.TOKENS}/${tokenName}`}
            className="group absolute bottom-[1.34rem] flex items-center gap-0.5 text-semi-base font-bold uppercase text-main-100"
          >
            <span>Go to {tokenName}</span>
            <Arrow className="h-fit w-5 -rotate-90 transition group-hover:translate-x-1 [&_*]:stroke-main-100" />
          </Link>
        )}
        <img
          src={img}
          alt={tokenName}
          className={cn(
            'absolute bottom-[-5.4rem] right-[-8.5rem] size-[20.8125rem] opacity-20',
            imageClassName,
          )}
        />
      </BaseContainer>
    </div>
  )
}

const SkeletonTokenStatsContainer = (
  _props: Omit<TokenStatsContainerProperties, 'color'>,
) => {
  const { className, tokenName, img, imageClassName, withLink = true, ...rest } = _props
  return (
    <div
      className={cn(
        className,
        'grid w-full grid-cols-[repeat(2,1fr)_1.8fr] gap-2 *:h-[11.875rem] *:space-y-2 [&>div:first-child]:rounded-l-3xl [&>div:last-child]:rounded-r-3xl',
      )}
      {...rest}
    >
      <BaseContainer>
        <h6>{tokenName} Apy</h6>

        <Skeleton className="h-8 w-[9.1rem]" />
      </BaseContainer>
      <BaseContainer>
        <h6>{tokenName} tvl</h6>
        <Skeleton className="h-8 w-[9.1rem]" />
      </BaseContainer>
      <BaseContainer>
        <h6>Rebalancing volume</h6>
        <Skeleton className="h-8 w-[9.1rem]" />
        {withLink && (
          <Link
            to={`${ROUTES.TOKENS}/${tokenName}`}
            className="group absolute bottom-[1.34rem] flex items-center gap-0.5 text-semi-base font-bold uppercase text-main-100"
          >
            <span>Go to {tokenName}</span>
            <Arrow className="h-fit w-5 -rotate-90 transition group-hover:translate-x-1 [&_*]:stroke-main-100" />
          </Link>
        )}
        <img
          src={img}
          alt={tokenName}
          className={cn(
            'absolute bottom-[-5.4rem] right-[-8.5rem] size-[20.8125rem] opacity-20',
            imageClassName,
          )}
        />
      </BaseContainer>
    </div>
  )
}
