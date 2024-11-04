/* eslint-disable sonarjs/no-unused-collection */

import type { Event, Strategy } from '@api/maat-finance/types'
import type { LastRebalancesType } from '@api/maat-finance/useLastRebalances'
import type { StableType } from '@components/stable-switcher/StableSwitcher'

export type SankeyNodeType = Event & {
  sankey_id: number
  amount: number
  strategy: Strategy
}
export type SankeyLinkType = {
  source: number
  target: number
  value: number
}

type SankeyInputProperties = {
  nodes: SankeyNodeType[]
  links: SankeyLinkType[]
  unAllocatedSourceNodes: SankeyNodeType[]
  unAllocatedTargetNodes: SankeyNodeType[]
}

type CreateSankeyProperties = {
  data: LastRebalancesType | undefined
  activeStableType: StableType
}

const SLIPPAGE_THRESHOLD = 0.05

export const getSankeyData = (props: CreateSankeyProperties) => {
  return (
    new SankeyDataBuilder(props)
      .createSankeyData()
      .getOnChainLinks()
      .getMultiSourceLinks()
      .getWithOnChainLinks()
      // no same chain bridge nodes
      .allocateSameChainNodes()
      .getWithBridgeLinks()
      .build()
  )
}

class SankeyDataBuilder {
  private sankeyData: SankeyInputProperties

  constructor(private props: CreateSankeyProperties) {
    this.sankeyData = {
      nodes: [],
      links: [],
      unAllocatedSourceNodes: [],
      unAllocatedTargetNodes: [],
    }
  }

  createSankeyData(): SankeyDataBuilder {
    const { data, activeStableType } = this.props
    const nodes = Object.values(data || {})
      .flat()
      .filter((item) => item.vault.token.symbol === activeStableType)
      .filter((item) => item.status === 'success')
      .map(
        (item, i) =>
          ({
            sankey_id: i,
            ...item,
            amount: (item.amount ?? 0) / 10 ** item.vault.token.decimals,
          }) as SankeyNodeType,
      )

    const sourceNodes = nodes.filter(
      (item) => item.action_type === 'WITHDRAW_FROM_STRATEGY',
    )

    const targetNodes = nodes.filter(
      (item) =>
        item.action_type === 'DEPOSIT_IN_STRATEGY' || item.action_type === 'BRIDGE',
    )

    const links: SankeyLinkType[] = []

    this.sankeyData = {
      nodes: [...sourceNodes, ...targetNodes],
      links,
      unAllocatedSourceNodes: sourceNodes,
      unAllocatedTargetNodes: targetNodes,
    }
    return this
  }

  getOnChainLinks(): SankeyDataBuilder {
    const { nodes, links, unAllocatedSourceNodes, unAllocatedTargetNodes } =
      this.sankeyData

    for (const sourceNode of unAllocatedSourceNodes) {
      for (const targetNode of unAllocatedTargetNodes) {
        if (
          sourceNode.src_chain_id === targetNode.src_chain_id &&
          Math.abs(sourceNode.amount - targetNode.amount) / sourceNode.amount <=
            SLIPPAGE_THRESHOLD
        ) {
          links.push({
            source: sourceNode.sankey_id,
            target: targetNode.sankey_id,
            value: sourceNode.amount,
          })
        }
      }
    }

    const restUnAllocatedSourceNodes = unAllocatedSourceNodes.filter(
      (item) => !links.some((link) => link.source === item.sankey_id),
    )
    const restUnAllocatedTargetNodes = unAllocatedTargetNodes.filter(
      (item) => !links.some((link) => link.target === item.sankey_id),
    )
    this.sankeyData = {
      nodes,
      links,
      unAllocatedSourceNodes: restUnAllocatedSourceNodes,
      unAllocatedTargetNodes: restUnAllocatedTargetNodes,
    }
    return this
  }

  getWithOnChainLinks(): SankeyDataBuilder {
    const { nodes, links, unAllocatedSourceNodes, unAllocatedTargetNodes } =
      this.sankeyData

    this.sankeyData = {
      nodes,
      links,
      unAllocatedSourceNodes,
      unAllocatedTargetNodes,
    }
    return this
  }

  build(): Omit<
    SankeyInputProperties,
    'unAllocatedSourceNodes' | 'unAllocatedTargetNodes'
  > {
    return {
      nodes: this.sankeyData.nodes,
      links: this.sankeyData.links,
    }
  }

  // helper functions
  getMultiSourceLinks(): SankeyDataBuilder {
    const { nodes, links, unAllocatedSourceNodes, unAllocatedTargetNodes } =
      this.sankeyData

    const newLinks: SankeyLinkType[] = []
    const usedSourceNodes: Set<number> = new Set()
    const usedTargetNodes: Set<number> = new Set()

    for (const targetNode of unAllocatedTargetNodes) {
      const matchingSources = this.findMatchingSources(targetNode, unAllocatedSourceNodes)

      if (matchingSources.length > 0) {
        for (const sourceNode of matchingSources) {
          newLinks.push({
            source: sourceNode.sankey_id,
            target: targetNode.sankey_id,
            value: sourceNode.amount,
          })
          usedSourceNodes.add(sourceNode.sankey_id)
        }
        usedTargetNodes.add(targetNode.sankey_id)
      }
    }

    const restUnAllocatedSourceNodes = unAllocatedSourceNodes.filter(
      (node) => !usedSourceNodes.has(node.sankey_id),
    )
    const restUnAllocatedTargetNodes = unAllocatedTargetNodes.filter(
      (node) => !usedTargetNodes.has(node.sankey_id),
    )

    this.sankeyData = {
      nodes,
      links: [...links, ...newLinks],
      unAllocatedSourceNodes: restUnAllocatedSourceNodes,
      unAllocatedTargetNodes: restUnAllocatedTargetNodes,
    }

    return this
  }

  private findMatchingSources(
    targetNode: SankeyNodeType,
    sourceNodes: SankeyNodeType[],
  ): SankeyNodeType[] {
    const targetAmount = targetNode.amount

    // Helper function to check if the sum is approximately equal to the target
    const isApproximatelyEqual = (sum: number) =>
      Math.abs(sum - targetAmount) / targetAmount <= SLIPPAGE_THRESHOLD

    // Helper function to find all combinations
    const findCombinations = (
      index: number,
      currentSum: number,
      currentCombination: SankeyNodeType[],
    ): SankeyNodeType[] | null => {
      if (isApproximatelyEqual(currentSum)) {
        return currentCombination
      }

      if (index >= sourceNodes.length || currentSum > targetAmount) {
        return null
      }

      // Try including the current node
      const withCurrent = findCombinations(
        index + 1,
        currentSum + sourceNodes[index].amount,
        [...currentCombination, sourceNodes[index]],
      )
      if (withCurrent) return withCurrent

      // Try excluding the current node
      return findCombinations(index + 1, currentSum, currentCombination)
    }

    // Start the recursive search
    return findCombinations(0, 0, []) || []
  }

  allocateSameChainNodes(): SankeyDataBuilder {
    const { unAllocatedSourceNodes, unAllocatedTargetNodes } = this.sankeyData
    for (const sourceNode of unAllocatedSourceNodes) {
      this.allocateSourceNodeHelper(sourceNode)
    }
    for (const targetNode of unAllocatedTargetNodes) {
      this.allocateTargetNodeHelper(targetNode)
    }

    return this
  }

  // helper for allocateSameChainNodes
  allocateSourceNodeHelper(node: SankeyNodeType): SankeyDataBuilder {
    const { nodes, links, unAllocatedSourceNodes } = this.sankeyData

    const chainId = node.src_chain_id
    const highestAmountLinkedNodeWithSameChain = nodes.find(
      (_node) =>
        _node.src_chain_id === chainId &&
        links.some((link) => link.source === _node.sankey_id),
    )

    const targetNodeId = links.find(
      (link) => link?.source === highestAmountLinkedNodeWithSameChain?.sankey_id,
    )?.target

    if (!targetNodeId) {
      return this
    }
    const newLink = {
      source: node.sankey_id,
      target: targetNodeId,
      value: node.amount,
    }
    links.push(newLink)
    this.sankeyData.unAllocatedSourceNodes = unAllocatedSourceNodes.filter(
      (_node) => _node.sankey_id !== node.sankey_id,
    )

    return this
  }

  allocateTargetNodeHelper(node: SankeyNodeType): SankeyDataBuilder {
    const { nodes, links, unAllocatedTargetNodes } = this.sankeyData

    const chainId = node.src_chain_id
    const highestAmountLinkedNodeWithSameChain = nodes.find(
      (_node) =>
        _node.src_chain_id === chainId &&
        links.some((link) => link.target === _node.sankey_id),
    )

    const sourceNodeId = links.find(
      (link) => link?.target === highestAmountLinkedNodeWithSameChain?.sankey_id,
    )?.source

    if (!sourceNodeId) {
      return this
    }
    const newLink = {
      source: sourceNodeId,
      target: node.sankey_id,
      value: node.amount,
    }
    links.push(newLink)
    this.sankeyData.unAllocatedTargetNodes = unAllocatedTargetNodes.filter(
      (_node) => _node.sankey_id !== node.sankey_id,
    )

    return this
  }

  getWithBridgeLinks(): SankeyDataBuilder {
    // TODO: implement bridged unAllocatedSourceNodes and unAllocatedTargetNodes filtering
    return this
  }
}
