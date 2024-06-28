import { useQuery } from '@apollo/client'
import { gql } from '@codegen/gql'
import { ActionType } from '@codegen/graphql'
import type { LinkType, SankeyChartDataType } from '@components/chart/sankey/SankeyD3'
import BigNumber from 'bignumber.js'

export const GET_REBALANCE = gql(`
  query Rebalance($type_in: [ActionType!]) {
    maatLastRebalanceTxIds {
    token
    txId
  }
  maatActions(where: {type_in: $type_in}) {
    type
    txhash
    txId
    timestamp
    id
    data
  }
  strategyStats {
    protocol
    chainName
    strategyId
  }}
`)

export const useRebalance = () => {
  const { data, ...rest } = useQuery(GET_REBALANCE, {
    variables: {
      type_in: [ActionType.DepositInStrategy, ActionType.WithdrawFromStrategy],
    },
  })

  const txIds = data?.maatLastRebalanceTxIds.map((item) => item.txId)
  const filteredActions = data?.maatActions.filter((action) => txIds?.includes(action.id))
  const nodes = filteredActions?.map((action, i) => {
    const strategy = data?.strategyStats.find(
      (_strategy) => _strategy.strategyId === action.data.strategyId,
    )

    return {
      id: String(i + 1),
      type: action.type,
      amount: BigNumber(action.data.amount)
        .div(10 ** 6)
        .toNumber(),
      objects: [
        { name: strategy?.chainName, icon: 'arbitrum' },
        { name: strategy?.protocol, icon: 'aave' },
      ],
    }
  })
  // { source: '1', target: '11', value: 10 },
  const sourceNodes = nodes?.filter(
    (node) => node.type === ActionType.WithdrawFromStrategy,
  )
  const targetNodes = nodes?.filter((node) => node.type === ActionType.DepositInStrategy)
  const links: LinkType[] | undefined = sourceNodes?.map((node, i) => {
    return {
      source: node?.id || '1',
      target: targetNodes?.[i % (targetNodes?.length || 0)].id || '1',
      value: node.amount,
    }
  })

  return { data: { nodes, links } as SankeyChartDataType | undefined, ...rest }
}
