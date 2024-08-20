import { Token } from '@uniswap/sdk-core'

export const USDT_TOKENS_RAW = [
  {
    chainId: 56,
    addr: '0x55d398326f99059fF775485246999027B3197955',
    decimals: 18,
    symbol: 'USDT',
    name: 'Tether USD',
  },
  {
    chainId: 43_114,
    addr: '0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7',
    decimals: 6,
    symbol: 'USDt',
    name: 'TetherToken',
  },
  {
    chainId: 137,
    addr: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
    decimals: 6,
    symbol: 'USDT',
    name: '(PoS) Tether USD',
  },
  {
    chainId: 42_161,
    addr: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
    decimals: 6,
    symbol: 'USDT',
    name: 'Tether USD',
  },
  {
    chainId: 10,
    addr: '0x94b008aa00579c1307b0ef2c499ad98a8ce58e58',
    decimals: 6,
    symbol: 'USDT',
    name: 'Tether USD',
  },
  {
    chainId: 1088,
    addr: '0xbb06dca3ae6887fabf931640f67cab3e3a16f4dc',
    decimals: 6,
    symbol: 'm.USDT',
    name: 'USDT Token',
  },
  {
    chainId: 5000,
    addr: '0x201eba5cc46d216ce6dc03f6a759e8e766e956ae',
    decimals: 6,
    symbol: 'USDT',
    name: 'Tether USD',
  },
]

export const USDC_TOKENS: Token[] = USDT_TOKENS_RAW.map((usdt) => {
  return new Token(usdt.chainId, usdt.addr, usdt.decimals, usdt.symbol, usdt.name)
})

export const STARGATE_SUPPORTED_CHAINS_WITH_USDC = USDC_TOKENS.map(
  (token) => token.chainId,
)

export function isSupportedUSDT(token: Token): boolean {
  return USDC_TOKENS.some(
    (usdt) => usdt.address === token.address && usdt.chainId === token.chainId,
  )
}
