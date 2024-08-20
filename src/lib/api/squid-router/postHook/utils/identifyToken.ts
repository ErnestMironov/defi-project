import type { Token } from '@uniswap/sdk-core'

import { Tokens } from '../constants'
import { isSupportedUSDC } from '../data/USDC'
import { isSupportedUSDT } from '../data/USDT'

export function getTokenIdentifier(token: Token) {
  if (isSupportedUSDC(token)) return Tokens.USDC
  if (isSupportedUSDT(token)) return Tokens.USDT

  throw new Error(`Unsupported token: ${token.chainId} ${token.address}`)
}
