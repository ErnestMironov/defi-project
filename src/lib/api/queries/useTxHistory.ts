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

export const GET_TX_HISTORY = gql(`
  query TxHistory($type_in: [ActionType!], $first: Int, $after: String, $symbol: String) {
    maatActionsConnection(orderBy: timestamp_DESC, where: {type_in: $type_in, token: {symbol_eq: $symbol}},first: $first, after: $after) {
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      cursor
      node {
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

export const useTxHistory = ({
  page = 1,
  perPage = 10,
  symbol = 'USDT',
}: {
  page?: number
  perPage?: number
  symbol?: StableType
} = {}) => {
  const { data, ...rest } = useQuery(GET_TX_HISTORY, {
    variables: {
      type_in: [
        ActionType.WithdrawFromStrategy,
        ActionType.WithdrawRequestFulfillment,
        ActionType.DepositInStrategy,
        ActionType.Bridge,
      ],
      first: perPage,
      after: page - 1 === 0 ? undefined : String((page - 1) * perPage),
      symbol,
    },
  })

  const transactions: ITransaction[] | undefined = data?.maatActionsConnection.edges.map(
    (edge: any) => {
      const sourceChain = edge.node.chain?.name
      const destinationChain =
        CHAIN_NAMES_BY_ID[edge.node.data.dstChainId as keyof typeof CHAIN_NAMES_BY_ID]

      const strategy = data?.strategyStats.find(
        (_strategy: StrategyStats) => _strategy.strategyId === edge.node.data.strategyId,
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
          BigNumber(edge.node.data.amount)
            .div(10 ** 6)
            ?.toString(),
          2,
        ) || '0'

      return {
        action: edge.node.type,
        amount,
        from: sourceChain,
        to: destinationChain,
        timestamp: edge.node.timestamp,
        nonce: edge.node.id,
        txHash: edge.node.txhash,
        strategy: edge.node.data.strategyId,
        // ! remove "* 5" when we have real data
        apy: BigNumber(strategyApy).multipliedBy(5).toString(),
        tvl,
        protocol: strategy?.protocol,
        cursor: edge.cursor,
      }
    },
  )

  return {
    data: transactions,
    totalCount: data?.maatActionsConnection.totalCount,
    pageInfo: data?.maatActionsConnection.pageInfo,
    ...rest,
  }
}
