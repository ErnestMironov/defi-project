import { SankeyDiagramBasicDemo } from '@components/chart/sankey/SankeyD3'
import { LineChartModule } from '@modules/charts/LineChartModule'
import type { ComponentProps } from 'react'

interface LandingProperties extends ComponentProps<'div'> {}

export const Landing = (_props: LandingProperties) => {
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
