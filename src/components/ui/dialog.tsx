import CloseIcon from '@assets/icons/modal-close.svg'
import { ShadowBox } from '@components/box/ShadowBox'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cn } from '@utils/cn'
import * as React from 'react'

const Dialog = DialogPrimitive.Root

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogTrigger = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>
>(({ className, ...props }, reference) => (
  <DialogPrimitive.Trigger
    ref={reference}
    className={cn('group', className)}
    {...props}
  />
))

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, reference) => (
  <DialogPrimitive.Overlay
    ref={reference}
    className={cn(
      'fixed inset-0 z-50 backdrop-blur-xl bg-black/20 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    showCloseButton?: boolean
    onClose?: () => void
  }
>(({ className, children, showCloseButton = true, onClose, ...props }, reference) => (
  <DialogPortal>
    <DialogOverlay className="bg-transparent bg-blend-overlay backdrop-blur-[15px]" />
    <DialogPrimitive.Content
      ref={reference}
      aria-describedby=""
      className={cn(
        'select-none fixed left-[50%] top-[50%] z-50 w-full max-w-[34.75rem] max-lg:max-w-full translate-x-[-50%] translate-y-[-50%] bg-cards-widget duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state:closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-[1.5rem] overflow-hidden max-h-[95%] outline-none',
        className,
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close
          className="absolute right-0 top-0 size-auto translate-y-[calc(-100%-.62rem)] cursor-pointer select-none items-center justify-center outline-none"
          onClick={onClose}
        >
          <ShadowBox className="flex size-12 items-center justify-center rounded-2xl border border-stroke-100 bg-cards-widget p-1">
            <div className="flex size-full items-center justify-center rounded-xl p-1 hover:bg-[#8585A914] dark:hover:bg-transparent">
              <CloseIcon className="size-4" />
            </div>
          </ShadowBox>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)}
    {...props}
  />
)
DialogHeader.displayName = 'DialogHeader'

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className,
    )}
    {...props}
  />
)
DialogFooter.displayName = 'DialogFooter'

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, reference) => (
  <DialogPrimitive.Title
    ref={reference}
    className={cn('text-[1.5rem] uppercase leading-none', className)}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, reference) => (
  <DialogPrimitive.Description
    ref={reference}
    className={cn('text-sm text-slate-500 dark:text-slate-400', className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
