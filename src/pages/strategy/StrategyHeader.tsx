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
    return <StrategyHeaderSkeleton className={className} {...rest} />
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
    <div className={cn('flex items-center gap-4', className)} {...rest}>
      <Skeleton className="size-8 shrink-0" />
      <div>
        <div className="flex items-center gap-[0.38rem] text-base/[1.5rem]">
          <Skeleton className="h-6 w-40" />
        </div>
        <Skeleton className="mt-1 h-6 w-20" />
      </div>
    </div>
  )
}
