import X from '@assets/icons/close.svg'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@components/ui/drawer'
import type { Drawer as DrawerPrimitive } from 'vaul'

import { useMobileCustomStrategiesChartStore } from '../strategies-chart/mobile/useMobileStrategiesChartStore'
import { CustomProtocolDrawerItem } from './CustomProtocolDrawerItem'

interface CustomProtocolsDrawerProperties {
  className?: string
}

export const CustomProtocolsDrawer = (
  props: CustomProtocolsDrawerProperties &
    React.ComponentProps<typeof DrawerPrimitive.Root>,
) => {
  const { className, children, ...rest } = props
  const { customStrategiesWithColors, onCustomStrategiesVisibilityChange } =
    useMobileCustomStrategiesChartStore()
  return (
    <Drawer {...rest} direction="right">
      <DrawerTrigger asChild className={className}>
        {children}
      </DrawerTrigger>
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
        {customStrategiesWithColors.map((strategyWithColor, i) => {
          return (
            <CustomProtocolDrawerItem
              key={i}
              index={i}
              strategyWithColor={strategyWithColor}
              onVisibleChange={() =>
                onCustomStrategiesVisibilityChange(strategyWithColor)
              }
            />
          )
        })}
      </DrawerContent>
    </Drawer>
  )
}
