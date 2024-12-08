import { Skeleton } from '@components/ui/skeleton'
import { cn } from '@utils/cn'
import { formatUsdValue } from '@utils/formatValue'
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
      <div
        className={cn(
          +integerPart > 0 && +decimalPart > 0 ? 'text-text' : 'text-gray-100',
        )}
      >
        <span className="text-[28px]">{integerPart}</span>
        <span className="text-[28px]">
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
