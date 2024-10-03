import { useStrategy } from '@api/queries/useStrategy'
import Planet from '@assets/icons/planet.svg'
import { CopyButton } from '@components/copy/CopyButton'
import { Skeleton } from '@components/ui/skeleton'
import { cn } from '@utils/cn'
import { formatPercentValue, formatUsdValue } from '@utils/formatValue'
import { shortenAddress } from '@utils/transform'
import type { ComponentProps } from 'react'
import { useParams } from 'react-router-dom'

interface StrategyInfoProperties extends ComponentProps<'div'> {}

export const StrategyInfoDesktop = (props: StrategyInfoProperties) => {
  const { className, ...rest } = props
  const { id } = useParams()

  const { data: strategy, isLoading, error } = useStrategy(id)
  if (isLoading || error) {
    return <StrategyInfoDesktopSkeleton />
  }

  const protocolDescription = strategy?.info?.protocol?.description
  const protocol_link = strategy?.info?.protocol?.link
  const strategyDescription = strategy?.info?.strategy_description

  return (
    <div
      className={cn(
        'mt-12 grid grid-flow-col grid-cols-[20rem_1fr_28.5625rem] grid-rows-2 gap-4 *:rounded-2xl *:bg-cards *:shadow-[0px_3px_1px_0px_rgba(135,99,243,0.12)]',
        className,
      )}
      {...rest}
    >
      <div className="flex flex-col items-start justify-center gap-[0.62rem] px-6 py-4">
        <h6 className="text-lg text-gray-100">TVL</h6>
        <p className="flex items-start gap-2 text-3xl">
          {formatUsdValue(strategy?.tvl ?? 0, {
            notation: 'compact',
          })}
          {/* <span className="text-lg text-main-80">
            {formatPercentValue(15.72, { signDisplay: 'exceptZero' })}
          </span> */}
        </p>
      </div>
      <div className="flex flex-col items-start justify-center gap-[0.62rem] px-6 py-4">
        <h6 className="text-lg text-gray-100">APY</h6>
        <p className="flex items-start gap-2 text-3xl">
          {formatPercentValue(strategy?.apy)}
        </p>
      </div>
      <div className="row-span-2 flex flex-col gap-6 px-10 py-8">
        <h6 className="text-3xl text-text">Protocol Info</h6>
        <p className="text-lg text-text-80">{protocolDescription}</p>
        <div className="mt-auto flex items-center justify-between">
          <p className="text-lg text-gray-100">Strategy ID</p>
          <div className="flex items-center gap-2 text-lg/[1.35rem] text-text">
            <span>{shortenAddress(id ?? '')}</span>
            <CopyButton text={id ?? ''} />
          </div>
        </div>
      </div>
      <div className="row-span-2 flex flex-col gap-6 px-10 py-8">
        <h6 className="text-3xl text-text">Strategy Info</h6>
        <p className="text-lg text-text-80">{strategyDescription}</p>
        <div className="mt-auto flex items-center justify-between">
          <p className="text-lg text-gray-100">Link to protocol</p>
          <a
            target="_blank"
            href={protocol_link}
            className="flex items-center gap-2 text-lg text-text"
            rel="noreferrer"
          >
            <Planet className="size-6" />
            <span>{protocol_link?.replace('https://', '')}</span>
          </a>
        </div>
      </div>
    </div>
  )
}

const StrategyInfoDesktopSkeleton = (props: ComponentProps<'div'>) => {
  const { className, ...rest } = props
  return (
    <div
      className={cn(
        'mt-12 grid grid-flow-col grid-cols-[20rem_1fr_28.5625rem] grid-rows-2 gap-4 *:rounded-2xl *:bg-cards *:px-6 *:py-4 *:shadow-[0px_3px_1px_0px_rgba(135,99,243,0.12)]',
        className,
      )}
      {...rest}
    >
      <div className="flex flex-col items-start justify-center gap-[0.62rem]">
        <h6 className="text-lg text-gray-100">TVL</h6>
        <p className="flex items-start gap-2 text-3xl">
          <Skeleton className="h-10 w-40" />
        </p>
      </div>
      <div className="flex flex-col items-start justify-center gap-[0.62rem]">
        <h6 className="text-lg text-gray-100">APY</h6>
        <p className="flex items-start gap-2 text-3xl">
          <Skeleton className="h-10 w-40" />
        </p>
      </div>
      <div className="row-span-2 flex flex-col gap-6 px-10 py-8">
        <h6 className="text-3xl text-text">Protocol Info</h6>
        <p className="text-lg text-text-80">
          <Skeleton className="h-[7.1rem] w-full" />
        </p>
        <div className="mt-auto flex items-center justify-between">
          <p className="text-lg text-gray-100">Strategy ID</p>
          <div className="flex items-center gap-2 text-lg/[1.35rem] text-text">
            <Skeleton className="h-7 w-40" />
          </div>
        </div>
      </div>
      <div className="row-span-2 flex flex-col gap-6 px-10 py-8">
        <h6 className="text-3xl text-text">Strategy Info</h6>
        <p className="text-lg text-text-80">
          <Skeleton className="h-[7.1rem] w-full" />
        </p>
        <div className="mt-auto flex items-center justify-between">
          <p className="text-lg text-gray-100">Link to protocol</p>
          <Skeleton className="h-10 w-40" />
        </div>
      </div>
    </div>
  )
}
