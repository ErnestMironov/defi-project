import type { RouteResponse } from '@0xsquid/sdk/dist/types'
import { FeeType } from '@0xsquid/sdk/dist/types'

const overEstimateCoefficient = 1.3
const valueCharNumber = 8

export interface ValueAndUsd {
  value: string
  usd: string
}
export interface SummaryAndFees {
  convertFrom: ValueAndUsd
  minReceive: ValueAndUsd
  exchangeRate: string
  crossChainFee: ValueAndUsd
  expectedGasRefund: ValueAndUsd
  boostFee: ValueAndUsd
  total: ValueAndUsd
  estimatedTime: string
}

export function getSummaryAndFees(route: RouteResponse['route'] | undefined) {
  const summaryAndFees: SummaryAndFees = createDefaultSummaryAndFees()

  if (!route) return summaryAndFees

  configureSummary(route, summaryAndFees)
  configureFeeBreakdown(route, summaryAndFees)
  configureEstimatedTime(route, summaryAndFees)
  return summaryAndFees
}

function createDefaultSummaryAndFees() {
  const defaultValue = {
    value: '0',
    usd: '0',
  }
  const crossChainFee = { ...defaultValue }
  const expectedGasRefund = { ...defaultValue }
  const boostFee = { ...defaultValue }
  const total = { ...defaultValue }
  const convertFrom = { ...defaultValue }
  const minReceive = { ...defaultValue }
  const exchangeRate = ''

  const estimatedTime = '0 sec'

  return {
    crossChainFee,
    expectedGasRefund,
    exchangeRate,
    boostFee,
    total,
    convertFrom,
    minReceive,
    estimatedTime,
  }
}

function getEstimatedTime(estimatedTimeSeconds: number | undefined) {
  if (!estimatedTimeSeconds) return '0 sec'

  if (estimatedTimeSeconds < 60) {
    return `${estimatedTimeSeconds} sec`
  }

  return `${Math.floor(estimatedTimeSeconds / 60)} min`
}

function configureEstimatedTime(
  route: RouteResponse['route'],
  summaryAndFees: SummaryAndFees,
) {
  const estimatedTime = getEstimatedTime(route?.estimate.estimatedRouteDuration)

  summaryAndFees.estimatedTime = estimatedTime
}

function configureSummary(route: RouteResponse['route'], summaryAndFees: SummaryAndFees) {
  const { convertFrom, minReceive } = summaryAndFees

  convertFrom.value = composeWithDecimalsAndSymbol(
    route.estimate.fromAmount,
    route.estimate.fromToken.decimals,
    route.estimate.fromToken.symbol,
  )
  convertFrom.usd = route.estimate.fromAmountUSD || '0'

  minReceive.value = composeWithDecimalsAndSymbol(
    route.estimate.toAmountMin,
    route.estimate.toToken.decimals,
    route.estimate.toToken.symbol,
  )
  minReceive.usd = route.estimate.fromAmountUSD || '0'

  const tokenPrice = route.estimate.exchangeRate.slice(0, valueCharNumber)

  summaryAndFees.exchangeRate = `${1} ${
    route.estimate.fromToken.symbol
  } = ${tokenPrice} ${route.estimate.toToken.symbol}`
}

function configureFeeBreakdown(
  route: RouteResponse['route'],
  summaryAndFees: SummaryAndFees,
) {
  const { crossChainFee, boostFee, total, expectedGasRefund } = summaryAndFees

  const { sumFeeNative, sumFeeUsd, symbol } = configureFees(
    route,
    crossChainFee,
    boostFee,
  )

  const totalValue = sumFeeNative / overEstimateCoefficient

  total.value = symbol
    ? `${totalValue.toString().slice(0, valueCharNumber)} ${symbol}`
    : ''
  total.usd = `${(sumFeeUsd / overEstimateCoefficient).toFixed(2)}`

  expectedGasRefund.value = symbol
    ? `${(sumFeeNative - totalValue).toString().slice(0, valueCharNumber)} ${symbol}`
    : ''
  expectedGasRefund.usd = `${(sumFeeUsd - +total.usd).toFixed(2)}`
}

function configureFees(
  route: RouteResponse['route'],
  crossChainFee: ValueAndUsd,
  boostFee: ValueAndUsd,
) {
  let sumFeeNative = 0
  let sumFeeUsd = 0
  let symbol: string | undefined

  for (const fee of route.estimate.feeCosts) {
    sumFeeNative += +fee.amount / 10 ** fee.token.decimals
    sumFeeUsd += +fee.amountUsd

    if (fee.name === FeeType.GAS_RECEIVER_FEE) {
      crossChainFee.value = composeWithDecimalsAndSymbol(
        fee.amount,
        fee.token.decimals,
        fee.token.symbol,
      )

      crossChainFee.usd = fee.amountUsd
    } else if (fee.name === FeeType.BOOST_FEE) {
      boostFee.value = composeWithDecimalsAndSymbol(
        fee.amount,
        fee.token.decimals,
        fee.token.symbol,
      )

      boostFee.usd = fee.amountUsd
    }

    symbol = fee.token.symbol
  }

  return { sumFeeNative, sumFeeUsd, symbol }
}

function composeWithDecimalsAndSymbol(value: string, decimals: number, symbol: string) {
  const valueWithDecimals = +value / 10 ** decimals

  return `${valueWithDecimals.toString().slice(0, valueCharNumber)} ${symbol}`
}
