import { SankeyDiagramBasicDemo } from '@components/chart/sankey/SankeyD3'
import { LineChartModule } from '@modules/charts/LineChartModule'
import type { ComponentProps } from 'react'

interface AnalyticsProperties extends ComponentProps<'div'> {}

export const Analytics = (_props: AnalyticsProperties) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <LineChartModule title="APY" />
        <LineChartModule title="TVL" />
      </div>
      <SankeyDiagramBasicDemo />
    </div>
  )
}
