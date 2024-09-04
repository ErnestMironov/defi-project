import type { Strategy } from '@api/maat-finance/types'
import CurveArrow from '@assets/icons/curve-arrow-down.svg'
import { IconWithLabelComponent } from '@components/token-icon'
import { ROUTES } from '@routes/routes'
import { cn } from '@utils/cn'
import { motion } from 'framer-motion'
import { type ComponentProps } from 'react'
import { useNavigate } from 'react-router-dom'

interface StrategyMobileDrawerItemProperties extends ComponentProps<'div'> {
  strategy: Strategy
  color: string
}

export const StrategyMobileDrawerItem = (props: StrategyMobileDrawerItemProperties) => {
  const {
    className,
    color,
    strategy: {
      token: { symbol },
      protocol,
      chain_id,
      id,
    },
  } = props
  const navigate = useNavigate()
  return (
    <motion.div className={cn(className, 'flex items-center gap-3 w-full')}>
      <div className="flex h-[3.75rem] flex-1 items-center gap-2 overflow-x-auto rounded-xl border border-stroke-100 p-3">
        <div
          style={{ backgroundColor: color }}
          className="size-2 shrink-0 rounded-full"
        />
        <div className="hide-scrollbar flex items-center overflow-auto">
          <div className="inline-flex gap-[0.62rem] whitespace-nowrap">
            {[symbol, chain_id, protocol].map((item) => (
              <IconWithLabelComponent
                key={item}
                symbol={item}
                className="text-semi-base/0 gap-2 [&>svg]:size-6"
              />
            ))}
          </div>
        </div>
        <CurveArrow
          className="ml-auto size-7 shrink-0 -rotate-90 [&_path]:stroke-main-100"
          onClick={() => navigate(`${ROUTES.STRATEGIES}/${id}`)}
        />
      </div>
    </motion.div>
  )
}
