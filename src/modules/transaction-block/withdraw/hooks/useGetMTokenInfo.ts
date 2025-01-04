import type { TokenShares } from '@api/contracts/useGetUserShares'
import Usdc from '@assets/icons/tokens/usdc.svg'
import Usdt from '@assets/icons/tokens/usdt.svg'
import { useTokenAsset } from '@hooks/common/useTokenAsset'
import { useMemo } from 'react'

export interface IMToken {
  TokenIcon: React.FC<React.SVGProps<SVGElement>>
  symbol: string
}

const TOKENS: Record<'USDT' | 'USDC', IMToken> = {
  USDT: {
    TokenIcon: Usdt,
    symbol: 'mUSDT',
  },
  USDC: {
    TokenIcon: Usdc,
    symbol: 'mUSDC',
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
