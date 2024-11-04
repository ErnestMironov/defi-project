import { useCallback, useMemo } from 'react'

import { useLocalStorage } from './common/useLocalStorage'

const REFERRAL_CODES_KEY = 'maat-referral-codes'

interface IReferralCode {
  code: string
  is_valid: boolean
}

export const useLocalReferralCodes = () => {
  const [storedCodes, setLocalReferralCodes] = useLocalStorage<IReferralCode[]>(
    REFERRAL_CODES_KEY,
    [],
  )

  const referralCodes = useMemo(() => storedCodes, [storedCodes])

  const setReferralCodes = useCallback(
    (code: IReferralCode | IReferralCode[]) => {
      setLocalReferralCodes((currentCodes) => {
        if (Array.isArray(code)) {
          return code
        }

        if (!currentCodes.some((existingCode) => existingCode.code === code.code)) {
          return [code]
        }

        return currentCodes
      })
    },
    [setLocalReferralCodes],
  )

  const clearReferralCodes = useCallback(() => {
    console.log('clearReferralCodes')
    setLocalReferralCodes([])
  }, [setLocalReferralCodes])

  return {
    referralCodes,
    setReferralCodes,
    clearReferralCodes,
  }
}
