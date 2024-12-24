import ActionIcon from '@assets/icons/action.svg'
import ArrowLeft from '@assets/icons/arrow-left.svg'
import StatusIcon from '@assets/icons/status.svg'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import {
  SELECT_INCENTIVES_ACTIONS,
  SELECT_LAST_EVENT_ACTIONS,
  SELECT_STATUSES,
} from '@constants/select-constant'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { Footer } from '@layouts/footer/Footer'
import { TransactionHistory } from '@modules/transaction-history/TransactionHistory'
import { BaseContainer } from '@pages/analytics/components/BaseContainer'
import { cn } from '@utils/cn'
import { type ComponentProps } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { StrategyApyChart } from './StrategyApyChart'
import { StrategyHeader } from './StrategyHeader'
import { StrategyInfo } from './StrategyInfo'
import { StrategyInfoDesktop } from './StrategyInfoDesktop'
import { StrategyInfoMobile } from './StrategyInfoMobile'
import { StrategyTransactions } from './StrategyTransactions'
import { StrategyTvlChart } from './StrategyTvlChart'

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
  const navigate = useNavigate()
  const { id } = useParams()
  return (
    <>
      <button
        type="button"
        className="mt-16 flex items-center gap-1 text-[1.25rem]/[2rem] font-medium text-text-2100"
        onClick={() => navigate(-1)}
      >
        <div className="flex size-6 items-center justify-center">
          <ArrowLeft className="size-4" />
        </div>
        <span>Back to Strategies</span>
      </button>
      <div className="mt-4 space-y-4">
        <div className="flex gap-4 *:flex-1">
          <BaseContainer className="flex flex-col">
            <StrategyHeader className="grow border-b border-stroke-100 px-9 py-7" />
            <StrategyInfo />
          </BaseContainer>
          <StrategyInfoDesktop />
        </div>

        <BaseContainer className={cn('w-full', className)} {...rest}>
          <Tabs defaultValue="apy">
            <TabsList className="w-full justify-start rounded-none border-b border-stroke-100 px-8 text-sm/[1.5rem] font-medium *:py-3">
              <TabsTrigger variant="underline" value="apy">
                APY
              </TabsTrigger>
              <TabsTrigger variant="underline" value="tvl">
                TVL
              </TabsTrigger>
            </TabsList>
            <TabsContent value="apy">
              <StrategyApyChart className="h-60 px-8 pb-5" />
            </TabsContent>
            <TabsContent value="tvl">
              <StrategyTvlChart className="h-60 px-8 pb-5" />
            </TabsContent>
          </Tabs>
        </BaseContainer>
      </div>
      <BaseContainer className="mb-48 mt-4 w-full">
        <TransactionHistory
          eventParameters={{ strategy_ids: [id as string] }}
          maatFilters={{
            search: { value: '', placeholder: 'Tx Hash' },
            actions_type: {
              items: SELECT_LAST_EVENT_ACTIONS,
              value: [],
              placeholder: 'All Actions',
              icon: <ActionIcon />,
            },
            status: {
              items: SELECT_STATUSES,
              value: [],
              placeholder: 'All Status',
              icon: <StatusIcon />,
            },
          }}
          incentivesFilters={{
            search: { value: '', placeholder: 'Tx Hash' },
            actions_type: {
              items: SELECT_INCENTIVES_ACTIONS,
              value: [],
              placeholder: 'All Actions',
              icon: <ActionIcon />,
            },
          }}
        />
      </BaseContainer>
    </>
  )
}

const StrategyMobile = (props: StrategyProperties) => {
  const { className, ...rest } = props
  const { id } = useParams()
  return (
    <div className={cn('mt-6', className)} {...rest}>
      <StrategyInfoMobile />
      <StrategyTransactions params={{ strategy_ids: [id as string] }} />
      <Footer className="mt-[5.5rem]" />
    </div>
  )
}
