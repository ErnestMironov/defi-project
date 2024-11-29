import { useStrategy } from '@api/maat-finance/useStrategy'
import ActionIcon from '@assets/icons/action.svg'
import ArrowTopRight from '@assets/icons/arrow-top-right.svg'
import CopyIcon from '@assets/icons/violet-copy.svg'
import { CopyButton } from '@components/copy/CopyButton'
import { IconWithLabelComponent } from '@components/token-icon'
import { Skeleton } from '@components/ui/skeleton'
import { BaseContainer } from '@pages/analytics/components/BaseContainer'
import { cn } from '@utils/cn'
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
    <div className={cn('grid grid-rows-2 grid-flow-row gap-4', className)} {...rest}>
      <BaseContainer className="flex flex-col p-6">
        <IconWithLabelComponent
          className="gap-2 uppercase [&_p]:text-[1.125rem]/6 [&_svg]:size-6"
          symbol={strategy?.info?.protocol?.name}
        />
        <p className="mb-4 mt-3 flex items-start gap-2 text-sm/[1.25rem] font-normal text-text-2100">
          {protocolDescription}
        </p>
        <a
          target="_blank"
          href={protocol_link}
          className="mt-auto flex items-center justify-between rounded-2xl border border-stroke-100 px-6 py-4"
          rel="noreferrer"
        >
          <p className="text-sm/[1.25rem] text-text-2100">Learn more</p>
          <div className="hover:bg-main-200 flex size-6 items-center justify-center rounded-md bg-main-100 transition-colors">
            <ArrowTopRight className="size-3 [&_g]:opacity-100 [&_path]:stroke-white" />
          </div>
        </a>
      </BaseContainer>
      <BaseContainer className="flex h-full flex-col p-6">
        <div className="flex items-center gap-2">
          <ActionIcon className="size-6" />
          <p className="text-lg/[1.5rem]">Strategy</p>
        </div>
        <p className="mb-4 mt-3 flex items-start gap-2 text-sm/[1.25rem] font-normal text-text-2100">
          {strategyDescription}
        </p>
        <div className="mt-auto flex items-center justify-between rounded-2xl border border-stroke-100 px-6 py-4">
          <p className="text-sm/[1.25rem]">{shortenAddress(id ?? '')}</p>
          <CopyButton text={id ?? ''} className="size-6">
            <CopyIcon className="hover:bg-main-200 flex items-center justify-center rounded-md bg-main-100 transition-colors" />
          </CopyButton>
        </div>
      </BaseContainer>
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
        <h6 className="text-text text-3xl">Protocol Info</h6>
        <p className="text-lg text-text-80">
          <Skeleton className="h-[7.1rem] w-full" />
        </p>
        <div className="mt-auto flex items-center justify-between">
          <p className="text-lg text-gray-100">Strategy ID</p>
          <div className="text-text flex items-center gap-2 text-lg/[1.35rem]">
            <Skeleton className="h-7 w-40" />
          </div>
        </div>
      </div>
      <div className="row-span-2 flex flex-col gap-6 px-10 py-8">
        <h6 className="text-text text-3xl">Strategy Info</h6>
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
