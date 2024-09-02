import type { ComponentProps } from 'react'
import { useParams } from 'react-router-dom'

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

interface WithdrawRequestProperties extends ComponentProps<'div'> {}

export const WithdrawRequest = (props: WithdrawRequestProperties) => {
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
        <TransactionHash value={txHash} className="col-span-2" />
        <Address value={txHash} className="col-span-2" />
        <Status status="success" className="col-span-2" />
        <TokenAmount
          value="20000"
          symbol="USDC"
          usdValue="20000"
          className="col-span-3"
        />
        <Vault value="USDC" className="col-span-3" />
        <Chain value="Ethereum" className="col-span-3" />
        <Timestamp value={new Date().toISOString()} className="col-span-3" />
      </div>
    </TransactionInfoContainer>
  )
}
