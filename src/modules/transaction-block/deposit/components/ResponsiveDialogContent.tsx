import BigCloseBtn from '@assets/icons/big-close-btn.svg'
import BigCloseBtnDark from '@assets/icons/big-close-btn_dark.svg'
import { DialogContent } from '@components/ui/dialog'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { cn } from '@utils/cn'

import type { ResponsiveDialogContentProperties } from '../types'

export const ResponsiveDialogContent = ({
  className,
  children,
  opened,
  setOpened,
  ...props
}: ResponsiveDialogContentProperties) => {
  const { isBelowDesktop } = useDeviceWidth()

  if (isBelowDesktop && opened) {
    return (
      <div
        className={cn(
          'fixed h-screen w-screen top-0 left-0 bg-white z-10 pt-[5.5rem] pb-12 px-4 flex flex-col gap-6 overscroll-none',
          'animate-translateIn bg-cards',
          className,
        )}
      >
        {children}

        <button
          type="button"
          aria-label="Close"
          onClick={() => setOpened(false)}
          className={cn(
            'm-auto flex size-[4.125rem] shrink-0 items-center justify-center',
            'active:opacity-50',
          )}
        >
          <BigCloseBtn className="size-full dark:hidden" />
          <BigCloseBtnDark className="hidden size-full dark:block" />
        </button>
      </div>
    )
  }

  return (
    <DialogContent
      className={cn('text-text gap-6 max-lg:max-w-[95vw] overflow-visible', className)}
      {...props}
    >
      {children}
    </DialogContent>
  )
}
