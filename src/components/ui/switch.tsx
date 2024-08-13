import * as SwitchPrimitives from '@radix-ui/react-switch'
import { cn } from '@utils/cn'
import * as React from 'react'

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, reference) => (
  <SwitchPrimitives.Root
    className={cn(
      'peer inline-flex w-10 h-[1.25rem] shrink-0 cursor-pointer items-center rounded-2xl border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main-100 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-main-100 data-[state=unchecked]:bg-gray-50',
      className,
    )}
    {...props}
    ref={reference}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        'pointer-events-none block size-3.5 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
