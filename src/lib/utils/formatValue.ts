import BigNumber from 'bignumber.js'

export const parseFloatLocale = (value?: string, decimals = 2): string | undefined => {
  if (!value) return
  return Number.parseFloat(value).toLocaleString('ru-RU', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

export const formatAmountValue = (
  value?: string | number,
  fractionDigits = 4,
  showLess = true,
): string | undefined => {
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
    return `${(parsedValue / 1e9).toFixed(2)}B`
  }
  if (parsedValue >= 1e6) {
    return `${(parsedValue / 1e6).toFixed(2)}M`
  }
  if (parsedValue >= 1e3) {
    return `${(parsedValue / 1e3).toFixed(2)}K`
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
