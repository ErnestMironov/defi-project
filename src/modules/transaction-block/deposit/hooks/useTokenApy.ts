import { useMaatTokensApy } from '@api/queries/useMaatTokensApy'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'

export const useTokenApy = () => {
  const [time] = useState(dayjs().subtract(1, 'month').valueOf())
  const { data, loading } = useMaatTokensApy({ from: time })
  const { usdcApy, usdtApy } = useMemo(() => {
    if (!data) return { usdcApy: 0, usdtApy: 0 }
    const _usdcApy = data?.at(-1)?.uv?.toFixed(2)
    const _usdtApy = data?.at(-1)?.pv?.toFixed(2)
    return { usdcApy: _usdcApy, usdtApy: _usdtApy }
  }, [data])

  return { usdcApy, usdtApy, loading }
}
