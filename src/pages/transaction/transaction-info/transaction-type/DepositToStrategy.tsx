import type { Action } from '@api/maat-finance/types'
import { useTokenAsset } from '@hooks/common/useTokenAsset'
import type { ComponentProps } from 'react'
import { useParams } from 'react-router-dom'
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

interface DepositToStrategyProperties extends ComponentProps<'div'> {
  data?: Action
}

export const DepositToStrategy = (props: DepositToStrategyProperties) => {
  const { className, data, ...rest } = props
  console.log('🚀 ~ DepositToStrategy ~ data:', data)
  const { tx_hash } = useParams()

  const chainData = useTokenAsset(data?.src_chain_id)

  if (!data) {
    return <></>
  }

  return (
    <TransactionInfoContainer className={className} {...rest}>
      <TransactionInfoHeader
        title="Deposit to Strategy"
        tags={['USER', 'TRIGGER']}
        status={data?.status}
        date={new Date().toISOString()}
      />
      <div className="mt-4 grid grid-cols-6 gap-3 max-lg:grid-cols-1 max-lg:gap-[0.38rem]">
        <TransactionHash value={tx_hash} className="col-span-3" />
        <Status status="success" className="col-span-3" />
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
        <Strategy
          symbols={[
            data?.strategy?.token?.symbol ?? '',
            data?.src_chain_id?.toString() ?? '',
            data?.strategy?.protocol ?? '',
          ]}
          className="col-span-3"
        />
        <Chain value={chainData?.name} className="col-span-3" />
        <Timestamp value={data?.creation_time} className="col-span-3" />
      </div>
    </TransactionInfoContainer>
  )
}
