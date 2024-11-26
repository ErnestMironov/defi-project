import { useStrategy } from '@api/maat-finance/useStrategy'
import { ScanLink } from '@components/scan-link/ScanLink'
import { TokenIconComponent } from '@components/token-icon'
import { Skeleton } from '@components/ui/skeleton'
import { cn } from '@utils/cn'
import { shortenAddress } from '@utils/transform'
import type { ComponentProps } from 'react'
import { useParams } from 'react-router-dom'

interface StrategyHeaderProperties extends ComponentProps<'div'> {}

export const StrategyHeader = (props: StrategyHeaderProperties) => {
  const { className, ...rest } = props
  const { id } = useParams()
  const { data: strategy, isLoading, error } = useStrategy(id)

  const protocol = strategy?.info?.protocol?.name

  if (isLoading || error) {
    return <StrategyHeaderSkeleton />
  }
  return (
    <div className={cn('flex items-center gap-4', className)} {...rest}>
      <TokenIconComponent symbol={protocol} className="size-8 shrink-0" />
      <div>
        <div className="flex items-center gap-[0.38rem] text-base/[1.5rem]">
          <p>{shortenAddress(strategy?.address ?? '')}</p>
          <ScanLink address={strategy?.address ?? ''} chainId={strategy?.chain_id ?? 0} />
        </div>
        <h1 className="text-sm/[1rem] text-text-2100">{protocol}</h1>
      </div>
    </div>
  )
}

const StrategyHeaderSkeleton = (props: ComponentProps<'div'>) => {
  const { className, ...rest } = props
  return (
    <div
      className={cn(
        'mt-10 flex items-center max-lg:items-start gap-8 max-lg:gap-2',
        className,
      )}
      {...rest}
    >
      <div className="flex items-center -space-x-3 *:size-7 max-lg:-space-x-1.5 lg:*:size-16">
        <Skeleton className="size-7 rounded-full" />
        <Skeleton className="size-7 rounded-full" />
        <Skeleton className="size-7 rounded-full" />
      </div>
      <div className="justify-center space-y-3">
        <h1 className="text-[2rem]/[2.4rem] max-lg:text-2xl">
          <Skeleton className="h-10 w-40" />
        </h1>
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-40" />
        </div>
      </div>
    </div>
  )
}
