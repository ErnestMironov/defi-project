import { USDC_TOKENS } from '@api/squid-router/postHook/data/USDC'
import { USDT_TOKENS } from '@api/squid-router/postHook/data/USDT'
import { useGetSquidSwapRoute } from '@api/squid-router/useGetSquidSwapRoute'
import { useTxStore } from '@modules/transaction-block/store/useTxStore'
import type { HTMLAttributes } from 'react'
import React, { useMemo } from 'react'
import type { Address } from 'viem'
import { parseUnits } from 'viem'

import Details from './Details'
import ShortInfo from './ShortInfo'
import { getSummaryAndFees } from './summaryAndFees'

interface ZapFeeProperties extends HTMLAttributes<HTMLDivElement> {}

const ZapFee: React.FC<ZapFeeProperties> = ({ className }) => {
  const [open, setOpen] = React.useState(false)

  const {
    depositAsset,
    vault,
    inputValue: amount,
    depositFromNetwork,
    depositToNetwork,
  } = useTxStore()

  const tokenAddrForVault = useMemo(() => {
    if (vault === 'USDT') {
      return USDT_TOKENS.find((token) => token.chainId === depositToNetwork)?.address
    }
    return USDC_TOKENS.find((token) => token.chainId === depositToNetwork)?.address
  }, [vault, depositToNetwork])

  const { route } = useGetSquidSwapRoute({
    fromAmount: parseUnits(amount, depositAsset?.contract_decimals ?? 6).toString(),
    fromChain: depositFromNetwork?.toString(),
    fromToken: depositAsset?.contract_address as Address,
    toChain: depositToNetwork?.toString(),
    toToken: tokenAddrForVault as Address,
    enableBoost: true,
  })
  console.log('🚀 ~ route:', route)

  const summaryAndFees = getSummaryAndFees(route)

  return (
    <div className={className}>
      <ShortInfo openHandler={() => setOpen(true)} summaryAndFees={summaryAndFees} />
      <Details
        open={open}
        closeHandler={() => setOpen(false)}
        summaryAndFees={summaryAndFees}
      />
    </div>
  )
}

export default ZapFee
