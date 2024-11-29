import DepositIconActive from '@assets/icons/deposit-icon-active.svg'
import DepositIconInactive from '@assets/icons/deposit-icon-inactive.svg'
import WithdrawIconActive from '@assets/icons/withdraw-icon-active.svg'
import WithdrawIconInactive from '@assets/icons/withdraw-icon-inactive.svg'
import { TX_TYPE } from '@constants/txTypes'
import { motion } from 'framer-motion'
import { type FC, useCallback, useEffect, useRef, useState } from 'react'

import { TabContent } from './components/TabContent'
import { useTxStore } from './store/useTxStore'

const TABS = [
  {
    value: TX_TYPE.DEPOSIT,
    label: 'Deposit',
    icon: (isActive: boolean) =>
      isActive ? <DepositIconActive /> : <DepositIconInactive />,
  },
  {
    value: TX_TYPE.WITHDRAW,
    label: 'Withdraw',
    icon: (isActive: boolean) =>
      isActive ? <WithdrawIconActive /> : <WithdrawIconInactive />,
  },
]

export const TxTypeSwitcher: FC = () => {
  const { txType, setTxType } = useTxStore()
  const [metrics, setMetrics] = useState({ width: 0, left: 0 })
  const tabsReference = useRef<(HTMLButtonElement | null)[]>([])

  const updateTabMetrics = useCallback(() => {
    const activeTab = tabsReference.current[TABS.findIndex((tab) => tab.value === txType)]
    if (activeTab) {
      setMetrics({
        width: activeTab.offsetWidth,
        left: activeTab.offsetLeft,
      })
    }
  }, [txType])

  useEffect(() => {
    updateTabMetrics()
    const timers = [100, 150, 300].map((delay) => setTimeout(updateTabMetrics, delay))
    return () => timers.forEach(clearTimeout)
  }, [updateTabMetrics])

  useEffect(() => {
    window.addEventListener('resize', updateTabMetrics)
    return () => window.removeEventListener('resize', updateTabMetrics)
  }, [updateTabMetrics])

  return (
    <div className="relative rounded-xl border border-stroke-100 bg-cards-widget p-1 shadow-test">
      <div className="relative flex p-0">
        {TABS.map((tab, index) => (
          <button
            key={tab.value}
            type="button"
            ref={(el) => (tabsReference.current[index] = el)}
            onClick={() => setTxType(tab.value)}
            className="relative z-10 flex items-center px-4 py-3 text-[0.875rem] font-medium leading-none text-white transition-colors"
          >
            <TabContent
              icon={tab.icon}
              label={tab.label}
              isActive={txType === tab.value}
            />
          </button>
        ))}
        <motion.div
          className="absolute left-0 top-0 h-full rounded-lg bg-[#6160FF]"
          animate={{
            width: metrics.width,
            x: metrics.left,
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 30,
          }}
        />
      </div>
    </div>
  )
}
