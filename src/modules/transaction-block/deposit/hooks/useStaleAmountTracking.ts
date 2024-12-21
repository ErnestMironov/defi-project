import { useEffect, useRef, useState } from 'react'

interface UseStaleAmountTrackingParameters {
  isRouteLoading: boolean
  depositTotalAmount: string
  isSwapRequired: boolean
}

/**
 * Hook to track if the amount display needs to be stale while route is updating
 */
export const useStaleAmountTracking = ({
  isRouteLoading,
  depositTotalAmount,
  isSwapRequired,
}: UseStaleAmountTrackingParameters) => {
  const [isAmountStale, setIsAmountStale] = useState(false)
  const previousRouteLoadingReference = useRef(isRouteLoading)
  const previousDepositTotalAmountReference = useRef(depositTotalAmount)

  // Update stale state when route loading starts
  useEffect(() => {
    if (!previousRouteLoadingReference.current && isRouteLoading && isSwapRequired) {
      setIsAmountStale(true)
    }
    previousRouteLoadingReference.current = isRouteLoading
  }, [isRouteLoading, isSwapRequired])

  // Reset stale state when depositTotalAmount updates
  useEffect(() => {
    if (
      isAmountStale &&
      depositTotalAmount !== previousDepositTotalAmountReference.current
    ) {
      setIsAmountStale(false)
    }
    previousDepositTotalAmountReference.current = depositTotalAmount
  }, [depositTotalAmount, isAmountStale])

  return isAmountStale
}
