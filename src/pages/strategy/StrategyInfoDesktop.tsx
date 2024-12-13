import { useStrategy } from '@api/maat-finance/useStrategy'
import ActionIcon from '@assets/icons/action.svg'
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
    return <StrategyInfoDesktopSkeleton className={className} {...rest} />
  }

  const protocolDescription = strategy?.info?.protocol?.description
  const protocol_link = strategy?.info?.protocol?.link
  const strategyDescription = strategy?.info?.strategy_description

  return (
    <div className={cn('grid grid-cols-2 grid-flow-row gap-4', className)} {...rest}>
      <BaseContainer className="flex flex-col p-6">
        <div className="flex items-center justify-between">
          <IconWithLabelComponent
            className="gap-2 uppercase [&_p]:text-[1.125rem]/6 [&_svg]:size-6"
            symbol={strategy?.info?.protocol?.name}
          />
          <a
            target="_blank"
            href={protocol_link}
            className="mt-auto flex items-center justify-between rounded-2xl text-sm/[1.25rem] text-text-100"
            rel="noreferrer"
          >
            Learn more
          </a>
        </div>

        <p className="mt-3 flex items-start gap-2 text-sm/[1.25rem] font-normal text-text-2100">
          {protocolDescription}
        </p>
      </BaseContainer>
      <BaseContainer className="flex h-full flex-col p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ActionIcon className="size-6" />
            <p className="text-lg/[1.5rem]">Strategy</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm/[1.25rem]">{shortenAddress(id ?? '')}</p>
            <CopyButton text={id ?? ''} className="size-3.5" />
          </div>
        </div>

        <p className="mt-3 flex items-start gap-2 text-sm/[1.25rem] font-normal text-text-2100">
          {strategyDescription}
        </p>
      </BaseContainer>
    </div>
  )
}

const StrategyInfoDesktopSkeleton = (props: ComponentProps<'div'>) => {
  const { className, ...rest } = props
  return (
    <div className={cn('grid grid-cols-2 grid-flow-row gap-4', className)} {...rest}>
      <BaseContainer className="flex flex-col p-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-20" />
        </div>

        <Skeleton className="mt-3 h-6 w-full" />
        <Skeleton className="mt-3 h-6 w-[90%]" />
        <Skeleton className="mt-3 h-6 w-4/5" />
      </BaseContainer>
      <BaseContainer className="flex h-full flex-col p-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-20" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-20" />
          </div>
        </div>

        <Skeleton className="mt-3 h-6 w-full" />
        <Skeleton className="mt-3 h-6 w-[90%]" />
        <Skeleton className="mt-3 h-6 w-4/5" />
      </BaseContainer>
    </div>
  )
}
