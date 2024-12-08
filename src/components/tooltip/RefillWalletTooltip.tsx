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
        <p className="text-md font-medium text-text-100">
          Seems like you have just started
        </p>
        <p className="mb-4 text-semi-base text-text-2100">
          Buy your favourite coins with ease and start earning yield with MAAT
        </p>
        <Button variant="default" className="px-5 py-4 text-base font-normal normal-case">
          <Add className="mr-2 size-7" />
          Buy crypto
        </Button>
      </div>
    </div>
  )
}
