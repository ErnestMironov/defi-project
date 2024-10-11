import { useProtocolMetrics } from '@api/queries/useProtocolMetrics'
import { useStrategies } from '@api/queries/useStrategies'
import usdc from '@assets/images/usdc-3d.png'
import usdt from '@assets/images/usdt-3d.png'
import { ShadowBoxWithValue } from '@components/box/ShadowBoxWithValue'
import { Skeleton } from '@components/ui/skeleton'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { TVLDisplay } from '@modules/transaction-block/components/TVLDisplay'
import { useTxStore } from '@modules/transaction-block/store/useTxStore'
import { TransactionBlock } from '@modules/transaction-block/TransactionBlock'
import { formatAmount } from '@utils/formatValue'
import { useEffect, useMemo, useRef } from 'react'

export const Deposit = () => {
  const { isLoading: isProtocolMetricsLoading, data: protocolMetrics } =
    useProtocolMetrics({})

  const { isLoading: isStrategiesLoading, data: strategies } = useStrategies({
    size: 100,
  })

  const { isBelowDesktop } = useDeviceWidth()

  const usdcApy = protocolMetrics?.history?.USDC?.apy
  const usdtApy = protocolMetrics?.history?.USDT?.apy

  const bestUSDCAPy = useMemo(() => {
    const USDCStrategies = strategies?.items.filter(
      (strategy) => strategy.token.symbol.toUpperCase() === 'USDC',
    )
    return Math.max(
      ...(USDCStrategies?.map(
        (strategy) =>
          +formatAmount(strategy.apy, {
            maximumFractionDigits: 2,
          }),
      ) ?? []),
    )
  }, [strategies?.items])

  const bestUSDTAPy = useMemo(() => {
    const USDCStrategies = strategies?.items.filter(
      (strategy) => strategy.token.symbol.toUpperCase() === 'USDT',
    )
    return Math.max(
      ...(USDCStrategies?.map(
        (strategy) =>
          +formatAmount(strategy.apy, {
            maximumFractionDigits: 2,
          }),
      ) ?? [0]),
    )
  }, [strategies?.items])

  const { setVault } = useTxStore()
  const vaultSet = useRef(false)
  useEffect(() => {
    if (!vaultSet.current && !isProtocolMetricsLoading) {
      if (usdcApy !== undefined && usdtApy !== undefined) {
        if (Number(usdcApy) > Number(usdtApy)) {
          setVault('USDC')
        } else if (Number(usdtApy) > Number(usdcApy)) {
          setVault('USDT')
        }
      } else if (usdcApy === undefined) {
        setVault('USDT')
      } else if (usdtApy === undefined) {
        setVault('USDC')
      } else {
        setVault('USDT')
      }
      vaultSet.current = true
    }
  }, [usdcApy, usdtApy, setVault, isProtocolMetricsLoading])

  return (
    <div className="flex w-full justify-center">
      <div className="pointer-events-auto mt-10 flex w-[38.75rem] flex-col gap-6 max-lg:mt-8 max-lg:gap-4">
        {isBelowDesktop && <TVLDisplay />}

        <div className="grid grid-cols-2 gap-3">
          {isStrategiesLoading ? (
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
                label="Up to"
                value={`${Math.trunc(bestUSDCAPy ?? 0)}% APY`}
              >
                <img
                  src={usdc}
                  alt="usdc"
                  className="animate-oscillate-smooth absolute -bottom-8 -right-4 size-32 brightness-[1.2] max-lg:size-[5.86rem]"
                />
              </ShadowBoxWithValue>
              <ShadowBoxWithValue
                label="Up to"
                value={`${Math.trunc(bestUSDTAPy ?? 0)}% APY`}
              >
                <img
                  src={usdt}
                  alt="usdt"
                  className="animate-oscillate-smooth absolute -bottom-8 -right-4 size-32 brightness-[1.2] max-lg:size-[5.86rem]"
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
