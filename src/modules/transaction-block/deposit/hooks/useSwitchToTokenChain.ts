import { useCallback, useState } from 'react'
import { useChainId, useSwitchChain } from 'wagmi'

import type { IDepositWizardHook, STEP_STATUS } from '../interfaces'

interface IProperties extends IDepositWizardHook {
  chainId: string | number
}

export function useSwitchToTokenChain({ chainId, onSuccessHandler }: IProperties) {
  const { switchChain: _switchChain } = useSwitchChain()
  const currentChainId = useChainId()

  const [status, setStatus] = useState<STEP_STATUS>('idle')
  const [error, setError] = useState<string | null>(null)

  const switchChain = useCallback(() => {
    if (currentChainId === chainId) {
      setStatus('success')
      onSuccessHandler?.()
      return
    }

    if (Number.isNaN(Number(chainId))) {
      setStatus('error')
      setError('Invalid chain ID')
      return
    }

    setStatus('pending')
    _switchChain(
      {
        chainId: Number(chainId),
      },
      {
        onSuccess: () => {
          setStatus('success')
          onSuccessHandler?.()
        },
        onError: (err) => {
          // Renamed the inner error variable to err
          setStatus('error')
          setError(err.message)
          console.error(err)
        },
      },
    )
  }, [currentChainId, chainId, _switchChain, onSuccessHandler])

  return {
    switchChain,
    status,
    error,
  }
}
