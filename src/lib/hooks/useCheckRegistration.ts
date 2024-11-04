import { useGetMessageToSign } from '@api/maat-finance/refferal-system/useGetMessageToSign'
import { useIsRegistered } from '@api/maat-finance/refferal-system/useIsRegistered'
import { useLocalSignature } from '@hooks/useLocalSignature'
import { ROUTES } from '@routes/routes'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { Address } from 'viem'
import { useAccount } from 'wagmi'

export const useCheckRegistration = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { address, isConnected } = useAccount()
  const { messageToSign } = useGetMessageToSign()
  const { signature, clearSignature } = useLocalSignature()

  const { isRegistered, isLoading, refetch } = useIsRegistered({
    address: address as Address,
    signature: signature || '',
    enabled: !!address && !!signature,
  })

  useEffect(() => {
    if (isLoading) return

    if (signature && address && isRegistered === undefined) {
      refetch()
      return
    }

    if (!isConnected) {
      if (signature && location.pathname !== ROUTES.OTP) {
        clearSignature()
        navigate(ROUTES.OTP)
      }
      return
    }

    if (!messageToSign || !address) {
      return
    }

    if (!signature) {
      if (location.pathname !== ROUTES.OTP) {
        navigate(ROUTES.OTP)
      }
      return
    }

    if (isRegistered && location.pathname === ROUTES.OTP) {
      navigate(ROUTES.DEPOSIT)
    }
  }, [
    isConnected,
    address,
    messageToSign,
    signature,
    isLoading,
    isRegistered,
    navigate,
    clearSignature,
    location.pathname,
    refetch,
  ])

  return {
    isRegistered,
    isLoading,
    signature,
  }
}
