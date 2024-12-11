import type { Action } from '@api/maat-finance/types'
import { useTokenAsset } from '@hooks/common/useTokenAsset'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'
import { formatUnits } from 'viem'

import {
  DestinationChain,
  SourceChain,
  Timestamp,
  TokenAmount,
  TransactionHash,
} from '../LabelValueElements'
import { TransactionInfoHeader } from '../transaction-info-header/TransactionInfoHeader'
import type { Tag } from '../transaction-info-header/TransactionTags'
import { TransactionInfoContainer } from '../TransactionInfoContainer'

interface BridgeProperties extends ComponentProps<'div'> {
  data?: Action
  withoutRelated?: boolean
}

export const Bridge = (props: BridgeProperties) => {
  const { className, data, withoutRelated, ...rest } = props
  const chainFromData = useTokenAsset(data?.src_chain_id)
  const chainToData = useTokenAsset(data?.dst_chain_id)

  if (!data) {
    return <></>
  }

  const tags: Tag[] = ['System']

  if (!withoutRelated) {
    tags.push('Reaction')
  }

  return (
    <TransactionInfoContainer className={className} {...rest}>
      <TransactionInfoHeader action={data} title="Bridge" tags={tags} />
      <div
        className={cn(
          'grid grid-cols-6 max-lg:grid-cols-1 max-lg:gap-[0.38rem]',
          'border-t border-stroke-100 [&>*:nth-child(odd)]:border-r [&>*:nth-child(odd)]:border-stroke-100 [&>*]:border-b',
        )}
      >
        <TransactionHash
          value={data?.hash}
          chainId={data?.src_chain_id}
          className="col-span-3"
        />
        <div className="col-span-3 bg-[url('/src/assets/icons/dashes.svg')] bg-cover bg-center" />
        <SourceChain value={chainFromData?.name} className="col-span-3" />
        <DestinationChain value={chainToData?.name} className="col-span-3" />
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
        <Timestamp value={data?.creation_time} className="col-span-3" />
      </div>
    </TransactionInfoContainer>
  )
}
