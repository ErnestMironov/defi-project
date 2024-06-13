import { Area, AreaChart, CartesianGrid, Line, Tooltip, YAxis } from 'recharts'

import { TooltipComponent } from '../TooltipComponent'

const data = [
  {
    name: 'Page A',
    uv: 100,
    pv: 100,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
]

export const LineChart = () => {
  return (
    <AreaChart
      width={600}
      height={300}
      data={data}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line type="monotone" dataKey="uv" stroke="#C494F4" />
      <CartesianGrid
        stroke="#ccc"
        opacity={0.4}
        strokeDasharray="10 10"
        vertical={false}
      />
      <YAxis />
      <Tooltip
        // cursor={false}
        content={({ active, payload, coordinate }) => {
          console.log('coordinate', coordinate)

          if (active && payload && payload.length > 0 && coordinate) {
            return <TooltipComponent />
          }

          return null
        }}
      />
      <Line type="monotone" dataKey="uv" stroke="url(#colorUv)" />
      <Area
        type="monotone"
        dataKey="uv"
        stroke="#C494F4"
        strokeWidth={3}
        fill="url(#verticalStrokes)"
      />
      <defs>
        <pattern id="verticalStrokes" width="6" height="10" patternUnits="userSpaceOnUse">
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="10"
            style={{ stroke: '#66657c', strokeWidth: 5 }}
          />
        </pattern>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#C494F4" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#C494F4" stopOpacity={0} />
        </linearGradient>
      </defs>
    </AreaChart>
  )
}
