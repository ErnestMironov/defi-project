import { useIsRegistered } from '@api/maat-finance/refferal-system/useIsRegistered'
import { useLocalSignature } from '@hooks/useLocalSignature'
import { useEffect } from 'react'
import type { Address } from 'viem'
import { useActiveAccount } from '@hooks/useActiveAccount'

export const useCheckRegistration = () => {
  const { address, isConnected } = useActiveAccount()
  const { signature, clearSignature } = useLocalSignature()

  const { isRegistered, isLoading, refetch, error } = useIsRegistered({
    address: address as Address,
    signature: signature || '',
    enabled: !!address && !!signature,
  })

  if (error?.response?.data?.detail === 'Invalid signature' && signature) {
    clearSignature()
  }

  useEffect(() => {
    if (isLoading) return

    if (signature && address && isRegistered === undefined) {
      refetch()
      return
    }

    if (!isConnected) {
      if (signature) {
        clearSignature()
      }
      return
    }

  }, [
    isConnected,
    address,
    signature,
    isLoading,
    isRegistered,
    clearSignature,
    refetch,
  ])

  return {
    isRegistered,
    isLoading,
    signature,
  }
}
