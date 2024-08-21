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
