import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

interface TransactionInfoTitleProperties extends ComponentProps<'div'> {
  title: string
}

export const TransactionInfoTitle = (props: TransactionInfoTitleProperties) => {
  const { className, title, ...rest } = props
  return (
    <h3
      className={cn(
        'text-[1.5625rem]/[1.875rem] max-lg:text-lg max-lg:uppercase',
        className,
      )}
      {...rest}
    >
      {title}
    </h3>
  )
}
