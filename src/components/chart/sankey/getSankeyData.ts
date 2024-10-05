/* eslint-disable sonarjs/cognitive-complexity */
import type { LastRebalancesType } from '@api/queries/useLastRebalances'
import type { StableType } from '@components/stable-switcher/StableSwitcher'

import type { SankeyNodeType } from './SankeyD3'

export const createSankeyData = (
  data: LastRebalancesType | undefined,
  activeStableType: StableType,
) => {
  const formattedByTokenData = Object.values(data || {})
    .flat()
    .filter((item) => item.vault.token.symbol === activeStableType)
    .filter((item) => item.status === 'success')

  const bridgeNodes = formattedByTokenData.filter((item) => item.action_type === 'BRIDGE')
  const sourceBridgeChainIds = new Set(bridgeNodes.map((item) => item.src_chain_id))
  const destinationBridgeChainIds = new Set(bridgeNodes.map((item) => item.dst_chain_id))

  const sourceNodes = formattedByTokenData
    .filter((item) => item.action_type === 'WITHDRAW_FROM_STRATEGY')
    .filter((item) => sourceBridgeChainIds.has(item.src_chain_id))

  const targetNodes = formattedByTokenData
    .filter((item) => item.action_type === 'DEPOSIT_IN_STRATEGY')
    .filter((item) => destinationBridgeChainIds.has(item.src_chain_id))

  const nodesWithSankeyId = [...sourceNodes, ...bridgeNodes, ...targetNodes].map(
    (item, i) => ({
      sankey_id: i,
      ...item,
    }),
  ) as SankeyNodeType[]
  const sourceNodesWithSankeyId = nodesWithSankeyId.slice(0, sourceNodes.length)
  const tgtNodesWithSankeyId = nodesWithSankeyId.slice(
    sourceNodes.length + bridgeNodes.length,
  )
  const bridgeNodesWithSankeyId = nodesWithSankeyId.slice(
    sourceNodes.length,
    sourceNodes.length + bridgeNodes.length,
  )
  const links = []
  for (const sourceNode of sourceNodesWithSankeyId) {
    for (const bridgeNode of bridgeNodesWithSankeyId) {
      if (bridgeNode.src_chain_id === sourceNode.src_chain_id) {
        links.push({
          source: sourceNode.sankey_id,
          target: bridgeNode.sankey_id,
          value: (sourceNode.amount ?? 0) / 10 ** 6,
        })
      }
    }
  }
  for (const targetNode of tgtNodesWithSankeyId) {
    for (const bridgeNode of bridgeNodesWithSankeyId) {
      if (bridgeNode.dst_chain_id === targetNode.src_chain_id) {
        links.push({
          source: bridgeNode.sankey_id,
          target: targetNode.sankey_id,
          value: (targetNode.amount ?? 0) / 10 ** 6,
        })
      }
    }
  }
  return {
    nodes: nodesWithSankeyId,
    links,
  }
}
