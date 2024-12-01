import type { ITokenData } from '@api/tokens-balance/use-tokens-balance'
import { Accordion, AccordionItem } from '@components/ui/accordion'
import { cn } from '@utils/cn'
import { formatUsdValue } from '@utils/formatValue'

import { TokenItem } from './TokenItem'

interface TokensListProperties {
  tokens: ITokenData[]
  potentialUsdProfit?: string
  className?: string
}

export const TokensList = ({
  tokens,
  potentialUsdProfit,
  className,
}: TokensListProperties) => {
  const groupedTokens = tokens.reduce(
    (accumulator, token) => {
      const symbol = token.contract_ticker_symbol
      if (accumulator[symbol]) {
        accumulator[symbol].subTokens.push(token)
      } else {
        accumulator[symbol] = {
          main: token,
          subTokens: [],
        }
      }
      return accumulator
    },
    {} as Record<string, { main: ITokenData; subTokens: ITokenData[] }>,
  )

  return (
    <div className={cn('px-6 pt-2 pb-1', className)}>
      <div className="mt-4">
        <div className="h-auto w-full rounded-xl bg-light-blue-15 px-6 py-3 text-center text-white">
          <span className="text-main-100 opacity-70">Yield Potential</span>{' '}
          <span className="text-main-100">{formatUsdValue(potentialUsdProfit)}/year</span>
        </div>
      </div>

      <Accordion type="single" collapsible className="mt-6">
        {Object.values(groupedTokens).map(({ main, subTokens }, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <TokenItem token={main} subTokens={subTokens} />
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
