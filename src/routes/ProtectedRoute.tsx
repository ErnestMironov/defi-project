import { useAppKit } from '@reown/appkit/react'
import { Navigate, useLocation } from 'react-router-dom'
import { useActiveAccount } from '@hooks/useActiveAccount'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isConnected } = useActiveAccount()
  const { open: openConnectModal } = useAppKit()
  const location = useLocation()

  if (!isConnected) {
    openConnectModal({ view: 'Connect' })
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return children
}
