import { FeeType } from '@0xsquid/sdk/dist/types'
import { ESTIMATED_TIME_OF_CONFIRMATION } from '@constants/chains'
import type { LiFiStep } from '@lifi/sdk'

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
  total: ValueAndUsd
  estimatedTime: string
}

export function getSummaryAndFees(route: LiFiStep | undefined) {
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
  const total = { ...defaultValue }
  const convertFrom = { ...defaultValue }
  const minReceive = { ...defaultValue }
  const exchangeRate = ''

  const estimatedTime = `${ESTIMATED_TIME_OF_CONFIRMATION} sec`

  return {
    crossChainFee,
    expectedGasRefund,
    exchangeRate,
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

function configureEstimatedTime(route: LiFiStep, summaryAndFees: SummaryAndFees) {
  const estimatedTime = getEstimatedTime(
    Number(route?.estimate?.executionDuration) + ESTIMATED_TIME_OF_CONFIRMATION,
  )

  summaryAndFees.estimatedTime = estimatedTime
}

function configureSummary(route: LiFiStep, summaryAndFees: SummaryAndFees) {
  const { convertFrom, minReceive } = summaryAndFees

  convertFrom.value = composeWithDecimalsAndSymbol(
    route.action.fromAmount,
    route.action.fromToken.decimals,
    route.action.fromToken.symbol,
  )
  convertFrom.usd = route.estimate.fromAmountUSD || '0'

  const firstStep = route.includedSteps?.[0]

  minReceive.value = composeWithDecimalsAndSymbol(
    firstStep?.estimate?.toAmountMin || '0',
    route.action.toToken.decimals,
    route.action.toToken.symbol,
  )

  const toAmount =
    Number(firstStep?.estimate?.toAmountMin || 0) / 10 ** route.action.toToken.decimals
  const toAmountUSD = (toAmount * Number(route.action.toToken.priceUSD)).toFixed(4)
  minReceive.usd = toAmountUSD

  if (route.action.fromToken.symbol === route.action.toToken.symbol) {
    summaryAndFees.exchangeRate = `1 ${route.action.fromToken.symbol} = 1 ${route.action.toToken.symbol}`
    return
  }

  const fromTokenPrice = Number(route.action.fromToken.priceUSD)
  const toTokenPrice = Number(route.action.toToken.priceUSD)
  const exchangeRate = fromTokenPrice / toTokenPrice

  summaryAndFees.exchangeRate = `1 ${
    route.action.fromToken.symbol
  } = ${exchangeRate.toFixed(6)} ${route.action.toToken.symbol}`
}

function configureFeeBreakdown(route: LiFiStep, summaryAndFees: SummaryAndFees) {
  const { crossChainFee, total, expectedGasRefund } = summaryAndFees

  const { sumFeeNative, sumFeeUsd, symbol } = configureFees(route, crossChainFee)

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

function configureFees(route: LiFiStep, crossChainFee: ValueAndUsd) {
  let sumFeeNative = 0
  let sumFeeUsd = 0
  let symbol: string | undefined

  for (const fee of route?.estimate?.feeCosts || []) {
    sumFeeNative += +fee.amount / 10 ** fee.token.decimals
    sumFeeUsd += +fee.amountUSD

    if (fee.name === FeeType.GAS_RECEIVER_FEE) {
      crossChainFee.value = composeWithDecimalsAndSymbol(
        fee.amount,
        fee.token.decimals,
        fee.token.symbol,
      )

      crossChainFee.usd = fee.amountUSD
    }

    symbol = fee.token.symbol
  }

  return { sumFeeNative, sumFeeUsd, symbol }
}

function composeWithDecimalsAndSymbol(value: string, decimals: number, symbol: string) {
  const valueWithDecimals = +value / 10 ** decimals

  return `${valueWithDecimals.toString().slice(0, valueCharNumber)} ${symbol}`
}
