import type { ChainType } from '@constants/chains'
import { SupportedChainsByVault, Tokens } from '@constants/vaults'
import type { Vault } from '@modules/transaction-block/store/useTxStore'

export const filterChainsByVault = <T extends number | string>(
  chains: T[],
  vault?: Vault,
): T[] => {
  if (!vault) return chains
  const tokenEnum = Tokens[vault]
  if (tokenEnum === undefined) return chains
  return chains.filter(
    (chain) => SupportedChainsByVault[tokenEnum]?.includes(chain as any),
  )
}

export const filterVaultsByChain = (chain: ChainType, vaults: Vault[]) => {
  return vaults.filter((vault) => SupportedChainsByVault[Tokens[vault]]?.includes(chain))
}
