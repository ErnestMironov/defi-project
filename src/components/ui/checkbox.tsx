import Check from '@assets/icons/check.svg'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { cn } from '@utils/cn'
import * as React from 'react'

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, children, ...props }, reference) => (
  <CheckboxPrimitive.Root
    ref={reference}
    className={cn(
      'peer h-4 w-4 shrink-0 rounded-[0.3rem] bg-light-blue-15 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-light-blue-100 data-[state=checked]:text-light-blue-100',
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn('flex items-center justify-center')}>
      <Check className="size-3.5 [&_path]:stroke-white" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
