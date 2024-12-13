import BgLines from '@assets/vectors/bg-lines.svg'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { useVaultAPY } from '@hooks/useVaultAPY'
import { TVLDisplay } from '@modules/transaction-block/components/TVLDisplay'
import { useTxStore } from '@modules/transaction-block/store/useTxStore'
import { TransactionBlock } from '@modules/transaction-block/TransactionBlock'
import { useEffect, useRef } from 'react'

export const Deposit = () => {
  // useCheckRegistration()

  const { bestUSDCApy, bestUSDTApy, isLoading: isStrategiesLoading } = useVaultAPY()
  const { isBelowDesktop } = useDeviceWidth()

  const { setVault } = useTxStore()
  const vaultSet = useRef(false)

  useEffect(() => {
    if (!vaultSet.current && !isStrategiesLoading) {
      if (bestUSDCApy !== undefined && bestUSDTApy !== undefined) {
        if (Number(bestUSDCApy) > Number(bestUSDTApy)) {
          setVault('USDC')
        } else if (Number(bestUSDTApy) > Number(bestUSDCApy)) {
          setVault('USDT')
        }
      } else if (bestUSDCApy === undefined) {
        setVault('USDT')
      } else if (bestUSDTApy === undefined) {
        setVault('USDC')
      } else {
        setVault('USDT')
      }
      vaultSet.current = true
    }
  }, [bestUSDCApy, bestUSDTApy, setVault, isStrategiesLoading])

  return (
    <div className="flex h-screen w-full flex-col items-center justify-between gap-10  pb-10">
      <div className="fixed inset-0 z-[-1] w-full bg-bg">
        <BgLines className="w-full" />
      </div>
      <div className="pointer-events-auto mt-10 flex flex-col gap-6 max-lg:mt-8 max-lg:gap-4 lg:w-[38.75rem]">
        {isBelowDesktop && <TVLDisplay />}
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
