import { Squid } from '@0xsquid/sdk'
import type { Config } from '@0xsquid/sdk/dist/types'
import { useEffect, useState } from 'react'

export const SDK_INTEGRATOR_ID = 'baat-c34ed33a-e43d-4903-8898-a62fcc1113c5'
export const APIPLUS_SQUID_URL = 'https://apiplus.squidrouter.com'

export const useSquidSDKState = () => {
  const [squidState, setSquidState] = useState<Squid | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [initializing, setInitializing] = useState<boolean>(false)

  useEffect(() => {
    const initializeSquid = async () => {
      if (squidState || initializing) {
        setLoading(false)
        return
      }

      setInitializing(true)

      try {
        const config: Config = {
          baseUrl: APIPLUS_SQUID_URL,
          integratorId: SDK_INTEGRATOR_ID,
        }

        const squidInstance = new Squid(config)
        await squidInstance.init()

        console.info('Squid inited')
        setSquidState(squidInstance)
      } catch (error_) {
        setError('Failed to initialize Squid SDK')
        console.error(error_)
      } finally {
        setLoading(false)
        setInitializing(false)
      }
    }

    initializeSquid()
  }, [initializing, squidState])

  return { squid: squidState, loading: loading || initializing, error }
}
