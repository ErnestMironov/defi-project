import { TransactionTags } from '@pages/transaction/TransactionTags'
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
import { TransactionInfoContainer } from '../TransactionInfoContainer'

interface BridgeProperties extends ComponentProps<'div'> {}

export const Bridge = (props: BridgeProperties) => {
  const { className, ...rest } = props
  const { txHash } = useParams()
  return (
    <TransactionInfoContainer className={className} {...rest}>
      <div className="flex w-full items-center justify-between">
        <h3 className="text-[1.5625rem]/[1.875rem]">Bridge</h3>
        <TransactionTags tags={['USER', 'TRIGGER']} />
      </div>
      <div className="mt-4 grid grid-cols-6 gap-3">
        <TransactionHash value={txHash} className="col-span-3" />
        <Status value="Success" className="col-span-3" />
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
