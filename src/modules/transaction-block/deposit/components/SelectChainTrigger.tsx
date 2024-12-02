import { TokenIconComponent } from '@components/token-icon'
import { useTokenAsset } from '@hooks/common/useTokenAsset'

import type { SelectChainTriggerProperties } from '../types'

export const SelectChainTrigger = ({ chain }: SelectChainTriggerProperties) => {
  const chainData = useTokenAsset(chain)

  return (
    <div className="flex items-center gap-[0.38rem] text-lg/[0] font-bold">
      {chain && (
        <div className="overflow-hidden rounded-full">
          <TokenIconComponent symbol={chain} className="size-4" />
        </div>
      )}
      <span>{chainData?.name || 'All networks'}</span>
    </div>
  )
}
