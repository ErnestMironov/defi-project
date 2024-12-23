import BigNumber from 'bignumber.js'

type InputType = 'usd' | 'token'

interface UseInputHandlingParameters {
  swapRoute?: { action?: { fromToken?: { priceUSD?: string } } }
  assetRate?: string
  onInputValueChange: (value: string) => void
  onUsdValueChange: (value: string) => void
}

const calculateTokenValue = (usdValue: BigNumber, assetQuote: BigNumber): string => {
  if (
    assetQuote.isZero() ||
    assetQuote.isNaN() ||
    usdValue.isZero() ||
    usdValue.isNaN()
  ) {
    return '0'
  }
  return usdValue.div(assetQuote).toFixed(4)
}

const calculateUSDValue = (tokenValue: BigNumber, assetQuote: BigNumber): string => {
  if (
    assetQuote.isZero() ||
    assetQuote.isNaN() ||
    tokenValue.isZero() ||
    tokenValue.isNaN()
  ) {
    return '0.00'
  }
  return tokenValue.multipliedBy(assetQuote).toFixed(2)
}

/**
 * Hook to handle input value calculations and updates
 */
export const useInputHandling = ({
  swapRoute,
  assetRate,
  onInputValueChange,
  onUsdValueChange,
}: UseInputHandlingParameters) => {
  return (type: InputType, value: string) => {
    if (!value) {
      onInputValueChange('')
      onUsdValueChange('')
      return
    }

    const assetQuoteBN = BigNumber(
      swapRoute?.action?.fromToken?.priceUSD || assetRate || 1,
    )
    const numericValue = BigNumber(value)

    if (type === 'usd') {
      onUsdValueChange(value)
      onInputValueChange(calculateTokenValue(numericValue, assetQuoteBN))
    } else {
      onInputValueChange(value)
      onUsdValueChange(calculateUSDValue(numericValue, assetQuoteBN))
    }
  }
}
