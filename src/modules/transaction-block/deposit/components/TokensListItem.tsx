import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import { useTokenAsset } from '@hooks/common/useTokenAsset'
import { formatAmount, formatTokenBalance } from '@utils/formatValue'

import type { TokensListItemProperties } from '../types'

export const TokensListItem = ({ onChange, token }: TokensListItemProperties) => {
  const chainData = useTokenAsset(token.chain_id)

  return (
    <button
      type="button"
      onClick={() => onChange(token)}
      className="flex w-full cursor-pointer items-center rounded-xl border border-stroke-100 px-4 py-3 hover:bg-input-default max-lg:items-start"
    >
      <TokenWithNetwork
        symbol={token.contract_ticker_symbol}
        tokenLogoFallback={token.logo_url}
        network={token.chain_id}
        classNames={{
          token: 'rounded-full',
        }}
        position="bottom-right"
        width="2.14288rem"
      />

      <div className="ml-3 flex flex-col items-start max-lg:items-start max-lg:text-left">
        <p className="text-text text-[1.25rem]/[1.75rem] max-lg:max-w-[8.5rem]">
          {token.contract_ticker_symbol}
        </p>
        <p className="text-[0.9375rem]/[1.125rem] text-gray-80">{chainData?.name}</p>
      </div>
      <div className="ml-auto flex flex-col items-end gap-[0.12rem]">
        <p className="text-text text-base">
          {formatAmount(formatTokenBalance(token?.balance, token?.contract_decimals), {
            maximumFractionDigits: token.contract_decimals > 6 ? 6 : 2,
          })}{' '}
          {token.contract_ticker_symbol}
        </p>
        <p className="text-semi-base text-gray-80">{token?.balance_usd}$</p>
      </div>
    </button>
  )
}
