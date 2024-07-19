/* eslint-disable import/no-unused-modules */
// network icons
import Binance from '@assets/icons/bnb.svg'
import Arbitrum from '@assets/icons/networks/arbitrum.svg'
import Base from '@assets/icons/networks/base.svg'
import Bsc from '@assets/icons/networks/bsc.svg'
import Ethereum from '@assets/icons/networks/ethereum.svg'
// import MantleNetowork from '@assets/icons/networks/mantle.svg'
import Optimism from '@assets/icons/networks/optimism.svg'
import Polygon from '@assets/icons/networks/polygon.svg'
// protocol icons
import Aave from '@assets/icons/protocols/aave.svg'
import Beefy from '@assets/icons/protocols/beefy.svg'
import Compound from '@assets/icons/protocols/compound.svg'
import Gnosis from '@assets/icons/protocols/gnosis.svg'
import Lendle from '@assets/icons/protocols/lendle.svg'
import Mantle from '@assets/icons/protocols/mantle.svg'
import Metis from '@assets/icons/protocols/metis.svg'
import Sonne from '@assets/icons/protocols/sonne.svg'
import Yearn from '@assets/icons/protocols/yearn.svg'
// token icons
import Dai from '@assets/icons/tokens/dai.svg'
import Eth from '@assets/icons/tokens/eth.svg'
import Frax from '@assets/icons/tokens/frax.svg'
import Usdc from '@assets/icons/tokens/usdc.svg'
import Usdt from '@assets/icons/tokens/usdt.svg'
import Wbtc from '@assets/icons/tokens/wbtc.svg'
import Weth from '@assets/icons/tokens/weth.svg'
import Xfi from '@assets/icons/tokens/xfi.svg'
import Xusd from '@assets/icons/tokens/xusd.svg'
import { useMemo } from 'react'

interface ITokenAsset {
  TokenIcon: React.FC<React.SVGProps<SVGElement>>
  symbol: string
  name?: string
  chainId?: number
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
    TokenIcon: Binance,
    symbol: 'BNB',
    name: 'Binance',
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
  {
    TokenIcon: Mantle,
    symbol: 'MNT',
    name: 'Mantle',
  },
  // network icons
  {
    TokenIcon: Ethereum,
    symbol: 'eth-mainnet',
    chainId: 1,
    name: 'Ethereum',
  },
  {
    TokenIcon: Optimism,
    symbol: 'optimism-mainnet',
    chainId: 10,
    name: 'Optimism',
  },
  {
    TokenIcon: Arbitrum,
    symbol: 'Arbitrum',
    chainId: 42_161,
    name: 'Arbitrum',
  },
  {
    TokenIcon: Base,
    symbol: 'Base',
    chainId: 8453,
    name: 'Base',
  },
  {
    TokenIcon: Polygon,
    symbol: 'matic',
    chainId: 137,
    name: 'Polygon',
  },
  {
    TokenIcon: Polygon,
    symbol: 'matic-mainnet',
    chainId: 137,
    name: 'Polygon',
  },
  {
    TokenIcon: Bsc,
    symbol: 'bsc-mainnet',
    chainId: 56,
    name: 'Binance',
  },
  {
    TokenIcon: Mantle,
    symbol: 'mantle-mainnet',
    chainId: 5000,
    name: 'Mantle',
  },
  // protocol icons
  {
    TokenIcon: Aave,
    symbol: 'Aave',
    name: 'Aave',
  },
  {
    TokenIcon: Lendle,
    symbol: 'Lendle',
    name: 'Lendle',
  },
  {
    TokenIcon: Metis,
    symbol: 'Metis',
    name: 'Metis',
  },
  {
    TokenIcon: Mantle,
    symbol: 'Mantle',
    name: 'Mantle',
  },
  {
    TokenIcon: Compound,
    symbol: 'Compound',
    name: 'Compound',
  },
  {
    TokenIcon: Beefy,
    symbol: 'Beefy',
    name: 'Beefy',
  },
  {
    TokenIcon: Gnosis,
    symbol: 'Gnosis',
    name: 'Gnosis',
  },
  {
    TokenIcon: Sonne,
    symbol: 'Sonne',
    name: 'Sonne',
  },
  {
    TokenIcon: Yearn,
    symbol: 'Yearn',
    name: 'Yearn',
  },
]

// by symbol or chainId
export const useTokenAsset = (query?: string | number) => {
  return useMemo(() => {
    if (!query) return
    if (typeof query === 'number') {
      return TOKENS.find((token) => token.chainId === query)
    }
    if (typeof query === 'string') {
      return TOKENS.find(
        (token) => query.toLowerCase()?.includes(token.symbol?.toLowerCase()),
      )
    }
  }, [query])
}
