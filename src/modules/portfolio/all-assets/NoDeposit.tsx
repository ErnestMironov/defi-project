import NoDepositImage from '@assets/images/NoDeposit.png'
import { Button } from '@components/ui/button'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

import Deposit from '../assets/icons/deposit.svg'

interface NoDepositProperties extends ComponentProps<'div'> {}

export const NoDeposit = (props: NoDepositProperties) => {
  const { className, ...rest } = props
  return (
    <div
      className={cn(
        'flex flex-col gap-[16px] items-center justify-between flex-row border-b  pl-6',
        className,
      )}
      {...rest}
    >
      <div className="">
        <h2 className="text-base-100  text-lg font-semibold">No deposits?...</h2>
        <p className="mt-1 text-text-2100 ">
          Try out MAAT and get 10% return on USDC and USDT allocations.
        </p>
        <Button
          variant="default"
          className="mt-4 h-auto max-w-[130px] items-center p-3 px-4 text-sm font-normal normal-case"
        >
          <Deposit className="size-4 [&_path]:fill-white [&_path]:stroke-[#6160FF]" />
          Deposit now
        </Button>
      </div>
      <div className="relative flex items-center justify-center">
        {' '}
        {/* <Circle className="absolute z-0 size-12" />
        <Circle className="absolute z-0 size-60" />
        <Circle className="size-70 absolute z-0" /> */}
        <img src={NoDepositImage} alt="" className="z-10 max-w-[190px]" />
      </div>
    </div>
  )
}
