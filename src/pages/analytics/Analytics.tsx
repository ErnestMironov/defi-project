import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { Strategies } from '@modules/strategies/Strategies'
import { StrategiesCharts } from '@modules/strategies/strategies-chart/desktop/StrategiesCharts'
import { TokenOverview } from '@modules/token-overview/TokenOverview'
import { TokenCharts } from '@modules/tokens/Tokens'
import { Transactions } from '@modules/transactions/Transactions'
import { SystemActions } from '@pages/transactions/system-actions/SystemActions'
import { useSearchParams } from 'react-router-dom'

import { BaseContainer } from './components/BaseContainer'

const TABS = ['tokens', 'strategies', 'events']

export const Analytics = () => {
  const [searchParameters, setSearchParameters] = useSearchParams()

  const tab = searchParameters.get('tab')
  const onValueChange = (value: string) => {
    setSearchParameters({ tab: value })
  }

  return (
    <Tabs
      className="mb-40 mt-16"
      defaultValue="tokens"
      value={tab ?? 'tokens'}
      onValueChange={onValueChange}
    >
      <TabsList className="mb-6 max-lg:mb-4 max-lg:gap-6">
        {TABS.map((_tab) => (
          <TabsTrigger variant="unstyled" className="capitalize" value={_tab}>
            {_tab}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="tokens">
        <TokenCharts />
        <TokenOverview className="mt-4" />
      </TabsContent>
      <TabsContent value="strategies">
        <StrategiesCharts />
        <Strategies className="mt-4" />
      </TabsContent>
      <TabsContent value="events">
        <BaseContainer className="pb-1">
          {/* EVENT TABS */}
          <Tabs className="mt-3 divide-y divide-stroke-100" defaultValue="events">
            <TabsList className="gap-5 px-8 *:mb-[-0.05rem] *:pb-3 *:text-sm max-lg:gap-5 max-lg:px-4">
              <TabsTrigger variant="underline" value="events">
                Events
              </TabsTrigger>
              <TabsTrigger variant="underline" value="actions">
                System Actions
              </TabsTrigger>
            </TabsList>
            <TabsContent value="events">
              <Transactions
                className="[&_tr:last-child:after]:rounded-b-[1.25rem]"
                parameters={{ transaction_type: 'trigger' }}
              />
            </TabsContent>
            <TabsContent value="actions">
              <SystemActions />
            </TabsContent>
          </Tabs>
        </BaseContainer>
      </TabsContent>
    </Tabs>
  )
}
