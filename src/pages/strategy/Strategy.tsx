import { useStrategiesMetrics } from '@api/queries/useStrategiesMetrics'
import {
  SELECT_CHAINS,
  SELECT_INCENTIVES_ACTIONS,
  SELECT_INCENTIVES_FROM,
  SELECT_LAST_EVENT_ACTIONS,
  SELECT_STATUSES,
} from '@constants/select-constant'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { Footer } from '@layouts/footer/Footer'
import { TransactionHistory } from '@modules/transaction-history/TransactionHistory'
import { cn } from '@utils/cn'
import { type ComponentProps, useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { Breadcrumbs } from './Breadcrumbs'
import type { RechartDataType } from './StrategyApyChart'
import { StrategyApyChart } from './StrategyApyChart'
import { StrategyHeader } from './StrategyHeader'
import { StrategyInfoDesktop } from './StrategyInfoDesktop'
import { StrategyInfoMobile } from './StrategyInfoMobile'
import { StrategyTransactions } from './StrategyTransactions'
import { StrategyTvlChart } from './StrategyTvlChart'
import { TokenChartMobile } from './TokenChartMobile'

interface StrategyProperties extends ComponentProps<'div'> {}

export const Strategy = (props: StrategyProperties) => {
  const { isBelowDesktop } = useDeviceWidth()
  if (isBelowDesktop) {
    return <StrategyMobile {...props} />
  }
  return <StrategyDesktop {...props} />
}
export const StrategyDesktop = (props: StrategyProperties) => {
  const { className, ...rest } = props
  const { id } = useParams()
  const { data: apyData } = useStrategiesMetrics({ strategy_id: [String(id)] }, !!id)
  const formattedData: { apy: RechartDataType[]; tvl: RechartDataType[] } =
    useMemo(() => {
      if (!id) return { apy: [], tvl: [] }
      const data = Object.entries(apyData ?? {}).map(([timestamp, strategies]) => {
        const formattedTimestamp =
          Number(timestamp) * (timestamp.length === 10 ? 1000 : 1)
        const apy = strategies[id]?.apy === 0 ? null : strategies[id]?.apy
        const tvl = strategies[id]?.tvl === 0 ? null : strategies[id]?.tvl
        return {
          apy: {
            name: 'APY',
            timestamp: formattedTimestamp,
            value: apy,
          },
          tvl: {
            name: 'TVL',
            timestamp: formattedTimestamp,
            value: tvl,
          },
        }
      })

      return {
        apy: data.map((item) => item.apy),
        tvl: data.map((item) => item.tvl),
      }
    }, [apyData, id])

  return (
    <div className={cn('mt-[4.5rem]', className)} {...rest}>
      <Breadcrumbs />
      <StrategyHeader />
      <StrategyInfoDesktop />
      <div className="mt-[4.62rem] grid grid-cols-2 gap-10 *:h-[18.25rem]">
        <StrategyApyChart data={formattedData.apy} />
        <StrategyTvlChart data={formattedData.tvl} />
      </div>
      <TransactionHistory
        className="mt-[6.25rem]"
        maatFilters={{
          search: { value: '', placeholder: 'Tx Hash' },
          actions_type: {
            items: SELECT_LAST_EVENT_ACTIONS,
            value: [],
            placeholder: 'All Actions',
          },
          status: { items: SELECT_STATUSES, value: [], placeholder: 'All Statuses' },
        }}
        incentivesFilters={{
          search: { value: '', placeholder: 'Tx Hash' },
          actions_type: {
            items: SELECT_INCENTIVES_ACTIONS,
            value: [],
          },
          from: { items: SELECT_INCENTIVES_FROM, value: [] },
          chain: { items: SELECT_CHAINS, value: [], placeholder: 'All Chains' },
        }}
      />
      <Footer className="mt-[7.5rem]" />
    </div>
  )
}

const StrategyMobile = (props: StrategyProperties) => {
  const { className, ...rest } = props

  return (
    <div className={cn('mt-6', className)} {...rest}>
      <StrategyHeader />
      <StrategyInfoMobile />
      <TokenChartMobile />
      <StrategyTransactions />
      <Footer className="mt-[5.5rem]" />
    </div>
  )
}
