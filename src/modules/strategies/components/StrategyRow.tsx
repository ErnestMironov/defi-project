import Arrow from '@assets/icons/curve-arrow-down.svg'
import { IconWithLabelComponent } from '@components/token-icon'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

interface StrategyRowProperties extends ComponentProps<'div'> {
  symbol: string
  chain: string
  protocol: string
}

export const StrategyRow = (props: StrategyRowProperties) => {
  const { className, color, symbol, chain, protocol, ...rest } = props
  return (
    <div
      className={cn(
        className,
        'group flex items-center rounded-xl border border-stroke-100 px-3 py-[1.12rem] cursor-pointer gap-3',
      )}
      {...rest}
    >
      <div className="size-2 rounded-full" style={{ backgroundColor: color }} />
      <IconWithLabelComponent className="size-6 gap-1.5" symbol={symbol} />
      <IconWithLabelComponent className="size-6 gap-1.5" symbol={chain} />
      <IconWithLabelComponent className="size-6 gap-1.5 truncate" symbol={protocol} />
      <Arrow className="ml-auto shrink-0 -rotate-90 transition group-hover:translate-x-2 [&_path]:stroke-main-100" />
    </div>
  )
}
