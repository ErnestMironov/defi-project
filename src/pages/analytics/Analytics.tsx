import { SankeyDiagramBasicDemo } from '@components/chart/sankey/SankeyD3'
import { LineChartModule } from '@modules/charts/LineChartModule'
import type { ComponentProps } from 'react'

import { Overviews } from './modules/Overviews'

interface AnalyticsProperties extends ComponentProps<'div'> {}

export const Analytics = (_props: AnalyticsProperties) => {
  return (
    <div>
      <Overviews className="my-20" />
      <div className="grid grid-cols-2 gap-4">
        <LineChartModule title="APY" />
        <LineChartModule title="TVL" />
      </div>
      <SankeyDiagramBasicDemo />
    </div>
  )
}
