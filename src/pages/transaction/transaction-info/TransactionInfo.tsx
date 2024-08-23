import type { ComponentProps } from 'react'

import { Bridge } from './transaction-type/Bridge'
import { Deposit } from './transaction-type/Deposit'
import { DepositToStrategy } from './transaction-type/DepositToStrategy'
import { RebalanceRequest } from './transaction-type/RebalanceRequest'
import { Swap } from './transaction-type/Swap'
import { WithdrawFromStrategy } from './transaction-type/WithdrawFromStrategy'
import { WithdrawFulfillment } from './transaction-type/WithdrawFulfillment'
import { WithdrawRequest } from './transaction-type/WithdrawRequest'

export type TransactionType =
  | 'Deposit'
  | 'Deposit to Strategy'
  | 'Bridge'
  | 'Swap'
  | 'Withdraw request'
  | 'Withdraw from Strategy'
  | 'Withdraw Fulfillment'
  | 'Rebalance Request'

interface TransactionInfoProperties extends ComponentProps<'div'> {
  type: TransactionType
}

export const TransactionInfo = (props: TransactionInfoProperties) => {
  const { className, type, ...rest } = props
  if (type === 'Deposit') {
    return <Deposit className={className} {...rest} />
  }
  if (type === 'Swap') {
    return <Swap className={className} {...rest} />
  }
  if (type === 'Bridge') {
    return <Bridge className={className} {...rest} />
  }
  if (type === 'Withdraw request') {
    return <WithdrawRequest className={className} {...rest} />
  }
  if (type === 'Withdraw from Strategy') {
    return <WithdrawFromStrategy className={className} {...rest} />
  }
  if (type === 'Withdraw Fulfillment') {
    return <WithdrawFulfillment className={className} {...rest} />
  }
  if (type === 'Rebalance Request') {
    return <RebalanceRequest className={className} {...rest} />
  }
  if (type === 'Deposit to Strategy') {
    return <DepositToStrategy className={className} {...rest} />
  }
  if (type === 'Withdraw request') {
    return <WithdrawRequest className={className} {...rest} />
  }
  return <></>
}
