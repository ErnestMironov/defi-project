import FingerprintJS from '@fingerprintjs/fingerprintjs'
import axios from 'axios'

import { BASE_URL } from '../api-client'
import { createReferralMockAdapter } from '../mock'
import { USE_MOCKS } from '@configs/mocks'

// Create fingerprint instance
const fpPromise = FingerprintJS.load()

// Create axios instance for referral system
const referralApiClient = axios.create({
  baseURL: `${BASE_URL}/referral`,
  headers: {
    'Content-Type': 'application/json',
  },
  adapter: USE_MOCKS ? createReferralMockAdapter() : undefined,
})

// Add fingerprint to each request
if (!USE_MOCKS) {
  referralApiClient.interceptors.request.use(async (config) => {
    try {
      const fp = await fpPromise
      const result = await fp.get()

      config.headers['X-Fingerprint'] = result.visitorId

      return config
    } catch (error) {
      console.error('Failed to get fingerprint:', error)
      return config
    }
  })
}

export { referralApiClient }
