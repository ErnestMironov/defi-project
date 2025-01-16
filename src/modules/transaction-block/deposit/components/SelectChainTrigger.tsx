import NetworksGroup from '@assets/images/networks-group.png'
import { ShadowBox } from '@components/box/ShadowBox'
import { TokenIconComponent } from '@components/token-icon'

import type { SelectChainTriggerProperties } from '../types'

export const SelectChainTrigger = ({ chain }: SelectChainTriggerProperties) => {
  return (
    <div className="flex items-center gap-[0.38rem]  text-lg/[0] font-bold">
      <ShadowBox className="aspect-square h-16 rounded-xl bg-input-active p-[0.69rem]">
        {chain ? (
          <TokenIconComponent
            symbol={chain}
            className="size-full overflow-hidden rounded-lg"
          />
        ) : (
          <img src={NetworksGroup} alt="Networks Group" className="w-full" />
        )}
      </ShadowBox>
    </div>
  )
}
