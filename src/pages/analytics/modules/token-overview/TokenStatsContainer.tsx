import Arrow from '@assets/icons/curve-arrow-down.svg'
import { cn } from '@utils/cn'
import { formatPercentValue, formatUsdValue } from '@utils/formatValue'
import { type ComponentProps, Suspense } from 'react'
import { Link } from 'react-router-dom'

import { BaseContainer } from '../../components/BaseContainer'

interface TokenStatsContainerProperties extends ComponentProps<'div'> {
  color: string
  tokenName: string
  apy: string
  tvl: string
  rebalancingVolume: string
  img: string
  imageClassName?: string
}

export const TokenStatsContainer = (props: TokenStatsContainerProperties) => {
  const {
    className,
    color,
    apy,
    tvl,
    rebalancingVolume,
    img,
    imageClassName,
    tokenName,
    ...rest
  } = props
  return (
    <div
      className={cn(
        className,
        'grid grid-cols-[repeat(2,1fr)_1.8fr] gap-2 *:h-[11.875rem] *:space-y-2 [&>div:first-child]:rounded-l-3xl [&>div:last-child]:rounded-r-3xl',
      )}
      {...rest}
    >
      <BaseContainer>
        <h6>{tokenName} Apy</h6>

        <p className="text-3xl">
          <Suspense fallback="loading...">
            {formatPercentValue(apy, {
              maximumFractionDigits: 2,
            })}
          </Suspense>
          <span className="ml-2 align-top text-xl/[1.375rem]" style={{ color }}>
            {formatPercentValue('0.271', {
              maximumFractionDigits: 0,
              signDisplay: 'exceptZero',
            })}
          </span>
        </p>
      </BaseContainer>
      <BaseContainer>
        <h6>{tokenName} tvl</h6>
        <p className="text-3xl">
          {formatUsdValue(tvl, { notation: 'compact', minimumFractionDigits: 2 })}
          <span className="ml-2 align-top text-xl/[1.375rem]" style={{ color }}>
            {formatPercentValue('0.271', {
              maximumFractionDigits: 0,
              signDisplay: 'exceptZero',
            })}
          </span>
        </p>
      </BaseContainer>
      <BaseContainer>
        <h6>Rebalancing volume</h6>
        <p className="text-3xl">
          {formatUsdValue(rebalancingVolume, {
            notation: 'compact',
            minimumFractionDigits: 2,
          })}
        </p>
        <Link
          to="#"
          className="group absolute bottom-[1.34rem] flex items-center gap-0.5 text-semi-base font-bold uppercase text-main-100"
        >
          <span>Go to {tokenName}</span>
          <Arrow className="h-fit w-5 -rotate-90 transition group-hover:translate-x-1 [&_*]:stroke-main-100" />
        </Link>
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
