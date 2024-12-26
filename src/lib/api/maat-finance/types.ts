import type { LAST_EVENT_ACTION } from '@constants/action-type'
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

export interface Balance {
  symbol: 'USDT' | 'USDC'
  mtToken: number
  value: number
  address: Address
  decimals: number
  chain_id: number
}

export interface SharesBalanceResponse {
  address: Address
  balances: {
    chain: string
    balances: {
      mtToken: number
      value: number
      token: Omit<Balance, 'value' | 'mtToken'>
    }[]
  }[]
}

export interface ParsedSharesBalanceResponse {
  balances: Balance[]
}

export type WithdrawStatusResponse = 'success' | 'failed' | 'pending'

export type Token = {
  address: string
  chain_id: number
  decimals: number
  name: string
  symbol: string
}

export type Strategy = {
  id: string
  address: string
  chain_id: number
  protocol: string
  tvl: number
  apy: number
  token: {
    name: string
    symbol: string
    decimals: number
    address: string
    chain_id: number
  }
  connected_to_vaults: null | any // Replace 'any' with a more specific type if known
  info: {
    name: string
    strategy_id: string
    strategy_description: string
    protocol: {
      name: string
      description: string
      link: string
    }
  }
}

export type ActionType = 'trigger' | 'handler' | 'maat'

export type VaultType = {
  address: string
  chain_id: number
  token: Token
}

export type Event = {
  hash: string
  intention_id: string
  status: StatusType
  src_chain_id: number
  dst_chain_id: number | null
  creation_time: string
  txFrom: string
  to: string
  action_type: string
  amount: number | null
  volume: number
  vault: VaultType
}

type IncentiveActionType = 'INC_HARVEST' | 'INC_COMPOUND' | 'INC_SWAP'

export type IncentiveEvent = {
  hash: string
  intention_id: null | string
  status: StatusType
  src_chain_id: number
  dst_chain_id: null | number
  creation_time: string
  txFrom: string
  to: string
  action_type: IncentiveActionType
  amount_in: number
  token_in: Token
  token_out: null | Token
  amount_out: null | number
  strategy: Strategy
  reward_token: null | Token
  entity_initializer: string
}

type CurrencyType = 'USDT' | 'USDC'

export type RebalanceVolume = {
  [currency in CurrencyType]: number
}

export type AdminActionType =
  | 'STRATEGY_REGISTERED'
  | 'STRATEGY_DEPRECATED'
  | 'VAULT_REGISTERED'
  | 'VAULT_DEPRECATED'
  | 'ORACLE_CHANGED'
  | 'INCENTIVE_CONTROLLER_CHANGED'
  | 'STARGATE_ADAPTER_CHANGED'
  | 'ADD_STRATEGY'
  | 'REMOVE_STRATEGY'
  | 'COMMANDER_CHANGED'
  | 'WATCHER_CHANGED'
  | 'WITHDRAW_CANCELING_DELAY'
  | 'FEE_CHANGED'

export type AdminEvent = {
  hash: string
  intention_id: string | null
  status: string
  src_chain_id: number
  dst_chain_id: number | null
  creation_time: string
  txFrom: string
  to: string
  action_type: AdminActionType
  arguments: {
    strategyId?: string
  }
}

export type WithdrawChainsResponse = {
  USDT: number[]
  USDC: number[]
}

export type ReportType = {
  hash: string
  intention_id: null | string
  status: StatusType
  src_chain_id: number
  dst_chain_id: null | number
  creation_time: string
  txFrom: string
  to: string
  action_type: 'UPDATE_PPS'
  price_per_share: number
  vault: {
    address: string
    chain_id: number
    token: {
      name: string
      symbol: string
      decimals: number
      address: string
      chain_id: number
    }
  }
}

export interface Action {
  hash: string
  intention_id: string
  status: StatusType
  src_chain_id: number
  dst_chain_id: number | null
  creation_time: string
  txFrom: string
  to: string
  amount: number
  action_type: LAST_EVENT_ACTION
  strategy: Strategy
  vault: VaultType
}

export type TxInfoResponse = Action[]

export type RebalanceOperation = {
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
  vault: {
    address: string
    chain_id: number
    token: Token
  }
  withdraw_from_chains: number[]
  deposit_to_chains: number[]
  src_strategies: Strategy[]
  dst_strategies: Strategy[]
}

export type ChainParameters =
  | 'bsc'
  | 'arbitrum'
  | 'optimism'
  | 'base'
  | 'polygon'
  | 'avalanche'
  | 'metis'
  | 'mantle'
  | 'sei'

export type TokenParameters = 'USDT' | 'USDC'

export type UserPointsResponse = {
  address: string
  totalRewards: number
  currentRewardMultiplier: number
  rewardsPerStaking: number
  rewardsPerActivity: number
}

export interface BenefitsDescription {
  level: number
  ref_codes: number
  nft_bonus: null | string
  other_benefits: null | string
  incentives: null | string
}

export interface Benefits {
  globalRewardMultiplier: number
  rewardsPerActivity: number
  currentRewardMultiplier: number
  initialBonus: number
  firstTimeStakeBonus: number
  rewardsFromReferrals: number
  benefitsDescription: BenefitsDescription
}

export interface UserRewards {
  userId: `0x${string}`
  totalPoints: number
  rewardsPerStaking: number
  currentRewardMultiplier: number
  initialBonus: number
  firstTimeStakeBonus: number
  rewardsFromReferrals: number
}

export interface CurrentLevel {
  name: string
  description: string
  level: number
  benefits: Benefits
}

export interface NextLevel {
  name: string
  description: string
  pointsToNextLevel: number
  requirementsCompletedPercentage: number
  nextLvlBenefits: Benefits
}

export interface UserBadgesInfo {
  userRewards: UserRewards
  currentLvl: CurrentLevel
  nextLvl: NextLevel
}

export interface UserBadgesResponse {
  currentLvl: CurrentLevel
  userRewards: UserRewards
  nextLvl: NextLevel
}

export interface CurrentStakersCountResponse {
  unique_users: {
    [key: string]: number
  }
  total_users: number
}

export interface BurnedPointsResponse {
  totalPoints: number
}
