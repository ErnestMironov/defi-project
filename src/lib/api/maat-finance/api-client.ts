import axios from 'axios'

import { USE_MOCKS } from '@configs/mocks'

import { createMaatMockAdapter } from './mock'

// const BASE_URL = 'https://api.maat.finance'
export const BASE_URL = 'https://dev-api.maat.finance'
// export const BASE_URL = 'https://api.maat.finance'

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  adapter: USE_MOCKS ? createMaatMockAdapter() : undefined,
})
