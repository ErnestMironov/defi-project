import { TokenIconComponent } from '@components/token-icon'
import { ACTION_ICONS } from '@constants/action-icon'
import { LAST_EVENT_ACTION_TYPE } from '@constants/action-type'
import { CHAIN_NAMES_BY_ID } from '@constants/chains'
import { STATUS_COLOR } from '@constants/status-color'

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

export const SelectActionWithIcon = ({ action }: { action: string }) => {
  const Icon = ACTION_ICONS[action as keyof typeof ACTION_ICONS]
  return (
    <div className="flex items-center gap-2">
      {Icon && <Icon />}
      <span>{LAST_EVENT_ACTION_TYPE[action as keyof typeof LAST_EVENT_ACTION_TYPE]}</span>
    </div>
  )
}

export const SelectStatusWithIcon = ({ status }: { status: string }) => {
  const color = STATUS_COLOR[status as keyof typeof STATUS_COLOR]
  const skipColor = STATUS_COLOR.skip

  const renderBase = (_color: string, _status: string) => {
    return (
      <div
        className="relative w-fit px-2 py-1 text-sm/[1rem] capitalize"
        style={{ color: _color }}
      >
        <div
          className="absolute inset-0 size-full rounded-md opacity-15"
          style={{ backgroundColor: _color }}
        />
        {_status === 'success' ? 'Completed' : _status}
      </div>
    )
  }

  if (status === 'failed') {
    return (
      <div className="flex items-center gap-2">
        {renderBase(color, status)}
        <span>+</span>
        {renderBase(skipColor, 'skip')}
      </div>
    )
  }
  return renderBase(color, status)
}
