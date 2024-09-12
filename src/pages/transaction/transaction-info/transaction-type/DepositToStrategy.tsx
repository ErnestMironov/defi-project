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
import type { Tag } from '../transaction-info-header/TransactionTags'
import { TransactionInfoContainer } from '../TransactionInfoContainer'

interface DepositToStrategyProperties extends ComponentProps<'div'> {
  data?: Action
  withoutRelated?: boolean
}

export const DepositToStrategy = (props: DepositToStrategyProperties) => {
  const { className, data, withoutRelated, ...rest } = props

  const chainData = useTokenAsset(data?.src_chain_id)

  if (!data) {
    return <></>
  }

  const tags: Tag[] = ['SYSTEM']

  if (!withoutRelated) {
    tags.push('REACTION')
  }

  return (
    <TransactionInfoContainer className={className} {...rest}>
      <TransactionInfoHeader
        title="Deposit to Strategy"
        tags={tags}
        status={data?.status}
        date={data?.creation_time ?? ''}
      />
      <div className="mt-4 grid grid-cols-6 gap-3 max-lg:grid-cols-1 max-lg:gap-[0.38rem]">
        <TransactionHash value={data?.hash} className="col-span-3" />
        <Status status={data?.status} className="col-span-3" />
        <TokenAmount
          value={formatUnits(
            BigInt(data?.amount ?? 0),
            data?.vault?.token?.decimals ?? 6,
          )}
          symbol={data?.strategy?.token?.symbol ?? ''}
          usdValue={formatUnits(
            BigInt(data?.amount ?? 0),
            data?.strategy?.token?.decimals ?? 6,
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
