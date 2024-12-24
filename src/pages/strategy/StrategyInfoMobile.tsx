import type { Strategy, Token } from '@api/maat-finance/types'
import { useStrategy } from '@api/maat-finance/useStrategy'
import ArrowBack from '@assets/icons/arrow-left.svg'
import StrategyIcon from '@assets/icons/strategy-icon.svg'
import { TokenIconComponent } from '@components/token-icon'
import { Skeleton } from '@components/ui/skeleton'
import { CHAIN_NAMES_BY_ID } from '@constants/chains'
import { cn } from '@utils/cn'
import { formatPercentValue, formatUsdValue } from '@utils/formatValue'
import { shortenAddress } from '@utils/transform'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { StrategyInfoRowOptions } from './StrategyInfoRowOptions'
import { TokenChartMobile } from './TokenChartMobile'

interface StrategyInfoProperties extends ComponentProps<'div'> {}

export const StrategyInfoMobile = (props: StrategyInfoProperties) => {
  const { className, ...rest } = props
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: strategy, isLoading, error } = useStrategy(id)
  const [isDescriptionVisible, setDescriptionVisible] = useState(false)

  if (isLoading || error) {
    return <StrategyInfoMobileSkeleton />
  }

  const protocolDescription = strategy?.info?.protocol?.description || ''
  const strategyDescription = strategy?.info?.strategy_description
  const protocol = strategy?.info?.protocol?.name
  console.log(strategy?.info?.protocol?.link)
  const halfDescription = `${protocolDescription.slice(
    0,
    Math.ceil(protocolDescription.length / 2),
  )}...`

  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        className="mt-4 flex items-center gap-1 text-[1.25rem]/[2rem] font-medium text-text-260"
        onClick={() => navigate(-1)}
      >
        <div className="flex size-6 items-center justify-center">
          <ArrowBack className="size-3" />
        </div>
        <span>Back to Events</span>
      </button>
      <div className="flex flex-col rounded-b-3xl shadow-test-2">
        <div className="rounded-t-3xl  bg-cards-widget ">
          <div className="flex items-center justify-between gap-2 p-4">
            <div className="flex items-center gap-1">
              <TokenIconComponent symbol={protocol} className="size-8 shrink-0" />
              <p className="text-sm leading-4 text-text-100">{protocol}</p>
            </div>
            <div>
              <button
                className="text-sm text-text-2100"
                onClick={() => setDescriptionVisible(!isDescriptionVisible)}
                type="button"
              >
                {isDescriptionVisible ? 'Show less' : 'Learn more'}
              </button>
            </div>
          </div>
          <div className="px-4 pb-2">
            <p className="text-sm text-text-2100">
              {isDescriptionVisible ? protocolDescription : halfDescription}
            </p>
          </div>
        </div>
        <TokenChartMobile token={strategy?.token as Token} />
      </div>

      <div className="flex flex-col  gap-4 rounded-3xl bg-cards-widget py-3 shadow-test-2">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center gap-2 px-4">
            <TokenIconComponent symbol={protocol} className="size-8 shrink-0" />
            <div className="text-sm">
              <span className="text-text-100">{shortenAddress(id ?? '')}</span>
              <p className="text-text-60">{protocol}</p>
            </div>
          </div>
          <div className="pr-4">
            <span className="text-text-60">APY </span>
            <span className="text-text-100">
              {formatPercentValue(strategy?.apy).replace('%', '')}
              <span className="text-text-60">%</span>
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between px-4">
          <span className="text-text-2100">Token</span>
          <div className="flex items-center justify-center gap-[0.38rem] text-text-100">
            <TokenIconComponent symbol={strategy?.token.symbol} className="size-4" />
            <span>{strategy?.token.symbol}</span>
          </div>
        </div>
        <div className="flex items-center justify-between px-4">
          <span className="text-text-2100">Chain</span>
          <div className="flex items-center justify-center gap-[0.38rem] text-text-100">
            <TokenIconComponent symbol={strategy?.token.chain_id} className="size-4" />
            <span>
              {
                CHAIN_NAMES_BY_ID[
                  strategy?.token.chain_id as keyof typeof CHAIN_NAMES_BY_ID
                ]
              }
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between px-4">
          <span className="text-text-2100">TVL</span>
          <div className="flex items-center justify-center gap-[0.38rem] text-text-100">
            {formatUsdValue(strategy?.tvl ?? 0, {
              notation: 'compact',
            })}
          </div>
        </div>
      </div>
      <div
        className={cn(
          ' flex flex-col gap-2 *:rounded-2xl *:bg-cards-widget *:shadow-test-2',
          className,
        )}
        {...rest}
      >
        <div className="col-span-2 flex flex-col gap-3">
          <div className="text-text flex h-12 items-center justify-between gap-3 border-b border-stroke-100 text-base">
            <div className="flex items-center justify-center gap-[0.38rem] pl-4">
              <StrategyIcon className="size-6" />
              <p className=" text-sm text-text-100">Strategy</p>
            </div>
            <div className="flex items-center justify-center gap-[0.38rem] pr-4">
              <span className="text-sm ">{shortenAddress(id ?? '')}</span>
              <div className="flex items-center justify-end">
                <StrategyInfoRowOptions
                  strategy={strategy as Strategy}
                  id={id as string}
                  className="size-6 rounded-lg p-[0.38rem]"
                />
              </div>
            </div>
          </div>
          <p className="px-4 pb-3 text-sm text-text-2100">{strategyDescription}</p>
        </div>
      </div>
    </div>
  )
}

const StrategyInfoMobileSkeleton = (props: ComponentProps<'div'>) => {
  const { className, ...rest } = props
  return (
    <div className={cn('flex flex-col gap-4', className)} {...rest}>
      <button
        type="button"
        className="mt-4 flex items-center gap-1 text-[1.25rem]/[2rem] font-medium text-text-260"
      >
        <div className="flex size-6 items-center justify-center">
          <Skeleton className="size-3" />
        </div>
        <span>
          <Skeleton className="h-4 w-32" />
        </span>
      </button>
      <div className="flex flex-col rounded-b-3xl shadow-test-2">
        <div className="rounded-t-3xl bg-cards-widget">
          <div className="flex items-center justify-between gap-2 p-4">
            <div className="flex items-center gap-1">
              <Skeleton className="size-8" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div>
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
          <div className="px-4 pb-2">
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
        <Skeleton className="h-40 w-full" />
      </div>
      <div className="flex flex-col gap-4 rounded-3xl bg-cards-widget py-3 shadow-test-2">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center gap-2 px-4">
            <Skeleton className="size-8" />
            <div className="text-sm">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
          <div className="pr-4">
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
        <div className="flex items-center justify-between px-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex items-center justify-between px-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex items-center justify-between px-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  )
}
