import type { Action } from '@api/maat-finance/types'
import type { ComponentProps } from 'react'
import { useParams } from 'react-router-dom'

import {
  Chain,
  Status,
  Timestamp,
  TokenInAmount,
  TransactionHash,
} from '../LabelValueElements'
import { TransactionInfoHeader } from '../transaction-info-header/TransactionInfoHeader'
import { TransactionInfoContainer } from '../TransactionInfoContainer'

interface WithdrawFulfillmentProperties extends ComponentProps<'div'> {
  data?: Action
}

export const WithdrawFulfillment = (props: WithdrawFulfillmentProperties) => {
  const { className, ...rest } = props
  const { txHash } = useParams()
  return (
    <TransactionInfoContainer className={className} {...rest}>
      <TransactionInfoHeader
        title="Withdraw request"
        tags={['USER', 'TRIGGER']}
        status="success"
        date={new Date().toISOString()}
      />
      <div className="mt-4 grid grid-cols-6 gap-3 max-lg:grid-cols-1 max-lg:gap-[0.38rem]">
        <TransactionHash value={txHash} className="col-span-3" />
        <Status status="success" className="col-span-3" />
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
