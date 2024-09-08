import type { Strategy } from '@api/maat-finance/types'
import Arrow from '@assets/icons/curve-arrow-down.svg'
import { IconWithLabelComponent } from '@components/token-icon'
import { ROUTES } from '@routes/routes'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'
import { useNavigate } from 'react-router-dom'

interface StrategyRowProperties extends ComponentProps<'div'> {
  strategy: Strategy
  withLink?: boolean
}

export const StrategyRow = (props: StrategyRowProperties) => {
  const {
    className,
    color,
    strategy: {
      token: { symbol },
      chain_id,
      protocol,
      id,
    },
    withLink = true,
    ...rest
  } = props
  const navigate = useNavigate()
  return (
    <div
      onClick={() => {
        if (withLink) {
          navigate(`${ROUTES.STRATEGIES}/${id}`)
        }
      }}
      className={cn(
        'group flex items-center rounded-xl border border-stroke-100 px-3 py-[1.12rem] gap-3',
        withLink ? 'cursor-pointer' : 'cursor-default',
        className,
      )}
      {...rest}
    >
      {color && (
        <div className="size-2 rounded-full" style={{ backgroundColor: color }} />
      )}
      <IconWithLabelComponent className="size-6 gap-1.5" symbol={symbol} />
      <IconWithLabelComponent className="size-6 gap-1.5" symbol={chain_id} />
      <IconWithLabelComponent className="size-6 gap-1.5 truncate" symbol={protocol} />
      {withLink && (
        <Arrow className="ml-auto shrink-0 -rotate-90 transition group-hover:translate-x-2 [&_path]:stroke-main-100" />
      )}
    </div>
  )
}
