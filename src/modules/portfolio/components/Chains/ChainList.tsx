import type { ITokenData } from '@api/tokens-balance/use-tokens-balance'
import ArrowDown from '@assets/icons/arrow-down.svg'
import { TokenIconComponent } from '@components/token-icon'
import { CHAIN_NAMES_BY_ID } from '@constants/chains'
import { cn } from '@utils/cn'
import { formatTokenBalance, formatUsdValue } from '@utils/formatValue'
import type { ComponentProps } from 'react'
import { useState } from 'react'

import { YieldPotential } from '../YieldPotential'
import { YieldPotentialMobile } from '../YieldPotentialMobile'

interface ChainsListProperties extends ComponentProps<'div'> {
  tokens: ITokenData[]
  potentialUsdProfit: string
  className?: string
}

const ChainItem = ({
  chainId,
  totalUsdValue,
  tokens,
}: {
  chainId: number
  totalUsdValue: number
  tokens: ITokenData[]
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const chainName = CHAIN_NAMES_BY_ID[chainId as keyof typeof CHAIN_NAMES_BY_ID]
  return (
    <div
      className={cn(
        'relative rounded-xl py-4 hover:bg-[#8585A914]',
        isOpen
          ? 'border bg-[rgba(133, 133, 169, 0.03)] border-stroke-100 hover:bg-transparent max-md:text-sm '
          : '',
      )}
    >
      <div
        className={cn(
          'flex w-full cursor-pointer items-center justify-between px-6 gap-2 max-md:px-3',
          isOpen ? 'border-b pb-4 border-stroke-100' : '',
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-center gap-5">
          <div className="flex items-center justify-center gap-1">
            <TokenIconComponent
              symbol={chainId}
              className="size-7  max-md:size-6"
              tokenLogoFallback={
                CHAIN_NAMES_BY_ID[chainId as keyof typeof CHAIN_NAMES_BY_ID]
              }
            />
            <span className="font-medium">{chainName}</span>
            <span className={`ml-2 transition-transform ${isOpen ? 'rotate-90' : ''}`}>
              <ArrowDown className="rotate-90" />
            </span>
          </div>
        </div>
        <div className="pr-2 text-right">
          <p className="text-base font-medium  max-md:text-sm">
            {formatUsdValue(totalUsdValue)}
          </p>
        </div>
      </div>
      {isOpen && (
        <div className="left-0 z-10 mx-1 mt-2 w-auto    max-md:px-3  max-md:text-sm">
          {tokens.map((token) => (
            <div
              key={token.contract_ticker_symbol}
              className="flex select-none items-center justify-between rounded-lg px-6 py-4 hover:bg-[#8585A90D]"
            >
              <div className="flex items-center">
                <TokenIconComponent
                  symbol={token.contract_ticker_symbol}
                  className="size-12 overflow-hidden rounded-full max-md:size-10"
                  tokenLogoFallback={token.logo_url}
                />

                <div className="ml-2 flex flex-col">
                  <span className="">
                    {formatTokenBalance(token.balance, token.contract_decimals)}{' '}
                    {token.contract_ticker_symbol}
                  </span>
                  <div className="flex  flex-row items-center gap-1">
                    <TokenIconComponent
                      symbol={chainId}
                      className="size-4 rounded-full"
                      tokenLogoFallback={
                        CHAIN_NAMES_BY_ID[chainId as keyof typeof CHAIN_NAMES_BY_ID]
                      }
                    />
                    <span className="text-sm text-text-2100">{chainName}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-base">{formatUsdValue(token.balance_usd)}</p>
                <p className="text-sm " />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export const ChainsList = ({
  tokens,
  potentialUsdProfit,
  className,
}: ChainsListProperties) => {
  const groupedByChain = tokens.reduce(
    (accumulator, token) => {
      const chainId = token.chain_id
      if (accumulator[chainId]) {
        accumulator[chainId].totalUsdValue += Number(token.balance_usd)
      } else {
        accumulator[chainId] = {
          chainId,
          totalUsdValue: Number(token.balance_usd),
          tokens: [],
        }
      }
      accumulator[chainId].tokens.push(token)
      return accumulator
    },
    {} as Record<
      string,
      { chainId: number; totalUsdValue: number; tokens: ITokenData[] }
    >,
  )

  return (
    <>
      <YieldPotential potentialUsdProfit={potentialUsdProfit} className="max-md:hidden" />
      <YieldPotentialMobile
        potentialUsdProfit={potentialUsdProfit}
        className="hidden max-md:flex"
      />
      <div className={cn(`px-1 pb-1`, className)}>
        <div className={cn(' py-4 flex flex-col gap-1 rounded-xl ')}>
          {Object.values(groupedByChain).map(
            ({ chainId, totalUsdValue, tokens: chainTokens }, i) => (
              <ChainItem
                key={i}
                chainId={chainId}
                totalUsdValue={totalUsdValue}
                tokens={chainTokens}
              />
            ),
          )}
        </div>
      </div>
    </>
  )
}
