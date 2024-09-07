import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import { cn } from '@utils/cn'
import { formatAmount, parseFloatLocale } from '@utils/formatValue'

interface TokenInfoProperties {
  type: 'input' | 'deposit'
  amount: string
  tokenInfo: {
    symbol?: string
    chain_id?: number | string
  }
  usdAmount?: string
}

export const TokenInfo: React.FC<TokenInfoProperties> = ({
  type,
  amount,
  tokenInfo,
  usdAmount,
}) => {
  const { symbol, chain_id } = tokenInfo

  return (
    <div className="flex w-full flex-col gap-2 text-[1.125rem]">
      <div className="flex w-full items-center justify-between">
        <span>{type === 'input' ? 'You input' : 'You will deposit '} </span>
        <div className="flex items-center gap-2">
          <div
            className={cn('min-w-max rounded-[3rem] px-2 py-1', {
              'bg-red-5 text-red-80': type === 'input',
              'bg-green-15 text-green-100': type === 'deposit',
            })}
          >
            {type === 'input' ? '- ' : '+ '}
            {formatAmount(amount, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <TokenWithNetwork
            symbol={symbol}
            network={chain_id}
            position="bottom-right"
            width="2.14288rem"
          />
          <span>{symbol}</span>
        </div>
      </div>
      <p className="self-end text-base text-gray-100">$ {parseFloatLocale(usdAmount)}</p>
    </div>
  )
}
