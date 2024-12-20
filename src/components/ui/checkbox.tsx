import Check from '@assets/icons/check.svg'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { cn } from '@utils/cn'
import * as React from 'react'

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & { variant?: 'unstyled' }
>(({ className, children, variant, ...props }, reference) => (
  <CheckboxPrimitive.Root
    ref={reference}
    className={cn(
      'peer shrink-0 rounded-[0.3rem] bg-light-blue-15 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-light-blue-100 data-[state=checked]:text-light-blue-100',
      variant === 'unstyled' && 'bg-transparent data-[state=checked]:bg-transparent',
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('size-5 flex items-center justify-center')}
    >
      <Check className="size-full [&_path]:stroke-white" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
