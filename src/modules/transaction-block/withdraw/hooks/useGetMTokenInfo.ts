import Usdc from '@assets/icons/tokens/usdc.svg'
import Usdt from '@assets/icons/tokens/usdt.svg'
import { useTokenAsset } from '@hooks/common/useTokenAsset'
import type { TokenShares } from '@hooks/useGetUserShares'
import { useMemo } from 'react'

export interface IMToken {
  TokenIcon: React.FC<React.SVGProps<SVGElement>>
  symbol: string
}

const TOKENS: Record<'USDT' | 'USDC', IMToken> = {
  USDT: {
    TokenIcon: Usdt,
    symbol: 'mtUSDT',
  },
  USDC: {
    TokenIcon: Usdc,
    symbol: 'mtUSDC',
  },
}

export type UseGetMTokenInfoReturn = IMToken &
  TokenShares & {
    chainData: ReturnType<typeof useTokenAsset>
  }

export const useGetMTokenInfo = (mToken: TokenShares): UseGetMTokenInfoReturn => {
  const tokenData = useMemo(() => {
    return TOKENS[mToken.stable]
  }, [mToken])
  const chainData = useTokenAsset(mToken?.chainId)

  return {
    ...tokenData,
    ...mToken,
    chainData,
  } as UseGetMTokenInfoReturn
}
