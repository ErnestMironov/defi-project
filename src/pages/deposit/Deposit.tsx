import usdc from '@assets/images/usdc-3d.png'
import usdt from '@assets/images/usdt-3d.png'
import BgLines from '@assets/vectors/bg-lines.svg'
import { ShadowBoxWithValue } from '@components/box/ShadowBoxWithValue'
import { Skeleton } from '@components/ui/skeleton'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { useVaultAPY } from '@hooks/useVaultAPY'
import { TVLDisplay } from '@modules/transaction-block/components/TVLDisplay'
import { useTxStore } from '@modules/transaction-block/store/useTxStore'
import { TransactionBlock } from '@modules/transaction-block/TransactionBlock'
import { useEffect, useRef } from 'react'

export const Deposit = () => {
  // useCheckRegistration()

  const { bestUSDCAPy, bestUSDTAPy, isLoading: isStrategiesLoading } = useVaultAPY()
  const { isBelowDesktop } = useDeviceWidth()

  const { setVault } = useTxStore()
  const vaultSet = useRef(false)

  useEffect(() => {
    if (!vaultSet.current && !isStrategiesLoading) {
      if (bestUSDCAPy !== undefined && bestUSDTAPy !== undefined) {
        if (Number(bestUSDCAPy) > Number(bestUSDTAPy)) {
          setVault('USDC')
        } else if (Number(bestUSDTAPy) > Number(bestUSDCAPy)) {
          setVault('USDT')
        }
      } else if (bestUSDCAPy === undefined) {
        setVault('USDT')
      } else if (bestUSDTAPy === undefined) {
        setVault('USDC')
      } else {
        setVault('USDT')
      }
      vaultSet.current = true
    }
  }, [bestUSDCAPy, bestUSDTAPy, setVault, isStrategiesLoading])

  return (
    <div className="flex h-screen w-full flex-col items-center justify-between gap-10 pb-10">
      <BgLines className="fixed inset-0 z-[-1] w-full" />
      <div className="pointer-events-auto mt-10 flex flex-col gap-6 max-lg:mt-8 max-lg:gap-4 lg:w-[38.75rem]">
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
              <ShadowBoxWithValue label="Up to" value={`${Math.trunc(bestUSDCAPy)}%`}>
                <img
                  src={usdc}
                  alt="usdc"
                  className="animate-oscillate-smooth absolute -bottom-8 -right-4 size-32 brightness-[1.2] max-lg:size-[5.86rem]"
                />
              </ShadowBoxWithValue>
              <ShadowBoxWithValue label="Up to" value={`${Math.trunc(bestUSDTAPy)}%`}>
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
      <div className="grid w-full translate-y-full justify-between gap-4 pb-10 max-lg:mt-20 lg:grid-cols-[1fr,2fr,1fr]">
        <div className="" />
        <p className="max-w-full text-center text-xs leading-[120%] text-[#c4c4c4] dark:text-text-50 lg:max-w-[56.25rem]">
          Cryptocurrencies and decentralized finance (DeFi) carry significant risk,
          including market volatility, smart contract vulnerabilities, and potential loss
          of funds. MAAT does not provide financial, legal, or tax advice. Users are
          solely responsible for conducting their own research and understanding the risks
          before interacting with the platform.
        </p>
        <div className="flex gap-2 justify-self-center text-center text-xs leading-[120%] text-[#c4c4c4] dark:text-text-50 lg:max-w-[56.25rem] lg:justify-self-end">
          <a
            href="https://docs.maat.finance/legal/terms-of-service"
            target="_blank"
            rel="noreferrer"
            className="hover:text-main-100"
          >
            Terms
          </a>
          |
          <a
            href="https://docs.maat.finance/legal/privacy-policy"
            target="_blank"
            rel="noreferrer"
            className="hover:text-main-100"
          >
            Policy
          </a>
        </div>
      </div>
    </div>
  )
}
