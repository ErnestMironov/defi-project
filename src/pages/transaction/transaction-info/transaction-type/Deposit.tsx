import type { Action } from '@api/maat-finance/types'
import { useTokenAsset } from '@hooks/common/useTokenAsset'
import type { ComponentProps } from 'react'
import { useParams } from 'react-router-dom'
import { formatUnits } from 'viem'

import {
  Address,
  Chain,
  Status,
  Timestamp,
  TokenAmount,
  TransactionHash,
  Vault,
} from '../LabelValueElements'
import { TransactionInfoHeader } from '../transaction-info-header/TransactionInfoHeader'
import { TransactionInfoContainer } from '../TransactionInfoContainer'

interface DepositProperties extends ComponentProps<'div'> {
  data?: Action
}

export const Deposit = (props: DepositProperties) => {
  const { className, data, ...rest } = props
  const { tx_hash } = useParams()

  const chainData = useTokenAsset(data?.src_chain_id)

  return (
    <TransactionInfoContainer className={className} {...rest}>
      <TransactionInfoHeader
        title="Deposit"
        tags={['USER', 'TRIGGER']}
        status="failed"
        date={data?.creation_time ?? ''}
      />
      <div className="mt-4 grid grid-cols-6 gap-3 max-lg:grid-cols-1 max-lg:gap-[0.38rem]">
        <TransactionHash value={tx_hash} className="col-span-2" />
        <Address value={tx_hash} className="col-span-2" />
        <Status status="in progress" className="col-span-2" />
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
