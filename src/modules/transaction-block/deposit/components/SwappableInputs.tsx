import SwitchIcon from '@assets/icons/switch.svg'
import { AmountInput } from '@components/amount-input/AmountInput'
import { ShadowBox } from '@components/box/ShadowBox'
import { cn } from '@utils/cn'
import { formatTokenBalance } from '@utils/formatValue'

import DollarInput from '../../components/DollarInput'
import { useInputsMode } from '../hooks/useInputsMode'

interface Asset {
  balance: string | bigint
  contract_decimals: number
  contract_ticker_symbol: string
}

interface SwappableInputsProperties {
  /** Value in tokens */
  tokenValue: string
  /** Value in USD */
  usdValue: string
  /** Callback when token value changes */
  onTokenValueChange: (value: string) => void
  /** Callback when USD value changes */
  onUsdValueChange: (value: string) => void
  /** Error message */
  error?: string
  /** Asset details */
  asset?: Asset
  /** Callback when Max button is clicked */
  onMaxClick?: () => void
  /** Element to display on the right side */
  rightElement?: React.ReactNode
  /** Token label */
  tokenLabel?: string
}

const DECIMALS = 18

export const SwappableInputs = ({
  tokenValue,
  usdValue,
  onTokenValueChange,
  onUsdValueChange,
  error,
  asset,
  onMaxClick,
  rightElement,
  tokenLabel,
}: SwappableInputsProperties) => {
  const { isSwapped, setIsSwapped } = useInputsMode()

  // Early return if no asset is selected
  if (!asset) {
    return (
      <div className="flex items-center justify-between gap-2">
        <p className="text-[1.5rem] font-medium leading-[3.25rem] tracking-[-0.015rem] text-text-20 max-lg:text-[1rem]">
          Select the desired asset
        </p>
        {rightElement}
      </div>
    )
  }

  // Render primary input based on swap state
  const primaryInput = isSwapped ? (
    <DollarInput
      value={usdValue}
      onValueChange={onUsdValueChange}
      error={!!error}
      inputClassName="text-[2.625rem] max-lg:text-[2.25rem]"
    />
  ) : (
    <AmountInput
      value={tokenValue}
      error={error}
      decimals={DECIMALS}
      onChange={onTokenValueChange}
    />
  )

  // Render secondary input based on swap state
  const secondaryInput = isSwapped ? (
    <AmountInput
      value={tokenValue}
      error={error}
      decimals={DECIMALS}
      className="text-[1rem] max-lg:text-[0.8125rem]"
      wrapperClassName="!min-h-0 !h-[1.5rem]"
      onChange={onTokenValueChange}
      after={tokenLabel || asset.contract_ticker_symbol}
    />
  ) : (
    <DollarInput
      value={usdValue}
      onValueChange={onUsdValueChange}
      error={!!error}
      inputClassName="text-[1rem] max-lg:text-[0.8125rem]"
    />
  )

  // Render balance information
  const balanceInfo = (
    <div className="flex items-center gap-1">
      <p
        className={cn('flex items-center gap-[.19rem]', error && '[&>span]:text-red-100')}
      >
        <span className="ml-2 mr-[.19rem] text-text-2100">
          {formatTokenBalance(asset.balance, asset.contract_decimals)}
        </span>
        <span className="text-text-260">
          {tokenLabel || asset.contract_ticker_symbol}
        </span>
      </p>
      <ShadowBox
        className="cursor-pointer select-none rounded-md border border-stroke-100 bg-white px-[0.56rem] text-[0.875rem] font-medium leading-[1.5625rem] text-text-2100 dark:bg-[#2D2D36]"
        onClick={onMaxClick}
      >
        Max
      </ShadowBox>
    </div>
  )

  return (
    <div className="flex flex-col gap-3">
      {/* Primary input with right element */}
      <div className="flex h-12 items-center justify-between gap-2">
        <div className="min-w-0 flex-1">{primaryInput}</div>
        {rightElement}
      </div>

      {/* Secondary input with balance info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsSwapped(!isSwapped)}
            className="flex size-6 min-w-6 items-center justify-center rounded border border-stroke-100 bg-[#FFF] [box-shadow:0px_2px_1px_0px_rgba(214,_200,_255,_0.22)] dark:bg-[#2D2D36] dark:shadow-none"
          >
            <SwitchIcon className="size-3.5" />
          </button>
          {secondaryInput}
        </div>
        {balanceInfo}
      </div>
    </div>
  )
}
