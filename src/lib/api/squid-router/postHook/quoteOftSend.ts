import { tokenVaultAbi } from '@constants/abi/token-vault'
import { Options } from '@layerzerolabs/lz-v2-utilities'
import type { Provider } from 'ethers'
import { Contract, ethers } from 'ethers'

export async function quoteOftSend(
  tokenVaultAddr: string,
  dstEid: number,
  receiver: string,
  provider: Provider,
) {
  const tokenVault = new Contract(tokenVaultAddr, tokenVaultAbi, provider)
  const extraOptions = Options.newOptions().addExecutorLzReceiveOption('250000', '0')

  const parameters = [
    dstEid,
    ethers.zeroPadBytes(receiver, 32),
    BigInt(10_000_000),
    BigInt(10_000_000),
    extraOptions.toBytes(),
    '0x',
    '0x',
  ]

  const result = await tokenVault.quoteSend(parameters, false)
  return result[0] as bigint
}
