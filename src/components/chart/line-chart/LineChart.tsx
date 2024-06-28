import { formatAmountValue } from '@utils/formatValue'
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

export type RechartDataType = {
  name: string
  timestamp: number
  uv?: number | null
  pv?: number | null
}

interface AreaChartComponentProperties {
  data?: RechartDataType[]
  yPrefix?: string
  yPostfix?: string
}

export const LineChartComponent = (props: AreaChartComponentProperties) => {
  const { data, yPrefix = '', yPostfix = '' } = props
  const tooltipFormatter = (value?: string) =>
    `${yPrefix}${formatAmountValue(value, 2)}${yPostfix}`
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      className="[&_.recharts-cartesian-axis-line]:stroke-slate-500/20  [&_.recharts-cartesian-grid-horizontal_line:first-child]:opacity-0 [&_.recharts-cartesian-grid-horizontal_line:last-child]:translate-y-[0.05rem]"
    >
      <AreaChart
        // width={500}
        // height={400}
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="8 8" opacity={0.5} vertical={false} />
        <XAxis
          axisLine
          tickLine={false}
          dataKey="timestamp"
          tickFormatter={(value) => dayjs(value).format('MMM').toUpperCase()}
          className="text-[0.6875rem] [&_text]:fill-gray-100"
          interval={15}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => (value === 0 ? '' : tooltipFormatter(value))}
          className="text-[0.8125rem] [&_text]:fill-gray-100"
          interval="preserveStartEnd"
        />
        <Tooltip
          content={({ active, payload, coordinate }) => {
            if (active && payload && payload.length > 0 && coordinate) {
              return (
                <TooltipComponent
                  formatter={tooltipFormatter}
                  data={[
                    {
                      color: '#6160FF',
                      value: payload[0].payload.uv,

                      timestamp: payload[0].payload.timestamp,
                    },
                    {
                      color: '#A6C1FF',
                      value: payload[0].payload.pv,
                      timestamp: payload[0].payload.timestamp,
                    },
                  ]}
                />
              )
            }

            return null
          }}
        />
        <Area
          type="monotone"
          dataKey="uv"
          connectNulls
          stroke="#6160FF"
          fill="url(#colorUv)"
        />
        <Area
          type="monotone"
          connectNulls
          dataKey="pv"
          stroke="#A6C1FF"
          fill="url(#colorPv)"
        />
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="45%" stopColor="#6160FF" stopOpacity={0.25} />
            <stop offset="100%" stopColor="#6160FF" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="45%" stopColor="#A6C1FF" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#A6C1FF" stopOpacity={0} />
          </linearGradient>
        </defs>
      </AreaChart>
    </ResponsiveContainer>
  )
}
