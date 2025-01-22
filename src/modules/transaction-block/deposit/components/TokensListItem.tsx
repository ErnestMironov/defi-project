import type { ITokenData } from '@api/tokens-balance/use-tokens-balance'
import Check from '@assets/icons/check.svg'
import { TokenIconComponent } from '@components/token-icon'
import { formatAmountValue, formatTokenBalance } from '@utils/formatValue'

export const TokensListItem = ({
  token,
  onChange,
  selected,
}: {
  token: ITokenData
  onChange: (token: ITokenData) => void
  selected: boolean
}) => {
  console.log('TokensListItem received token:', token)

  if (!token) return null
  return (
    <button
      type="button"
      onClick={() => onChange(token)}
      className="flex w-full cursor-pointer items-center justify-between rounded-xl px-5 py-4 hover:bg-input-active"
    >
      <div className="flex items-center gap-[0.67rem]">
        <TokenIconComponent
          className="size-10 overflow-hidden rounded-full"
          symbol={token.contract_ticker_symbol}
          tokenLogoFallback={token.logo_url}
        />

        <div className="flex flex-col items-start gap-[0.13rem]">
          <p className="text-base/[1.5rem] text-text-1100">
            {formatTokenBalance(
              token?.balance || '0',
              token?.contract_decimals || 0,
              token?.contract_decimals <= 6 ? 2 : 5,
            )}{' '}
            {token?.contract_ticker_symbol?.toUpperCase() || ''}
          </p>

          <div className="flex items-center gap-[0.22rem]">
            <TokenIconComponent
              symbol={token?.chain_id}
              className="size-4 overflow-hidden rounded"
            />
            <p className="text-[0.875rem]/[1rem] text-text-2100/60">
              {token?.contract_name || ''}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2">
        <div className="ml-auto flex flex-col items-end gap-[0.12rem]">
          <p className="text-medium text-base text-text-1100">
            <span className="text-text-60">$</span>
            {formatAmountValue(token?.balance_usd || '0', 2)}
          </p>
        </div>
        {selected && <Check className="size-4" />}
      </div>
    </button>
  )
}
