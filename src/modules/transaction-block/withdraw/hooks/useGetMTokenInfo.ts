import type { ParsedSharesBalanceResponse } from '@api/maat-finance/types'
import Usdc from '@assets/icons/tokens/usdc.svg'
import Usdt from '@assets/icons/tokens/usdt.svg'
import { CHAIN_IDS_BY_BACKEND_NAMES } from '@constants/chains'
import { useTokenAsset } from '@hooks/useTokenAsset'
import { useMemo } from 'react'
import type { Address } from 'viem'

export interface IMToken {
  TokenIcon: React.FC<React.SVGProps<SVGElement>>
  symbol: string
  stable: 'usdt' | 'usdc'
  mtAddress: Address
}

const TOKENS: Record<'USDT' | 'USDC', IMToken> = {
  USDT: {
    TokenIcon: Usdt,
    symbol: 'mtUSDT',
    stable: 'usdt',
    mtAddress: '0xD4cdd1BAe5c358D1e1bB74597CDCDd168bd22545',
  },
  USDC: {
    TokenIcon: Usdc,
    symbol: 'mtUSDC',
    stable: 'usdc',
    mtAddress: '0x588f3B1ce9aF2F924f7f89577225c2cb5a5Ec578',
  },
}

export type UseGetMTokenInfoReturn = IMToken &
  ParsedSharesBalanceResponse['balances'][number] & {
    chainData: ReturnType<typeof useTokenAsset>
  }

export const useGetMTokenInfo = (
  mToken: ParsedSharesBalanceResponse['balances'][number],
): UseGetMTokenInfoReturn => {
  const tokenData = useMemo(() => TOKENS[mToken?.token], [mToken?.token])
  const chainData = useTokenAsset(
    CHAIN_IDS_BY_BACKEND_NAMES[mToken?.chain as keyof typeof CHAIN_IDS_BY_BACKEND_NAMES],
  )

  return {
    ...tokenData,
    ...mToken,
    chainData,
  }
}
