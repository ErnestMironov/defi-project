import type { Action } from '@api/maat-finance/types'
import { useTokenAsset } from '@hooks/common/useTokenAsset'
import type { ComponentProps } from 'react'
import { formatUnits } from 'viem'

import {
  Chain,
  Status,
  Strategy,
  Timestamp,
  TokenAmount,
  TransactionHash,
} from '../LabelValueElements'
import { TransactionInfoHeader } from '../transaction-info-header/TransactionInfoHeader'
import { TransactionInfoContainer } from '../TransactionInfoContainer'

interface WithdrawFromStrategyProperties extends ComponentProps<'div'> {
  data?: Action
}

export const WithdrawFromStrategy = (props: WithdrawFromStrategyProperties) => {
  const { className, data, ...rest } = props
  const chainData = useTokenAsset(data?.src_chain_id)

  if (!data) {
    return <></>
  }

  return (
    <TransactionInfoContainer className={className} {...rest}>
      <TransactionInfoHeader
        title="Withdraw from Strategy"
        tags={['USER', 'TRIGGER']}
        status={data?.status}
        date={data?.creation_time}
      />
      <div className="mt-4 grid grid-cols-6 gap-3 max-lg:grid-cols-1 max-lg:gap-[0.38rem]">
        <TransactionHash value={data?.hash} className="col-span-3" />
        <Status status={data?.status} className="col-span-3" />
        <TokenAmount
          value={formatUnits(
            BigInt(data?.amount ?? 0),
            data?.vault?.token?.decimals ?? 6,
          )}
          symbol={data?.vault?.token?.symbol ?? ''}
          usdValue={formatUnits(
            BigInt(data?.amount ?? 0),
            data?.vault?.token?.decimals ?? 6,
          )}
          className="col-span-3"
        />
        <Strategy symbols={['USDC', 'Arbitrum', 'Aave']} className="col-span-3" />
        <Chain value={chainData?.name ?? ''} className="col-span-3" />
        <Timestamp value={data?.creation_time} className="col-span-3" />
      </div>
    </TransactionInfoContainer>
  )
}
