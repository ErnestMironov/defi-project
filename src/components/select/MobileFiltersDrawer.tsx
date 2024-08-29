import X from '@assets/icons/close.svg'
import { Button } from '@components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@components/ui/drawer'
import { cn } from '@utils/cn'
import React, { type ComponentProps, useState } from 'react'

interface MobileFiltersDrawerProperties extends ComponentProps<'div'> {
  resetFilters: () => void
  trigger: React.ReactNode
  title: string
  closeOnReset?: boolean
}

export const DrawerIconTrigger = (
  props: ComponentProps<'button'> & {
    Icon: React.ElementType
    active: boolean
  },
) => {
  const { Icon, active, className, ...rest } = props
  return (
    <button
      type="button"
      className={cn(
        'flex size-10 items-center justify-center rounded-lg bg-cards',
        className,
      )}
      {...rest}
    >
      <Icon className={cn('size-6', active && '[&_path]:fill-light-blue-100')} />
    </button>
  )
}

export const MobileFiltersDrawer = (props: MobileFiltersDrawerProperties) => {
  const {
    className,
    children,
    resetFilters,
    trigger,
    title,
    closeOnReset = false,
  } = props
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild className={cn(className)}>
        {trigger}
      </DrawerTrigger>
      <DrawerContent
        aria-describedby={undefined}
        position="bottom"
        withDraggable={false}
        className="inset-x-0 w-full items-center justify-center space-y-5 px-4 py-6"
      >
        <DrawerHeader className="flex w-full items-center justify-between">
          <DrawerTitle className="text-lg font-bold text-text-90">{title}</DrawerTitle>
          <DrawerClose>
            <X className="size-6 [&_path]:stroke-gray-100" />
          </DrawerClose>
        </DrawerHeader>
        {children}
        <div className="flex w-full items-center gap-2 *:flex-1">
          <Button
            onClick={() => {
              resetFilters()
              if (closeOnReset) {
                setIsOpen(false)
              }
            }}
            variant="outline-light"
            size="lg"
            className="py-4"
          >
            Reset
          </Button>
          <Button
            onClick={() => setIsOpen(false)}
            variant="light"
            size="lg"
            className="py-4 font-bold"
          >
            Apply
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
