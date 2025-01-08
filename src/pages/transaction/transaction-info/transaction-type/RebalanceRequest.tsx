import type { Action } from '@api/maat-finance/types'
import { useTokenAsset } from '@hooks/common/useTokenAsset'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'
import { formatUnits } from 'viem'

import {
  Chain,
  Timestamp,
  TokenAmount,
  TransactionHash,
  Vault,
} from '../LabelValueElements'
import { TransactionInfoHeader } from '../transaction-info-header/TransactionInfoHeader'
import type { Tag } from '../transaction-info-header/TransactionTags'
import { TransactionInfoContainer } from '../TransactionInfoContainer'

interface RebalanceRequestProperties extends ComponentProps<'div'> {
  data?: Action
  withoutRelated?: boolean
}

export const RebalanceRequest = (props: RebalanceRequestProperties) => {
  const { className, data, withoutRelated, ...rest } = props
  const chainData = useTokenAsset(data?.src_chain_id)

  if (!data) {
    return <></>
  }

  const tags: Tag[] = ['Trigger']

  if (!withoutRelated) {
    tags.push('Reaction')
  }

  return (
    <TransactionInfoContainer className={className} {...rest}>
      <TransactionInfoHeader title="Rebalance request" tags={tags} action={data} />
      <div
        className={cn(
          'grid grid-cols-6 max-lg:grid-cols-2',
          'border-t border-stroke-100 [&>*:nth-child(odd)]:border-r [&>*:nth-child(odd)]:border-stroke-100 [&>*]:border-b',
        )}
      >
        <TransactionHash
          value={data?.hash}
          className="col-span-3 max-lg:hidden"
          chainId={data?.src_chain_id}
        />
        <div className="col-span-3 bg-[url('/src/assets/icons/dashes.svg')] bg-cover bg-center max-lg:hidden" />
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
          className="lg:col-span-3"
        />
        <Vault
          value={data?.vault?.token?.symbol ?? ''}
          className="max-lg:order-first lg:col-span-3"
        />
        <Chain value={chainData?.name ?? ''} className="max-lg:hidden lg:col-span-3" />
        <Timestamp
          value={data?.creation_time}
          className="max-lg:col-span-2 lg:col-span-3"
        />
      </div>
    </TransactionInfoContainer>
  )
}
