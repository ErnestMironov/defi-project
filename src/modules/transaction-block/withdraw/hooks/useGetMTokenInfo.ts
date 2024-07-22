import Usdc from '@assets/icons/tokens/usdc.svg'
import Usdt from '@assets/icons/tokens/usdt.svg'
import { CHAIN_IDS_BY_NAME } from '@constants/chains'
import { useTokenAsset } from '@hooks/useTokenAsset'
import { useMemo } from 'react'
import type { Address } from 'viem'

export interface IMToken {
  TokenIcon: React.FC<React.SVGProps<SVGElement>>
  symbol: string
  stable: 'usdt' | 'usdc'
  chainId: number
  mtAddress: Address
}

const TOKENS: {
  [key: Address]: IMToken
} = {
  '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9': {
    TokenIcon: Usdt,
    symbol: 'mtUSDT',
    stable: 'usdt',
    chainId: CHAIN_IDS_BY_NAME.Arbitrum,
    mtAddress: '0x0dac12432d034B3fd923709FDC097B84557d0Bb4',
  },

  '0xaf88d065e77c8cc2239327c5edb3a432268e5831': {
    TokenIcon: Usdc,
    symbol: 'mtUSDC',
    stable: 'usdc',
    chainId: CHAIN_IDS_BY_NAME.Arbitrum,
    mtAddress: '0xF08C77ac7056AD2172C8b688c80Ff8b8D93CB562',
  },
  '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913': {
    TokenIcon: Usdc,
    symbol: 'mtUSDC',
    stable: 'usdc',
    chainId: CHAIN_IDS_BY_NAME.BNB,
    mtAddress: '0x588f3B1ce9aF2F924f7f89577225c2cb5a5Ec578',
  },
  '0xbb06dca3ae6887fabf931640f67cab3e3a16f4dc': {
    TokenIcon: Usdt,
    symbol: 'mtUSDT',
    stable: 'usdt',
    chainId: CHAIN_IDS_BY_NAME.Metis,
    mtAddress: '0xD4cdd1BAe5c358D1e1bB74597CDCDd168bd22545',
  },
  '0x3c499c542cef5e3811e1192ce70d8cc03d5c3359': {
    TokenIcon: Usdc,
    symbol: 'mtUSDC',
    stable: 'usdc',
    chainId: CHAIN_IDS_BY_NAME.Polygon,
    mtAddress: '0x588f3B1ce9aF2F924f7f89577225c2cb5a5Ec578',
  },
  '0xc2132d05d31c914a87c6611c10748aeb04b58e8f': {
    TokenIcon: Usdt,
    symbol: 'mtUSDT',
    stable: 'usdt',
    chainId: CHAIN_IDS_BY_NAME.Polygon,
    mtAddress: '0xD4cdd1BAe5c358D1e1bB74597CDCDd168bd22545',
  },
  '0x0b2c639c533813f4aa9d7837caf62653d097ff85': {
    TokenIcon: Usdc,
    symbol: 'mtUSDC',
    stable: 'usdc',
    chainId: CHAIN_IDS_BY_NAME.Optimism,
    mtAddress: '0x588f3B1ce9aF2F924f7f89577225c2cb5a5Ec578',
  },
  '0x94b008aa00579c1307b0ef2c499ad98a8ce58e58': {
    TokenIcon: Usdt,
    symbol: 'mtUSDT',
    stable: 'usdt',
    chainId: CHAIN_IDS_BY_NAME.Optimism,
    mtAddress: '0xD4cdd1BAe5c358D1e1bB74597CDCDd168bd22545',
  },
}

export const useGetMTokenInfo = (mTokenAddress: Address) => {
  const tokenData = useMemo(() => TOKENS[mTokenAddress], [mTokenAddress])
  const chainData = useTokenAsset(tokenData?.chainId)

  return {
    ...tokenData,
    chainData,
  }
}
