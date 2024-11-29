import { useTxStore } from '@modules/transaction-block/store/useTxStore'
import { cn } from '@utils/cn'
import { formatAmount } from '@utils/formatValue'
import type { ComponentProps } from 'react'
import { Link } from 'react-router-dom'

import Add from './assets/icons/add.svg'
import Deposit from './assets/icons/deposit.svg'
import Withdraw from './assets/icons/withdraw.svg'

interface DepositWithdrawButtonsProperties extends ComponentProps<'div'> {
  value: number
}

export const ActionButtons = (props: DepositWithdrawButtonsProperties) => {
  const { className, value, ...rest } = props
  const { setTxType } = useTxStore()

  return (
    <div
      className={cn(
        'grid gap-2',
        +formatAmount(value) > 0 ? 'grid-cols-3' : 'grid-cols-2',
        className,
      )}
      {...rest}
    >
      <Link
        to="/"
        onClick={() => setTxType('deposit')}
        className="flex flex-col  justify-start gap-3 rounded-xl bg-light-blue-15 p-5 normal-case text-main-100 max-lg:gap-[0.38rem] lg:font-bold"
      >
        <Deposit className="size-6 max-lg:size-7 " />
        <span className="text-md font-medium max-lg:text-sm">Deposit</span>
      </Link>
      {+formatAmount(value) > 0 && (
        <Link
          to="/"
          onClick={() => setTxType('withdraw')}
          className={cn(
            'flex flex-col  justify-start gap-3 rounded-xl bg-light-blue-15 p-5 normal-case text-main-100 max-lg:gap-[0.38rem] lg:font-bold',
          )}
        >
          <Withdraw className="size-6 max-lg:size-7" />
          <span className="text-md font-medium max-lg:text-sm">Withdraw</span>
        </Link>
      )}
      <Link
        onClick={() => setTxType('deposit')}
        to="/"
        className="flex flex-col  justify-start gap-3 rounded-xl bg-light-blue-15 p-5 normal-case text-main-100 max-lg:gap-[0.38rem] lg:font-bold"
      >
        <Add className="size-6 max-lg:size-7" />
        <span className="text-md font-medium max-lg:text-sm">Buy crypto</span>
      </Link>
    </div>
  )
}
