import Arrow from '@assets/icons/curve-arrow-down.svg'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { BaseContainer } from '@pages/analytics/components/BaseContainer'
import { ROUTES } from '@routes/routes'
import { cn } from '@utils/cn'
import { formatPercentValue, formatUsdValue } from '@utils/formatValue'
import { type ComponentProps } from 'react'
import { Link } from 'react-router-dom'

interface TokenStatsContainerProperties extends ComponentProps<'div'> {
  color: string
  tokenName: string
  apy: string
  tvl: string
  rebalancingVolume: string
  img: string
  imageClassName?: string
  withLink?: boolean
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
    withLink = true,
    ...rest
  } = props
  const { isBelowDesktop } = useDeviceWidth()
  if (isBelowDesktop) {
    return (
      <div className={cn('hide-scrollbar overflow-scroll w-screen px-4 pb-1', className)}>
        <BaseContainer
          className={cn('flex flex-col gap-[0.62rem] w-fit rounded-[1rem] px-5 py-4')}
        >
          <div className="flex items-center space-x-6 *:flex *:flex-col *:justify-center *:space-y-1 [&>*]:h-14 [&_h6]:whitespace-nowrap [&_h6]:text-[0.75rem]/[0.9rem] [&_h6]:text-gray-100 [&_p]:text-[1.5rem]/[1.8rem] [&_p]:text-text">
            <div>
              <h6>{tokenName} Apy</h6>
              <p>
                {formatPercentValue(apy, {
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            <div className="h-full w-px bg-stroke-100" />
            <div>
              <h6>{tokenName} tvl</h6>
              <p>
                {formatUsdValue(tvl, { notation: 'compact', minimumFractionDigits: 2 })}
                <span
                  className="ml-1 align-top text-[0.75rem]/[0.9rem]"
                  style={{ color }}
                >
                  {formatPercentValue('27', {
                    maximumFractionDigits: 0,
                    signDisplay: 'exceptZero',
                  })}
                </span>
              </p>
            </div>
            <div className="h-full w-px bg-stroke-100" />
            <div>
              <h6>Rebalancing volume</h6>
              <p>
                {formatUsdValue(rebalancingVolume, {
                  notation: 'compact',
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
          {withLink && (
            <Link
              to={`/tokens/${tokenName}`}
              className="group flex items-center gap-0.5 text-[0.75rem]/[0.9rem] font-bold uppercase text-main-100"
            >
              <span>Go to {tokenName}</span>
              <Arrow className="h-[1em] w-fit -rotate-90 transition group-hover:translate-x-1 [&_*]:stroke-main-100" />
            </Link>
          )}
        </BaseContainer>
      </div>
    )
  }
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
          {formatPercentValue(apy, {
            maximumFractionDigits: 2,
          })}
          <span className="ml-2 align-top text-xl/[1.375rem]" style={{ color }}>
            {formatPercentValue('27', {
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
            {formatPercentValue('27', {
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
