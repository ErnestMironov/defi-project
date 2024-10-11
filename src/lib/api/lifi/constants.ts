import axios from 'axios'

export const API_URL = 'https://li.quest/v1/'

export const lifiApiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
