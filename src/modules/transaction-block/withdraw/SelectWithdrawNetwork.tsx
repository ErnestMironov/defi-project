import { TokenIconComponent } from '@components/token-icon'
import React from 'react'

import { SelectNetworkPopover } from '../SelectNetworkPopover'
import { useDepositStore } from '../store/useDepositStore'

export const SelectWithdrawNetwork = () => {
  const {
    depositAsset: asset,
    txType,
    withdrawNetwork,
    setWithdrawNetwork,
  } = useDepositStore()
  return (
    <SelectNetworkPopover
      network={withdrawNetwork}
      onChange={(network) => setWithdrawNetwork(network)}
      trigger={
        <div className="flex items-center">
          <span className="mr-4 text-text-80">To</span>
          <TokenIconComponent symbol={withdrawNetwork} className="size-7" />
          <span className="ml-[0.38rem]">{withdrawNetwork}</span>
        </div>
      }
    />
  )
}
