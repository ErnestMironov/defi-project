import X from '@assets/icons/close.svg'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@components/ui/drawer'
import type { Drawer as DrawerPrimitive } from 'vaul'

import { CustomProtocolDrawerItem } from './CustomProtocolDrawerItem'
import { COLORS } from './MultiColoredLineChart'

interface CustomProtocolsDrawerProperties {
  className?: string
}

const MOCK_STRATEGIES = [
  {
    symbol: 'USDT',
    chain: 'Arbitrum',
    protocol: 'Yearn',
    value: '100',
  },
  {
    symbol: 'USDC',
    protocol: 'Beefy',
    chain: 'Mantle',
    value: '100',
  },
  {
    symbol: 'USDT',
    protocol: 'Sonne',
    chain: 'Aave',
    value: '100',
  },
  {
    symbol: 'USDC',
    chain: 'Arbitrum',
    protocol: 'Yearn',
    value: '100',
  },
  {
    symbol: 'USDT',
    chain: 'Arbitrum',
    protocol: 'Compound',
    value: '100',
  },
  {
    symbol: undefined,
    chain: undefined,
    protocol: undefined,
    value: undefined,
    visible: false,
  },
]

export const CustomProtocolsDrawer = (
  props: CustomProtocolsDrawerProperties &
    React.ComponentProps<typeof DrawerPrimitive.Root>,
) => {
  const { className, children, ...rest } = props
  return (
    <Drawer {...rest} direction="right">
      {/* <DrawerTrigger asChild className={className}> */}
      <div className={className}>{children}</div>
      <DrawerContent
        withDraggable={false}
        position="right"
        className="w-[34.625rem] items-center justify-center space-y-9 px-6 py-16"
      >
        <DrawerHeader className="flex w-full items-center justify-between">
          <DrawerTitle>Graph customization</DrawerTitle>
          <DrawerClose>
            <X className="size-7 [&_path]:fill-text" />
          </DrawerClose>
        </DrawerHeader>
        {MOCK_STRATEGIES.map((strategy, i) => (
          <CustomProtocolDrawerItem key={i} index={i} color={COLORS[i]} {...strategy} />
        ))}
      </DrawerContent>
    </Drawer>
  )
}
