import { useTxStore } from '@modules/transaction-block/store/useTxStore'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Add from './assets/icons/add.svg'
import Deposit from './assets/icons/deposit.svg'
import Withdraw from './assets/icons/withdraw.svg'

interface DepositWithdrawButtonsProperties extends ComponentProps<'div'> {
  value: number
  onClose: () => void
}

export const ActionButtons = (props: DepositWithdrawButtonsProperties) => {
  const { className, value, onClose, ...rest } = props
  const { setTxType } = useTxStore()
  const MIN_VALUE = 0.001
  const isHaveDeposit = value > MIN_VALUE
  const navigate = useNavigate()
  const handleClick = (type: 'deposit' | 'withdraw') => (e: React.MouseEvent) => {
    e.preventDefault()
    setTxType(type)
    if (window.matchMedia('(max-width: 768px)').matches) {
      onClose?.()
    }
    navigate('/')
  }

  return (
    <div
      className={cn(
        'grid gap-2',
        isHaveDeposit ? 'grid-cols-3' : 'grid-cols-2',
        className,
      )}
      {...rest}
    >
      <Link
        to="/"
        onClick={handleClick('deposit')}
        className="flex flex-col justify-start gap-3 rounded-2xl bg-light-blue-15 p-4 normal-case text-main-100 max-lg:gap-[0.38rem] lg:font-bold"
      >
        <Deposit className="size-6 [&_path]:fill-main-100" />
        <span className="text-sm font-medium leading-4 max-lg:text-sm">Deposit</span>
      </Link>
      {isHaveDeposit && (
        <Link
          to="/"
          onClick={handleClick('withdraw')}
          className={cn(
            'flex flex-col justify-start gap-3 rounded-2xl bg-light-blue-15 p-4 normal-case text-main-100 max-lg:gap-[0.38rem] lg:font-bold',
          )}
        >
          <Withdraw className="size-6" />
          <span className="text-sm font-medium leading-4 max-lg:text-sm">Withdraw</span>
        </Link>
      )}
      <Link
        to="##"
        onClick={() => {}}
        className="flex cursor-auto flex-col justify-start gap-3 rounded-2xl bg-light-blue-15 p-4 normal-case text-main-100 opacity-50 max-lg:gap-[0.38rem] lg:font-bold"
        aria-disabled
      >
        <Add className="size-6 max-lg:size-7" />
        <span className="text-sm font-medium leading-4 max-lg:text-sm">Buy crypto</span>
      </Link>
    </div>
  )
}
