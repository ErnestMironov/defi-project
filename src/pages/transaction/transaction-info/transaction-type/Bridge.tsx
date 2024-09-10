import type { Action } from '@api/maat-finance/types'
import type { ComponentProps } from 'react'
import { useParams } from 'react-router-dom'

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
  const { className, ...rest } = props
  const { txHash } = useParams()
  return (
    <TransactionInfoContainer className={className} {...rest}>
      <TransactionInfoHeader
        title="Bridge"
        tags={['USER', 'TRIGGER']}
        status="success"
        date={new Date().toISOString()}
      />
      <div className="mt-4 grid grid-cols-6 gap-3 max-lg:grid-cols-1 max-lg:gap-[0.38rem]">
        <TransactionHash value={txHash} className="col-span-3" />
        <Status status="success" className="col-span-3" />
        <SourceChain value="Ethereum" className="col-span-3" />
        <DestinationChain value="Arbitrum" className="col-span-3" />
        <TokenAmount
          value="20000"
          symbol="USDC"
          usdValue="20000"
          className="col-span-3"
        />
        <Timestamp value={new Date().toISOString()} className="col-span-3" />
      </div>
    </TransactionInfoContainer>
  )
}
