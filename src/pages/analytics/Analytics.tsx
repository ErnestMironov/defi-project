import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { Strategies } from '@modules/strategies/Strategies'
import { StrategiesCharts } from '@modules/strategies/strategies-chart/desktop/StrategiesCharts'
import { TokenOverview } from '@modules/token-overview/TokenOverview'
import { TokenCharts } from '@modules/tokens/Tokens'
import { Transactions } from '@modules/transactions/Transactions'

export const Analytics = () => {
  return (
    <Tabs className="mt-16" defaultValue="tokens">
      <TabsList>
        <TabsTrigger variant="unstyled" value="tokens">
          Tokens
        </TabsTrigger>
        <TabsTrigger variant="unstyled" value="strategies">
          Strategies
        </TabsTrigger>
        <TabsTrigger variant="unstyled" value="events">
          Events
        </TabsTrigger>
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
        <Transactions parameters={{ transaction_type: 'trigger' }} />
      </TabsContent>
    </Tabs>
  )
}
