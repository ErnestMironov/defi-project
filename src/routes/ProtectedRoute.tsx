import { useAppKit } from '@reown/appkit/react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAccount } from 'wagmi'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isConnected } = useAccount()
  const { open: openConnectModal } = useAppKit()
  const location = useLocation()

  if (!isConnected) {
    openConnectModal({ view: 'Connect' })
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return children
}
