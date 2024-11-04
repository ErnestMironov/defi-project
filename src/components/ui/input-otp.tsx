import { cn } from '@utils/cn'
import { OTPInput, OTPInputContext } from 'input-otp'
import { Dot } from 'lucide-react'
import * as React from 'react'

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, reference) => (
  <OTPInput
    ref={reference}
    containerClassName={cn(
      'flex items-center gap-2 has-[:disabled]:opacity-50',
      containerClassName,
    )}
    className={cn('disabled:cursor-not-allowed', className)}
    {...props}
  />
))
InputOTP.displayName = 'InputOTP'

const InputOTPGroup = React.forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'> & { isError?: boolean }
>(({ className, isError, ...props }, reference) => (
  <div
    ref={reference}
    className={cn(
      'flex items-center lg:gap-6 justify-between max-lg:w-full',
      className,
      isError && '*:border-red-100 *:text-red-100',
    )}
    {...props}
  />
))
InputOTPGroup.displayName = 'InputOTPGroup'

const InputOTPSlot = React.forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'> & { index: number }
>(({ index, className, ...props }, reference) => {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

  return (
    <div
      ref={reference}
      className={cn(
        'relative flex items-center justify-center border-y border-r border-slate-200 text-4xl max-lg:text-[1.5rem] transition-all size-[5.125rem] rounded-xl border max-lg:size-[2.8rem]',
        isActive && 'z-10 ring-2 ring-main-100 ring-offset-2',
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-10 w-px animate-caret-blink bg-slate-950 duration-1000 dark:bg-slate-50" />
        </div>
      )}
    </div>
  )
})
InputOTPSlot.displayName = 'InputOTPSlot'

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'>
>(({ ...props }, reference) => (
  <div ref={reference} role="separator" {...props}>
    <Dot />
  </div>
))
InputOTPSeparator.displayName = 'InputOTPSeparator'

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot }
