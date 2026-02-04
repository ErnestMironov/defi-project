import axios from 'axios'

import { USE_MOCKS } from '@configs/mocks'

import { createLifiMockAdapter } from './mock'

export const API_URL = 'https://li.quest/v1/'

export const lifiApiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  adapter: USE_MOCKS ? createLifiMockAdapter() : undefined,
})
