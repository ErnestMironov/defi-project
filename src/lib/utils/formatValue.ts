import BigNumber from 'bignumber.js'

export const parseFloatLocale = (value?: string, decimals = 2): string | undefined => {
  if (!value) return
  return Number.parseFloat(value).toLocaleString('en', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

export const formatAmountValue = (
  value?: string | number,
  fractionDigits = 4,
  showLess = true,
): string | undefined => {
  if (String(value) === '0') return '0'
  if (!value) return
  if (value === 'NaN') return '0.00'
  const bigNumberValue = BigNumber(value)
  const formattedAmount = bigNumberValue
    .toFixed(fractionDigits, BigNumber.ROUND_DOWN)
    .replace(/0+$/, '')
    .replace(/\.$/, '')

  const parsedValue = Number.parseFloat(formattedAmount)

  if (parsedValue < 0.1 ** fractionDigits) {
    if (showLess && bigNumberValue.isGreaterThan(0)) {
      return `<${(0.1 ** fractionDigits).toFixed(fractionDigits)}`
    }
    return '0.00'
  }
  if (parsedValue >= 1e9) {
    return `${(parsedValue / 1e9).toFixed(fractionDigits)}B`
  }
  if (parsedValue >= 1e6) {
    return `${(parsedValue / 1e6).toFixed(fractionDigits)}M`
  }
  if (parsedValue >= 1e3) {
    return `${(parsedValue / 1e3).toFixed(fractionDigits)}K`
  }

  return formattedAmount
}

export const abbreviateHealthFactor = (value?: string): string | undefined => {
  if (!value) return ''
  const numberValue = BigNumber(value)
  if (numberValue.isGreaterThanOrEqualTo(1e6)) {
    return '∞'
  }
  if (numberValue.isGreaterThanOrEqualTo(1e3)) {
    return `${numberValue.div(1e3).toFixed(2)}K`
  }
  return numberValue.toFixed(2)
}

export const formatTokenBalance = (
  balance: string | bigint | null,
  decimals: number,
): string => {
  if (balance === null) {
    return '0'
  }

  const balanceString = typeof balance === 'bigint' ? balance.toString() : balance
  const bigBalance = new BigNumber(balanceString).shiftedBy(-decimals)
  let formattedBalance = bigBalance.toFixed(5, BigNumber.ROUND_DOWN)

  formattedBalance = formattedBalance.replace(/\.?0+$/, '')

  return formattedBalance
}

export const formatNumberWithCommas = (value: string | number): string => {
  if (!value) return '0'
  return value.toString().replaceAll(',', '.')
}

/**
 * Trims trailing zeros from the fractional part of a number represented as a string.
 * @param value - The number as a string.
 * @returns The number as a string without trailing zeros in the fractional part.
 */
export function trimTrailingZeros(value: string): string {
  if (!value) return value

  if (value.includes('.') || value.includes(',')) {
    // Remove trailing zeros in the fractional part
    return value.replace(/([,.]\d*?[1-9])0+$/, '$1').replace(/[,.]0*$/, '')
  }
  return value
}

/**
 * Replaces all commas in a string with dots.
 *
 * @param value - The input string in which commas will be replaced with dots.
 * @returns A new string with all commas replaced by dots.
 */
export function replaceCommasWithDots(value: string): string {
  if (!value) return value

  return value.replaceAll(',', '.')
}

export const formatUsdValue = (
  value: string | number,
  options?: Intl.NumberFormatOptions,
) => {
  const parsedValue = Number.parseFloat(value.toString())
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    ...options,
  }).format(parsedValue)
}

export const formatAmount = (
  value: string | number,
  options?: Intl.NumberFormatOptions,
) => {
  const parsedValue = Number.parseFloat(value.toString())
  return new Intl.NumberFormat('en-US', {
    ...options,
  }).format(parsedValue)
}

export const formatPercentValue = (
  value?: string | number,
  options?: Intl.NumberFormatOptions,
) => {
  if (!value) return 'N/A'
  const parsedValue = Number.parseFloat(value.toString())
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    maximumFractionDigits: 2,
    ...options,
  }).format(parsedValue / 100)
}
