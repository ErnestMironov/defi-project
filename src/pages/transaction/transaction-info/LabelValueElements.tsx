import type { StatusType } from '@api/maat-finance/types'
import { CopyButton } from '@components/copy/CopyButton'
import { IconWithLabelComponent, TokenIconComponent } from '@components/token-icon'
import { STATUS_COLOR } from '@constants/status-color'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { cn } from '@utils/cn'
import { formatAmount, formatUsdValue } from '@utils/formatValue'
import { shortenAddress } from '@utils/transform'
import dayjs from 'dayjs'
import type { ComponentProps } from 'react'

import { LabelValueContainer } from './LabelValueContainer'

interface InfoPairElementsProperties extends ComponentProps<'div'> {
  label?: string
  value?: string
  chainId?: number
  type?: 'tx' | 'address'
}

export const TransactionHash = (props: InfoPairElementsProperties) => {
  const { className, value, label, chainId, type = 'tx', ...rest } = props
  const { isBelowDesktop } = useDeviceWidth()
  return (
    <LabelValueContainer className={className} {...rest}>
      <div>{label || (isBelowDesktop ? 'Tx Hash' : 'Transaction Hash')}</div>
      <div className="flex items-center gap-1">
        <span className="">{shortenAddress(value ?? '')}</span>
        {/* <ScanLink
          chainId={chainId ?? CHAIN_IDS_BY_NAME.Arbitrum}
          txHash={type === 'tx' ? value : undefined}
          address={type === 'address' ? value : undefined}
          className="size-4 shrink-0"
        /> */}
        <CopyButton text={value ?? ''} />
      </div>
    </LabelValueContainer>
  )
}

export const Address = (props: InfoPairElementsProperties) => {
  return <TransactionHash label="Address" {...props} type="address" />
}

export const Status = (props: InfoPairElementsProperties & { status: StatusType }) => {
  const { className, label = 'Status', status, ...rest } = props
  return (
    <LabelValueContainer className={cn(className, 'max-lg:hidden')} {...rest}>
      <div>{label}</div>
      <span
        className="text-semi-base uppercase"
        style={{ color: STATUS_COLOR[status as keyof typeof STATUS_COLOR] }}
      >
        {status}
      </span>
    </LabelValueContainer>
  )
}

export const TokenAmount = (
  props: Omit<InfoPairElementsProperties, 'label'> & {
    usdValue: string
    symbol: string
    tokenLabel?: string
    amountLabel?: string
  },
) => {
  const {
    className,
    value,
    usdValue,
    symbol,
    tokenLabel = 'Token',
    amountLabel = 'Amount',
    ...rest
  } = props
  const { isBelowDesktop } = useDeviceWidth()
  if (isBelowDesktop) {
    return (
      <>
        <LabelValueContainer className={className} {...rest}>
          <div>{tokenLabel}</div>
          <IconWithLabelComponent symbol={symbol} className="[&_svg]:size-4" />
        </LabelValueContainer>
        <LabelValueContainer className={className} {...rest}>
          <div>{amountLabel}</div>
          <div className="flex items-center justify-end gap-[0.38rem] text-sm">
            <p>
              {formatAmount(value ?? '', {
                notation: 'compact',
              })}
            </p>
            <p className="text-gray-100 before:content-['('] after:content-[')']">
              {formatUsdValue(usdValue)}
            </p>
          </div>
        </LabelValueContainer>
      </>
    )
  }
  return (
    <LabelValueContainer className={className} {...rest}>
      <div>
        {tokenLabel} / {amountLabel}
      </div>
      <div className="flex items-center justify-end gap-[0.38rem] text-sm/[1.3rem]">
        <div className="flex items-center gap-[0.38rem]">
          <TokenIconComponent symbol={symbol} className="size-4" />
          <span>
            {formatAmount(value ?? '', {
              notation: 'compact',
            })}{' '}
            {symbol}
          </span>
        </div>
        <div className="text-text-2100 before:content-['('] after:content-[')']">
          {formatUsdValue(usdValue)}
        </div>
      </div>
    </LabelValueContainer>
  )
}

export const TokenInAmount: typeof TokenAmount = (props) => {
  return <TokenAmount {...props} tokenLabel="Token in" amountLabel="Amount in" />
}

export const TokenOutAmount: typeof TokenAmount = (props) => {
  return <TokenAmount {...props} tokenLabel="Token out" amountLabel="Amount out" />
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
  return <Vault {...props} label={props.label ?? 'Chain'} />
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
    <LabelValueContainer className={cn(className, 'max-lg:hidden')} {...rest}>
      <div>{label}</div>
      <div className="flex items-center gap-2">
        {dayjs(value)
          .format('DD.MM.YYYY HH:mm:ss')
          .split(' ')
          .map((part, index) => (
            <span key={part} className={cn(index === 1 && 'text-text-2100')}>
              {part}
            </span>
          ))}
      </div>
    </LabelValueContainer>
  )
}

export const Strategy = (props: InfoPairElementsProperties & { symbols: string[] }) => {
  const { className, label = 'Strategy', symbols, ...rest } = props
  return (
    <LabelValueContainer className={className} {...rest}>
      <div>{label}</div>
      <div className="flex flex-wrap items-center justify-end gap-2">
        <div className="flex items-center -space-x-2">
          {symbols.map((symbol) => (
            <TokenIconComponent key={symbol} symbol={symbol} className="size-5" />
          ))}
        </div>
        <p className="[&_span:not(:last-child)]:after:content-['_/_']">
          {symbols.map((symbol) => (
            <span key={symbol}>{symbol}</span>
          ))}
        </p>
      </div>
    </LabelValueContainer>
  )
}
