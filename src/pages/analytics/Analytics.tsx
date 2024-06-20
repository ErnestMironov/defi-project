import { SankeyDiagramBasicDemo } from '@components/chart/sankey/SankeyD3'
import { LineChartModule } from '@modules/charts/LineChartModule'
import type { ComponentProps } from 'react'

import { DocumentationLinks } from './modules/DocsLinks'
import { Overviews } from './modules/Overviews'
import { Strategies } from './modules/Strategies'
import { TransactionsHistory } from './modules/TransactionsHistory'

interface AnalyticsProperties extends ComponentProps<'div'> {}

export const Analytics = (_props: AnalyticsProperties) => {
  return (
    <div>
      <Overviews className="my-20" />
      <div className="grid grid-cols-2 gap-4">
        <LineChartModule title="APY" />
        <LineChartModule title="TVL" />
      </div>
      <DocumentationLinks className="mt-32" />
      <SankeyDiagramBasicDemo />
      <Strategies className="mt-[8.75rem]" />
      <TransactionsHistory className="mt-28" />
    </div>
  )
}
