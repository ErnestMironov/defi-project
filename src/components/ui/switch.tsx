import * as SwitchPrimitives from '@radix-ui/react-switch'
import { cn } from '@utils/cn'
import * as React from 'react'

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, reference) => (
  <SwitchPrimitives.Root
    className={cn(
      'peer flex w-10 h-[1.5rem] p-[0.1rem] justify-start items-center flex-shrink-0 rounded-[6.25rem] bg-[#6160FF] data-[state=checked]:bg-main-100 data-[state=unchecked] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main-100 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:bg-gray-50',
      className,
    )}
    {...props}
    ref={reference}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        'h-full aspect-square flex-shrink-0 rounded-[6.25rem] bg-white [box-shadow:0px_0px_0px_1px_rgba(0,_0,_0,_0.04),_0px_3px_8px_0px_rgba(0,_0,_0,_0.15),_0px_3px_1px_0px_rgba(0,_0,_0,_0.06)] transition-transform data-[state=checked]:translate-x-[1rem] data-[state=unchecked]:translate-x-0',
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
