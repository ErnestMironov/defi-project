import { Squid } from '@0xsquid/sdk'
import type { Config } from '@0xsquid/sdk/dist/types'
import { useEffect, useState } from 'react'

export const SDK_INTEGRATOR_ID = 'baat-c34ed33a-e43d-4903-8898-a62fcc1113c5'
// export const API_INTEGRATOR_ID = 'halo-497fab89-3145-47b1-8e06-ce2865b1a3ac'

// export const SQUID_API_URL = 'https://v2.api.squidrouter.com'
export const APIPLUS_SQUID_URL = 'https://apiplus.squidrouter.com'

const useSquidSDK = () => {
  const [squid, setSquid] = useState<Squid | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initializeSquid = async () => {
      try {
        // instantiate the SDK
        const config: Config = {
          baseUrl: APIPLUS_SQUID_URL, // for mainnet use "https://api.0xsquid.com"
          integratorId: SDK_INTEGRATOR_ID,
        }

        const squidInstance = new Squid(config)
        await squidInstance.init()

        // init the SDK
        console.info('Squid inited')
        setSquid(squidInstance)
      } catch (error_) {
        setError('Failed to initialize Squid SDK')
        console.error(error_)
      } finally {
        setLoading(false)
      }
    }

    initializeSquid()
  }, [])

  return { squid, loading, error }
}

export default useSquidSDK
