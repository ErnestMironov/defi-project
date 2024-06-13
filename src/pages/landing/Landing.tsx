import { SankeyDiagram } from '@components/chart/SankeyDiagram'
import type { ComponentProps } from 'react'

interface LandingProperties extends ComponentProps<'div'> {}

export const Landing = (_props: LandingProperties) => {
  return (
    <div>
      {/* <LineChart /> */}
      <SankeyDiagram />
    </div>
  )
}
