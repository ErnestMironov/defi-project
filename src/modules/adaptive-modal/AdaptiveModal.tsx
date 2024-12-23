import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@components/ui/drawer'
import { useModalVariant } from '@hooks/common/useModalVariant'
import * as React from 'react'

// Types for our adaptive modal
type ModalRootProperties = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

type ModalContentProperties = {
  children: React.ReactNode
  className?: string
  showCloseButton?: boolean
  onClose?: () => void
}

type ModalHeaderProperties = React.HTMLAttributes<HTMLDivElement>
type ModalFooterProperties = React.HTMLAttributes<HTMLDivElement>
type ModalTitleProperties = React.HTMLAttributes<HTMLHeadingElement>
type ModalDescriptionProperties = React.HTMLAttributes<HTMLParagraphElement>

// Root component
export const AdaptiveModal = ({ children, ...props }: ModalRootProperties) => {
  const { isDrawer } = useModalVariant()

  if (isDrawer) {
    return <Drawer {...props}>{children}</Drawer>
  }

  return <Dialog {...props}>{children}</Dialog>
}

// Trigger component
export const AdaptiveModalTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, ...props }, reference) => {
  const { isDrawer } = useModalVariant()

  if (isDrawer) {
    return (
      <DrawerTrigger ref={reference} {...props}>
        {children}
      </DrawerTrigger>
    )
  }

  return (
    <DialogTrigger ref={reference} {...props}>
      {children}
    </DialogTrigger>
  )
})
AdaptiveModalTrigger.displayName = 'AdaptiveModalTrigger'

// Content component
export const AdaptiveModalContent = React.forwardRef<
  HTMLDivElement,
  ModalContentProperties
>(({ children, ...props }, reference) => {
  const { isDrawer } = useModalVariant()

  if (isDrawer) {
    return (
      <DrawerContent ref={reference} {...props}>
        {children}
      </DrawerContent>
    )
  }

  return (
    <DialogContent ref={reference} {...props}>
      {children}
    </DialogContent>
  )
})
AdaptiveModalContent.displayName = 'AdaptiveModalContent'

// Header component
export const AdaptiveModalHeader = (props: ModalHeaderProperties) => {
  const { isDrawer } = useModalVariant()

  if (isDrawer) {
    return <DrawerHeader {...props} />
  }

  return <DialogHeader {...props} />
}

// Footer component
export const AdaptiveModalFooter = (props: ModalFooterProperties) => {
  const { isDrawer } = useModalVariant()

  if (isDrawer) {
    return <DrawerFooter {...props} />
  }

  return <DialogFooter {...props} />
}

// Title component
export const AdaptiveModalTitle = React.forwardRef<
  HTMLHeadingElement,
  ModalTitleProperties
>((props, reference) => {
  const { isDrawer } = useModalVariant()

  if (isDrawer) {
    return <DrawerTitle ref={reference} {...props} />
  }

  return <DialogTitle ref={reference} {...props} />
})
AdaptiveModalTitle.displayName = 'AdaptiveModalTitle'

// Description component
export const AdaptiveModalDescription = React.forwardRef<
  HTMLParagraphElement,
  ModalDescriptionProperties
>((props, reference) => {
  const { isDrawer } = useModalVariant()

  if (isDrawer) {
    return <DrawerDescription ref={reference} {...props} />
  }

  return <DialogDescription ref={reference} {...props} />
})
AdaptiveModalDescription.displayName = 'AdaptiveModalDescription'

// Close component
export const AdaptiveModalClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>((props, reference) => {
  const { isDrawer } = useModalVariant()

  if (isDrawer) {
    return <DrawerClose ref={reference} {...props} />
  }

  return <DialogClose ref={reference} {...props} />
})
AdaptiveModalClose.displayName = 'AdaptiveModalClose'
