import type { Address } from 'viem'

export interface ApiResponse<T> {
  data: T
  status: number
}
export type SortDirection = 'asc' | 'desc'

export type StatusType = 'success' | 'in progress' | 'failed'

export type PaginationResponse<T> = {
  items: T[]
  total: number
  page: number
  size: number
  total_items: number
  total_pages: number
}

export interface SharesBalanceResponse {
  address: Address
  balances: {
    chain: string
    balances: {
      token: 'USDT' | 'USDC'
      mtToken: number
      value: number
    }[]
  }[]
}

export interface ParsedSharesBalanceResponse {
  balances: {
    chain: string
    token: 'USDT' | 'USDC'
    mtToken: number
    value: number
  }[]
}

export type Token = {
  address: string
  chain_id: number
  decimals: number
  name: string
  symbol: string
}

export type Strategy = {
  address: string
  apy: number
  chain_id: number
  connected_to_vaults: null | any
  id: string
  info: null | any
  protocol: string
  token: Token
  tvl: number
}

export type ActionType =
  | 'trigger'
  | 'handler'
  | 'incentives'
  | 'rebalance'
  | 'maat'
  | 'oracle'

export type Vault = {
  address: string
  chain_id: number
  token: Token
}

export type Event = {
  hash: string
  intention_id: string
  status: string
  src_chain_id: number
  dst_chain_id: number | null
  creation_time: string
  txFrom: string
  to: string
  action_type: string
  amount: number | null
  volume: number
  vault: Vault
}

type IncentiveActionType = 'INC_HARVEST' | 'INC_COMPOUND' | 'INC_SWAP'

export type IncentiveEvent = {
  action_type: IncentiveActionType
  amount_in: number | null
  amount_out: number | null
  creation_time: string
  dst_chain_id: number | null
  entity_initializer: string
  hash: string
  intention_id: string | null
  reward_token: string
  src_chain_id: number
  status: string
  strategy: string | null
  to: string
  token_in: Token | null
  token_out: Token | null
  txFrom: string
}

export type MaatStat = {
  strategy_id: 'maat'
  token: null
  chain: null
  apy: number
  tvl: number
  tokens_stats: null
}

export type TokenRebalanceData = {
  volume: number
  asset: string
  action_type: string
}

export type RebalanceVolume = {
  USDT: TokenRebalanceData
  USDC: TokenRebalanceData
}
