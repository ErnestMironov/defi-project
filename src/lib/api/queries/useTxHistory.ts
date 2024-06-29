/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@apollo/client'
import { gql } from '@codegen/gql'
import type { StrategyStats } from '@codegen/graphql'
import { ActionType } from '@codegen/graphql'
import type { ITransaction } from '@pages/analytics/modules/tx-history/TransactionsHistory'
import { formatAmountValue } from '@utils/formatValue'
import BigNumber from 'bignumber.js'

export const GET_TX_HISTORY = gql(`
  query TxHistory($type_in: [ActionType!] = [DEPOSIT]) {
  maatActions(orderBy: timestamp_DESC,where: {type_in: $type_in}) {
    type
    txhash
    txId
    timestamp
    id
    data
    chain {
      name
      id
    }
  }
  strategyStats {
    apy
    chainId
    chainName
    decimals
    deposited
    strategyId
    protocol
    tokenAddress
    tokenSymbol
  }
}`)

export const useTxHistory = () => {
  const { data, ...rest } = useQuery(GET_TX_HISTORY, {
    variables: {
      type_in: [ActionType.Withdraw, ActionType.DepositInStrategy, ActionType.Bridge],
    },
  })

  const transactions: ITransaction[] | undefined = data?.maatActions.map((tx) => {
    const sourceChain = tx.chain?.name
    const destinationChain = tx.chain?.name

    const strategy = data?.strategyStats.find(
      (_strategy: StrategyStats) => _strategy.strategyId === tx.data.strategyId,
    )

    const strategyApy = formatAmountValue(strategy?.apy, 2) || '0'
    const tvl = strategy
      ? formatAmountValue(
          BigNumber(strategy.deposited)
            .div(10 ** strategy.decimals)
            ?.toString(),
          2,
        )
      : '0'

    // const amount = strategy
    //   ? formatAmountValue(
    //       BigNumber(tx.data.amount)
    //         .div(10 ** strategy.decimals)
    //         ?.toString(),
    //       2,
    //     ) || '0'
    //   : 'no strategy'
    const amount =
      formatAmountValue(
        BigNumber(tx.data.amount)
          .div(10 ** 6)
          ?.toString(),
        2,
      ) || '0'

    return {
      action: tx.type,
      amount,
      from: sourceChain,
      to: destinationChain,
      timestamp: tx.timestamp,
      nonce: tx.id,
      txHash: tx.txhash,
      strategy: tx.data.strategyId,
      apy: strategyApy,
      tvl,
      protocol: strategy?.protocol,
    }
  })

  return { data: transactions, ...rest }
}
