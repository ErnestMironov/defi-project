import type { ITokenData } from '@api/tokens-balance/use-tokens-balance'
import ArrowDown from '@assets/icons/arrow-down.svg'
import { TokenIconComponent } from '@components/token-icon'
import { CHAIN_NAMES_BY_ID } from '@constants/chains'
import { cn } from '@utils/cn'
import { formatAmount, formatUsdValue } from '@utils/formatValue'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import { formatUnits } from 'viem'

import { YieldPotential } from '../YieldPotential'
import { YieldPotentialMobile } from '../YieldPotentialMobile'
import tokenGroups from './tokenGroups.json'

interface GroupedTokenListWithExceptionsProperties extends ComponentProps<'div'> {
  tokens: ITokenData[]
  potentialUsdProfit: string
  className?: string
}

const GroupedTokenItem = ({
  tokenGroup,
  groupName,
}: {
  tokenGroup: ITokenData[]
  groupName: string
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const totalBalanceUsd = tokenGroup.reduce(
    (sum, token) => sum + Number(token.balance_usd),
    0,
  )
  const totalBalance = tokenGroup.reduce((sum, token) => sum + Number(token.balance), 0)

  const toggleOpen = () => setIsOpen((previous) => !previous)

  const formattedTotalBalance = formatUnits(
    BigInt(totalBalance),
    tokenGroup[0].contract_decimals,
  )

  return (
    <div
      className={cn(
        'relative rounded-xl pt-4 ',
        isOpen
          ? 'border border-stroke-100 pb-1 bg-[#8585A908]'
          : 'hover:bg-[#8585A90D] pb-4 ',
      )}
    >
      <div
        className={cn(
          'flex items-center justify-between px-6 gap-2 cursor-pointer max-md:px-3',
          isOpen && 'border-b border-stroke-100 pb-4',
        )}
        onClick={toggleOpen}
      >
        <div className="flex items-center gap-2">
          <TokenIconComponent
            symbol={tokenGroup[0].contract_ticker_symbol}
            className={cn(
              'rounded-full transition-all duration-300 overflow-hidden',
              isOpen ? 'size-7 max-md:size-[1.5rem]' : 'size-12 max-md:size-[2.5rem]',
            )}
            tokenLogoFallback={tokenGroup[0].logo_url}
          />
          <div>
            <div className="flex items-center gap-1">
              <span className="font-medium text-text-1100">
                {formatAmount(formattedTotalBalance, { notation: 'compact' })} {groupName}
              </span>
              <span className={`transition-transform ${isOpen ? 'rotate-90' : ''}`}>
                <ArrowDown className="size-4 rotate-90" />
              </span>
            </div>
            {!isOpen && (
              <div className="relative flex">
                {Array.from(new Set(tokenGroup.map((token) => token.chain_id)))
                  .slice(0, 4)
                  .map((chainId, index) => (
                    <TokenIconComponent
                      key={chainId}
                      symbol={chainId}
                      className={cn('size-4 overflow-hidden', index !== 0 && '-ml-2')}
                      tokenLogoFallback={tokenGroup[0].logo_url}
                    />
                  ))}
                {new Set(tokenGroup.map((token) => token.chain_id)).size > 4 && (
                  <span className="absolute left-16 size-5 rounded-full">
                    +{new Set(tokenGroup.map((token) => token.chain_id)).size - 4}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="pr-2 text-right">
          <p className="font-medium">
            <span className="text-text-2100">{formatUsdValue(totalBalanceUsd)[0]}</span>
            <span className="text-text-1100">
              {formatUsdValue(totalBalanceUsd).slice(1)}
            </span>
          </p>
        </div>
      </div>

      {isOpen && (
        <div className="mt-1 select-none rounded-lg px-1">
          {tokenGroup.map((token) => (
            <div
              key={token.contract_ticker_symbol}
              className="flex items-center justify-between rounded-xl px-6 py-4 hover:bg-[#8585A90D] max-md:px-3"
            >
              <div className="flex  items-center gap-2">
                <TokenIconComponent
                  symbol={token.contract_ticker_symbol}
                  className="size-12 overflow-hidden rounded-full max-lg:size-10"
                  tokenLogoFallback={token.logo_url}
                />
                <div className="flex flex-col">
                  <span className="">
                    {formatAmount(
                      formatUnits(BigInt(token.balance), token.contract_decimals),
                    )}{' '}
                    {token.contract_ticker_symbol}
                  </span>
                  <span className="flex gap-0.5 text-sm text-text-2100">
                    <TokenIconComponent
                      symbol={token.chain_id}
                      className="size-4 overflow-hidden"
                      tokenLogoFallback={token.logo_url}
                    />
                    {CHAIN_NAMES_BY_ID[token.chain_id as keyof typeof CHAIN_NAMES_BY_ID]}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-base">
                  <span className="text-text-2100">$</span>
                  {formatAmount(token.balance_usd)}
                </p>
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
  potentialUsdProfit,
}: GroupedTokenListWithExceptionsProperties) {
  const groupedTokens = tokens.reduce<Record<string, ITokenData[]>>(
    (accumulator, token) => {
      const tokenGroup = Object.entries(tokenGroups).find(([, symbols]) =>
        symbols.includes(token.contract_ticker_symbol),
      )
      const groupKey = tokenGroup?.[0] || token.contract_ticker_symbol

      if (!accumulator[groupKey]) accumulator[groupKey] = []
      accumulator[groupKey].push(token)
      return accumulator
    },
    {},
  )

  return (
    <>
      <YieldPotential potentialUsdProfit={potentialUsdProfit} className="max-md:hidden" />
      <YieldPotentialMobile
        potentialUsdProfit={potentialUsdProfit}
        className="hidden max-md:flex"
      />
      <div className={cn('px-1 pb-1', className)}>
        <div className="flex flex-col gap-1 rounded-xl py-4 text-base max-md:py-1 max-md:text-sm">
          {Object.entries(groupedTokens).map(([groupName, tokenGroup]) => (
            <GroupedTokenItem
              key={groupName}
              tokenGroup={tokenGroup}
              groupName={groupName}
            />
          ))}
        </div>
      </div>
    </>
  )
}
