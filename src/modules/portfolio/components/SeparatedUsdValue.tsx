import { Skeleton } from '@components/ui/skeleton'
import { cn } from '@utils/cn'
import { formatAmount, formatUsdValue } from '@utils/formatValue'
import { type ComponentProps } from 'react'

interface SeparatedUsdValueProperties extends ComponentProps<'div'> {
  value: string | number | undefined
  loading: boolean
}

export const SeparatedUsdValue = ({
  value,
  loading,
  className,
  ...rest
}: SeparatedUsdValueProperties) => {
  const [integerPart, decimalPart] = formatUsdValue(value)?.split('.') ?? []
  const renderBody = () => {
    if (loading) return <Skeleton className="h-[2.8rem] w-28" />
    return (
      <div className="">
        <span className="text-2.5xl text-text-80100">{integerPart?.charAt(0)}</span>
        <span
          className={cn(
            +formatAmount(value as number) > 0 ? 'text-text-2100' : 'text-text-80100',
            'text-2.5xl',
          )}
        >
          {integerPart?.slice(1)}
          <span className={cn(!decimalPart && 'hidden')}>.</span>
          {decimalPart}
        </span>
      </div>
    )
  }
  return (
    <div className={cn('font-medium text-text', className)} {...rest}>
      {renderBody()}
    </div>
  )
}
