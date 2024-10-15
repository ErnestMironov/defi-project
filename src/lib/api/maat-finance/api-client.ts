import axios from 'axios'

// const BASE_URL = 'https://api.maat.finance'
// const BASE_URL = 'https://dev-api.maat.finance'
const BASE_URL = 'https://dev-api.maat.finance/analytics'

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
