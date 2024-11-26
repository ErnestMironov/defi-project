import type { Event } from '@api/maat-finance/types'
import { CopyButton } from '@components/copy/CopyButton'
import { ACTION_TYPE } from '@constants/action-type'
import { cn } from '@utils/cn'
import { shortenAddress } from '@utils/transform'
import type { ComponentProps } from 'react'

import BridgeIcon from './icons/bridge.svg'
import DepositIcon from './icons/deposit.svg'
import DepositInStrategyIcon from './icons/deposit-in-strategy.svg'
import RebalanceIcon from './icons/rebalance.svg'
import WithdrawIcon from './icons/withdraw.svg'
import WithdrawFromStrategyIcon from './icons/withdraw-from-strategy.svg'
import WithdrawFullfilmentIcon from './icons/withdraw-fullfilment.svg'

const ICONS = {
  DEPOSIT_IN_STRATEGY: DepositInStrategyIcon,
  WITHDRAW_FROM_STRATEGY: WithdrawFromStrategyIcon,
  WITHDRAW: WithdrawIcon,
  DEPOSIT: DepositIcon,
  REBALANCE_REQUEST: RebalanceIcon,
  REBALANCE_FULFILLMENT: RebalanceIcon,
  BRIDGE: BridgeIcon,
  WITHDRAW_FULFILLMENT: WithdrawFullfilmentIcon,
}
/* 

export const ACTION_TYPE = {
  ADD_STRATEGY: 'Add strategy',
  BRIDGE: 'Bridge',
  DEPOSIT: 'Deposit',
  DEPOSIT_IN_STRATEGY: 'Deposit in strategy',
  REBALANCE_FULFILLMENT: 'Rebalance fulfillment',
  REBALANCE_REQUEST: 'Rebalance request',
  REMOVE_STRATEGY: 'Remove strategy',
  WITHDRAW: 'Withdraw',
  WITHDRAW_REQUEST: 'Withdraw request',
  WITHDRAW_FROM_STRATEGY: 'Withdraw from strategy',
  WITHDRAW_FULFILLMENT: 'Withdraw fulfillment',
  WITHDRAW_REQUEST_FULFILLMENT: 'Withdraw request fulfillment',
  WATCHER_CHANGED: 'Watcher changed',
  WITHDRAW_CANCELING_DELAY: 'Withdraw canceling delay',
  FEE_CHANGED: 'Fee changed',
} as const */

const getIcon = (actionType: Event['action_type']) => {
  return ICONS[actionType as keyof typeof ICONS]
}

interface ActionTypeProperties extends ComponentProps<'div'> {
  tx: Event
}

export const ActionType = (props: ActionTypeProperties) => {
  const { className, tx, ...rest } = props
  const Icon = getIcon(tx.action_type) || DepositInStrategyIcon

  // Split the action type text into first word and rest
  const actionText = ACTION_TYPE[tx.action_type as keyof typeof ACTION_TYPE]
  const [firstWord, ...restWords] = actionText.split(' ')

  return (
    <div className={cn('flex items-center gap-4', className)} {...rest}>
      <Icon className="size-8 shrink-0" />
      <div>
        <p className="text-base/[1.5rem] text-text-2100 first:text-text-1100">
          {firstWord}
          {restWords.map((word) => (
            <span className="ml-1 text-text-260" key={word}>
              {word}
            </span>
          ))}
        </p>
        <p className="flex items-center gap-[0.38rem] text-sm text-text-260">
          <span>{shortenAddress(tx.hash)}</span>
          <CopyButton className="size-3.5" text={tx.hash} />
        </p>
      </div>
    </div>
  )
}
