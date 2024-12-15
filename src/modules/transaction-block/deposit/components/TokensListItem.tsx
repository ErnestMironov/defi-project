import Check from '@assets/icons/check.svg'
import { TokenIconComponent } from '@components/token-icon'
import { useTokenAsset } from '@hooks/common/useTokenAsset'
import { formatAmount, formatTokenBalance } from '@utils/formatValue'

import type { TokensListItemProperties } from '../types'

export const TokensListItem = ({
  onChange,
  token,
  selected,
}: TokensListItemProperties) => {
  const chainData = useTokenAsset(token.chain_id)

  return (
    <button
      type="button"
      onClick={() => onChange(token)}
      className="flex w-full cursor-pointer items-center justify-between rounded-xl px-5 py-4 hover:bg-input-active max-lg:items-start"
    >
      <div className="flex items-center gap-[0.67rem]">
        <TokenIconComponent
          symbol={token.contract_ticker_symbol}
          tokenLogoFallback={token.logo_url}
          className="size-[2.66669rem] overflow-hidden rounded-full"
        />

        <div className="flex flex-col items-start gap-[0.13rem] max-lg:items-start max-lg:text-left">
          <p className="text-base/[1.5rem] text-text-1100">
            {formatAmount(formatTokenBalance(token?.balance, token?.contract_decimals), {
              maximumFractionDigits: token.contract_decimals > 6 ? 6 : 2,
            })}{' '}
            {token.contract_ticker_symbol}
          </p>
          <div className="flex items-center gap-[0.22rem]">
            <TokenIconComponent
              symbol={chainData?.name}
              className="size-4 overflow-hidden rounded"
            />
            <p className="text-[0.875rem]/[1rem] text-text-2100/60">{chainData?.name}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2">
        <div className="ml-auto flex flex-col items-end gap-[0.12rem]">
          <p className="text-medium text-base text-text-1100">
            <span className="text-text-270">$</span>
            {token?.balance_usd}
          </p>
        </div>
        {selected && <Check className="size-4" />}
      </div>
    </button>
  )
}
