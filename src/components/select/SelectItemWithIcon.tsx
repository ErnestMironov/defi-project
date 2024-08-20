import { TokenIconComponent } from '@components/token-icon'

export const SelectItemWithIcon = ({ symbol }: { symbol: string }) => {
  return (
    <div className="flex items-center gap-2">
      <TokenIconComponent symbol={symbol} className="size-6" />
      <span>{symbol}</span>
    </div>
  )
}
