import type { Action } from '@api/maat-finance/types'
import { useTokenAsset } from '@hooks/common/useTokenAsset'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'
import { formatUnits } from 'viem'

import {
  Address,
  Chain,
  Timestamp,
  TokenAmount,
  TransactionHash,
  Vault,
} from '../LabelValueElements'
import { TransactionInfoHeader } from '../transaction-info-header/TransactionInfoHeader'
import type { Tag } from '../transaction-info-header/TransactionTags'
import { TransactionInfoContainer } from '../TransactionInfoContainer'

interface DepositProperties extends ComponentProps<'div'> {
  data?: Action
  withoutRelated?: boolean
}

export const Deposit = (props: DepositProperties) => {
  const { className, data, withoutRelated, ...rest } = props

  const chainData = useTokenAsset(data?.src_chain_id)

  if (!data) {
    return <></>
  }

  const tags: Tag[] = ['User']

  if (!withoutRelated) {
    tags.push('Trigger')
  }

  return (
    <TransactionInfoContainer className={className} {...rest}>
      <TransactionInfoHeader title="Deposit" action={data} tags={tags} />
      <div
        className={cn(
          'grid grid-cols-6 max-lg:grid-cols-1 max-lg:gap-[0.38rem]',
          'border-t border-stroke-100 [&>*:nth-child(odd)]:border-r [&>*:nth-child(odd)]:border-stroke-100 [&>*]:border-b',
        )}
      >
        <TransactionHash
          value={data?.hash}
          className="col-span-3"
          chainId={data?.src_chain_id}
        />
        <Address
          value={data?.txFrom}
          className="col-span-3"
          chainId={data?.src_chain_id}
        />
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
        <Vault value={data?.vault?.token?.symbol ?? ''} className="col-span-3" />
        <Chain value={chainData?.name ?? ''} className="col-span-3" />
        <Timestamp value={data?.creation_time} className="col-span-3" />
      </div>
    </TransactionInfoContainer>
  )
}
