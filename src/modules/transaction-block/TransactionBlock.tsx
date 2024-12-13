import { useGetSwapRoute } from '@api/lifi/hooks/useGetSwapRoute'
import { Switch } from '@components/ui/switch'
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
  const { txType, withdrawToAnotherChain, setWithdrawToAnotherChain, mtToken } =
    useTxStore()

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
        {txType === TX_TYPE.DEPOSIT ? (
          <TVLDisplay />
        ) : (
          <div className="mt-3 flex items-start justify-between self-stretch rounded-2xl border border-stroke-100 p-6">
            <span className="leading-[120%] text-text-80 lg:text-[1.1875rem]">
              Cross-Chain
            </span>
            <Switch
              checked={withdrawToAnotherChain}
              onCheckedChange={setWithdrawToAnotherChain}
            />
          </div>
        )}
      </div>
      {txType === TX_TYPE.DEPOSIT && <DepositInput />}
      {txType === TX_TYPE.WITHDRAW && <WithdrawInput />}
    </div>
  )
}
