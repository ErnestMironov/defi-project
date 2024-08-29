import type { ParsedSharesBalanceResponse } from '@api/maat-finance/types'
import Usdc from '@assets/icons/tokens/usdc.svg'
import Usdt from '@assets/icons/tokens/usdt.svg'
import { CHAIN_IDS_BY_BACKEND_NAMES } from '@constants/chains'
import { USDC_VAULT_ADDRESS, USDT_VAULT_ADDRESS } from '@constants/vaults'
import { useTokenAsset } from '@hooks/common/useTokenAsset'
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
    mtAddress: USDT_VAULT_ADDRESS,
  },
  USDC: {
    TokenIcon: Usdc,
    symbol: 'mtUSDC',
    stable: 'usdc',
    mtAddress: USDC_VAULT_ADDRESS,
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
