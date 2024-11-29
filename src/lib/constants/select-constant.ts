import type { OptionType } from '@components/select/Select'
import {
  SelectActionWithIcon,
  SelectChainWithIcon,
  SelectItemWithIcon,
  SelectStatusWithIcon,
} from '@components/select/SelectItemWithIcon'
import {
  CHAIN_IDS_BY_BACKEND_NAMES,
  CHAIN_IDS_BY_BACKEND_NAMES_FOR_PORTFOLIO,
} from '@constants/chains'

import {
  ADMIN_ACTION_TYPE,
  ANALYTICS_PAGE_EVENT_ACTION_TYPE,
  INCENTIVE_ACTION_TYPE,
  STATUSES,
} from './action-type'
import { PROTOCOL_IDS_BY_BACKEND_NAMES } from './protocols'

export const SELECT_TOKENS: OptionType[] = [
  {
    label: SelectItemWithIcon({ symbol: 'USDC' }),
    value: 'USDC',
  },
  {
    label: SelectItemWithIcon({ symbol: 'USDT' }),
    value: 'USDT',
  },
]

export const SORT_BY_APY: OptionType[] = [
  { label: 'Highest APY', value: 'Highest APY' },
  { label: 'Lowest APY', value: 'Lowest APY' },
]

export const SORT_BY_AMOUNT: OptionType[] = [
  { label: 'Highest Amount', value: 'Highest Amount' },
  { label: 'Lowest Amount', value: 'Lowest Amount' },
]

export const SORT_BY_DATE: OptionType[] = [
  { label: 'Created earlier', value: 'Created earlier' },
  { label: 'Created later', value: 'Created later' },
]

export const SORT_BY_TVL: OptionType[] = [
  { label: 'Highest TVL', value: 'Highest TVL' },
  { label: 'Lowest TVL', value: 'Lowest TVL' },
]

export const SORT_BY: OptionType[] = [
  { label: 'Most Relevant', value: 'Most Relevant' },
  { label: 'APY', value: 'APY' },
  { label: 'TVL', value: 'TVL' },
]

export const SELECT_CHAINS: OptionType[] = Object.entries(CHAIN_IDS_BY_BACKEND_NAMES).map(
  ([key, value]) => ({
    label: SelectChainWithIcon({ chainId: Number(value) }),
    value: key as keyof typeof CHAIN_IDS_BY_BACKEND_NAMES,
  }),
)

export const SELECT_CHAINS_FOR_PORTFOLIO: OptionType[] = Object.entries(
  CHAIN_IDS_BY_BACKEND_NAMES_FOR_PORTFOLIO,
).map(([key, value]) => ({
  label: SelectChainWithIcon({ chainId: Number(value) }),
  value: key as keyof typeof CHAIN_IDS_BY_BACKEND_NAMES_FOR_PORTFOLIO,
}))

export const SELECT_PROTOCOLS: OptionType[] = Object.entries(
  PROTOCOL_IDS_BY_BACKEND_NAMES,
).map(([key, value]) => ({
  label: SelectItemWithIcon({ symbol: value }),
  value: key,
}))

export const SELECT_LAST_EVENT_ACTIONS: OptionType[] = Object.entries(
  ANALYTICS_PAGE_EVENT_ACTION_TYPE,
).map(([key]) => ({
  label: SelectActionWithIcon({ action: key }),
  value: key,
}))

export const SELECT_STATUSES: OptionType[] = STATUSES.map((value) => ({
  label: SelectStatusWithIcon({ status: value }),
  value,
}))

export const SELECT_INCENTIVES_ACTIONS: OptionType[] = Object.entries(
  INCENTIVE_ACTION_TYPE,
).map(([key, value]) => ({
  label: value,
  value: key,
}))

export const SELECT_INCENTIVES_FROM: OptionType[] = [
  { label: 'Vault', value: 'Vault' },
  { label: 'Compounder', value: 'Compounder' },
]

export const SELECT_ADMIN_FUNCTIONS: OptionType[] = [
  { label: 'setPeer', value: 'setPeer' },
  { label: 'setWatcher', value: 'setWatcher' },
  { label: 'setCommander', value: 'setCommander' },
  { label: 'setStargateAdapter', value: 'setStargateAdapter' },
  { label: 'setIncentivesController', value: 'setIncentivesController' },
]

export const SELECT_ADMIN_FROM: OptionType[] = [
  { label: 'MAAT Admin', value: 'MAAT Admin' },
  { label: 'Yield Searcher', value: 'Yield Searcher' },
]

export const SELECT_ADMIN_ACTION_TYPES: OptionType[] = Object.entries(
  ADMIN_ACTION_TYPE,
).map(([key, value]) => ({
  label: value,
  value: key,
}))

export const SELECT_PPS: OptionType[] = [
  { label: '1.0001', value: '1.0001' },
  { label: '1.13', value: '1.13' },
  { label: '1.23', value: '1.23' },
]
