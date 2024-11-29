import type { Action } from '@api/maat-finance/types'
import { useTokenAsset } from '@hooks/common/useTokenAsset'
import type { ComponentProps } from 'react'
import { formatUnits } from 'viem'

import {
  Chain,
  Status,
  Timestamp,
  TokenInAmount,
  TokenOutAmount,
  TransactionHash,
} from '../LabelValueElements'
import { TransactionInfoHeader } from '../transaction-info-header/TransactionInfoHeader'
import type { Tag } from '../transaction-info-header/TransactionTags'
import { TransactionInfoContainer } from '../TransactionInfoContainer'

interface SwapProperties extends ComponentProps<'div'> {
  data?: Action
  withoutRelated?: boolean
}

export const Swap = (props: SwapProperties) => {
  const { className, data, withoutRelated, ...rest } = props

  const chainData = useTokenAsset(data?.src_chain_id)

  if (!data) {
    return <></>
  }

  const tags: Tag[] = ['System']

  if (!withoutRelated) {
    tags.push('Reaction')
  }

  return (
    <TransactionInfoContainer className={className} {...rest}>
      <TransactionInfoHeader title="Swap" action={data} tags={tags} />
      <div className="grid grid-cols-6 gap-3 max-lg:grid-cols-1 max-lg:gap-[0.38rem]">
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
        <TokenOutAmount
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
        <Chain value={chainData?.name ?? ''} className="col-span-3" />
        <Timestamp value={data?.creation_time} className="col-span-3" />
      </div>
    </TransactionInfoContainer>
  )
}
