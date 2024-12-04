import BscNetworkIcon from '@assets/icons/networks/bsc.svg'
import EthNetworkIcon from '@assets/icons/networks/ethereum.svg'
import OptimismNetworkIcon from '@assets/icons/networks/optimism.svg'
import PolygonNetworkIcon from '@assets/icons/networks/polygon.svg'
import { ShadowBox } from '@components/box/ShadowBox'
import { TokenIconComponent } from '@components/token-icon'

import type { SelectChainTriggerProperties } from '../types'

export const SelectChainTrigger = ({ chain }: SelectChainTriggerProperties) => {
  return (
    <div className="flex items-center gap-[0.38rem] text-lg/[0] font-bold">
      <ShadowBox
        className="grid aspect-square h-14 grid-cols-2 grid-rows-2 gap-[0.12rem] rounded-xl px-[0.59rem] py-[0.69rem]"
        style={{
          display: chain ? 'block' : 'grid',
        }}
      >
        {chain ? (
          <TokenIconComponent
            symbol={chain}
            className="size-full overflow-hidden rounded-lg"
          />
        ) : (
          <>
            <EthNetworkIcon className="w-full overflow-hidden rounded-sm" />
            <BscNetworkIcon className="w-full rounded-lg" />
            <PolygonNetworkIcon className="w-full rounded-lg" />
            <OptimismNetworkIcon className="w-full rounded-lg" />
          </>
        )}
      </ShadowBox>
    </div>
  )
}
