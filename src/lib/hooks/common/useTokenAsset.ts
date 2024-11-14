/* eslint-disable import/no-unused-modules */
// network icons
import Binance from '@assets/icons/bnb.svg'
import Arbitrum from '@assets/icons/networks/arbitrum.svg'
import Aurora from '@assets/icons/networks/aurora.svg'
import Avalanche from '@assets/icons/networks/avalanche.svg'
import Base from '@assets/icons/networks/base.svg'
import Bsc from '@assets/icons/networks/bsc.svg'
import Ethereum from '@assets/icons/networks/ethereum.svg'
import Flare from '@assets/icons/networks/flare.svg'
import GravityAlpha from '@assets/icons/networks/gravity-alpha.svg'
import Iota from '@assets/icons/networks/iota.svg'
import Kaia from '@assets/icons/networks/kaia.svg'
import Kava from '@assets/icons/networks/kava.svg'
// import MantleNetowork from '@assets/icons/networks/mantle.svg'
import Optimism from '@assets/icons/networks/optimism.svg'
import Polygon from '@assets/icons/networks/polygon.svg'
import Rari from '@assets/icons/networks/rari.svg'
import Scroll from '@assets/icons/networks/scroll.svg'
import Sei from '@assets/icons/networks/sei.svg'
// import Taiko from '@assets/icons/networks/taiko.svg'
// protocol icons
import Aave from '@assets/icons/protocols/aave.svg'
import Beefy from '@assets/icons/protocols/beefy.svg'
import Compound from '@assets/icons/protocols/compound.svg'
import Gnosis from '@assets/icons/protocols/gnosis.svg'
import Harvest from '@assets/icons/protocols/harvest.svg'
import Lendle from '@assets/icons/protocols/lendle.svg'
import Mantle from '@assets/icons/protocols/mantle.svg'
import Metis from '@assets/icons/protocols/metis.svg'
import Sonne from '@assets/icons/protocols/sonne.svg'
import Stargate from '@assets/icons/protocols/stargate.svg'
import Superform from '@assets/icons/protocols/superform.svg'
import Yearn from '@assets/icons/protocols/yearn.svg'
// token icons
import Dai from '@assets/icons/tokens/dai.svg'
import Eth from '@assets/icons/tokens/eth.svg'
import Frax from '@assets/icons/tokens/frax.svg'
import Usdc from '@assets/icons/tokens/usdc.svg'
import Usdt from '@assets/icons/tokens/usdt.svg'
import Wbtc from '@assets/icons/tokens/wbtc.svg'
import Weth from '@assets/icons/tokens/weth.svg'
import { useMemo } from 'react'

interface ITokenAsset {
  TokenIcon: React.FC<React.SVGProps<SVGElement>>
  symbol: string
  name?: string
  chainId?: number
}

const TOKENS: ITokenAsset[] = [
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
    name: 'USDT',
  },
  {
    TokenIcon: Dai,
    symbol: 'DAI',
    name: 'DAI',
  },
  {
    TokenIcon: Frax,
    symbol: 'FRAX',
    name: 'FRAX',
  },
  {
    TokenIcon: Binance,
    symbol: 'Bsc',
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
  {
    TokenIcon: Optimism,
    symbol: 'OP',
    name: 'Optimism',
  },
  {
    TokenIcon: Binance,
    symbol: 'BNB',
    name: 'BNB',
  },
  // network icons
  {
    TokenIcon: Ethereum,
    symbol: 'eth-mainnet',
    chainId: 1,
    name: 'Ethereum',
  },
  {
    TokenIcon: Sei,
    symbol: 'SEI',
    chainId: 1329,
    name: 'Sei',
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
    TokenIcon: Avalanche,
    symbol: 'avalanche-mainnet',
    chainId: 43_114,
    name: 'Avalanche',
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
  {
    TokenIcon: Metis,
    symbol: 'metis-mainnet',
    chainId: 1088,
    name: 'Metis',
  },

  {
    TokenIcon: Kava,
    symbol: 'kava-mainnet',
    chainId: 2222,
    name: 'Kava',
  },
  {
    TokenIcon: Kaia,
    symbol: 'klaytn-mainnet',
    chainId: 8217,
    name: 'Klaytn',
  },
  {
    TokenIcon: Iota,
    symbol: 'iota-mainnet',
    chainId: 8822,
    name: 'IOTA',
  },
  {
    TokenIcon: Rari,
    symbol: 'rari-mainnet',
    chainId: 1_380_012_617,
    name: 'RARI',
  },
  {
    TokenIcon: Flare,
    symbol: 'flare-mainnet',
    chainId: 14,
    name: 'Flare',
  },
  {
    TokenIcon: GravityAlpha,
    symbol: 'gravity-alpha-mainnet',
    chainId: 1625,
    name: 'Gravity Alpha',
  },
  {
    TokenIcon: Ethereum,
    symbol: 'taiko-mainnet',
    chainId: 167_000,
    name: 'Taiko',
  },
  {
    TokenIcon: Sei,
    symbol: 'sei-mainnet',
    chainId: 1329,
    name: 'Sei',
  },
  {
    TokenIcon: Scroll,
    symbol: 'scroll-mainnet',
    chainId: 534_352,
    name: 'Scroll',
  },
  {
    TokenIcon: Aurora,
    symbol: 'aurora-mainnet',
    chainId: 1_313_161_554,
    name: 'Aurora',
  },
  // protocol icons
  {
    TokenIcon: Aave,
    symbol: 'Aave',
    name: 'Aave',
  },
  {
    TokenIcon: Harvest,
    symbol: 'Harvest',
    name: 'Harvest',
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
  {
    TokenIcon: Stargate,
    symbol: 'Stargate',
    name: 'Stargate',
  },
  {
    TokenIcon: Superform,
    symbol: 'Superform',
    name: 'Superform',
  },
]

// by symbol or chainId
export const useTokenAsset = (query?: string | number | null) => {
  return useMemo(() => {
    if (!query) return
    if (typeof query === 'number' || !Number.isNaN(Number(query))) {
      return TOKENS.find((token) => token.chainId === Number(query))
    }
    if (typeof query === 'string') {
      return TOKENS.find(
        (token) =>
          query.toLowerCase()?.includes(token.symbol?.toLowerCase() || '') ||
          query.toLowerCase()?.includes(token.name?.toLowerCase() || ''),
      )
    }
  }, [query])
}
