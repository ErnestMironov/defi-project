import axios from 'axios'

const BASE_URL = 'https://api.maat.finance'

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
