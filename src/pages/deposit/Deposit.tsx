/* eslint-disable @typescript-eslint/naming-convention */
import { useMaatTokensApy } from '@api/queries/useMaatTokensApy'
import usdc from '@assets/images/usdc-3d.png'
import usdt from '@assets/images/usdt-3d.png'
import { ShadowBoxWithValue } from '@components/box/ShadowBoxWithValue'
import { Skeleton } from '@components/ui/skeleton'
import { TransactionBlock } from '@modules/transaction-block/TransactionBlock'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'

export const Deposit = () => {
  const [time] = useState(dayjs().subtract(1, 'month').valueOf())
  const { data, loading } = useMaatTokensApy({ from: time })
  const { usdcApy, usdtApy } = useMemo(() => {
    const reversedArray = data?.slice().reverse()
    const _usdcApy = reversedArray?.find((token) => token.name === 'USDC')?.uv?.toFixed(2)
    const _usdtApy = reversedArray?.find((token) => token.name === 'USDT')?.pv?.toFixed(2)
    return { usdcApy: _usdcApy, usdtApy: _usdtApy }
  }, [data])

  return (
    <div className="flex w-full justify-center">
      <div className="pointer-events-auto mt-10 flex w-[38.75rem] flex-col gap-6 max-lg:gap-4">
        <div className="grid grid-cols-2 gap-3">
          {loading ? (
            <>
              {Array.from({ length: 2 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-[7.875rem] w-full rounded-3xl max-lg:h-[6.125rem]"
                />
              ))}
            </>
          ) : (
            <>
              <ShadowBoxWithValue
                label="USDС APY"
                value={usdcApy ? `${usdcApy}%` : '0.00%'}
              >
                {/* <Canvas /> */}
                <img
                  src={usdc}
                  alt="usdc"
                  className="absolute bottom-0 right-0 size-32 max-lg:size-[5.86rem]"
                />
              </ShadowBoxWithValue>
              <ShadowBoxWithValue
                label="USDT APY"
                value={usdtApy ? `${usdtApy}%` : '0.00%'}
              >
                <img
                  src={usdt}
                  alt="usdt"
                  className="absolute bottom-0 right-0 size-32 max-lg:size-[5.86rem]"
                />
              </ShadowBoxWithValue>
            </>
          )}
        </div>
        <TransactionBlock />
      </div>
    </div>
  )
}
