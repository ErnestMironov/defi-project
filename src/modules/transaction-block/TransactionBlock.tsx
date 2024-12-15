import { useGetSwapRoute } from '@api/lifi/hooks/useGetSwapRoute'
import CrossChainIcon from '@assets/icons/crosschain.svg'
import { ShadowBox } from '@components/box/ShadowBox'
import { Switch } from '@components/ui/switch'
import { TX_TYPE } from '@constants/txTypes'
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
  const { txType, withdrawToAnotherChain, setWithdrawToAnotherChain, inputError } =
    useTxStore()

  useGetSwapRoute()
  useSetDepositDetails()

  return (
    <div
      className={clsx(
        'gradient-border relative flex w-full flex-col rounded-3xl pt-4 max-lg:gap-6 max-lg:p-4',
        inputError && 'error',
        className,
      )}
      {...rest}
    >
      <div className="mb-4 flex px-4 max-lg:flex-col max-lg:items-end max-lg:gap-6 lg:items-center lg:justify-between">
        <TxTypeSwitcher />
        {txType === TX_TYPE.DEPOSIT ? (
          <TVLDisplay />
        ) : (
          <ShadowBox className="flex items-center justify-between gap-[1.7rem] rounded-xl border-DEFAULT border-solid border-[var(--stroke-100,#E6E8F0)] px-4 py-3">
            <div className="flex items-center gap-2">
              <CrossChainIcon className="size-4" />
              <span className="text-[0.875rem] font-medium leading-4 text-text-100">
                Cross-Chain
              </span>
            </div>
            <Switch
              checked={withdrawToAnotherChain}
              onCheckedChange={setWithdrawToAnotherChain}
            />
          </ShadowBox>
        )}
      </div>
      {txType === TX_TYPE.DEPOSIT && <DepositInput />}
      {txType === TX_TYPE.WITHDRAW && <WithdrawInput />}
    </div>
  )
}
