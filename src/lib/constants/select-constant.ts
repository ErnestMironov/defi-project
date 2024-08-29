import type { OptionType } from '@components/select/Select'
import {
  SelectChainWithIcon,
  SelectItemWithIcon,
} from '@components/select/SelectItemWithIcon'
import { CHAIN_NAMES_BY_ID, CHAINS } from '@constants/chains'

export const SELECT_TOKENS: OptionType[] = [
  { label: 'All Tokens', value: 'All Tokens' },
  {
    label: SelectItemWithIcon({ symbol: 'USDC' }),
    value: 'usdc',
  },
  {
    label: SelectItemWithIcon({ symbol: 'USDT' }),
    value: 'usdt',
  },
]
export const MOBILE_SELECT_TOKENS: OptionType[] = [
  {
    label: SelectItemWithIcon({ symbol: 'USDC' }),
    value: 'usdc',
  },
  {
    label: SelectItemWithIcon({ symbol: 'USDT' }),
    value: 'usdt',
  },
]

export const SORT_BY_APY: OptionType[] = [
  { label: 'Highest APY', value: 'Highest APY' },
  { label: 'Lowest APY', value: 'Lowest APY' },
]

export const SORT_BY_TVL: OptionType[] = [
  { label: 'Highest TVL', value: 'Highest TVL' },
  { label: 'Lowest TVL', value: 'Lowest TVL' },
]

export const SELECT_CHAINS: OptionType[] = [
  { label: 'All Chains', value: 'All Chains' },
  ...Object.entries(CHAIN_NAMES_BY_ID)
    .filter(([key]) => CHAINS.includes(Number(key) as (typeof CHAINS)[number]))
    .map(([key, value]) => ({
      label: SelectChainWithIcon({ chainId: Number(key) }),
      value,
    })),
]

export const SELECT_PROTOCOLS: OptionType[] = [
  { label: 'All Protocols', value: 'All Protocols' },
  {
    label: SelectItemWithIcon({ symbol: 'Compound' }),
    value: 'Compound',
  },
  {
    label: SelectItemWithIcon({ symbol: 'SonneFi' }),
    value: 'SonneFi',
  },
  {
    label: SelectItemWithIcon({ symbol: 'Spark' }),
    value: 'Spark',
  },
  {
    label: SelectItemWithIcon({ symbol: 'AAVE' }),
    value: 'AAVE',
  },
  {
    label: SelectItemWithIcon({ symbol: 'Beefy' }),
    value: 'Beefy',
  },
  {
    label: SelectItemWithIcon({ symbol: 'Yearn' }),
    value: 'Yearn',
  },
]

export const SELECT_ACTIONS: OptionType[] = [
  { label: 'All Actions', value: 'All Actions' },
  {
    label: 'Deposit',
    value: 'Deposit',
  },
  {
    label: 'Withdraw Request',
    value: 'Withdraw Request',
  },
]

export const MOBILE_SELECT_ACTIONS: OptionType[] = [
  {
    label: 'Deposit',
    value: 'Deposit',
  },
  {
    label: 'Withdraw Request',
    value: 'Withdraw Request',
  },
]

export const SELECT_STATUSES: OptionType[] = [
  { label: 'All Statuses', value: 'All Statuses' },
  {
    label: 'In Progress',
    value: 'In Progress',
  },
  {
    label: 'Success',
    value: 'Success',
  },
  {
    label: 'Failed',
    value: 'Failed',
  },
]

export const MOBILE_SELECT_STATUSES: OptionType[] = [
  {
    label: 'In Progress',
    value: 'In Progress',
  },
  {
    label: 'Success',
    value: 'Success',
  },
  {
    label: 'Failed',
    value: 'Failed',
  },
]

export const SELECT_MAAT_ACTIONS: OptionType[] = [
  { label: 'All Actions', value: 'All Actions' },
  {
    label: 'Rebalance',
    value: 'Rebalance',
  },
  {
    label: 'Withdraw Fulfillment',
    value: 'Withdraw Fulfillment',
  },
  {
    label: 'Deposit Distribution',
    value: 'Deposit Distribution',
  },
  {
    label: 'Withdraw from strategy',
    value: 'Withdraw from strategy',
  },
]

export const SELECT_INCENTIVES_ACTIONS: OptionType[] = [
  { label: 'All Actions', value: 'All Actions' },
  {
    label: 'Harvest',
    value: 'Harvest',
  },
  {
    label: 'Swap',
    value: 'Swap',
  },
  {
    label: 'Compound',
    value: 'Compound',
  },
]

export const SELECT_INCENTIVES_FROM: OptionType[] = [
  { label: 'From', value: 'From' },
  { label: 'Vault', value: 'Vault' },
  { label: 'Compounder', value: 'Compounder' },
]

export const SELECT_ADMIN_FUNCTIONS: OptionType[] = [
  { label: 'All Functions', value: 'All Functions' },
  { label: 'setPeer', value: 'setPeer' },
  { label: 'setWatcher', value: 'setWatcher' },
  { label: 'setCommander', value: 'setCommander' },
  { label: 'setStargateAdapter', value: 'setStargateAdapter' },
  { label: 'setIncentivesController', value: 'setIncentivesController' },
]

export const SELECT_ADMIN_FROM: OptionType[] = [
  { label: 'From', value: 'From' },
  { label: 'MAAT Admin', value: 'MAAT Admin' },
  { label: 'Yield Searcher', value: 'Yield Searcher' },
]

export const SELECT_PPS: OptionType[] = [
  { label: 'All PPS', value: 'All PPS' },
  { label: '1.0001', value: '1.0001' },
  { label: '1.13', value: '1.13' },
  { label: '1.23', value: '1.23' },
]
