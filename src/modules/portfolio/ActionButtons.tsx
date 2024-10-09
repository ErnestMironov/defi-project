import { Button } from '@components/ui/button'
import { useTxStore } from '@modules/transaction-block/store/useTxStore'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'
import { Link } from 'react-router-dom'

import Add from './assets/icons/add.svg'
import Arrow from './assets/icons/arrow.svg'
import Deposit from './assets/icons/deposit.svg'
import Withdraw from './assets/icons/withdraw.svg'

interface DepositWithdrawButtonsProperties extends ComponentProps<'div'> {}

export const ActionButtons = (props: DepositWithdrawButtonsProperties) => {
  const { className, ...rest } = props
  const { setTxType } = useTxStore()

  return (
    <div className={cn('grid grid-cols-2 gap-2 max-lg:grid-cols-3', className)} {...rest}>
      <Link
        to="/"
        onClick={() => setTxType('deposit')}
        className="flex flex-col items-center justify-center gap-3 rounded-xl bg-light-blue-15 py-5 normal-case text-dark-blue-100 max-lg:gap-[0.38rem] lg:font-bold"
      >
        <Deposit className="size-6 max-lg:size-7" />
        <span className="text-base max-lg:text-sm">Deposit</span>
      </Link>
      <Link
        to="/"
        onClick={() => setTxType('withdraw')}
        className="flex flex-col items-center justify-center gap-3 rounded-xl bg-light-blue-15 py-5 normal-case text-dark-blue-100 max-lg:gap-[0.38rem] lg:font-bold"
      >
        <Withdraw className="size-6 max-lg:size-7" />
        <span className="text-base max-lg:text-sm">Withdraw</span>
      </Link>
      <div className="flex items-center rounded-xl border-light-blue-30 px-4 py-2 max-lg:flex-col max-lg:justify-center max-lg:gap-[0.38rem] max-lg:bg-light-blue-15 lg:col-span-2 lg:border">
        <Add className="size-5 max-lg:size-6" />
        <p className="ml-[0.38rem] text-base text-dark-blue-100 max-lg:text-sm">
          Buy Crypto
        </p>
        <Button
          size="icon"
          variant="light"
          className="ml-auto flex size-9 flex-col gap-3 rounded-[0.42856rem] bg-light-blue-15 normal-case max-lg:hidden"
        >
          <Arrow className="shrink-0" />
        </Button>
      </div>
    </div>
  )
}
