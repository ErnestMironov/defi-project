import { TokenIconComponent } from '@components/token-icon'
import { CHAIN_NAMES_BY_ID } from '@constants/chains'

export const SelectItemWithIcon = ({ symbol }: { symbol: string }) => {
  return (
    <div className="flex items-center gap-2">
      <TokenIconComponent symbol={symbol} className="size-6" />
      <span>{symbol}</span>
    </div>
  )
}

export const SelectChainWithIcon = ({ chainId }: { chainId: number }) => {
  return (
    <div className="flex items-center gap-2">
      <TokenIconComponent symbol={chainId} className="size-6" />
      <span>{CHAIN_NAMES_BY_ID[chainId as keyof typeof CHAIN_NAMES_BY_ID]}</span>
    </div>
  )
}
