import OptionsDots from '@assets/icons/options-dots.svg'
import { BaseContainer } from '@pages/analytics/components/BaseContainer'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

export const TableRowOptionsTrigger = (props: ComponentProps<'div'>) => {
  const { className, ...rest } = props
  return (
    <BaseContainer
      className={cn(
        'flex size-14 items-center justify-center rounded-2xl group-hover:shadow-test-2 [&]:shadow-none',
        className,
      )}
      {...rest}
    >
      <OptionsDots className="size-4" />
    </BaseContainer>
  )
}
