import type { AxiosAdapter, AxiosRequestConfig, AxiosResponse } from 'axios'

import { MOCK_LATENCY_MS } from '@configs/mocks'

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const jsonResponse = <T>(config: AxiosRequestConfig, data: T, status = 200): AxiosResponse<T> => ({
  data,
  status,
  statusText: 'OK',
  headers: {},
  config,
})

const normalizeUrl = (config: AxiosRequestConfig) => {
  const url = config.url ?? ''
  return url.replace(/^\//, '')
}

const mockToken = {
  address: '0xA0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  chainId: 42161,
  symbol: 'USDC',
  name: 'USD Coin',
  decimals: 6,
  priceUSD: '1',
  logoURI: '',
}

const mockQuote = {
  id: 'mock-quote',
  type: 'swap',
  tool: 'mock',
  action: {
    fromChainId: 1,
    toChainId: 42161,
    fromToken: mockToken,
    toToken: mockToken,
    fromAmount: '1000000',
    toAmount: '990000',
    slippage: 0.003,
    fromAddress: '0x5555555555555555555555555555555555555555',
    toAddress: '0x6666666666666666666666666666666666666666',
  },
  estimate: {
    fromAmount: '1000000',
    toAmount: '990000',
    toAmountMin: '985000',
    gasCosts: [
      {
        amount: '2000000000000000',
        amountUSD: '2',
        token: mockToken,
      },
    ],
  },
  includedSteps: [],
  transactionRequest: {
    data: '0x',
    to: '0x1111111111111111111111111111111111111111',
    value: '0',
    from: '0x5555555555555555555555555555555555555555',
  },
}

export const createLifiMockAdapter = (): AxiosAdapter => {
  return async (config) => {
    const url = normalizeUrl(config)

    if (MOCK_LATENCY_MS > 0) {
      await sleep(MOCK_LATENCY_MS)
    }

    if (url === 'tokens') {
      return jsonResponse(config, {
        tokens: {
          42161: [mockToken],
          1: [mockToken],
          137: [mockToken],
        },
      })
    }

    if (url === 'status') {
      return jsonResponse(config, {
        status: 'DONE',
        substatus: 'COMPLETED',
      })
    }

    if (url === 'quote/contractCalls') {
      return jsonResponse(config, mockQuote)
    }

    return jsonResponse(config, {})
  }
}
