import { Chains } from '@covalenthq/client-sdk'

export const CHAINS = [
  Chains.ETH_MAINNET,
  Chains.ARBITRUM_MAINNET,
  Chains.OPTIMISM_MAINNET,
  Chains.MATIC_MAINNET,
  Chains.BSC_MAINNET,
  // Chains.MANTLE_MAINNET,
] as const
export type ChainType = (typeof CHAINS)[number]

export const CHAIN_NAMES_BY_ID = {
  1: 'Ethereum',
  10: 'Optimism',
  42_161: 'Arbitrum',
  137: 'Polygon',
  8453: 'Base',
  5000: 'Mantle',
  56: 'BNB',
  1088: 'Metis',
} as const
