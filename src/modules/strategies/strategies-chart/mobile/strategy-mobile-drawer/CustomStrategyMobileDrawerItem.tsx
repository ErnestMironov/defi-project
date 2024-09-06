import type { Strategy } from '@api/maat-finance/types'
import Eye from '@assets/icons/eye.svg'
import Hide from '@assets/icons/eye-no.svg'
import Setting from '@assets/icons/setting.svg'
import { ArrowLink } from '@components/link/ArrowLink'
import { IconWithLabelComponent, TokenIconComponent } from '@components/token-icon'
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@components/ui/drawer'
import { ROUTES } from '@routes/routes'
import { cn } from '@utils/cn'
import { motion } from 'framer-motion'
import type { ComponentProps, PropsWithChildren } from 'react'

import type { StrategyWithColor } from '../useMobileStrategiesChartStore'
import { CustomStrategySelectDrawer } from './CustomStrategySelectDrawer'

interface CustomStrategyMobileDrawerItemProperties extends ComponentProps<'div'> {
  strategy: Strategy
  color: string
  visible: boolean
  onVisibilityChange: () => void
  index: number
  onStrategySelect: (strategy: Strategy) => void
  strategiesWithColors: StrategyWithColor[]
}

export const CustomStrategyMobileDrawerItem = (
  props: CustomStrategyMobileDrawerItemProperties,
) => {
  const {
    className,
    color,
    strategy: {
      token: { symbol },
      protocol,
      chain_id,
    },
    visible,
    onVisibilityChange,
    index,
    onStrategySelect,
    strategiesWithColors,
  } = props
  return (
    <motion.div className={cn(className, 'flex items-center gap-3 w-full')}>
      <StrategiesDrawerNavigate {...props}>
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
        </div>
      </StrategiesDrawerNavigate>

      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
      >
        <button type="button" onClick={onVisibilityChange}>
          {visible ? <Eye className="size-6" /> : <Hide className="size-6" />}
        </button>
        <CustomStrategySelectDrawer
          index={index}
          color={color}
          onStrategySelect={onStrategySelect}
          strategiesWithColors={strategiesWithColors}
        >
          <Setting className="size-6" />
        </CustomStrategySelectDrawer>
      </motion.div>
    </motion.div>
  )
}

const StrategiesDrawerNavigate = (props: PropsWithChildren & { strategy: Strategy }) => {
  const {
    children,
    strategy: {
      token: { symbol },
      protocol,
      chain_id,
      id,
    },
  } = props
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent
        withDraggable={false}
        aria-describedby={undefined}
        className="border border-stroke-100 p-6"
      >
        <DrawerTitle className="sr-only">Custom strategy</DrawerTitle>
        <div className="flex items-start gap-2">
          <div className="flex items-center -space-x-2">
            {[symbol, chain_id, protocol].map((item) => (
              <TokenIconComponent key={item} symbol={item} className="size-5" />
            ))}
          </div>
          <p className="text-lg">
            Want to go to <br /> this strategy page?
          </p>
          <ArrowLink className="ml-auto" to={`${ROUTES.STRATEGIES}/${id}`} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
