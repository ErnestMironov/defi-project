import type { Action } from '@api/maat-finance/types'
import { CHAIN_NAMES_BY_ID } from '@constants/chains'
import { useTokenAsset } from '@hooks/common/useTokenAsset'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'
import { formatUnits } from 'viem'

import {
  Chain,
  Strategy,
  Timestamp,
  TokenAmount,
  TransactionHash,
} from '../LabelValueElements'
import { TransactionInfoHeader } from '../transaction-info-header/TransactionInfoHeader'
import type { Tag } from '../transaction-info-header/TransactionTags'
import { TransactionInfoContainer } from '../TransactionInfoContainer'

interface WithdrawFromStrategyProperties extends ComponentProps<'div'> {
  data?: Action
  withoutRelated?: boolean
}

export const WithdrawFromStrategy = (props: WithdrawFromStrategyProperties) => {
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
      <TransactionInfoHeader title="Withdraw from Strategy" tags={tags} action={data} />
      <div
        className={cn(
          'grid grid-cols-6 max-lg:grid-cols-2',
          'border-t border-stroke-100 [&>*:nth-child(odd)]:border-r [&>*:nth-child(odd)]:border-stroke-100 [&>*]:border-b',
        )}
      >
        <TransactionHash
          value={data?.hash}
          chainId={data?.src_chain_id}
          className="col-span-3"
        />
        <div className="col-span-3 bg-[url('/src/assets/icons/dashes.svg')] bg-cover bg-center max-lg:hidden" />
        <TokenAmount
          value={formatUnits(
            BigInt(data?.amount ?? 0),
            data?.strategy?.token?.decimals ?? 6,
          )}
          symbol={data?.strategy?.token?.symbol ?? ''}
          usdValue={formatUnits(
            BigInt(data?.amount ?? 0),
            data?.strategy?.token?.decimals ?? 6,
          )}
          className="max-lg:order-last lg:col-span-3"
        />
        <Strategy
          symbols={[
            data?.strategy?.token?.symbol,
            CHAIN_NAMES_BY_ID[data.strategy.chain_id as keyof typeof CHAIN_NAMES_BY_ID],
            data.strategy.protocol,
          ]}
          className="col-span-2 lg:col-span-3"
        />
        <Chain value={chainData?.name ?? ''} className="col-span-3" />
        <Timestamp value={data?.creation_time} className="lg:col-span-3" />
      </div>
    </TransactionInfoContainer>
  )
}
