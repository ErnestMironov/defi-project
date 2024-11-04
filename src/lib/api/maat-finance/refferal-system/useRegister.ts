import { useMutation } from '@tanstack/react-query'
import type { Address } from 'viem'

import { referralApiClient } from './referral-api-client'

type RegisterData = {
  address: Address
  parent_referral_code: string
  signature: string
}

type ReferralCode = {
  code: string
  is_valid: boolean
}

function registerReferral(data: RegisterData) {
  if (!data.address || !data.parent_referral_code || !data.signature) {
    throw new Error('Invalid data')
  }

  return referralApiClient.post<{
    referral_codes: [ReferralCode, ReferralCode]
  }>('register', data)
}

export const useRegister = () => {
  const mutation = useMutation({
    mutationFn: (data: RegisterData) => registerReferral(data),
  })

  return {
    ...mutation,
    referralCodes: mutation.data?.data.referral_codes,
  }
}
