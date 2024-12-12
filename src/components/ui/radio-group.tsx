import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { cn } from '@utils/cn'
import * as React from 'react'

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, reference) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn('grid grid-cols-2 gap-2', className)}
      {...props}
      ref={reference}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, reference) => {
  return (
    <RadioGroupPrimitive.Item
      ref={reference}
      className={cn(
        'aspect-square h-4 w-4 rounded-full data-[state=checked]:border-light-blue-80 border-dark-blue-30 border-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <div className="size-2 rounded-full bg-light-blue-80 text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
