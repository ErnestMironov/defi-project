import { Token } from '@uniswap/sdk-core'

export const USDC_TOKENS_RAW = [
  {
    addr: '0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e',
    chainId: 43_114,
    decimals: 6,
    name: 'USD Coin',
    symbol: 'USDC',
  },
  {
    chainId: 137,
    addr: '0x3c499c542cef5e3811e1192ce70d8cc03d5c3359',
    decimals: 6,
    symbol: 'USDC',
    name: 'USD Coin',
  },
  {
    chainId: 42_161,
    addr: '0xaf88d065e77c8cc2239327c5edb3a432268e5831',
    decimals: 6,
    symbol: 'USDC',
    name: 'USD Coin',
  },
  {
    chainId: 10,
    addr: '0x0b2c639c533813f4aa9d7837caf62653d097ff85',
    decimals: 6,
    symbol: 'USDC',
    name: 'USD Coin',
  },
  {
    chainId: 5000,
    addr: '0x09bc4e0d864854c6afb6eb9a9cdf58ac190d0df9',
    decimals: 6,
    symbol: 'USDC',
    name: 'USD Coin',
  },
  {
    chainId: 8453,
    addr: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
    decimals: 6,
    symbol: 'USDC',
    name: 'USD Coin',
  },
]

export const USDC_TOKENS: Token[] = USDC_TOKENS_RAW.map((usdc) => {
  return new Token(usdc.chainId, usdc.addr, usdc.decimals, usdc.symbol, usdc.name)
})

export const STARGATE_SUPPORTED_CHAINS_WITH_USDC = USDC_TOKENS.map(
  (token) => token.chainId,
)

export function isSupportedUSDC(token: Token): boolean {
  return USDC_TOKENS.some(
    (usdc) => usdc.address === token.address && usdc.chainId === token.chainId,
  )
}
