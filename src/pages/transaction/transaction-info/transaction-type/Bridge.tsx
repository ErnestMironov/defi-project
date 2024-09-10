import type { Action } from '@api/maat-finance/types'
import { useTokenAsset } from '@hooks/common/useTokenAsset'
import type { ComponentProps } from 'react'
import { formatUnits } from 'viem'

import {
  DestinationChain,
  SourceChain,
  Status,
  Timestamp,
  TokenAmount,
  TransactionHash,
} from '../LabelValueElements'
import { TransactionInfoHeader } from '../transaction-info-header/TransactionInfoHeader'
import { TransactionInfoContainer } from '../TransactionInfoContainer'

interface BridgeProperties extends ComponentProps<'div'> {
  data?: Action
}

export const Bridge = (props: BridgeProperties) => {
  const { className, data, ...rest } = props
  const chainFromData = useTokenAsset(data?.src_chain_id)
  const chainToData = useTokenAsset(data?.dst_chain_id)

  if (!data) {
    return <></>
  }

  return (
    <TransactionInfoContainer className={className} {...rest}>
      <TransactionInfoHeader
        title="Bridge"
        tags={['USER', 'TRIGGER']}
        status={data?.status}
        date={new Date().toISOString()}
      />
      <div className="mt-4 grid grid-cols-6 gap-3 max-lg:grid-cols-1 max-lg:gap-[0.38rem]">
        <TransactionHash value={data?.hash} className="col-span-3" />
        <Status status={data?.status} className="col-span-3" />
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
