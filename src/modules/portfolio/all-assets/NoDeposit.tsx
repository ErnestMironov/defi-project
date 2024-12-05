import BackgroundCircles from '@assets/icons/backgroundCircles.svg'
import NoDepositImage from '@assets/images/NoDeposit.png'
import { Button } from '@components/ui/button'
import { useTxStore } from '@modules/transaction-block/store/useTxStore'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

import Deposit from '../assets/icons/deposit.svg'

interface NoDepositProperties extends ComponentProps<'div'> {}

export const NoDeposit = (props: NoDepositProperties) => {
  const { setTxType } = useTxStore()
  const { className, ...rest } = props

  return (
    <div
      className={cn(
        'flex flex-col gap-[16px] items-center justify-between flex-row border-b pl-6',
        className,
      )}
      {...rest}
    >
      <div className="max-w-[11.875rem]">
        <h2 className="text-base-100 text-base font-medium">No deposits?...</h2>
        <p className="mt-1 text-xs font-normal leading-4 text-text-2100">
          Try out MAAT and get 10% return on USDC and USDT allocations.
        </p>
        <Button
          variant="default"
          className="mt-4 h-auto max-w-[130px] items-center p-3 px-4 text-sm font-normal normal-case"
          onClick={() => setTxType('deposit')}
        >
          <Deposit className="size-4 [&_path]:fill-white [&_path]:stroke-[#6160FF]" />
          Deposit now
        </Button>
      </div>

      <div className="relative flex items-center justify-end overflow-hidden">
        <BackgroundCircles className=" absolute bottom-0 right-0 border border-text-30100 opacity-10" />
        <img
          src={NoDepositImage}
          alt="No Deposit"
          className="relative  max-w-[11.875rem]"
        />
      </div>
    </div>
  )
}
