import { cn } from '@utils/cn'
import * as React from 'react'
import { Drawer as DrawerPrimitive } from 'vaul'

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
)
Drawer.displayName = 'Drawer'

const DrawerTrigger = DrawerPrimitive.Trigger

const DrawerPortal = DrawerPrimitive.Portal

const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, reference) => (
  <DrawerPrimitive.Overlay
    ref={reference}
    className={cn('fixed inset-0 z-50  backdrop-blur-[20px]', className)}
    {...props}
  />
))
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> & {
    withDraggable?: boolean
    position?: 'right' | 'bottom' | 'left'
    overlay?: boolean
  }
>(
  (
    {
      className,
      children,
      withDraggable = true,
      position = 'bottom',
      overlay = true,
      ...props
    },
    reference,
  ) => (
    <DrawerPortal>
      {overlay && <DrawerOverlay />}
      <DrawerPrimitive.Content
        ref={reference}
        className={cn(
          'fixed focus:outline-none z-50',
          position === 'right' &&
            'inset-y-0 right-0  flex h-full w-1/2 flex-col rounded-l-3xl bg-cards-widget',
          position === 'bottom' &&
            'flex-col rounded-t-3xl bg-cards-widget inset-x-0 bottom-0',
          position === 'left' &&
            'inset-y-0 left-0 flex h-full w-1/2 flex-col rounded-r-3xl bg-cards-widget',
          'pt-6',
          className,
        )}
        {...props}
      >
        {withDraggable && (
          <div className="mx-auto h-[0.3125rem] w-[2.8125rem] rounded-full bg-gray-50" />
        )}
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  ),
)
DrawerContent.displayName = 'DrawerContent'

const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('grid gap-1.5 text-center sm:text-left', className)} {...props} />
)
DrawerHeader.displayName = 'DrawerHeader'

const DrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mt-auto flex flex-col gap-2 p-4', className)} {...props} />
)
DrawerFooter.displayName = 'DrawerFooter'

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, reference) => (
  <DrawerPrimitive.Title
    ref={reference}
    className={cn('text-[1.5625rem] font-normal', className)}
    {...props}
  />
))
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, reference) => (
  <DrawerPrimitive.Description
    ref={reference}
    className={cn('text-sm text-slate-500 dark:text-slate-400', className)}
    {...props}
  />
))
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
}
