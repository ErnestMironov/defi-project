import Add from '@assets/icons/add.svg'
import { Button } from '@components/ui/button'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

interface RefillWalletTooltipProperties extends ComponentProps<'div'> {}

export const RefillWalletTooltip = (props: RefillWalletTooltipProperties) => {
  const { className, ...rest } = props
  return (
    <div
      className={cn('px-7 pb-6 text-text-80 items-start gap-[0.38rem]', className)}
      {...rest}
    >
      <div className="text-center">
        <div className="flex flex-col gap-1">
          <p className="text-md font-medium text-text-100 max-md:text-base">
            Seems like you have just started
          </p>
          <p className="mb-4 text-semi-base text-text-2100 max-md:text-[0.8125rem]">
            Buy your favourite coins with ease and start earning yield with MAAT
          </p>
        </div>
        <Button
          variant="default"
          className="cursor-auto px-5 py-4 text-base font-normal normal-case opacity-50 max-md:text-[0.8125rem]"
        >
          <Add className="mr-2 size-7 max-md:size-4" />
          Buy crypto
        </Button>
      </div>
    </div>
  )
}
