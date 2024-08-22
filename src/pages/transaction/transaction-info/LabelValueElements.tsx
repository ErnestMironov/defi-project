import Scan from '@assets/icons/scan.svg'
import { CopyButton } from '@components/copy/CopyButton'
import { TokenIconComponent } from '@components/token-icon'
import { formatAmount, formatUsdValue } from '@utils/formatValue'
import { shortenString } from '@utils/transform'
import dayjs from 'dayjs'
import type { ComponentProps } from 'react'

import { LabelValueContainer } from './LabelValueContainer'

interface InfoPairElementsProperties extends ComponentProps<'div'> {
  label?: string
  value?: string
}

export const TxHash = (props: InfoPairElementsProperties) => {
  const { className, label = 'Tx hash', value, ...rest } = props
  return (
    <LabelValueContainer className={className} {...rest}>
      <div>{label}</div>
      <div className="flex items-center gap-2">
        <span className="text-text-90">{shortenString(value ?? '')}</span>
        <Scan />
        <CopyButton text={value ?? ''} />
      </div>
    </LabelValueContainer>
  )
}

export const TransactionHash = (props: InfoPairElementsProperties) => {
  const { label = 'Transaction hash', ...rest } = props
  return <TxHash label={label} {...rest} />
}

export const Address = (props: InfoPairElementsProperties) => {
  return <TxHash {...props} />
}

export const Status = (props: InfoPairElementsProperties) => {
  const { className, label = 'Status', value, ...rest } = props
  return (
    <LabelValueContainer className={className} {...rest}>
      <div>{label}</div>
      <div className="text-semi-base uppercase text-green-100">{value}</div>
    </LabelValueContainer>
  )
}

export const TokenAmount = (
  props: InfoPairElementsProperties & { usdValue: string; symbol: string },
) => {
  const { className, label = 'Token / amount', value, usdValue, symbol, ...rest } = props
  return (
    <LabelValueContainer className={className} {...rest}>
      <div>{label}</div>
      <div className="flex flex-col items-end">
        <div className="flex items-center gap-2 text-text-80">
          <TokenIconComponent symbol={symbol} className="size-5" />
          <span>
            {formatAmount(value ?? '', {
              notation: 'compact',
            })}{' '}
            {symbol}
          </span>
        </div>
        <div className="mt-[0.28rem] text-semi-base text-gray-100">
          {formatUsdValue(usdValue)}
        </div>
      </div>
    </LabelValueContainer>
  )
}

export const TokenInAmount: typeof TokenAmount = (props) => {
  return <TokenAmount {...props} label="Token in / amount" />
}

export const TokenOutAmount: typeof TokenAmount = (props) => {
  return <TokenAmount {...props} label="Token out / amount" />
}

export const Vault = (props: InfoPairElementsProperties) => {
  const { className, label = 'Vault', value, ...rest } = props
  return (
    <LabelValueContainer className={className} {...rest}>
      <div>{label}</div>
      <div className="flex items-center gap-2 text-text-90">
        <TokenIconComponent symbol={value} className="size-5" />
        <span>{value}</span>
      </div>
    </LabelValueContainer>
  )
}

export const Chain = (props: InfoPairElementsProperties) => {
  return <Vault {...props} label="Chain" />
}

export const SourceChain = (props: InfoPairElementsProperties) => {
  return <Chain {...props} label="Source chain" />
}

export const DestinationChain = (props: InfoPairElementsProperties) => {
  return <Chain {...props} label="Destination chain" />
}

export const Timestamp = (props: InfoPairElementsProperties) => {
  const { className, label = 'Timestamp', value, ...rest } = props
  return (
    <LabelValueContainer className={className} {...rest}>
      <div>{label}</div>
      <div>{dayjs(value).format('DD.MM.YYYY HH:mm:ss')}</div>
    </LabelValueContainer>
  )
}

export const Strategy = (props: InfoPairElementsProperties & { symbols: string[] }) => {
  const { className, label = 'Strategy', symbols, ...rest } = props
  return (
    <LabelValueContainer className={className} {...rest}>
      <div>{label}</div>
      <div className="flex items-center gap-2">
        <div className="flex items-center -space-x-2">
          {symbols.map((symbol) => (
            <TokenIconComponent key={symbol} symbol={symbol} className="size-5" />
          ))}
        </div>
        <p className="space-x-1">
          {symbols.map((symbol) => (
            <span key={symbol}>{symbol}</span>
          ))}
        </p>
      </div>
    </LabelValueContainer>
  )
}
