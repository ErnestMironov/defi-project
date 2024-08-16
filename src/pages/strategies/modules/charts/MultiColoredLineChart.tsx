import type { FrameType } from '@components/frames-select/useFrameSelect'
import { cn } from '@utils/cn'
import { formatAmountValue, formatPercentValue } from '@utils/formatValue'
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

import { StrategyTooltipComponent } from './StrategyTooltipComponent'

export const COLORS = ['#6160FF', '#FFD74B', '#6A97FF', '#FF4057', '#79DEC2']

export type RechartDataType = {
  name: string
  timestamp: number
  values: (number | null)[]
}

interface AreaChartComponentProperties {
  data?: RechartDataType[]
  yPrefix?: string
  yPostfix?: string
  frame?: FrameType
  className?: string
}

export const MultiColoredLineChart = (props: AreaChartComponentProperties) => {
  const { data, yPrefix = '', yPostfix = '', frame, className } = props
  const tooltipFormatter = (value?: string) =>
    `${yPrefix}${formatAmountValue(value, 2)}${yPostfix}`

  const tickFormatter = (value: string) => {
    let format: string = 'MMM'
    switch (frame) {
      case '1D': {
        format = 'HH:mm'
        break
      }
      case '1W': {
        format = 'ddd'
        break
      }
      default: {
        format = 'DD MMM'
        break
      }
    }
    return dayjs(value).format(format)
  }

  return (
    <div className={cn('size-full', className)}>
      <ResponsiveContainer
        width="100%"
        height="100%"
        className="[&_.recharts-cartesian-axis-line]:stroke-slate-500/20  [&_.recharts-cartesian-grid-horizontal_line:first-child]:opacity-0 [&_.recharts-cartesian-grid-horizontal_line:last-child]:translate-y-[0.05rem]"
      >
        <AreaChart
          data={data}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="4 4" opacity={0.5} vertical={false} />
          <XAxis
            tickLine={false}
            dataKey="timestamp"
            tickFormatter={tickFormatter}
            className="text-[0.8125rem] [&_text]:fill-gray-100"
            minTickGap={40}
            tickCount={10}
            interval="preserveStartEnd"
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickMargin={5}
            tickFormatter={(value) => (value === 0 ? '' : tooltipFormatter(value))}
            className="text-[0.8125rem] [&_text]:fill-gray-100"
            interval="preserveStartEnd"
          />
          <Tooltip
            content={({ active, payload, coordinate }) => {
              if (active && payload && payload.length > 0 && coordinate) {
                console.log('payload', payload)
                return (
                  <StrategyTooltipComponent
                    timestamp={payload[0].payload.timestamp}
                    data={payload.map((item) => ({
                      symbol: 'USDT',
                      chain: 'BASE',
                      protocol: 'Beefy',
                      color: item.color || '',
                      value: formatPercentValue(
                        item.value as string | number | undefined,
                      ),
                    }))}
                  />
                )
              }

              return null
            }}
          />
          {COLORS.map((color, index) => (
            <Area
              key={color}
              type="monotone"
              connectNulls
              dataKey={`values[${index}]`}
              stroke={color}
              fill={`url(#color${index})`}
            />
          ))}
          <defs>
            {COLORS.map((color, index) => (
              <linearGradient
                key={color}
                id={`color${index}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="45%" stopColor={color} stopOpacity={0.25} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
