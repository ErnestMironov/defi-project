import { TransactionTags } from '@pages/transaction/TransactionTags'
import type { ComponentProps } from 'react'
import { useParams } from 'react-router-dom'

import {
  Chain,
  Status,
  Timestamp,
  TokenInAmount,
  TransactionHash,
} from '../LabelValueElements'
import { TransactionInfoContainer } from '../TransactionInfoContainer'

interface WithdrawFulfillmentProperties extends ComponentProps<'div'> {}

export const WithdrawFulfillment = (props: WithdrawFulfillmentProperties) => {
  const { className, ...rest } = props
  const { txHash } = useParams()
  return (
    <TransactionInfoContainer className={className} {...rest}>
      <div className="flex w-full items-center justify-between">
        <h3 className="text-[1.5625rem]/[1.875rem]">Withdraw request</h3>
        <TransactionTags tags={['USER', 'TRIGGER']} />
      </div>
      <div className="mt-4 grid grid-cols-6 gap-3">
        <TransactionHash value={txHash} className="col-span-3" />
        <Status value="Success" className="col-span-3" />
        <TokenInAmount
          value="20000"
          symbol="USDC"
          usdValue="20000"
          className="col-span-3"
        />
        <Chain value="Ethereum" className="col-span-3" />
        <Timestamp value={new Date().toISOString()} className="col-span-3" />
      </div>
    </TransactionInfoContainer>
  )
}
