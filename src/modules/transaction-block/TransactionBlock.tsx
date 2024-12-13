import { useGetSwapRoute } from '@api/lifi/hooks/useGetSwapRoute'
import { TX_TYPE } from '@constants/txTypes'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import clsx from 'clsx'
import { type ComponentProps } from 'react'

import { TVLDisplay } from './components/TVLDisplay'
import { DepositInput } from './deposit/DepositInput'
import { useSetDepositDetails } from './deposit/hooks/useSetDepositDetails'
import { useTxStore } from './store/useTxStore'
import { TxTypeSwitcher } from './TxTypeSwither'
import { WithdrawInput } from './withdraw/WithdrawInput'

interface DepositBlockProperties extends ComponentProps<'div'> {}

export const TransactionBlock = (props: DepositBlockProperties) => {
  const { className, ...rest } = props
  const { txType } = useTxStore()

  const { isBelowDesktop } = useDeviceWidth()

  useGetSwapRoute()
  useSetDepositDetails()

  return (
    <div
      className={clsx(
        'gradient-border-animated relative flex w-full flex-col rounded-3xl pt-4 shadow-block max-lg:gap-6 max-lg:p-4',
        className,
      )}
      {...rest}
    >
      <div className="mb-4 flex px-4 max-lg:flex-col max-lg:items-end max-lg:gap-6 lg:items-center lg:justify-between">
        <TxTypeSwitcher />
        {!isBelowDesktop && <TVLDisplay />}
      </div>
      {txType === TX_TYPE.DEPOSIT && <DepositInput />}
      {txType === TX_TYPE.WITHDRAW && <WithdrawInput />}
    </div>
  )
}
