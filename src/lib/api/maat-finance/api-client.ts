import axios from 'axios'

const BASE_URL = 'http://api.maat.finance'

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
