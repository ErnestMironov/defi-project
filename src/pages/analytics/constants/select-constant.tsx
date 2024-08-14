import type { OptionType } from '@components/select/Select'
import { TokenIconComponent } from '@components/token-icon'

export const SELECT_TOKENS: OptionType[] = [
  { label: 'All Tokens', value: 'All Tokens' },
  {
    label: (
      <div className="flex items-center gap-2">
        <TokenIconComponent symbol="usdc" className="size-6" />
        <span>USDC</span>
      </div>
    ),
    value: 'usdc',
  },
  {
    label: (
      <div className="flex items-center gap-2">
        <TokenIconComponent symbol="usdt" className="size-6" />
        <span>USDT</span>
      </div>
    ),
    value: 'usdt',
  },
]
export const SELECT_CHAINS: OptionType[] = [
  { label: 'All Chains', value: 'All Chains' },
  {
    label: (
      <div className="flex items-center gap-2">
        <TokenIconComponent symbol="Base" className="size-6" />
        <span>Base</span>
      </div>
    ),
    value: 'Base',
  },
  {
    label: (
      <div className="flex items-center gap-2">
        <TokenIconComponent symbol="Polygon" className="size-6" />
        <span>Polygon</span>
      </div>
    ),
    value: 'Polygon',
  },
  {
    label: (
      <div className="flex items-center gap-2">
        <TokenIconComponent symbol="Arbitrum" className="size-6" />
        <span>Arbitrum</span>
      </div>
    ),
    value: 'Arbitrum',
  },
  {
    label: (
      <div className="flex items-center gap-2">
        <TokenIconComponent symbol="Mantle" className="size-6" />
        <span>Mantle</span>
      </div>
    ),
    value: 'Mantle',
  },
  {
    label: (
      <div className="flex items-center gap-2">
        <TokenIconComponent symbol="Optimism" className="size-6" />
        <span>Optimism</span>
      </div>
    ),
    value: 'Optimism',
  },
  {
    label: (
      <div className="flex items-center gap-2">
        <TokenIconComponent symbol="Avalanche" className="size-6" />
        <span>Avalanche</span>
      </div>
    ),
    value: 'Avalanche',
  },
  {
    label: (
      <div className="flex items-center gap-2">
        <TokenIconComponent symbol="BNB" className="size-6" />
        <span>BNB</span>
      </div>
    ),
    value: 'BNB',
  },
  {
    label: (
      <div className="flex items-center gap-2">
        <TokenIconComponent symbol="Fantom" className="size-6" />
        <span>Fantom</span>
      </div>
    ),
    value: 'Fantom',
  },
]
export const SELECT_PROTOCOLS: OptionType[] = [
  { label: 'All Protocols', value: 'All Protocols' },
  {
    label: (
      <div className="flex items-center gap-2">
        <TokenIconComponent symbol="Compound" className="size-6" />
        <span>Compound</span>
      </div>
    ),
    value: 'Compound',
  },
  {
    label: (
      <div className="flex items-center gap-2">
        <TokenIconComponent symbol="SonneFi" className="size-6" />
        <span>SonneFi</span>
      </div>
    ),
    value: 'SonneFi',
  },
  {
    label: (
      <div className="flex items-center gap-2">
        <TokenIconComponent symbol="Spark" className="size-6" />
        <span>Spark</span>
      </div>
    ),
    value: 'Spark',
  },
  {
    label: (
      <div className="flex items-center gap-2">
        <TokenIconComponent symbol="AAVE" className="size-6" />
        <span>AAVE</span>
      </div>
    ),
    value: 'AAVE',
  },
  {
    label: (
      <div className="flex items-center gap-2">
        <TokenIconComponent symbol="Beefy" className="size-6" />
        <span>Beefy</span>
      </div>
    ),
    value: 'Beefy',
  },
  {
    label: (
      <div className="flex items-center gap-2">
        <TokenIconComponent symbol="Yearn" className="size-6" />
        <span>Yearn</span>
      </div>
    ),
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
