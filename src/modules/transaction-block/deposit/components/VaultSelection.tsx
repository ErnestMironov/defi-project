import { useTokenAsset } from '@hooks/common/useTokenAsset'
import { useVaultAPY } from '@hooks/useVaultAPY'
import { useTxStore } from '@modules/transaction-block/store/useTxStore'

import { VaultInfoBox } from './VaultInfoBox'

export const VaultSelection = () => {
  const { bestUSDCApy, bestUSDTApy } = useVaultAPY()
  const { vault, setVault } = useTxStore()

  const USDC = useTokenAsset('USDC')
  const USDT = useTokenAsset('USDT')

  return (
    <div className="my-4 flex w-full items-center justify-between gap-4 px-4 max-lg:gap-[0.38rem]">
      <VaultInfoBox
        active={vault === 'USDC'}
        onClick={() => setVault('USDC')}
        icon={USDC?.TokenIcon && <USDC.TokenIcon className="size-8 max-lg:size-6" />}
        vaultName="USDC"
        apy={`${Math.trunc(bestUSDCApy)}%`}
      />
      <div className="h-6 w-px bg-stroke-element max-lg:hidden" />
      <VaultInfoBox
        active={vault === 'USDT'}
        onClick={() => setVault('USDT')}
        icon={USDT?.TokenIcon && <USDT.TokenIcon className="size-8 max-lg:size-6" />}
        vaultName="USDT"
        apy={`${Math.trunc(bestUSDTApy)}%`}
      />
    </div>
  )
}
