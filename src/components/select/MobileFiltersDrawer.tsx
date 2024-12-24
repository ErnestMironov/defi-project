import Check from '@assets/icons/check-simple.svg'
import X from '@assets/icons/close.svg'
import Reset from '@assets/icons/reset.svg'
import { Button } from '@components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from '@components/ui/drawer'
import { cn } from '@utils/cn'
import type { ComponentProps, ForwardedRef } from 'react'
import { forwardRef, useState } from 'react'

interface MobileFiltersDrawerProperties extends ComponentProps<'div'> {
  resetFilters: () => void
  trigger: React.ReactNode
  title: string
  closeOnReset?: boolean
}

export const DrawerIconTrigger = forwardRef(
  (
    props: ComponentProps<'button'> & {
      Icon: React.ElementType
      active: boolean
    },
    reference: ForwardedRef<HTMLButtonElement>,
  ) => {
    const { Icon, active, className, ...rest } = props
    return (
      <button
        ref={reference}
        type="button"
        className={cn(
          'flex size-12 border shrink-0 border-stroke-100 rounded-[0.75rem] items-center justify-center bg-cards-widget',
          className,
        )}
        {...rest}
      >
        <div
          className={cn(
            'rounded-[0.5rem] shrink-0 size-[2.5rem] flex items-center justify-center',
            active && 'bg-cards-widget',
          )}
        >
          <Icon className={cn('size-4', active && 'shrink-0 [&_path]:stroke-white')} />
        </div>
      </button>
    )
  },
)

export const MobileFiltersDrawer = (props: MobileFiltersDrawerProperties) => {
  const { className, children, resetFilters, trigger, closeOnReset = false } = props
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger
        asChild
        className={cn(className)}
        onClick={(e) => e.stopPropagation()}
      >
        {trigger}
      </DrawerTrigger>
      <DrawerContent
        aria-describedby={undefined}
        position="bottom"
        className="inset-x-0 max-h-dvh w-full items-center justify-center space-y-5 pb-8 pt-4"
        onInteractOutside={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        <DrawerHeader className="flex w-full items-center justify-between px-4">
          <div className="flex w-full items-center gap-2">
            <Button
              className="space-x-[0.38rem]"
              onClick={() => setIsOpen(false)}
              variant="outline"
              size="sm"
            >
              <Check className="size-4" />
              <span>Apply</span>
            </Button>
            <Button
              onClick={() => {
                resetFilters()
                if (closeOnReset) {
                  setIsOpen(false)
                }
              }}
              variant="outline"
              size="sm"
              className="space-x-[0.38rem]"
            >
              <Reset className="size-4" />
              <span>Reset</span>
            </Button>
          </div>
          <DrawerClose className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-stroke-100">
            <X className="size-4 [&_path]:stroke-gray-100" />
          </DrawerClose>
        </DrawerHeader>
        <div className="h-[calc(100dvh-6rem)] space-y-3 overflow-y-auto px-4 pb-10">
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
