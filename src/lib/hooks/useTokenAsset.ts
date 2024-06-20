/* eslint-disable import/no-unused-modules */
import Arbitrum from '@assets/icons/networks/arbitrum.svg'
import Avalanche from '@assets/icons/networks/avalanche.svg'
import Base from '@assets/icons/networks/base.svg'
import Ethereum from '@assets/icons/networks/ethereum.svg'
import Optimism from '@assets/icons/networks/optimism.svg'
import Polygon from '@assets/icons/networks/polygon.svg'
import Dai from '@assets/icons/tokens/dai.svg'
import Eth from '@assets/icons/tokens/eth.svg'
import Frax from '@assets/icons/tokens/frax.svg'
import Usdc from '@assets/icons/tokens/usdc.svg'
import Usdt from '@assets/icons/tokens/usdt.svg'
import Wbtc from '@assets/icons/tokens/wbtc.svg'
import Weth from '@assets/icons/tokens/weth.svg'
import Xfi from '@assets/icons/tokens/xfi.svg'
import Xusd from '@assets/icons/tokens/xusd.svg'

interface ITokenAsset {
  TokenIcon: React.FC<React.SVGProps<SVGElement>>
  symbol: string
  name?: string
}

const TOKENS: ITokenAsset[] = [
  {
    TokenIcon: Xfi,
    symbol: 'XFI',
    name: 'CrossFi Token',
  },
  {
    TokenIcon: Xfi,
    symbol: 'WXFI',
    name: 'CrossFi  Token',
  },
  {
    TokenIcon: Eth,
    symbol: 'ETH',
    name: 'Ethereum',
  },
  {
    TokenIcon: Weth,
    symbol: 'WETH',
    name: 'Wrapped Ethereum',
  },
  {
    TokenIcon: Usdt,
    symbol: 'USDT',
    name: 'Tether USD',
  },
  {
    TokenIcon: Dai,
    symbol: 'DAI',
    name: 'DAI',
  },
  {
    TokenIcon: Xusd,
    symbol: 'XUSD',
    name: 'XUSD',
  },
  {
    TokenIcon: Frax,
    symbol: 'FRAX',
    name: 'FRAX',
  },
  {
    TokenIcon: Usdc,
    symbol: 'USDC',
    name: 'USDC',
  },
  {
    TokenIcon: Wbtc,
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin',
  },
  // network icons
  {
    TokenIcon: Ethereum,
    symbol: 'Ethereum',
    name: 'Ethereum',
  },
  {
    TokenIcon: Optimism,
    symbol: 'Optimism',
    name: 'Optimism',
  },
  {
    TokenIcon: Arbitrum,
    symbol: 'Arbitrum',
    name: 'Arbitrum',
  },
  {
    TokenIcon: Base,
    symbol: 'Base',
    name: 'Base',
  },
  {
    TokenIcon: Avalanche,
    symbol: 'Avalanche',
    name: 'Avalanche',
  },
  {
    TokenIcon: Polygon,
    symbol: 'Polygon',
    name: 'Polygon',
  },
]

// by symbol
export const useTokenAsset = (query?: string | null) => {
  // console.log('🚀 ~ useTokenAsset ~ query:', query)
  return TOKENS.find((token) => token.symbol?.toLowerCase() === query?.toLowerCase())
}
