import type { ITokenData } from '@api/tokens-balance/use-tokens-balance'
import ArrowDown from '@assets/icons/arrow-down.svg'
import { TokenIconComponent } from '@components/token-icon'
import { CHAIN_NAMES_BY_ID } from '@constants/chains'
import { cn } from '@utils/cn'
import { formatUsdValue } from '@utils/formatValue'
import type { ComponentProps } from 'react'
import { useState } from 'react'

interface GroupedTokenListWithExceptionsProperties extends ComponentProps<'div'> {
  tokens: ITokenData[]
  potentialUsdProfit: string
  className?: string
}

const GroupedTokenItemWithExceptions = ({ tokenGroup }: { tokenGroup: ITokenData[] }) => {
  const [isOpen, setIsOpen] = useState(false)
  const mainToken = tokenGroup[0]
  const formatBalance = (balance: string): string => {
    const numericBalance = Number.parseFloat(balance) / 1e6
    return numericBalance.toFixed(3)
  }
  const isUsdcGroup =
    mainToken.contract_ticker_symbol === 'USDC' ||
    mainToken.contract_ticker_symbol === 'USDC.e'
  console.log(tokenGroup)
  const totalBalanceUsd = tokenGroup.reduce(
    (sum, token) => sum + Number(token.balance_usd),
    0,
  )
  const totalBalance = tokenGroup.reduce((sum, token) => sum + Number(token.balance), 0)

  return (
    <div
      className={cn(
        'relative rounded-xl pt-4 pb-4 hover:bg-light-blue-15',
        isOpen ? 'border border-stroke-100 hover:bg-transparent' : '',
      )}
    >
      <div
        className={cn(
          'flex w-full cursor-pointer items-center justify-between px-6 gap-2',
          isOpen ? 'border-b pb-4' : '',
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex  justify-center gap-2">
          <TokenIconComponent
            symbol={mainToken.contract_ticker_symbol}
            className={cn(' rounded-full', isOpen ? 'size-7' : 'size-12')}
          />

          <div>
            <span className="text-base font-medium">
              {formatBalance(totalBalance.toString())} {mainToken.contract_ticker_symbol}
            </span>
            {!isOpen && (
              <div className="relative flex">
                {tokenGroup.map((token, index) => (
                  <TokenIconComponent
                    key={token.chain_id}
                    symbol={token.chain_id}
                    className={cn('absolute size-4 rounded-full', `left-${index * -4}`)}
                  />
                ))}
              </div>
            )}
          </div>
          <span className={`ml-2 transition-transform ${isOpen ? 'rotate-90' : ''}`}>
            <ArrowDown className="rotate-90" />
          </span>
        </div>
        <div className="pr-2 text-right">
          <p className="text-base font-medium">{formatUsdValue(totalBalanceUsd)}</p>
        </div>
      </div>

      {isOpen && (
        <div className="left-0 z-10 mx-1 mt-2 w-auto rounded-lg">
          {tokenGroup.map((token) => (
            <div
              key={token.contract_ticker_symbol}
              className="flex items-center justify-between rounded-xl px-6 py-4 hover:bg-light-blue-15"
            >
              <div className="flex items-center gap-1">
                <TokenIconComponent
                  symbol={token.contract_ticker_symbol}
                  className="size-12 rounded-full"
                />
                <div className="flex flex-col">
                  <span className="">
                    {formatBalance(token.balance.toString())}{' '}
                    {token.contract_ticker_symbol}
                  </span>

                  <span className="flex items-center gap-0.5 text-sm text-text-2100">
                    <TokenIconComponent
                      symbol={token.chain_id}
                      className="size-4 rounded-full"
                    />
                    {CHAIN_NAMES_BY_ID[token.chain_id as keyof typeof CHAIN_NAMES_BY_ID]}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-base">{formatUsdValue(token.balance_usd)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function TokenList({
  tokens,
  className,
}: GroupedTokenListWithExceptionsProperties) {
  const groupedTokens = tokens.reduce(
    (accumulator, token) => {
      const symbol = token.contract_ticker_symbol
      if (symbol === 'USDC' || symbol === 'USDC.e') {
        const key = 'USDC'
        if (!accumulator[key]) {
          accumulator[key] = []
        }
        accumulator[key].push(token)
      } else {
        if (!accumulator[symbol]) {
          accumulator[symbol] = []
        }
        accumulator[symbol].push(token)
      }
      return accumulator
    },
    {} as Record<string, ITokenData[]>,
  )

  return (
    <div className={cn(`px-1 pb-1 ${className}`)}>
      <div className={cn('py-4 flex flex-col gap-4 rounded-xl')}>
        {Object.values(groupedTokens).map((tokenGroup) => (
          <GroupedTokenItemWithExceptions
            key={tokenGroup[0].contract_ticker_symbol}
            tokenGroup={tokenGroup}
          />
        ))}
      </div>
    </div>
  )
}
