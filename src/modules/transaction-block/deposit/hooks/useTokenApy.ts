import { useMaatTokensApy } from '@api/queries/useMaatTokensApy'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'

export const useTokenApy = () => {
  const [time] = useState(dayjs().subtract(1, 'month').valueOf())
  const { data, loading } = useMaatTokensApy({ from: time })
  const { usdcApy, usdtApy } = useMemo(() => {
    const reversedArray = data?.slice().reverse()
    const _usdcApy = reversedArray?.find((token) => token.name === 'USDC')?.uv?.toFixed(2)
    const _usdtApy = reversedArray?.find((token) => token.name === 'USDT')?.pv?.toFixed(2)
    return { usdcApy: _usdcApy, usdtApy: _usdtApy }
  }, [data])

  return { usdcApy, usdtApy, loading }
}
