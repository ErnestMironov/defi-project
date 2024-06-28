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
