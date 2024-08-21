import { useCallback, useEffect, useRef, useState } from 'react'
import { useChainId, useSwitchChain } from 'wagmi'

import type { IDepositWizardHook, STEP_STATUS } from '../interfaces'

interface IProperties extends IDepositWizardHook {
  chainId?: string | number
}

export function useSwitchToTokenChain({ chainId, onSuccessHandler }: IProperties) {
  const { switchChain: _switchChain } = useSwitchChain()
  const currentChainId = useChainId()

  const [status, setStatus] = useState<STEP_STATUS>('idle')
  const [error, setError] = useState<string | null>(null)
  const hasCalledSuccessHandler = useRef(false)

  useEffect(() => {
    if (currentChainId === chainId && !hasCalledSuccessHandler.current) {
      setStatus('success')
      onSuccessHandler?.()
      hasCalledSuccessHandler.current = true
    }
  }, [currentChainId, chainId, onSuccessHandler])

  const switchChain = useCallback(() => {
    if (currentChainId === chainId) {
      setStatus('success')
      if (!hasCalledSuccessHandler.current) {
        onSuccessHandler?.()
        hasCalledSuccessHandler.current = true
      }
      return
    }

    if (Number.isNaN(Number(chainId))) {
      setStatus('error')
      setError('Invalid chain ID')
      return
    }
    console.log('status', status)
    setStatus('confirm_in_wallet')
    _switchChain(
      {
        chainId: Number(chainId),
      },
      {
        onSuccess: () => {
          setStatus('success')
          if (!hasCalledSuccessHandler.current) {
            onSuccessHandler?.()
            hasCalledSuccessHandler.current = true
          }
        },
        onError: (err) => {
          setStatus('error')
          setError(err.message)
          console.error(err)
        },
      },
    )
  }, [currentChainId, chainId, status, _switchChain, onSuccessHandler])

  return {
    switchChain,
    status,
    error,
  }
}
