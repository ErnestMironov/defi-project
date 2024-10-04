import type { Action } from '@api/maat-finance/types'
import { useTokenAsset } from '@hooks/common/useTokenAsset'
import type { ComponentProps } from 'react'
import { formatUnits } from 'viem'

import {
  Chain,
  Status,
  Timestamp,
  TokenInAmount,
  TransactionHash,
} from '../LabelValueElements'
import { TransactionInfoHeader } from '../transaction-info-header/TransactionInfoHeader'
import type { Tag } from '../transaction-info-header/TransactionTags'
import { TransactionInfoContainer } from '../TransactionInfoContainer'

interface WithdrawFulfillmentProperties extends ComponentProps<'div'> {
  data?: Action
  withoutRelated?: boolean
}

export const WithdrawFulfillment = (props: WithdrawFulfillmentProperties) => {
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
        title="Withdraw fulfillment"
        tags={tags}
        status={data?.status}
        date={data?.creation_time}
      />
      <div className="mt-4 grid grid-cols-6 gap-3 max-lg:grid-cols-1 max-lg:gap-[0.38rem]">
        <TransactionHash
          value={data?.hash}
          chainId={data?.src_chain_id}
          className="col-span-3"
        />
        <Status status={data?.status} className="col-span-3" />
        <TokenInAmount
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
        <Chain value={chainData?.name} className="col-span-3" />
        <Timestamp value={data?.creation_time} className="col-span-3" />
      </div>
    </TransactionInfoContainer>
  )
}
