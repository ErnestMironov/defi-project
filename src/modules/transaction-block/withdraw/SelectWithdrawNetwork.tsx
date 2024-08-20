import { TokenIconComponent } from '@components/token-icon'
import { useTokenAsset } from '@hooks/useTokenAsset'

import { SelectNetworkPopover } from '../SelectNetworkPopover'
import { useTxStore } from '../store/useTxStore'

export const SelectWithdrawNetwork = () => {
  const { withdrawNetwork, setWithdrawNetwork } = useTxStore()
  const token = useTokenAsset(withdrawNetwork)

  return (
    <SelectNetworkPopover
      chain={withdrawNetwork}
      onChange={(network) => setWithdrawNetwork(network)}
      trigger={
        <div className="flex items-center">
          <span className="mr-4 text-text-80">To</span>
          <TokenIconComponent
            symbol={withdrawNetwork}
            className="size-7 max-lg:size-[1.125rem]"
          />
          <span className="ml-[0.38rem]">{token?.name}</span>
        </div>
      }
    />
  )
}
