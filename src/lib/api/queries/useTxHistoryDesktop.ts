/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@apollo/client'
import { gql } from '@codegen/gql'
import type { StrategyStats } from '@codegen/graphql'
import { ActionType } from '@codegen/graphql'
import type { StableType } from '@components/stable-switcher/StableSwitcher'
import { CHAIN_NAMES_BY_ID } from '@constants/chains'
import { formatAmountValue } from '@utils/formatValue'
import BigNumber from 'bignumber.js'
import type { ITransaction } from 'src/lib/types/transaction'

export const GET_TX_HISTORY_DESKTOP = gql(`
  query TxHistoryDesktop($type_in: [ActionType!], $symbol: String, $limit: Int, $offset: Int) {
    maatActions(orderBy: timestamp_DESC, where: {type_in: $type_in, token: {symbol_eq: $symbol}},limit: $limit, offset: $offset) {
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
  maatActionsConnection(orderBy: timestamp_DESC, where: {type_in: $type_in, token: {symbol_eq: $symbol}}) {
    totalCount
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

export const useTxHistoryDesktop = ({
  page = 1,
  perPage = 10,
  symbol = 'USDT',
}: {
  page?: number
  perPage?: number
  symbol?: StableType
} = {}) => {
  const { data, ...rest } = useQuery(GET_TX_HISTORY_DESKTOP, {
    variables: {
      type_in: [
        ActionType.WithdrawFromStrategy,
        ActionType.WithdrawRequestFulfillment,
        ActionType.DepositInStrategy,
        ActionType.Bridge,
      ],
      limit: perPage,
      offset: page - 1 === 0 ? undefined : (page - 1) * perPage,
      symbol,
    },
  })

  const transactions: ITransaction[] | undefined = data?.maatActions.map((node: any) => {
    const sourceChain = node.chain?.name
    const destinationChain =
      CHAIN_NAMES_BY_ID[node.data.dstChainId as keyof typeof CHAIN_NAMES_BY_ID]

    const strategy = data?.strategyStats.find(
      (_strategy: StrategyStats) => _strategy.strategyId === node.data.strategyId,
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

    const amount =
      formatAmountValue(
        BigNumber(node.data.amount)
          .div(10 ** 6)
          ?.toString(),
        2,
      ) || '0'

    return {
      action: node.type,
      amount,
      from: sourceChain,
      to: destinationChain,
      timestamp: node.timestamp,
      nonce: node.id,
      txHash: node.txhash,
      strategy: node.data.strategyId,
      apy: strategyApy,
      tvl,
      protocol: strategy?.protocol,
      cursor: node.cursor,
    }
  })

  return {
    data: transactions,
    totalCount: data?.maatActionsConnection.totalCount,
    ...rest,
  }
}
