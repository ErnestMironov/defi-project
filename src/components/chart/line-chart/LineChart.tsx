import dayjs from 'dayjs'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { TooltipComponent } from './TooltipComponent'

const mockData = [
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

export type RechartDataType = {
  name: string
  uv: number
  pv: number
  amt: number
}

export type LineChartColor = '#6160FF' | '#A6C1FF'

interface AreaChartComponentProperties {
  data?: RechartDataType[]
  color?: LineChartColor
}

const colorMapping = {
  '#6160FF': {
    color2: '#A6C1FF',
    colorUv: 'url(#colorUv1)',
  },
  '#A6C1FF': {
    color2: '#6160FF',
    colorUv: 'url(#colorUv2)',
  },
}

export const LineChartComponent = (props: AreaChartComponentProperties) => {
  const { data = mockData, color } = props
  const { color2, colorUv } = colorMapping[color || '#6160FF']
  const color1 = color
  const colorUv1 = colorUv
  const colorUv2 = colorUv === 'url(#colorUv1)' ? 'url(#colorUv2)' : 'url(#colorUv1)'
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      className="[&_.recharts-cartesian-axis-line]:stroke-slate-500/20  [&_.recharts-cartesian-grid-horizontal_line:first-child]:opacity-0 [&_.recharts-cartesian-grid-horizontal_line:last-child]:translate-y-[0.05rem]"
    >
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 8,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="8 8" vertical={false} />
        <XAxis
          axisLine
          tickLine={false}
          dataKey="uv"
          tickFormatter={(value) => dayjs(value).format('MMM').toUpperCase()}
          className="text-[0.6875rem] [&_text]:fill-gray-100"
          interval="preserveStartEnd"
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => (value === 0 ? '' : `$${value}`)}
          className="text-[0.8125rem] [&_text]:fill-gray-100"
          interval="preserveStartEnd"
        />
        <Tooltip
          content={({ active, payload, coordinate }) => {
            if (active && payload && payload.length > 0 && coordinate) {
              return (
                <TooltipComponent
                  data={[
                    { color: '#6160FF', value: '220,342.76', apy: '3.4' },
                    { color: '#A6C1FF', value: '220,342.76', apy: '3.4' },
                  ]}
                />
              )
            }

            return null
          }}
        />
        <Area type="monotone" dataKey="pv" stroke={color1} fill={colorUv1} />
        <Area type="monotone" dataKey="uv" stroke={color2} fill={colorUv2} />
        <defs>
          <linearGradient id="colorUv1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="45%" stopColor="#6160FF" stopOpacity={0.25} />
            <stop offset="100%" stopColor="#6160FF" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorUv2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="45%" stopColor="#A6C1FF" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#A6C1FF" stopOpacity={0} />
          </linearGradient>
        </defs>
      </AreaChart>
    </ResponsiveContainer>
  )
}
