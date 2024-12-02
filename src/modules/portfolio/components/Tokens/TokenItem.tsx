import type { ITokenData } from '@api/tokens-balance/use-tokens-balance'
import { TokenIconComponent } from '@components/token-icon'
import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import { AccordionContent, AccordionTrigger } from '@components/ui/accordion'
import { cn } from '@utils/cn'
import { formatTokenBalance, formatUsdValue } from '@utils/formatValue'

interface TokenItemProperties {
  token: ITokenData
  subTokens?: ITokenData[]
}

export const TokenItem = ({ token, subTokens }: TokenItemProperties) => {
  const networks = subTokens
    ? Array.from(new Set([token.chain_id, ...subTokens.map((t) => t.chain_id)]))
    : [token.chain_id]
  console.log(token)

  const hasMultipleNetworks = networks.length > 1

  const TokenContent = () => (
    <div
      className={cn(
        'flex w-full items-center justify-between rounded-xl bg-cards px-4 py-4',
        'transition-colors duration-200',
        'hover:bg-light-blue-15 ',
      )}
    >
      <div className="flex items-center gap-3">
        <TokenWithNetwork
          symbol={token.contract_ticker_symbol}
          network={token.chain_id}
          tokenLogoFallback={token.logo_url}
          width="2.5rem"
        />
        <div className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-2">
            <span className="text-base font-medium">
              {formatTokenBalance(token.balance, token.contract_decimals)}
            </span>
            <span className="text-base font-medium">{token.contract_ticker_symbol}</span>
          </div>
          {hasMultipleNetworks && (
            <div className="flex items-center gap-1.5">
              {networks.slice(0, 3).map((chainId, i) => (
                <TokenIconComponent
                  key={i}
                  symbol={chainId}
                  className="size-4 rounded-full ring-1 ring-cards"
                />
              ))}
              {networks.length > 3 && (
                <span className="text-xs">+{networks.length - 3}</span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="text-right">
        <p className="text-base font-medium">
          <span className="text-gray-500">$</span>
          {token.balance_usd}
        </p>
      </div>
    </div>
  )
  if (!hasMultipleNetworks) {
    return <TokenContent />
  }

  return (
    <>
      <AccordionTrigger className="w-full hover:no-underline">
        <TokenContent />
      </AccordionTrigger>

      <AccordionContent className="overflow-hidden">
        <div className="ml-12 mt-4 flex flex-col gap-4">
          {subTokens?.map((subToken, i) => (
            <div
              key={i}
              className="bg-cards/50 flex items-center justify-between rounded-xl p-3"
            >
              <div className="flex items-center gap-3">
                <TokenIconComponent
                  symbol={subToken.chain_id}
                  className="size-6 rounded-full"
                />
                <div className="flex items-center gap-2">
                  <span className="text-base">
                    {formatTokenBalance(subToken.balance, subToken.contract_decimals)}
                    {subToken.contract_ticker_symbol}
                  </span>
                  <span className="text-base" />
                </div>
              </div>
              <p className="text-sm font-medium">
                {formatUsdValue(subToken.balance_usd)}
              </p>
            </div>
          ))}
        </div>
      </AccordionContent>
    </>
  )
}
